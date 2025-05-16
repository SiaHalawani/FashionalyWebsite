import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeProvider, useTheme } from '../../contexts/themecontext';
import { SellerProvider } from '../../../BackendIntegration/SellerData/SellerDataManagement';
import Headerbar from './components/Headerbar';
import MainSeller from './routes/AppRoutes/MainSeller';
import Footer from './components/Footerbar';
import Settings from './routes/AppRoutes/Settings';
import Dashboard from './routes/AppRoutes/SellerDashboard';
import AddItems from './routes/AppRoutes/AddItems';
import SellerPosts from './routes/AppRoutes/SellerPosts';
import AdBudget from './routes/AppRoutes/AdBudget';
import phone from '../../CSS/phonenofooterbutsmallscreens.module.css';
import components from '../../CSS/components.module.css';
import { getUserById } from '../../../BackendIntegration/AxiosConnections/UserGetConnections/UserAxios';

export default function BodyHomeApp() {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const verifySeller = async () => {
      try {
        const freshUser = await getUserById(sellerId);
        console.log("🔍 Fetched user:", freshUser);

        if (freshUser?.seller === true) {
          console.log("✅ Verified seller:", freshUser.username);
          setCheckingAuth(false);
        } else {
          console.warn("🚫 User is not a seller.");
          navigate(`/not-a-seller/${sellerId}`);
        }
      } catch (err) {
        console.error("❌ Failed to fetch user:", err);
        navigate('/login');
      }
    };

    verifySeller();
  }, [navigate, sellerId]);

  if (checkingAuth) return null;

  return (
    <SellerProvider sellerId={sellerId}>
      <ThemeProvider>
        <ThemedLayout />
      </ThemeProvider>
    </SellerProvider>
  );
}

const handleCurrent = (current) => {
  switch (current) {
    case "dashboard":
      return <Dashboard />;
    case "addItems":
      return <AddItems />;
    case "managePosts":
      return <SellerPosts />;
    case "adBudget":
      return <AdBudget />;
    case "mainApp":
      return <MainSeller />;
    case "settings":
      return <Settings />;
    default:
      return <MainSeller />;
  }
};

function ThemedLayout() {
  const { theme } = useTheme();
  const [current, setCurrent] = useState("A");

  return (
    <div className={components.mainbg}>
      <div className={phone.phone} data-theme={theme}>
        <div className={phone.pos_top}>
          <Headerbar setCurrent={setCurrent} />
        </div>
        <div className={phone.pos_mid1}>
          {handleCurrent(current)}
        </div>
        <div className={phone.pos_bottom}>
          <Footer setCurrent={setCurrent} />
        </div>
      </div>
    </div>
  );
}
