import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaChartLine,
  FaPlus,
  FaBullhorn,
  FaNewspaper,
  FaCog,
  FaArrowLeft,
} from 'react-icons/fa';
import containers from '../../../CSS/containers.module.css';

export default function SellerHeaderbar({ setCurrent }) {
  const navigate = useNavigate();
  return (
    <header className={containers.headercontainer}>
      <div>
         <div className={`${containers.icon} icon`} onClick={() => navigate('/Home')}>
          <FaArrowLeft /><span>Return to App</span>
        </div>
        
      </div>
      <h4>Fashonly Seller Hub</h4>

      <nav>
        <div className={`${containers.icon} icon`} onClick={() => setCurrent?.("dashboard")}>
          <FaChartLine /><span>Dashboard</span>
        </div>
        <div className={`${containers.icon} icon`} onClick={() => setCurrent?.("addItems")}>
          <FaPlus /><span>Add Items</span>
        </div>
        <div className={`${containers.icon} icon`} onClick={() => setCurrent?.("managePosts")}>
          <FaNewspaper /><span>Posts</span>
        </div>
        <div className={`${containers.icon} icon`} onClick={() => setCurrent?.("adBudget")}>
          <FaBullhorn /><span>Ad Budget</span>
        </div>
      </nav>

      <div>
       
        <div className={`${containers.icon} icon`} onClick={() => setCurrent?.("settings")}>
          <FaCog /><span>Settings</span>
         
        </div>
       
      </div>
    </header>
  );
}
