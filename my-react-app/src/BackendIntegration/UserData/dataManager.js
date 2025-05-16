import userAxios from './UserAxios';  // Import the functions defined in UserAxios.js

export const createDummyUserData = async () => {
  try {
    console.log('Fetching user information...');
    const userInfo = await userAxios.getMyInfo();  // Fetch user info using getMyInfo
    if (!userInfo) {
      console.error('User info fetch failed.');
      return null;
    }
    console.log('User info fetched:', userInfo);

    // Fetch wardrobeID using the getWardrobeID function
    console.log('Fetching wardrobe ID...');
    const wardrobeID = await userAxios.getWardrobeID();  // Fetch the wardrobeID using the token
    if (!wardrobeID) {
      console.warn('No wardrobe found for user, returning null.');
      return null;  // Returning null if no wardrobeID is found
    }
    console.log('Wardrobe ID fetched:', wardrobeID);

    // Fetch categories using wardrobeID
    console.log('Fetching categories...');
    const categories = await userAxios.getAllCategoriesByWardrobeId(wardrobeID);  // Fetch categories using wardrobeID
    if (!categories || categories.length === 0) {
      console.warn('No categories found.');
    }
    console.log('Categories fetched:', categories);

    // Fetch items for each category
    console.log('Fetching items for each category...');
    const itemsPromises = categories.map(category =>
      userAxios.getAllItemsByCategoryId(category.categoryID)  // Fetch items for each category
    );
    const itemsResponses = await Promise.all(itemsPromises);  // Wait for all items
    const categoriesWithItems = categories.map((category, index) => ({
      ...category,
      items: itemsResponses[index] || [],  // Attach fetched items to categories
    }));
    console.log('Items for categories fetched:', categoriesWithItems);

    // Fetch collections
    console.log('Fetching collections...');
    const collections = await userAxios.getAllCollectionsByToken();  // Fetch collections using token
    if (!collections) {
      console.error('Collections data fetch failed.');
    }
    console.log('Collections fetched:', collections);

    // Fetch user posts
    console.log('Fetching user posts...');
    const posts = await userAxios.viewUserPostsByToken();  // Fetch posts using token
    if (!posts) {
      console.error('Posts data fetch failed.');
      return null;
    }
    console.log('User posts fetched:', posts);

    // Fetch outfits data
    console.log('Fetching outfits data...');
    const outfits = await userAxios.getUserOutfits();  // Fetch outfits using token
    console.log('Outfits data fetched:', outfits);
    const structuredOutfits = outfits.map(outfit => ({
  id: outfit.outfitID.toString(),
  title: outfit.outfitName,
  items: (outfit.wardrobeitems || []).map(item => ({
    id: item.itemID?.toString() || 'unknown',
    itemName: item.itemName || 'Unnamed Item',
    image: item.imageURL || 'https://example.com/default-item.jpg',
  })),
}));

    console.log('Outfits data fetched:', structuredOutfits);

    // Group posts under their corresponding collections
    console.log('Grouping posts under collections...');
    const structuredPosts = collections.map(collection => {
      const collectionPosts = posts.filter(post => post.collectionID === collection.collectionID);
      return {
        id: collection.collectionID.toString(),
        title: collection.collectionName,
        items: collectionPosts.map(post => ({
          id: post.postID.toString(),
          caption: post.postContent,
          image: post.postImageURL,
          timestamp: post.createdAt,
          likes: post.likesCount,
          comments: post.commentsCount,
        })),
      };
    });
    console.log('Posts grouped by collections:', structuredPosts);

    // Format and return the structured user data
    const formattedUserData = {
      wardrobeID: wardrobeID,
      userId: userInfo.userID.toString(),
      username: userInfo.username,
      fullName: userInfo.fullName || 'No Name Provided',
      profilePicture: userInfo.profilePicture || 'https://example.com/default-profile.jpg',
      bio: userInfo.bio || 'No bio available',
      about: userInfo.bio || 'No information available',
      email: userInfo.email || 'No email available',
      phone: userInfo.phone || 'No phone number available',
      theme: userInfo.themePreference || 'light',
      location: userInfo.location || 'No location available',
      followers: userInfo.followersCount,
      following: userInfo.followingCount,
      components: {
        posts: structuredPosts,  // Grouped posts by collections
        wardrobe: categoriesWithItems.map(category => ({
          id: category.categoryID.toString(),
          title: category.categoryName,
          items: category.items.map(item => ({
            id: item.itemID.toString(),
            itemName: item.itemName,
            category: category.categoryName,
            color: item.color,
            brand: item.brand,
            material: item.material,
            season: item.season,
            image: item.imageURL,
            gender: item.gender,
            occasion: item.occasion || 'Not specified',
            price: item.price,
            essential: item.favorite,
          })),
        })),
        outfits: [
          {
            id: '1',  // Static parent component for outfits
            title: 'Outfits',
            items: structuredOutfits,
          },
        ],
        collections: []  // Keep collections empty for now
      },
    };

    console.log('Formatted user data:', formattedUserData);

    return formattedUserData;

  } catch (error) {
    console.error('Error during data formatting:', error);
    return null;
  }
};

export default createDummyUserData;
