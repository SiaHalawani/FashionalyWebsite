import axios from 'axios';

// Add Seller Item Group
export const addSellerItemGroup = async (sellerId, groupId, title) => {
  try {
    const response = await axios.post('http://localhost:5001/addSellerItemGroup', {
      sellerId,
      groupId,
      title
    });
    console.log('Item Group Added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding item group:', error);
    throw error;
  }
};

// Add Seller Item
export const addSellerItem = async (sellerId, groupId, itemId, itemData) => {
  try {
    const payload = {
      sellerId,
      groupId,
      itemId,
      itemData
    };
    console.log('[addSellerItem] 🔄 Sending payload:', payload);

    const response = await axios.post('http://localhost:5001/addSellerItem', payload);

    console.log('[addSellerItem] ✅ Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('[addSellerItem] ❌ Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};


// Add Seller Post Group
export const addSellerPostGroup = async (sellerId, postGroupId, title) => {
  // Inside addSellerPostGroup function, log the payload:
console.log('Request payload for adding post group:', { sellerId, postGroupId, title });

  try {
    const response = await axios.post('http://localhost:5001/addSellerPostGroup', {
      sellerId,
      postGroupId,
      title
    });
    console.log('Post Group Added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding post group:', error);
    throw error;
  }
};

// Add Seller Post
// Add Seller Post
export const addSellerPost = async (sellerId, postGroupId, postId, postData) => {
  try {
    console.log('[addSellerPost] 🔄 Sending payload:');
    console.log({
      sellerId,
      postGroupId,
      postId,
      postData
    });

    const response = await axios.post('http://localhost:5001/addSellerPost', {
      sellerId,
      postGroupId,
      postId,
      postData
    });

    console.log('[addSellerPost] ✅ Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('[addSellerPost] ❌ Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};


// Create Seller
export const createSeller = async (sellerId, data) => {
  try {
    const response = await axios.post('http://localhost:5001/createSeller', {
      sellerId,
      data
    });
    console.log('Seller Created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating seller:', error);
    throw error;
  }
};

export const createSellerAndUpdateUser = async (sellerId, sellerData, token) => {
  console.log("📤 Sending seller creation payload:", sellerId, sellerData);

  try {
    // Step 1: Create Seller
    const createResponse = await axios.post('http://localhost:5001/createSeller', {
      sellerId,
      data: sellerData
    });
    console.log('Seller Created:', createResponse.data);

    // Step 2: Update User seller flag to true
    const updateResponse = await axios.put(
      'http://localhost:5005/api/users/update',
      { seller: true },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log('User Seller Status Updated:', updateResponse.data);

    return { seller: createResponse.data, user: updateResponse.data };
  } catch (error) {
    console.error('Error in seller creation or user update:', error);
    throw error;
  }
};


// Get Seller Full (fetch details of a specific seller)
export const getSellerFull = async (sellerId) => {
  try {
    const response = await axios.get(`http://localhost:5001/getSellerFull/${sellerId}`);
    console.log('Fetched Seller Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching seller data:', error);
    throw error;
  }
};


/////////////////////Additional Functions

// Edit Seller Item
export const editSellerItem = async (sellerId, groupId, itemId, itemData) => {
  try {
    console.log('[editSellerItem] Payload:', { sellerId, groupId, itemId, itemData });

    const response = await axios.put('http://localhost:5001/editSellerItem', {
      sellerId,
      groupId,
      itemId,
      itemData
    });

    console.log('[editSellerItem] Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('[editSellerItem] Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
};


// Delete Seller Item
export const deleteSellerItem = async (sellerId, groupId, itemId) => {
  try {
    const response = await axios.delete(`http://localhost:5001/deleteSellerItem/${sellerId}/${groupId}/${itemId}`);
    console.log('Item Deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

// Edit Seller Post
export const editSellerPost = async (sellerId, postGroupId, postId, postData) => {
  try {
    console.log('[editSellerPost] Payload:', {
      sellerId,
      postGroupId,
      postId,
      postData
    });

    const response = await axios.put('http://localhost:5001/editSellerPost', {
      sellerId,
      postGroupId,
      postId,
      postData
    });

    console.log('[editSellerPost] Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('[editSellerPost] Error:', error.response?.data || error.message);
    throw error;
  }
};

// Delete Seller Post
export const deleteSellerPost = async (sellerId, postGroupId, postId) => {
  try {
    const response = await axios.delete(`http://localhost:5001/deleteSellerPost/${sellerId}/${postGroupId}/${postId}`);
    console.log('Post Deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

// Edit Seller Item Group
export const editSellerItemGroup = async (sellerId, groupId, newData) => {
  try {
    const response = await axios.put('http://localhost:5001/editSellerItemGroup', {
      sellerId,
      groupId,
      newData
    });
    console.log('Item Group Edited:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error editing item group:', error);
    throw error;
  }
};

// Delete Seller Item Group
export const deleteSellerItemGroup = async (sellerId, groupId) => {
  try {
    const response = await axios.delete(`http://localhost:5001/deleteSellerItemGroup/${sellerId}/${groupId}`);
    console.log('Item Group Deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting item group:', error);
    throw error;
  }
};

// Edit Seller Post Group
export const editSellerPostGroup = async (sellerId, postGroupId, newData) => {
  try {
    const response = await axios.put('http://localhost:5001/editSellerPostGroup', {
      sellerId,
      postGroupId,
      newData
    });
    console.log('Post Group Edited:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error editing post group:', error);
    throw error;
  }
};

// Delete Seller Post Group
export const deleteSellerPostGroup = async (sellerId, postGroupId) => {
  try {
    const response = await axios.delete(`http://localhost:5001/deleteSellerPostGroup/${sellerId}/${postGroupId}`);
    console.log('Post Group Deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting post group:', error);
    throw error;
  }
};
