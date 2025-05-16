import axios from 'axios';

// Define the base URL for API requests
const api = axios.create({
  baseURL: 'http://localhost:5005', // Change to your backend URL
  headers: {
    'Content-Type': 'application/json', // Assuming the server expects JSON data
  },
});

// Function to create a post
const createPost = async (collectionID, postContent, postImageURL, postType) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage (if any)

  if (!token) {
    console.warn('No token found, skipping request.');
    return null;
  }

  const postData = {
    collectionID,
    postContent,
    postImageURL,
    postType,
  };

  try {
    const response = await api.post('/api/posts', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Post created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
  }
};


// Function to update a post
// ✅ You're right — this version does NOT accept `postImageURL`.
// 🔧 FIX: Add `postImageURL` to the `updatedData` object

// ✅ Updated version:
const updatePost = async (postID, postContent, postType, postImageURL) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('No token found, skipping request.');
    return null;
  }

  const updatedData = {
    postContent,
    postType,
    postImageURL, // ✅ Include the image
  };

  try {
    const response = await api.patch(`/api/posts/${postID}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Post updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    return null;
  }
};

  
  // Function to delete a post
const deletePost = async (postID) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage (if any)
  
    if (!token) {
      console.warn('No token found, skipping request.');
      return null;
    }
  
    try {
      const response = await api.delete(`/api/posts/${postID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Post deleted successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  export { createPost, updatePost, deletePost };



// Function to fetch a post by postId
export const getPostById = async (postId) => {
  try {
    const response = await api.get(`/api/posts/${postId}`); // Send GET request to the specific post endpoint
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error; // Throw error so it can be handled where it's called
  }
};





// Create a new collection with the collectionName property
export const createCollection = async (collectionName) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage (if any)

  if (!token) {
    console.warn('No token found, skipping request.');
    return null;
  }

  const collectionData = {
    collectionName: collectionName, // Add the collectionName directly here
  };

  try {
    const response = await api.post('/api/collections', collectionData, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token for authentication
      },
    });
    console.log('Collection created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating collection:', error);
    throw error;
  }
};


// Update an existing collection with a new collectionName
export const updateCollection = async (collectionId, collectionName) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage (if any)
  
    if (!token) {
      console.warn('No token found, skipping request.');
      return null;
    }
  
    const updatedData = {
      collectionName: collectionName, // Update collection name
    };
  
    try {
      const response = await api.patch(`/api/collections/${collectionId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
      });
      console.log('Collection updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating collection:', error);
      throw error;
    }
  };

  
  // Delete a collection by its collectionId
export const deleteCollection = async (collectionId) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage (if any)
  
    if (!token) {
      console.warn('No token found, skipping request.');
      return null;
    }
  
    try {
      const response = await api.delete(`/api/collections/${collectionId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token for authentication
        },
      });
      console.log('Collection deleted successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting collection:', error);
      throw error;
    }
  };
  