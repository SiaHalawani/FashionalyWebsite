import axios from 'axios';
/*
Instructioon: I wanna fill these in my data of the generaldatamanagement, lets create a file that creates a const that is all the structured data of this user, the datastructure that we want in the end is as follows: 
export const dummyUsers = [
    {
      userId: 'user1',
      username: 'davidkharrat',
      fullName: 'David Kharrat',
      profilePicture: 'https://example.com/profile.jpg',
      bio: 'Creative developer blending AI + fashion.',
      about: 'Building AI-integrated lifestyle apps.',
      location: 'Beirut, Lebanon',
      followers: 10000,
      following: 500,
      components: {
        posts: [
          {
            id: 1,
            title: 'Travel Moments',
            items: [
              {
                id: 'p1',
                caption: 'Sunset at the beach 🌅',
                image: 'https://example.com/post1.jpg',
                timestamp: '2025-04-01T18:00:00Z',
                likes: 120,
                comments: 14,
              },
            ],
          },
        ],
        wardrobe: [
          {
            id: 1,
            title: 'Hats',
            items: [
              {
                id: 'h1',
                itemName: 'Classic Baseball Cap',
                category: 'hats',
                color: 'black',
                brand: 'New Era',
                material: 'cotton',
                season: 'all',
                image: 'https://example.com/hat1.jpg',
                gender: 'unisex',
                occasion: 'casual',
                price: 35,
                essential: true,
              },
            ],
          },
        ],
        outfits: [
          {
            id: 1,
            title: 'Casual Friday',
            wardrobeItems: ['h1'],
            items: [
              { id: 'h1', itemName: 'Classic Baseball Cap', image: 'https://example.com/hat1.jpg' },
            ],
          },
        ],
        collections: [
          {
            id: 1,
            title: 'Spring Styles',
            category: 'spring',
            image: 'https://example.com/collection1.jpg',
            author: 'David Kharrat',
            styleTag: ['casual'],
            outfits: [1],
            items: [
              { id: 1, title: 'Casual Friday', preview: 'https://example.com/collection-preview.jpg' },
            ],
          },
        ],
      },
    },
  ];
to achieve this, we will need to use the functions 
below , note:
warobreID is unique for each user, he gets only 1,
in wardrobe, we have getAllCategoriesByWardrobeId, and each category we have items, like stated below
Similar to categories, we have collections, and each collection has posts as shown below.
My database is a little complicated, so these are the things that we will have to work with, i know thyey might seem jaggy but they havce all the info needed to be extracted for the formatting of the dummyusers above, make a file that uses the below functions to farmat dummyusers, dummyusers has to have the namings that it currently has, fill it all, keep outfits and collections in the dummyusers empty for now 

*/
// Define the base URL for API requests
const api = axios.create({
  baseURL: 'http://localhost:5005', // Change to your backend URL
  headers: {
    'Content-Type': 'application/json', // Assuming the server expects JSON data
  }
});

// Function to get the current user's information 

export const getMyInfo = async () => {      
  try {
    const token = localStorage.getItem('token'); // Get the token from localStorage (if any)
    
    // Make sure there's a token available
    if (!token) {
      console.warn('No token found, skipping request.');
      return null;
    }

    // Make the request to the backend using the token for authorization
    const response = await api.get('/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}` // Attach the token in the Authorization header
      }
    });

    // Return the fetched data
    if (response.status === 200) {
      return response.data; // The user data will be inside the `data` field
    } else {
      console.error('Error fetching user info, status:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null; // If there's an error, return null
  }
  //output/////////////////
   // {
    //     "userID": 1,
    //     "username": "Sia",
    //     "email": "sia@test.com",
    //     "fullName": null,
    //     "phone": null,
    //     "location": null,
    //     "themePreference": "system",
    //     "joinDate": "2025-05-09T03:54:28.036Z",
    //     "profilePicture": null,
    //     "bio": null,
    //     "followersCount": 0,
    //     "followingCount": 2,
    //     "postsCount": 0,
    //     "collectionCount": 0,
    //     "itemsCount": 0,
    //     "outfitCount": 0,
    //     "seller": true,
    //     "verified": true,
    //     "createdAt": "2025-05-09T03:54:24.085Z",
    //     "updatedAt": "2025-05-09T04:06:02.707Z"
    //   }
//////////////////
};
export const getWardrobe = async (userID) => {
    console.log("Fetching wardrobe for userID:", userID); // Log the userID being fetched
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage (if any)
  
      // Make sure there's a token available
      if (!token) {
        console.warn('No token found, skipping request.');
        return null;
      }
  
      // Make the request to the backend using the token for authorization
      const response = await api.get(`/api/wardrobe/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}` // Attach the token in the Authorization header
        }
      });
  
      // Return the fetched data
      if (response.status === 200) {
        return response.data; // The wardrobe data will be inside the `data` field
      } else {
        console.error('Error fetching wardrobe info, status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching wardrobe info:', error);
      return null; // If there's an error, return null
    }
    //output/////////////////
    // {
    //     "wardrobeID": 2,
    //     "userID": 1,
    //     "createdAt": "2025-05-09T04:10:31.069Z",
    //     "updatedAt": "2025-05-09T04:10:31.069Z"
    // }
    //   
  };
  

  export const getAllCategoriesByWardrobeId = async (wardrobeID) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage (if any)
  
      // Make sure there's a token available
      if (!token) {
        console.warn('No token found, skipping request.');
        return null;
      }
  
      // Make the request to the backend using the token for authorization
      const response = await api.get(`/api/categories/wardrobe/${wardrobeID}`, {
        headers: {
          Authorization: `Bearer ${token}` // Attach the token in the Authorization header
        }
      });
  
      // Return the fetched data
      if (response.status === 200) {
        return response.data; // The categories data will be inside the `data` field
      } else {
        console.error('Error fetching categories info, status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching categories info:', error);
      return null; // If there's an error, return null
    }
    //output/////////////////
    // [
    //     {
    //         "categoryID": 1,
    //         "categoryName": "Hats",
    //         "wardrobeID": 2,
    //         "createdAt": "2025-05-09T04:12:24.004Z",
    //         "updatedAt": "2025-05-09T04:12:24.004Z"
    //     }
    // ]
  };

  // Function to get all items by categoryID
export const getAllItemsByCategoryId = async (categoryID) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage (if any)
  
      // Make sure there's a token available
      if (!token) {
        console.warn('No token found, skipping request.');
        return null;
      }
  
      // Make the request to the backend using the token for authorization
      const response = await api.get(`/api/wardrobe-items/category/${categoryID}`, {
        headers: {
          Authorization: `Bearer ${token}` // Attach the token in the Authorization header
        }
      });
  
      // Return the fetched data
      if (response.status === 200) {
        return response.data; // The items data will be inside the `data` field
      } else {
        console.error('Error fetching items info, status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching items info:', error);
      return null; // If there's an error, return null
    }
    //output/////////////////
    // [
    //     {
    //         "itemID": 4,
    //         "itemName": "Nike Air Max 90",
    //         "imageURL": "https://example.com/airmax90.jpg",
    //         "color": "White/Red",
    //         "material": "Mesh & Leather",
    //         "season": "Summer",
    //         "temperatureRange": null,
    //         "brand": "Nike",
    //         "occasion": null,
    //         "gender": "unisex",
    //         "type": "Sneakers",
    //         "price": "120.00",
    //         "favorite": true,
    //         "visibility": "public",
    //         "categoryID": 1,
    //         "wardrobeID": 2,
    //         "userID": 1,
    //         "createdAt": "2025-05-09T04:19:16.802Z",
    //         "updatedAt": "2025-05-09T04:19:16.802Z"
    //     },
    //     {
    //         "itemID": 5,
    //         "itemName": "Adidas Ultraboost",
    //         "imageURL": "https://example.com/ultraboost.jpg",
    //         "color": "Black",
    //         "material": "Knit",
    //         "season": "Spring",
    //         "temperatureRange": null,
    //         "brand": "Adidas",
    //         "occasion": null,
    //         "gender": "unisex",
    //         "type": "Running Shoes",
    //         "price": "140.00",
    //         "favorite": false,
    //         "visibility": "private",
    //         "categoryID": 1,
    //         "wardrobeID": 2,
    //         "userID": 1,
    //         "createdAt": "2025-05-09T04:19:16.802Z",
    //         "updatedAt": "2025-05-09T04:19:16.802Z"
    //     },
    //     {
    //         "itemID": 6,
    //         "itemName": "New Balance 550",
    //         "imageURL": "https://example.com/nb550.jpg",
    //         "color": "Grey/White",
    //         "material": "Leather",
    //         "season": "Autumn",
    //         "temperatureRange": null,
    //         "brand": "New Balance",
    //         "occasion": null,
    //         "gender": "male",
    //         "type": "Sneakers",
    //         "price": "110.00",
    //         "favorite": true,
    //         "visibility": "public",
    //         "categoryID": 1,
    //         "wardrobeID": 2,
    //         "userID": 1,
    //         "createdAt": "2025-05-09T04:19:16.802Z",
    //         "updatedAt": "2025-05-09T04:19:16.802Z"
    //     }
    // ]
  };
  

  // Function to get all collections using the user's token
export const getAllCollectionsByToken = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage (if any)
  
      // Make sure there's a token available
      if (!token) {
        console.warn('No token found, skipping request.');
        return null;
      }
  
      // Make the request to the backend using the token for authorization
      const response = await api.get('/api/collections', {
        headers: {
          Authorization: `Bearer ${token}` // Attach the token in the Authorization header
        }
      });
  
      // Return the fetched data
      if (response.status === 200) {
        return response.data; // The collections data will be inside the `data` field
      } else {
        console.error('Error fetching collections info, status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching collections info:', error);
      return null; // If there's an error, return null
    }
    // [
    //     {
    //         "collectionID": 1,
    //         "collectionName": "Summer Fits",
    //         "userID": 1,
    //         "createdDate": "2025-05-09T04:22:12.591Z",
    //         "createdAt": "2025-05-09T04:22:12.592Z",
    //         "updatedAt": "2025-05-09T04:22:12.592Z",
    //         "outfits": []
    //     }
    // ]
  };


  // Function to get all posts by token
export const viewUserPostsByToken = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage (if any)
  
      // Make sure there's a token available
      if (!token) {
        console.warn('No token found, skipping request.');
        return null;
      }
  
      // Make the request to the backend using the token for authorization
      const response = await api.get('/api/posts/myPosts/me', {
        headers: {
          Authorization: `Bearer ${token}` // Attach the token in the Authorization header
        }
      });
  
      // Return the fetched data
      if (response.status === 200) {
        return response.data; // The posts data will be inside the `data` field
      } else {
        console.error('Error fetching posts info, status:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error fetching posts info:', error);
      return null; // If there's an error, return null
    }
    //output/////////////////
    // [
    //     {
    //         "postID": 4,
    //         "postContent": "Look 2",
    //         "likesCount": 0,
    //         "commentsCount": 0,
    //         "postImageURL": "https://example.com/look2.jpg",
    //         "postType": "private",
    //         "userID": 1,
    //         "collectionID": 1,
    //         "createdAt": "2025-05-09T04:22:36.562Z",
    //         "updatedAt": "2025-05-09T04:22:36.562Z",
    //         "user": {
    //             "userID": 1,
    //             "username": "Sia",
    //             "email": "sia@test.com",
    //             "passwordHash": "$2b$10$ZcRpOuzCiTtHaP5DVF9Zeuppq0.tuw5sEe8D0PmX1v1Z3sfhK.DY2",
    //             "fullName": null,
    //             "phone": null,
    //             "location": null,
    //             "themePreference": "system",
    //             "joinDate": "2025-05-09T03:54:28.036Z",
    //             "profilePicture": null,
    //             "bio": null,
    //             "followersCount": 0,
    //             "followingCount": 2,
    //             "postsCount": 0,
    //             "collectionCount": 0,
    //             "itemsCount": 0,
    //             "outfitCount": 0,
    //             "seller": true,
    //             "verified": true,
    //             "createdAt": "2025-05-09T03:54:24.085Z",
    //             "updatedAt": "2025-05-09T04:06:02.707Z"
    //         }
    //     },
      
    // ]
  };
  
  const getWardrobeID = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
  
      // Check if token exists
      if (!token) {
        console.error('No authentication token found.');
        return null;
      }
  
      // Make the GET request to the /api/wardrobe/all endpoint with the Bearer token
      const response = await axios.get('http://localhost:5005/api/wardrobe', {
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token in headers
        },
      });
  
      // Check if the response contains any wardrobe data
      if (response.data && response.data.length > 0) {
        // Return the wardrobeID of the first item in the array
        return response.data[0].wardrobeID;
      } else {
        console.warn('No wardrobes found in the response.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching wardrobe data:', error);
      return null;
    }
  };
  
   
export const getUserOutfits = async () => {
  const token = localStorage.getItem('token');
  console.log('Fetching user outfits with token:', token); // Log the token being used
  if (!token) {
    console.warn('No token found.');
    return null;
  }

  try {
    const response = await axios.get('http://localhost:5005/api/outfits', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user outfits:', error.response?.data || error.message);
    return null;
  }
};

  

export default {
  getMyInfo,
    getWardrobe,
    getAllCategoriesByWardrobeId,
    getAllItemsByCategoryId,
    getAllCollectionsByToken,
    viewUserPostsByToken,
    getWardrobeID,
    getUserOutfits
};
