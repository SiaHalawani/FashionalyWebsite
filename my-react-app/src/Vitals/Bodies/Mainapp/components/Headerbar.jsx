import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Compass, Wand2, User2, Layers,
  Store, Settings, MessagesSquare, Bell
} from 'lucide-react';
import containers from '../../../CSS/containers.module.css';
import { useNotifications } from '../../../contexts/NotificationContext';

export default function Headerbar() {
  const location = useLocation();
  const current = location.pathname.split("/")[2];
  const collapsedTabs = ["EditItem", "explore", "Messaging"];
  const isCollapsed = collapsedTabs.includes(current);

  const { notifications } = useNotifications();
  const hasUnread = notifications.some(n => !n.read);

  const linkClass = (path) =>
    `${containers.icon} icon ${current === path ? containers.activeIcon : ''}`;

  return (
    <header className={`${containers.headercontainer} ${isCollapsed ? "collapsed" : ""}`}>
      <div className='collapsing'>
        <h1 className={containers.fashonlyTitle}>Fashonly</h1>
      </div>

      <nav>
        <Link to="/Home/home" className={linkClass("home")}>
          <Home size={20} /><span className="collapsing">Home</span>
        </Link>
        <Link to="/Home/explore" className={linkClass("explore")}>
          <Compass size={20} /><span className="collapsing">Explore</span>
        </Link>
        <Link to="/Home/ai" className={linkClass("ai")}>
          <Wand2 size={20} /><span className="collapsing">Stylo AI</span>
        </Link>
        <Link to="/Home/profile" className={linkClass("profile")}>
          <User2 size={20} /><span className="collapsing">Profile</span>
        </Link>
        <Link to="/Home/EditItem" className={linkClass("EditItem")}>
          <Layers size={20} /><span className="collapsing">Items</span>
        </Link>
      </nav>

      <div className={containers.responsiveNav}>
        <Link to="/Home/Seller" className={linkClass("Seller")}>
          <Store size={20} /><span className="collapsing">Seller</span>
        </Link>
        <Link to="/Home/settings" className={linkClass("settings")}>
          <Settings size={20} /><span className="collapsing">Settings</span>
        </Link>

        <Link to="/Home/Notifications" className={linkClass("Notifications")}>
          <div className={containers.iconWrapper}>
            <Bell size={20} />
            {hasUnread && (
              <div style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '10px',
                height: '10px',
                backgroundColor: '#1e90ff',
                borderRadius: '50%',
                zIndex: 9999,
                border: '2px solid white',
                pointerEvents: 'none',
              }}></div>
            )}
          </div>
          <span className="collapsing">Notification</span>
        </Link>

        <Link to="/Home/Messaging" className={linkClass("Messaging")}>
          <MessagesSquare size={20} /><span className="collapsing">Chat</span>
        </Link>
      </div>
    </header>
  );
}
