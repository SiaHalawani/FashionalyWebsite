import { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from '../../contexts/themecontext';
import Headerbar from './components/Headerbar';
import Footer from './components/Footerbar';
import MessagingInterface from './Messaging/messaging';
import phone from '../../CSS/phonenofooterchat.module.css';
import components from '../../CSS/components.module.css';
import { useGlobalState } from '../../../BackendIntegration/UserData/GeneralDataManagement'; // Import the global state

export default function BodyHomeApp() {
  return (
    <ThemeProvider>
      <ThemedLayout />
    </ThemeProvider>
  );
}

function ThemedLayout() {
  const { theme } = useTheme();  // Using useTheme hook to get the current theme
  const { profileData } = useGlobalState(); // Get profileData from global state
  const [currentUserId, setCurrentUserId] = useState(null);  // Start with null as default user ID
  const [chatWithId, setChatWithId] = useState('2');  // Default recipient

  useEffect(() => {
   
      console.log("Profile data loaded:", profileData.userId);
      setCurrentUserId(profileData.userId.toString());



      console.log("Current profileData:", profileData);

    
  }, [profileData]); // Run when profileData is updated

  
  if (!currentUserId) {
    return <div>Loading...</div>;  // Show loading indicator until currentUserId is set
  }
  return (
    <div className={components.mainbg}>
      <div className={phone.phone} data-theme={theme}>
        <div className={phone.pos_top}>
        <Headerbar currentUser={profileData}
        setCurrentUserId={setCurrentUserId} 
            setChatWithId={setChatWithId} 
            userId={currentUserId} 
        />

        </div>

        <div className={phone.pos_mid1}>
          <MessagingInterface 
            userId={currentUserId} 
            chatWithId={chatWithId}
currentUser={profileData}
          />
        </div>

        <div className={phone.pos_bottom}>
          <Footer 
            setCurrentUserId={setCurrentUserId} 
            setChatWithId={setChatWithId} 
            userId={currentUserId} 
          />
        </div>
      </div>
    </div>
  );
}
