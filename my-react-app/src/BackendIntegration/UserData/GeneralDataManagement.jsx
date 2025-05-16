import React, { createContext, useContext, useState, useEffect } from 'react';
import createDummyUserData from './dataManager';
import LoadingScreen from '../../Vitals/Components/LoadingScreen';
import { ThemeProvider } from '../../Vitals/contexts/themecontext'; // ✅ Correct ThemeProvider import
import ErrorPage from '../../Vitals/Components/ErrorPage';
// const GlobalStateContext = createContext();

// export const GlobalStateProvider = ({ children }) => {
  
//   const [data, setData] = useState(null);
//   const [profileData, setProfileData] = useState({});
//   const [loading, setLoading] = useState(true);

//   const loadUserData = async () => {
//     const userData = await createDummyUserData();
//     console.log('Fetched and formatted User Data:', userData);
//     setData(userData.components);
//     setProfileData(userData);
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadUserData();
//   }, []);

//   if (loading) return <LoadingScreen />;

//   return (
//     <GlobalStateContext.Provider
//       value={{
//         data,
//         setData,
//         profileData,
//         setProfileData,
//         refreshUserData: loadUserData
//       }}
//     >
//       <ThemeProvider initialTheme={profileData.theme}>
//         {children}
//       </ThemeProvider>
//     </GlobalStateContext.Provider>
//   );
// };

// export const useGlobalState = () => useContext(GlobalStateContext);

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // ✅ Error state

  const loadUserData = async () => {
    try {
      const userData = await createDummyUserData();
      console.log('Fetched and formatted User Data:', userData);
      setData(userData.components);
      setProfileData(userData);
    } catch (err) {
      console.error("❌ Failed to load user data:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorPage />; // ✅ Error page fallback

  return (
    <GlobalStateContext.Provider
      value={{
        data,
        setData,
        profileData,
        setProfileData,
        refreshUserData: loadUserData,
      }}
    >
      <ThemeProvider initialTheme={profileData.theme}>
        {children}
      </ThemeProvider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);