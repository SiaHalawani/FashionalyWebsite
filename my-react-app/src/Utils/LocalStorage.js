// utils/LocalStorage.js

export const setUserData = (userData) => {
    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
  };
  
  export const getUserData = () => {
    // Retrieve user data from localStorage
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : null;
  };
  