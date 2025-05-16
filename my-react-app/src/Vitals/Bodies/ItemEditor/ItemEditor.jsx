import { useState } from 'react';
import { useTheme } from '../../contexts/themecontext'; // For theme context
import Headerbar from './components/Headerbar'; // Ensure Headerbar is imported correctly
import Footer from './components/Footerbar'; // Ensure Footer is imported correctly
import Wardrobe from './Items/Wardrobe';  // Example route, update with your actual path
import Collection from './Items/Collection'; // Example route, update with your actual path
import Outfit from './Items/Outfit'; // Example route, update with your actual path
import Post from './Items/Post'; // Example route, update with your actual path
import phone from '../../CSS/phonenofooter.module.css'; // Ensure the correct path to phone styles
import components from '../../CSS/components.module.css'; // Ensure this is the right path

export default function BodyHomeApp() {
  return (
    <div className={components.mainbg}>
      <ThemedLayout />
    </div>
  );
}

function ThemedLayout() {
  const { theme } = useTheme();  // Using useTheme hook to get the current theme
  const [currentSection, setCurrentSection] = useState('wardrobe'); // Default section is 'wardrobe'

  // Function to render content based on the current section
  const renderContent = () => {
    switch (currentSection) {
      case 'wardrobe':
        return <Wardrobe/>; // Replace with actual Wardrobe component
      case 'collection':
        return <Collection/>; // Replace with actual Collection component
      case 'outfit':
        return <Outfit/>; // Replace with actual Outfit component
      case 'post':
        return <Post/>; // Replace with actual Post component
      default:
        return <Wardrobe/>; // Fallback to Wardrobe if no match
    }
  };

  return (
    <div className={phone.phone} data-theme={theme}>
      {/* Header Section */}
      <div className={phone.pos_top}>
        <Headerbar setCurrentSection={setCurrentSection} />
      </div>

      {/* Main Content Section */}
      <div className={phone.pos_mid1}>
        {renderContent()}
      </div>

      {/* Footer Section */}
      <div className={phone.pos_bottom}>
        <Footer />
      </div>
    </div>
  );
}
