

import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import BodyOpening from './Vitals/Bodies/BodyOpening';
import BodyShowcase from './Vitals/Bodies/ShowcaseWeel/BodyShowcase';
import BodyLanding from './Vitals/Bodies/ShowcaseWeel/BodyLanding';
import BodyHomeApp from './Vitals/Bodies/Mainapp/BodyHomeApp';
import BodySellerApp from './Vitals/Bodies/Sellerapp/BodySellerApp';
import Login from './Vitals/Bodies/Authentication/Login';
import Signup from './Vitals/Bodies/Authentication/Signup';
import ItemDetailsPage from './Vitals/Bodies/Mainapp/components/ItemDetailsPage';
import Messaging from './Vitals/Bodies/Chatappsss/Chatapp';
import SellerLinkPage from './Vitals/Bodies/LinkPages/SellerLinkPage/SellerLinkPage';
import AdLinkPage from './Vitals/Bodies/LinkPages/AdLinkPage/AdLinkPage';
import UserLinkPage from './Vitals/Bodies/LinkPages/UserLinkPage/UserLinkPage';
import SellerItem from './Vitals/Bodies/LinkPages/ItemDisplay/SellerItem';
import ItemLinkPage from './Vitals/Bodies/LinkPages/UserItemPage/ItemLinkPage';
import PostLinkPage from './Vitals/Bodies/LinkPages/PostLinkPage/PostLinkPage';
import JoinSellerForm from './Vitals/Bodies/Sellerapp/routes/AppRoutes/JoinSellerForm';
import FollowerList from './Vitals/Bodies/Mainapp/routes/MainComponents/User/UserComps/FollowerList';
import FollowingList from './Vitals/Bodies/Mainapp/routes/MainComponents/User/UserComps/FollowingList';





import Main from './Vitals/Bodies/Mainapp/routes/AppRoutes/Main';
import User from './Vitals/Bodies/Mainapp/routes/AppRoutes/User/User';
import AI from './Vitals/Bodies/Mainapp/routes/AppRoutes/AI';
import Explore from './Vitals/Bodies/Mainapp/routes/AppRoutes/Explore';
import Wardrobe from './Vitals/Bodies/Mainapp/routes/AppRoutes/Wardrobe';
import Collection from './Vitals/Bodies/Mainapp/routes/AppRoutes/Collection';
import Post from './Vitals/Bodies/Mainapp/routes/AppRoutes/Post';
import Outfit from './Vitals/Bodies/Mainapp/routes/AppRoutes/Outfit';
import Settings from './Vitals/Bodies/Mainapp/routes/AppRoutes/Settings';
import Seller from './Vitals/Bodies/Mainapp/routes/AppRoutes/Seller';
import ItemEditor from './Vitals/Bodies/ItemEditor/ItemEditor';
import Notifications from './Vitals/Bodies/Mainapp/routes/AppRoutes/Notifications';


import { GlobalStateProvider } from './BackendIntegration/UserData/GeneralDataManagement';
import { WeatherProvider } from './API/WeatherContext';
import RouteTransition from './Vitals/Components/RouteTransition';
import ModalWrapper from './Vitals/contexts/ModalWrapper';
import { ThemeProvider } from './Vitals/contexts/themecontext';
import SuggestedSellerItems from './Vitals/Bodies/Mainapp/routes/MainComponents/AI/dummydata/SuggestedSelleritems';

import { NotificationProvider } from './Vitals/contexts/NotificationContext';

import ErrorBoundary from './Vitals/Components/ErrorBoundry';

export default function App() {
  const location = useLocation();
  const background = location.state?.background;
  const [showTransition, setShowTransition] = useState(true);

  useEffect(() => {
    setShowTransition(true);
    const timeout = setTimeout(() => setShowTransition(false), 1000);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <ErrorBoundary>
    <ThemeProvider>
        <NotificationProvider>
    <WeatherProvider>
      {showTransition && <RouteTransition />}

      <Routes location={background || location}>
        <Route path="/" element={<BodyOpening />} />
        <Route path="/Start" element={<BodyShowcase />} />
        <Route path="/Landing" element={<BodyLanding />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        

        <Route
          path="*"
          element={
            <GlobalStateProvider>
              <Routes>
<Route path="/Home/*" element={<BodyHomeApp />}>
  <Route index element={<Main />} />
  <Route path="home" element={<Main />} />
  <Route path="profile" element={<User />} />
  <Route path="ai" element={<AI />} />
  <Route path="explore" element={<Explore />} />
  <Route path="wardrobe" element={<Wardrobe />} />
  <Route path="collection" element={<Collection />} />
  <Route path="post" element={<Post />} />
  <Route path="outfit" element={<Outfit />} />
  <Route path="settings" element={<Settings />} />
  <Route path="Seller" element={<Seller />} />
  <Route path="Messaging" element={<Messaging />} />
  <Route path="EditItem" element={<ItemEditor />} />
  <Route path="Notifications" element={<Notifications />} />
  
</Route>

                <Route path="/seller/:sellerId" element={<BodySellerApp />} />
                <Route path="/item/:id" element={<ItemDetailsPage />} />
                <Route path="/Messaging" element={<Messaging />} />
                <Route path="/Fashop/Seller/:brand" element={<SellerLinkPage />} />
                <Route path="/Fashop/Ad/:sellerId/:postId" element={<AdLinkPage />} />
                <Route path="/Fashop/Item/:sellerId/:itemId" element={<SellerItem />} />
                <Route path="/Fashop/User/:userID" element={<UserLinkPage />} />
                <Route path="/Not-a-seller/:userID" element={<JoinSellerForm />} />
                <Route path="/self/Followers/:userId" element={<FollowerList />} />
                <Route path="/self/Following/:userId" element={<FollowingList />} />
                <Route path="/Fashop/UserItems/:itemId" element={<ItemLinkPage />} />
                <Route path="/Exploreselleritem" element={<SuggestedSellerItems />} />
              </Routes>
            </GlobalStateProvider>
          }
        />
      </Routes>

     {background && (
      <ThemeProvider>
  <ModalWrapper>
    <Routes>
  <Route
    path="/Fashop/Post/:postId"
    element={
      <GlobalStateProvider>
        <PostLinkPage />
      </GlobalStateProvider>
    }
  />
  <Route
    path="/Fashop/Ad/:sellerId/:postId"
    element={
      <GlobalStateProvider>
        <AdLinkPage />
      </GlobalStateProvider>
    }
  />
  <Route
    path="/Fashop/UserItems/:itemId"
    element={
      <GlobalStateProvider>
        <ItemLinkPage />
      </GlobalStateProvider>
    }
  />
  <Route
    path="/Fashop/Item/:sellerId/:itemId"
    element={
      <GlobalStateProvider>
        <SellerItem />
      </GlobalStateProvider>
    }
  />
</Routes>

  </ModalWrapper>
  </ThemeProvider>
)}

    </WeatherProvider>
    </NotificationProvider>
    </ThemeProvider>
    </ErrorBoundary>
  );
}
