// explorePostServer.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { db } from '../firebase.js';
import admin from 'firebase-admin';

const app = express();
const port = 5078;

app.use(cors());
app.use(bodyParser.json());

const IMPRESSION_COST = 0.01;
const IMPRESSION_CAP = 1000;
const BUDGET_ALERT_THRESHOLD = 1;

// Compute relevance score per post
function computePostRelevance(post, seller, variant = 'A') {
  const weights = {
    likes: 1,
    comments: 2,
    followers: 0.01,
    rating: 5,
    adSpend: 0.1,
    decay: 0.5,
  };

  const now = Date.now();
  const timestamp = post.timestamp?._seconds
    ? post.timestamp._seconds * 1000
    : Date.parse(post.timestamp || 0);
  const hoursAgo = (now - timestamp) / 3600000;
  const decay = Math.exp(-weights.decay * hoursAgo);

  const score =
    (post.likes || 0) * weights.likes +
    (post.comments || 0) * weights.comments +
    (seller.stats?.followers || 0) * weights.followers +
    (seller.stats?.rating || 0) * weights.rating +
    (seller.AdBudget?.spent || 0) * weights.adSpend;

  return variant === 'B' ? score * 1.1 : score * decay;
}

// Impression limiting
async function canShowPost(userId, postId) {
  try {
    const ref = db.collection('ExplorePostImpressions').doc(`${userId}_${postId}`);
    const doc = await ref.get();
    const timestamps = doc.exists ? doc.data().timestamps || [] : [];
    const recent = timestamps.filter((t) =>
      t instanceof admin.firestore.Timestamp && Date.now() - t.toMillis() <= 3600000
    );
    return recent.length < IMPRESSION_CAP;
  } catch {
    return false;
  }
}

// Log impression
async function logImpression(userId, postId) {
  try {
    const ref = db.collection('ExplorePostImpressions').doc(`${userId}_${postId}`);
    await ref.set(
      {
        timestamps: admin.firestore.FieldValue.arrayUnion(admin.firestore.Timestamp.now()),
      },
      { merge: true }
    );
  } catch {}
}

// Deduct ad funds
async function deductBudget(sellerRef) {
  await sellerRef.update({
    'AdBudget.currentFunds': admin.firestore.FieldValue.increment(-IMPRESSION_COST),
    'AdBudget.spent': admin.firestore.FieldValue.increment(IMPRESSION_COST),
    'AdBudget.campaignStats.impressions': admin.firestore.FieldValue.increment(1),
  });
}

// Warn low budget
async function flagLowBudget(sellerRef, sellerId, remainingFunds) {
  if (remainingFunds < BUDGET_ALERT_THRESHOLD) {
    await db.collection('BudgetAlerts').doc(sellerId).set({
      alert: true,
      funds: remainingFunds,
      timestamp: Date.now(),
    });
  }
}

// GET /explore-posts
app.get('/explore-posts', async (req, res) => {
  try {
    const { userId = 'anonymous' } = req.query;
    const sellers = await db.collection('Sellers').get();
    const results = [];

    for (const sellerDoc of sellers.docs) {
      const sellerRef = sellerDoc.ref;
      const sellerId = sellerDoc.id;
      const seller = sellerDoc.data();
      let funds = parseFloat(seller.AdBudget?.currentFunds || '0');

      const postGroups = await sellerRef.collection('sellerposts').get();
      for (const postGroup of postGroups.docs) {
        const posts = await postGroup.ref.collection('s1').get();
        for (const postDoc of posts.docs) {
          const post = postDoc.data();
          const postId = postDoc.id;

          if (!post.image || !post.caption || funds < IMPRESSION_COST) continue;

          const canShow = await canShowPost(userId, postId);
          if (!canShow) continue;

          const variant = Math.random() < 0.5 ? 'A' : 'B';
          const score = computePostRelevance(post, seller, variant);

          await logImpression(userId, postId);
          await deductBudget(sellerRef);
          funds -= IMPRESSION_COST;
          await flagLowBudget(sellerRef, sellerId, funds);

          results.push({
            ...post,
            postId,
            sellerId,
            brandName: seller.SellerBrandName || '',
            sellerStats: seller.stats || {},
            adBudget: seller.AdBudget || {},
            relevanceScore: score,
            variant,
          });
        }
      }
    }

    results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    res.json(results);
  } catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST /click/:postId
// ✅ VERSION WITH FULL LOGGING FOR DEBUGGING

app.post('/click/:postId', async (req, res) => {
    try {
      const { postId } = req.params;
      const { sellerId } = req.body;
  
      console.log(`[CLICK INIT] Received click for postId=${postId}, sellerId=${sellerId}`);
  
      if (!sellerId) {
        console.warn(`[CLICK ERROR] Missing sellerId in body`);
        return res.status(400).json({ error: 'Missing sellerId in body' });
      }
  
      const uniquePostId = `${sellerId}_${postId}`;
      const clickRef = db.collection('ClickStats').doc(uniquePostId);
      const sellerRef = db.collection('Sellers').doc(sellerId);
      const sellerLogRef = db.collection('SellerClickLogs').doc(sellerId);
  
      console.log(`[CLICK PROCESS] Logging click under ID: ${uniquePostId}`);
  
      await Promise.all([
        clickRef.set({
          clicks: admin.firestore.FieldValue.increment(1),
          lastClicked: admin.firestore.Timestamp.now()
        }, { merge: true }),
  
        sellerLogRef.set({
          [postId]: admin.firestore.FieldValue.increment(1),
          lastUpdated: admin.firestore.Timestamp.now()
        }, { merge: true }),
  
        sellerRef.update({
          'AdBudget.spent': admin.firestore.FieldValue.increment(0.02)
        })
      ]);
  
      console.log(`[CLICK SUCCESS] Click logged for ${uniquePostId}`);
      res.json({ success: true });
  
    } catch (error) {
      console.error(`[CLICK FATAL] Failed to process click for postId=${req.params.postId}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// GET /click-summary/:postId?sellerId=...
// GET /click-summary/:postId?sellerId=...
// GET /click-summary/:postId?sellerId=...
app.get('/click-summary/:postId', async (req, res) => {
    const { postId } = req.params;
    const { sellerId } = req.query;
  
    console.log(`[SUMMARY INIT] Fetching summary for postId=${postId}, sellerId=${sellerId}`);
  
    if (!sellerId) {
      console.warn(`[SUMMARY ERROR] Missing sellerId`);
      return res.status(400).json({ error: 'Missing sellerId in query' });
    }
  
    const uniquePostId = `${sellerId}_${postId}`;
    const clickRef = db.collection('ClickStats').doc(uniquePostId);
  
    try {
      const doc = await clickRef.get();
  
      if (!doc.exists) {
        console.warn(`[SUMMARY NOT FOUND] No clicks logged for ${uniquePostId}`);
        return res.status(404).json({ error: 'Post not found or no clicks logged' });
      }
  
      const data = doc.data();
      console.log(`[SUMMARY FOUND] ${uniquePostId}:`, data);
  
      res.json({ postId, clicks: data.clicks || 0 });
    } catch (error) {
      console.error(`[SUMMARY FAIL] Error fetching summary for ${uniquePostId}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

app.listen(port, () => {
  console.log(`🟢 Explore posts service running on http://localhost:${port}`);
});
/**
 * 🔍 Explore Post Ad Server
 * ────────────────────────────────
 * A backend service for delivering ad-like seller posts in an explore feed.
 * It ranks posts using a relevance score based on post stats and seller quality,
 * enforces impression caps, deducts budget per view or click, and tracks interactions.
 *
 * ▶ Firebase Firestore collections used:
 *   - Sellers/{sellerId}/sellerposts/{groupId}/s1/{postId} : Ad post data
 *   - ExplorePostImpressions/{userId_postId}               : View timestamps
 *   - ClickStats/{sellerId_postId}                         : Global click count
 *   - SellerClickLogs/{sellerId}                           : Per-seller click map
 *   - BudgetAlerts/{sellerId}                              : Low-budget alerts
 */