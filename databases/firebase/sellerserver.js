// sellerServer.js
import express from 'express';
import cors from 'cors';
import { db } from './firebase.js'; // reuse the same Firebase init
import bodyParser from 'body-parser';

const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

app.get('/getSellerItems/:sellerId', async (req, res) => {
  const { sellerId } = req.params;

  try {
    const sellerItemsSnap = await db.collection(`sellers/${sellerId}/sellerItems`).get();
    if (sellerItemsSnap.empty) return res.json([]);

    const results = [];

    for (const doc of sellerItemsSnap.docs) {
      const itemCategory = doc.data();
      const itemsSnap = await doc.ref.collection('items').get();
      const items = itemsSnap.docs.map(itemDoc => ({
        id: itemDoc.id,
        ...itemDoc.data(),
      }));

      results.push({
        ...itemCategory,
        items,
      });
    }

    res.json(results);
  } catch (error) {
    console.error('Error fetching seller items:', error);
    res.status(500).json({ error: error.message });
  }
});
app.get('/getAllSellersFull', async (req, res) => {
  try {
    const sellersSnap = await db.collection('Sellers').get();

    const sellers = await Promise.all(sellersSnap.docs.map(async (sellerDoc) => {
      const sellerData = sellerDoc.data();

      // Fetch sellerItems
      const sellerItemsSnap = await db.collection('Sellers')
        .doc(sellerDoc.id)
        .collection('selleritems')
        .get();

      const sellerItems = await Promise.all(sellerItemsSnap.docs.map(async (itemGroupDoc) => {
        const itemGroupData = itemGroupDoc.data();
        const itemsSnap = await itemGroupDoc.ref.collection('s1').get();
        const items = itemsSnap.docs.map(itemDoc => ({
          id: itemDoc.id,
          ...itemDoc.data()
        }));
        return { ...itemGroupData, id: itemGroupDoc.id, items };
      }));

      // Fetch sellerPosts
      const sellerPostsSnap = await db.collection('Sellers')
        .doc(sellerDoc.id)
        .collection('sellerposts')
        .get();

      const sellerPosts = await Promise.all(sellerPostsSnap.docs.map(async (postGroupDoc) => {
        const postGroupData = postGroupDoc.data();
        const postsSnap = await postGroupDoc.ref.collection('s1').get();
        const posts = postsSnap.docs.map(postDoc => ({
          id: postDoc.id,
          ...postDoc.data()
        }));
        return { ...postGroupData, id: postGroupDoc.id, posts };
      }));

      return {
        ...sellerData,
        sellerId: sellerDoc.id,
        sellerItems,
        sellerPosts,
      };
    }));

    res.json(sellers);
  } catch (error) {
    console.error("Error fetching full seller data:", error);
    res.status(500).json({ error: error.message });
  }
});

  
  
// ADD THIS to your existing sellerServer.js

// Create a seller
app.post('/createSeller', async (req, res) => {
  try {
    const { sellerId, data } = req.body;

    if (!sellerId || !data) {
      return res.status(400).json({ error: 'Missing sellerId or data payload.' });
    }

    const {
      SellerBrandName,
      SellerName,
      Sellerwebsite,
      SellerInstagram,
      SellerEmail,
      Sellerphone,
    } = data;

    if (!SellerBrandName || !SellerEmail || !SellerInstagram || !Sellerphone) {
      return res.status(400).json({ error: 'Missing required seller fields.' });
    }

    const sellerDoc = {
      sellerId,
      SellerBrandName,
      SellerName: SellerName || '',
      Sellerwebsite: Sellerwebsite || '',
      SellerInstagram,
      SellerEmail,
      Sellerphone,
      joined: new Date(),
      verified: false,
      stats: {
        sales: "0",
        revenue: "0",
        followers: "0",
        orders: "0",
        returns: "0",
        rating: "0",
      },
      AdBudget: {
        spent: 0,
        currentFunds: 0,
        campaignStats: {
          clicks: "0",
          ctr: "0.0",
          impressions: 0
        }
      }
    };

    // Set main seller doc
    await db.collection('Sellers').doc(sellerId).set(sellerDoc);

    // Create default item group and item
    const defaultItemGroup = {
      id: "default-group",
      title: "Default Group"
    };
    const defaultItem = {
      id: "default-item",
      itemname: "Example Item",
      category: "general",
      color: "black",
      brand: "example",
      material: "fabric",
      season: "all",
      image: "https://example.com/image.jpg",
      gender: "unisex",
      occasion: "casual",
      price: "0",
      type: "basic",
      "temperature range": [10, 30],
      essential: "false"
    };
    await db.collection('Sellers').doc(sellerId)
      .collection('selleritems').doc(defaultItemGroup.id).set(defaultItemGroup);
    await db.collection('Sellers').doc(sellerId)
      .collection('selleritems').doc(defaultItemGroup.id)
      .collection('s1').doc(defaultItem.id).set(defaultItem);

    // Create default post group and post
    const defaultPostGroup = {
      id: "default-post-group",
      title: "Default Post Group"
    };
    const defaultPost = {
      id: "default-post",
      caption: "Welcome post!",
      image: "https://example.com/post.jpg",
      timestamp: new Date(),
      likes: "0",
      comments: "0"
    };
    await db.collection('Sellers').doc(sellerId)
      .collection('sellerposts').doc(defaultPostGroup.id).set(defaultPostGroup);
    await db.collection('Sellers').doc(sellerId)
      .collection('sellerposts').doc(defaultPostGroup.id)
      .collection('s1').doc(defaultPost.id).set(defaultPost);

    res.status(201).json({ message: 'Seller created with default data.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



  
  // Create a seller item group
  app.post('/addSellerItemGroup', async (req, res) => {
    try {
      const { sellerId, groupId, title } = req.body;
      await db.collection('Sellers').doc(sellerId).collection('selleritems').doc(groupId).set({ id: groupId, title });
      res.status(201).json({ message: 'Item group created successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Post item to group
  app.post('/addSellerItem', async (req, res) => {
    try {
      const { sellerId, groupId, itemId, itemData } = req.body;
      await db.collection('Sellers').doc(sellerId).collection('selleritems').doc(groupId).collection('s1').doc(itemId).set(itemData);
      res.status(201).json({ message: 'Item added successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Create a seller post group
  app.post('/addSellerPostGroup', async (req, res) => {
    try {
      const { sellerId, postGroupId, title } = req.body;
      await db.collection('Sellers').doc(sellerId).collection('sellerposts').doc(postGroupId).set({ id: postGroupId, title });
      res.status(201).json({ message: 'Post group created successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Post post to post group
  app.post('/addSellerPost', async (req, res) => {
    try {
      const { sellerId, postGroupId, postId, postData } = req.body;
      await db.collection('Sellers').doc(sellerId).collection('sellerposts').doc(postGroupId).collection('s1').doc(postId).set(postData);
      res.status(201).json({ message: 'Post added successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get('/getSellerFull/:sellerId', async (req, res) => {
    const { sellerId } = req.params;
  
    try {
      const sellerRef = db.collection('Sellers').doc(sellerId);
      const sellerSnap = await sellerRef.get();
      if (!sellerSnap.exists) return res.status(404).json({ error: 'Seller not found' });
  
      const sellerData = sellerSnap.data();
  
      const sellerItemsSnap = await sellerRef.collection('selleritems').get();
      const sellerItems = await Promise.all(sellerItemsSnap.docs.map(async (itemGroupDoc) => {
        const itemGroupData = itemGroupDoc.data();
        const itemsSnap = await itemGroupDoc.ref.collection('s1').get();
        const items = itemsSnap.docs.map(itemDoc => ({
          id: itemDoc.id,
          ...itemDoc.data()
        }));
        return {
          id: itemGroupDoc.id,
          ...itemGroupData,
          items
        };
      }));
  
      const sellerPostsSnap = await sellerRef.collection('sellerposts').get();
      const sellerPosts = await Promise.all(sellerPostsSnap.docs.map(async (postGroupDoc) => {
        const postGroupData = postGroupDoc.data();
        const postsSnap = await postGroupDoc.ref.collection('s1').get();
        const posts = postsSnap.docs.map(postDoc => ({
          id: postDoc.id,
          ...postDoc.data()
        }));
        return {
          id: postGroupDoc.id,
          ...postGroupData,
          posts
        };
      }));
  
      res.json({ ...sellerData, sellerItems, sellerPosts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


  
// GET seller by brand name
app.get('/getSellerByBrand/:brandName', async (req, res) => {
  const { brandName } = req.params;

  try {
    const sellerSnap = await db.collection('Sellers').where('SellerBrandName', '==', brandName).get();

    if (sellerSnap.empty) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    const sellerDoc = sellerSnap.docs[0];
    const sellerData = sellerDoc.data();
    const sellerId = sellerDoc.id;

    const sellerItemsSnap = await db.collection('Sellers')
      .doc(sellerId)
      .collection('selleritems')
      .get();

    const sellerItems = await Promise.all(sellerItemsSnap.docs.map(async (itemGroupDoc) => {
      const itemGroupData = itemGroupDoc.data();
      const itemsSnap = await itemGroupDoc.ref.collection('s1').get();
      const items = itemsSnap.docs.map(itemDoc => ({
        id: itemDoc.id,
        ...itemDoc.data()
      }));
      return { ...itemGroupData, id: itemGroupDoc.id, items };
    }));

    const sellerPostsSnap = await db.collection('Sellers')
      .doc(sellerId)
      .collection('sellerposts')
      .get();

    const sellerPosts = await Promise.all(sellerPostsSnap.docs.map(async (postGroupDoc) => {
      const postGroupData = postGroupDoc.data();
      const postsSnap = await postGroupDoc.ref.collection('s1').get();
      const posts = postsSnap.docs.map(postDoc => ({
        id: postDoc.id,
        ...postDoc.data()
      }));
      return { ...postGroupData, id: postGroupDoc.id, posts };
    }));

    return res.status(200).json({
      sellerId,
      ...sellerData,
      sellerItems,
      sellerPosts
    });
  } catch (error) {
    console.error('Error fetching seller by brand:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

  

  
  app.get('/getPostById/:sellerId/:postGroupId/:postId', async (req, res) => {
    const { sellerId, postGroupId, postId } = req.params;
  
    try {
      const postRef = db
        .collection('Sellers')
        .doc(sellerId)
        .collection('sellerposts')
        .doc(postGroupId)
        .collection('s1')
        .doc(postId);
  
      const postSnap = await postRef.get();
  
      if (!postSnap.exists) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.json({ id: postSnap.id, ...postSnap.data() });
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  app.get('/getPostById/:sellerId/:postId', async (req, res) => {
    const { sellerId, postId } = req.params;
  
    try {
      const postGroupsSnap = await db
        .collection('Sellers')
        .doc(sellerId)
        .collection('sellerposts')
        .get();
  
      for (const groupDoc of postGroupsSnap.docs) {
        const postDoc = await groupDoc.ref.collection('s1').doc(postId).get();
        if (postDoc.exists) {
          return res.json({ id: postDoc.id, ...postDoc.data() });
        }
      }
  
      return res.status(404).json({ error: 'Post not found in any group' });
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/getItemById/:sellerId/:groupId/:itemId', async (req, res) => {
    const { sellerId, groupId, itemId } = req.params;
    console.log("Request Params:", { sellerId, groupId, itemId });
  
    try {
      const sellerDoc = await db.collection('Sellers').doc(sellerId).get();
  
      if (!sellerDoc.exists) {
        console.log("Seller not found.");
        return res.status(404).json({ error: 'Seller not found' });
      }
  
      const sellerData = sellerDoc.data();
      const group = (sellerData.sellerItems || []).find(g => g.id === groupId);
  
      if (!group) {
        console.log("Group not found in sellerItems array");
        return res.status(404).json({ error: 'Item group not found' });
      }
  
      const item = (group.items || []).find(i => i.id === itemId || i.itemId === itemId);
  
      if (!item) {
        console.log("Item not found in group");
        return res.status(404).json({ error: 'Item not found in group' });
      }
  
      console.log("MATCH FOUND:", item);
      res.json({ groupId, ...item });
    } catch (error) {
      console.error('Error fetching item by ID:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  
  app.get('/getItemById/:sellerId/:itemId', async (req, res) => {
    const { sellerId, itemId } = req.params;
  
    try {
      const groupsSnap = await db.collection('Sellers')
        .doc(sellerId)
        .collection('selleritems')
        .get();
  
      for (const groupDoc of groupsSnap.docs) {
        const groupId = groupDoc.id;
        const itemSnap = await db.collection('Sellers')
          .doc(sellerId)
          .collection('selleritems')
          .doc(groupId)
          .collection('s1')
          .doc(itemId)
          .get();
  
        if (itemSnap.exists) {
          return res.json({ groupId, itemId: itemSnap.id, ...itemSnap.data() });
        }
      }
  
      return res.status(404).json({ error: 'Item not found in any group' });
    } catch (error) {
      console.error('Error fetching item by ID:', error);
      res.status(500).json({ error: error.message });
    }
  });
  

  //Puts and deletes: 

// EDIT item in group
app.put('/editSellerItem', async (req, res) => {
  try {
    const { sellerId, groupId, itemId, itemData } = req.body;
    await db.collection('Sellers').doc(sellerId)
      .collection('selleritems').doc(groupId)
      .collection('s1').doc(itemId).update(itemData);
    res.status(200).json({ message: 'Item updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE item from group
app.delete('/deleteSellerItem/:sellerId/:groupId/:itemId', async (req, res) => {
  const { sellerId, groupId, itemId } = req.params;
  try {
    await db.collection('Sellers').doc(sellerId)
      .collection('selleritems').doc(groupId)
      .collection('s1').doc(itemId).delete();
    res.status(200).json({ message: 'Item deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// EDIT post in group
app.put('/editSellerPost', async (req, res) => {
  try {
    const { sellerId, postGroupId, postId, postData } = req.body;
    await db.collection('Sellers').doc(sellerId)
      .collection('sellerposts').doc(postGroupId)
      .collection('s1').doc(postId).update(postData);
    res.status(200).json({ message: 'Post updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE post from group
app.delete('/deleteSellerPost/:sellerId/:postGroupId/:postId', async (req, res) => {
  const { sellerId, postGroupId, postId } = req.params;
  try {
    await db.collection('Sellers').doc(sellerId)
      .collection('sellerposts').doc(postGroupId)
      .collection('s1').doc(postId).delete();
    res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// EDIT item group
app.put('/editSellerItemGroup', async (req, res) => {
  try {
    const { sellerId, groupId, newData } = req.body;
    await db.collection('Sellers').doc(sellerId)
      .collection('selleritems').doc(groupId).update(newData);
    res.status(200).json({ message: 'Item group updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE item group
app.delete('/deleteSellerItemGroup/:sellerId/:groupId', async (req, res) => {
  const { sellerId, groupId } = req.params;
  try {
    const itemsSnap = await db.collection('Sellers').doc(sellerId)
      .collection('selleritems').doc(groupId).collection('s1').get();

    for (const doc of itemsSnap.docs) {
      await doc.ref.delete();
    }

    await db.collection('Sellers').doc(sellerId)
      .collection('selleritems').doc(groupId).delete();

    res.status(200).json({ message: 'Item group and all items deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// EDIT post group
app.put('/editSellerPostGroup', async (req, res) => {
  try {
    const { sellerId, postGroupId, newData } = req.body;
    await db.collection('Sellers').doc(sellerId)
      .collection('sellerposts').doc(postGroupId).update(newData);
    res.status(200).json({ message: 'Post group updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE post group
app.delete('/deleteSellerPostGroup/:sellerId/:postGroupId', async (req, res) => {
  const { sellerId, postGroupId } = req.params;
  try {
    const postsSnap = await db.collection('Sellers').doc(sellerId)
      .collection('sellerposts').doc(postGroupId).collection('s1').get();

    for (const doc of postsSnap.docs) {
      await doc.ref.delete();
    }

    await db.collection('Sellers').doc(sellerId)
      .collection('sellerposts').doc(postGroupId).delete();

    res.status(200).json({ message: 'Post group and all posts deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  
  
  
app.listen(port, () => {
  console.log(`Seller backend running on http://localhost:${port}`);
});
