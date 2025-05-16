// ExploreService/exploreServer.js
import express from 'express';
import cors from 'cors';
import { db } from '../firebase.js';
import bodyParser from 'body-parser';

const app = express();
const port = 5077;

app.use(cors());
app.use(bodyParser.json());

function computeRelevanceScore(userPrefs, seller) {
  let score = 0;
  if (userPrefs.category) {
    const matches = seller.sellerItems?.some(group =>
      group.items?.some(item => item.category?.toLowerCase() === userPrefs.category)
    );
    if (matches) score += 15;
  }
  if (userPrefs.gender) {
    const matches = seller.sellerItems?.some(group =>
      group.items?.some(item => item.gender?.toLowerCase() === userPrefs.gender)
    );
    if (matches) score += 10;
  }
  score += Number(seller.stats?.followers || 0) * 0.01;
  score += Number(seller.stats?.rating || 0) * 2;
  score += Number(seller.AdBudget?.spent || 0) * 0.05;
  return score;
}

function itemMatchesFilters(item, userPrefs) {
  return (!userPrefs.itemName || item.itemname?.toLowerCase().includes(userPrefs.itemName)) &&
         (!userPrefs.brand || item.brand?.toLowerCase() === userPrefs.brand) &&
         (!userPrefs.material || item.material?.toLowerCase() === userPrefs.material) &&
         (!userPrefs.occasion || item.occasion?.toLowerCase() === userPrefs.occasion) &&
         (!userPrefs.type || item.type?.toLowerCase() === userPrefs.type) &&
         (!userPrefs.essential || String(item.essential) === userPrefs.essential) &&
         (!userPrefs.priceMin || Number(item.price) >= Number(userPrefs.priceMin)) &&
         (!userPrefs.priceMax || Number(item.price) <= Number(userPrefs.priceMax)) &&
         (!userPrefs.tempMin || Number(item.temperature_range?.[0]) >= Number(userPrefs.tempMin)) &&
         (!userPrefs.tempMax || Number(item.temperature_range?.[1]) <= Number(userPrefs.tempMax));
}

function postMatchesFilters(post, userPrefs) {
  return (!userPrefs.caption || post.caption?.toLowerCase().includes(userPrefs.caption)) &&
         (!userPrefs.likesMin || Number(post.likes) >= Number(userPrefs.likesMin)) &&
         (!userPrefs.likesMax || Number(post.likes) <= Number(userPrefs.likesMax)) &&
         (!userPrefs.commentsMin || Number(post.comments) >= Number(userPrefs.commentsMin)) &&
         (!userPrefs.commentsMax || Number(post.comments) <= Number(userPrefs.commentsMax));
}

function matchesFilters(seller, userPrefs) {
  const items = seller.sellerItems?.flatMap(g => g.items || []) || [];
  const posts = seller.sellerPosts?.flatMap(g => g.posts || []) || [];

  const itemsPass = items.filter(item => itemMatchesFilters(item, userPrefs));
  const postsPass = posts.filter(post => postMatchesFilters(post, userPrefs));

  return (
    (!userPrefs.sellerName || (seller.SellerBrandName || seller.brandName || '').toLowerCase().includes(userPrefs.sellerName)) &&
    itemsPass.length > 0 &&
    (!userPrefs.ratingMin || Number(seller.stats?.rating || 0) >= Number(userPrefs.ratingMin)) &&
    (!userPrefs.ratingMax || Number(seller.stats?.rating || 0) <= Number(userPrefs.ratingMax)) &&
    (!userPrefs.followersMin || Number(seller.stats?.followers || 0) >= Number(userPrefs.followersMin)) &&
    (!userPrefs.followersMax || Number(seller.stats?.followers || 0) <= Number(userPrefs.followersMax)) &&
    (!userPrefs.adSpendMin || Number(seller.AdBudget?.spent || 0) >= Number(userPrefs.adSpendMin)) &&
    (!userPrefs.adSpendMax || Number(seller.AdBudget?.spent || 0) <= Number(userPrefs.adSpendMax)) &&
    postsPass.length > 0
  );
}

app.get('/explore', async (req, res) => {
  const q = (v) => (v ? v.toLowerCase() : null);
  const userPrefs = {
    category: q(req.query.category),
    gender: q(req.query.gender),
    sellerName: q(req.query.sellerName),
    itemName: q(req.query.itemName),
    brand: q(req.query.brand),
    material: q(req.query.material),
    occasion: q(req.query.occasion),
    type: q(req.query.type),
    essential: req.query.essential,
    priceMin: req.query.priceMin,
    priceMax: req.query.priceMax,
    tempMin: req.query.tempMin,
    tempMax: req.query.tempMax,
    ratingMin: req.query.ratingMin,
    ratingMax: req.query.ratingMax,
    followersMin: req.query.followersMin,
    followersMax: req.query.followersMax,
    adSpendMin: req.query.adSpendMin,
    adSpendMax: req.query.adSpendMax,
    caption: q(req.query.caption),
    likesMin: req.query.likesMin,
    likesMax: req.query.likesMax,
    commentsMin: req.query.commentsMin,
    commentsMax: req.query.commentsMax,
  };

  try {
    const sellersSnap = await db.collection('Sellers').get();

    const sellers = await Promise.all(sellersSnap.docs.map(async (doc) => {
      const sellerData = doc.data();

      const sellerItemsSnap = await doc.ref.collection('selleritems').get();
      const sellerItems = await Promise.all(sellerItemsSnap.docs.map(async (groupDoc) => {
        const group = groupDoc.data();
        const itemsSnap = await groupDoc.ref.collection('s1').get();
        return {
          ...group,
          items: itemsSnap.docs.map(item => ({
            ...item.data(),
            id: item.id,
            sellerId: doc.id
          }))
        };
      }));

      const sellerPostsSnap = await doc.ref.collection('sellerposts').get();
      const sellerPosts = await Promise.all(sellerPostsSnap.docs.map(async (groupDoc) => {
        const group = groupDoc.data();
        const postsSnap = await groupDoc.ref.collection('s1').get();
        return {
          ...group,
          posts: postsSnap.docs.map(post => post.data())
        };
      }));

      const combined = {
        ...sellerData,
        sellerItems,
        sellerPosts
      };

      if (!matchesFilters(combined, userPrefs)) return null;

      const relevanceScore = computeRelevanceScore(userPrefs, combined);
      const previewPost = sellerPosts?.[0]?.posts?.[0] || {};

      const filteredItems = sellerItems.flatMap(g => g.items || []).filter(item =>
        itemMatchesFilters(item, userPrefs)
      );

      return {
        id: doc.id,
        brandName: sellerData.SellerBrandName || sellerData.brandName || '',
        rating: sellerData.stats?.rating || 0,
        followers: sellerData.stats?.followers || 0,
        relevanceScore,
        image: previewPost.image || '',
        previewCaption: previewPost.caption || '',
        items: filteredItems
      };
    }));

    const filtered = sellers.filter(s => s !== null);
    const sorted = filtered.sort((a, b) => b.relevanceScore - a.relevanceScore);
    res.json(sorted);
  } catch (err) {
    console.error('Explore fetch error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Explore service running on http://localhost:${port}`);
});
