// BackendIntegration/UserData/fillMissingData.js

import { dummyUsers } from './UserDummyDatatest';  // Import the dummy users

// Function to fill missing data for posts, wardrobe, outfits, and collections
export const fillMissingData = (userData) => {
  console.log('Filling missing data for userData:', userData); // Log before modification

  // Use the first dummy user's data as fallback
  const defaultData = dummyUsers[0].components;

  return {
    ...userData,
    components: {
      posts: userData.components?.posts?.length ? userData.components.posts : defaultData.posts,
      wardrobe: userData.components?.wardrobe?.length ? userData.components.wardrobe : defaultData.wardrobe,
      outfits: userData.components?.outfits?.length ? userData.components.outfits : defaultData.outfits,
      collections: userData.components?.collections?.length ? userData.components.collections : defaultData.collections,
    }
  };
};
