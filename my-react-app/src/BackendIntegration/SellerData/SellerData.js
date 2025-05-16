import axios from 'axios';

export const fetchSellerData = async (sellerId) => {
  try {
    const response = await axios.get(`http://localhost:5001/getSellerFull/${sellerId}`);
    const sellerData = response.data;

    console.log('Fetched seller data:', sellerData);

    const formattedSellerData = {
      sellerId,
      brandName: sellerData.SellerBrandName || 'Unknown Brand',
      website: sellerData.Sellerwebsite || 'Not Provided',
      instagram: sellerData.SellerInstagram || 'Not Provided',
      email: sellerData.SellerEmail || 'Not Provided',
      phone: sellerData.Sellerphone || 'Not Provided',
      joined: sellerData.joined || 'Not Provided',
      verified: sellerData.verified || false,
      stats: {
        sales: sellerData.stats.sales || '0',
        revenue: sellerData.stats.revenue || '0',
        followers: sellerData.stats.followers || '0',
        orders: sellerData.stats.orders || '0',
        returns: sellerData.stats.returns || '0',
        rating: sellerData.stats.rating || '0',
      },
      sellerItems: sellerData.sellerItems ? sellerData.sellerItems.map((item) => ({
        id: item.id || 'no-id',
        title: item.title || 'No Title',
        items: item.items ? item.items.map((product) => ({
          id: product.id || 'no-id',
          itemName: product.itemname || 'No Name',
          category: product.category || 'Uncategorized',
          color: product.color || 'Unknown',
          brand: product.brand || 'Unknown',
          material: product.material || 'Unknown',
          season: product.season || 'Unknown',
          image: product.image || 'No Image',
          gender: product.gender || 'Unisex',
          occasion: product.occasion || 'Casual',
          price: product.price || '0',
          type: product.type || 'Unknown',
          temperature_range: product["temperature range"] || [0, 0],
          essential: product.essential === 'true' || false,
        })) : [],
      })) : [],
      sellerPosts: sellerData.sellerPosts ? sellerData.sellerPosts.map((post) => ({
        id: post.id || 'no-id',
        title: post.title || 'No Title',
         posts: post.posts ? post.posts.map((p) => ({
          id: p.id || 'no-id',
          caption: p.caption || 'No Caption',
          image: p.image || 'No Image',
          timestamp: p.timestamp && p.timestamp._seconds
            ? new Date(p.timestamp._seconds * 1000).toISOString()
            : 'Not Provided',
          likes: p.likes || '0',
          comments: p.comments || '0',
        })) : [],
      })) : [],
      adBudget: {
        currentBudget: sellerData.AdBudget.currentFunds || 0,
        spent: sellerData.AdBudget.spent || 0,
        campaignStats: {
          impressions: sellerData.AdBudget.campaignStats.impressions || 0,
          clicks: sellerData.AdBudget.campaignStats.clicks || '0',
          ctr: sellerData.AdBudget.campaignStats.ctr || '0.0',
        },
      },
    };

    console.log('Formatted seller data:', formattedSellerData);

    return [formattedSellerData];
  } catch (error) {
    console.error('Error fetching seller data:', error);
    return [];
  }
};
