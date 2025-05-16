import axios from 'axios';

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5005/api/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const getUserById = async (userID) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:5005/api/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
};

//////////////////////////follow logic


// UserAxios.js

export const followUser = async (followerID, followingID) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      'http://localhost:5005/api/followers',
      { followerID, followingID },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error following user:', error);
    return null;
  }
};

// Get a list of users that the current user is following
export const getFollowingList = async (userId) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token here
    const response = await axios.get(`http://localhost:5005/api/followers/${userId}/following`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // This is the JSON array of followings
  } catch (error) {
    console.error('Error fetching followings:', error);
    return null; // Return null if there's an error
  }
};

// Get a list of followers for a specific user
export const getFollowersList = async (userId) => {
  try {
    const token = localStorage.getItem('token');  // Retrieve token here
    const response = await axios.get(`http://localhost:5005/api/followers/${userId}/followers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // This is the JSON array of followers
  } catch (error) {
    console.error('Error fetching followers:', error);
    return null; // Return null if there's an error
  }
};


export const removeFollower = async (followerID, followingID) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete('http://localhost:5005/api/followers', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        followerID,
        followingID,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error removing follower:', error);
    return null; // Return null if there's an error
  }
};

// Remove a following (unfollow)
export const removeFollowing = async (followerID, followingID) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete('http://localhost:5005/api/followers/remove-following', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        followerID,
        followingID,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error removing following:', error);
    return null; // Return null if there's an error
  }
};


export const getSuggestedUsers = async (userId) => {
  try {
    const token = localStorage.getItem('token');  // Get the authentication token
    const response = await axios.get(`http://localhost:5005/api/followers/${userId}/suggested`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Attach token for authentication
      },
    });
    return response.data;  // Return the suggested users array
  } catch (error) {
    console.error('Error fetching suggested users:', error);
    return [];  // Return an empty array in case of an error
  }
};