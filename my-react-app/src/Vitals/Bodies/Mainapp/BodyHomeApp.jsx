// import { ThemeProvider, useTheme } from '../../contexts/themecontext';
// import Headerbar from './components/Headerbar';
// import Main from './routes/AppRoutes/Main';
// import User from './routes/AppRoutes/User/User';
// import AI from './routes/AppRoutes/AI';
// import Explore from './routes/AppRoutes/Explore';
// import Footer from './components/Footerbar';
// import { useState } from 'react';
// import collapsedphone from '../../CSS/collapsedphone.module.css';
// import phone from '../../CSS/phone.module.css';
// import components from '../../CSS/components.module.css';
// import { GlobalStateProvider } from '../../../BackendIntegration/UserData/GeneralDataManagement';
// import Wardrobe from './routes/AppRoutes/Wardrobe';
// import Collection from './routes/AppRoutes/Collection';
// import Post from './routes/AppRoutes/Post';
// import Outfit from './routes/AppRoutes/Outfit';
// import Settings from './routes/AppRoutes/Settings';
// import Seller from './routes/AppRoutes/Seller';
// import Chatapp from '../ChatAppsss/Chatapp';
// import ItemEditor from '../ItemEditor/ItemEditor';
// export default function BodyHomeApp() {
//   return (
//      <GlobalStateProvider>
//     <ThemeProvider>
//       <ThemedLayout />
//     </ThemeProvider>
//     </GlobalStateProvider>
//   );
// }


// const handleCurrent = (current) => {
//   switch (current) {
//     case "home":
//       return <Main />;
//     case "profile":
//       return <User />;
//     case "ai":
//       return <AI />;
//     case "wardrobe":
//       return <Wardrobe/>;
//     case "outfit":
//       return <Outfit/>;
//     case "collection":
//       return <Collection/>;
//     case "post":
//       return <Post/>;
//       case "explore":
//         return <Explore />;
//     case "settings":
//         return <Settings />;
//     case "about":
//       return <div>About</div>;
//     case "help":
//       return <div>Help</div>;
//     case "logout":
//       return <div>Logout</div>;
//     case "Seller":
//       return <Seller/>;
//     case "Messaging":
//       return <Chatapp />;
//     case "EditItem":
//       return <ItemEditor />;
//     default:
//       return <Main />;
//   }
// };


// function ThemedLayout() {
//   const { theme } = useTheme();
//   const [current, setCurrent] = useState("home");

//   const collapsedTabs = ["EditItem", "explore", 'Messaging'];
//   const isCollapsed = collapsedTabs.includes(current);

//   return (
//     <div className={components.mainbg}>
//       <div className={`${isCollapsed ? collapsedphone.phone : phone.phone}`} data-theme={theme}>
//         <div className={`${phone.pos_top} ${isCollapsed ? 'collapsed' : ''}`}>
//           <Headerbar setCurrent={setCurrent} current={current} />
//         </div>
//         <div className={phone.pos_mid1}>
//           {handleCurrent(current)}
//         </div>
//         <div className={phone.pos_bottom}>
//           <Footer setCurrent={setCurrent} />
//         </div>
//       </div>
//     </div>
//   );
// }
import { ThemeProvider, useTheme } from '../../contexts/themecontext';
import Headerbar from './components/Headerbar';
import Footer from './components/Footerbar';
import { Outlet, useLocation } from 'react-router-dom';

import collapsedphone from '../../CSS/collapsedphone.module.css';
import phone from '../../CSS/phone.module.css';
import components from '../../CSS/components.module.css';
import { GlobalStateProvider } from '../../../BackendIntegration/UserData/GeneralDataManagement';

export default function BodyHomeApp() {
  return (
    <GlobalStateProvider>
      <ThemeProvider>
        <ThemedLayout />
      </ThemeProvider>
    </GlobalStateProvider>
  );
}

function ThemedLayout() {
  const { theme } = useTheme();
  const location = useLocation();

  const collapsedTabs = ["EditItem", "explore", "Messaging"];
  const currentTab = location.pathname.split("/")[2]; // e.g. /Home/explore → "explore"
  const isCollapsed = collapsedTabs.includes(currentTab);

  return (
    <div className={components.mainbg}>
      <div
        className={`${isCollapsed ? collapsedphone.phone : phone.phone}`}
        data-theme={theme}
      >
        {/* Header (top section) */}
        <div className={`${phone.pos_top} ${isCollapsed ? 'collapsed' : ''}`}>
          <Headerbar />
        </div>

        {/* Main content (middle section) */}
        <div className={phone.pos_mid1}>
          <Outlet /> {/* This is where the page content loads based on route */}
        </div>

        {/* Footer (bottom section) */}
        <div className={phone.pos_bottom}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
