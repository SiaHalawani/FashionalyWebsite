import React from 'react';
import containers from '../../../CSS/containers.module.css';
import { FaChartLine, FaPlus, FaNewspaper, FaBullhorn} from 'react-icons/fa';



export default function Footer({ setCurrent }) {
  return (
    <footer className={containers.footercontainer}>
      {/* === Desktop view === */}
      <div className={containers.desktopOnly}></div>

      {/* === Mobile Nav View === */}
      <nav className={containers.mobileOnly}>
    
       <div className="icon" onClick={() => setCurrent?.("dashboard")}>
               <FaChartLine />
             </div>
             <div className="icon" onClick={() => setCurrent?.("addItems")}>
               <FaPlus />
             </div>
             <div className="icon" onClick={() => setCurrent?.("managePosts")}>
               <FaNewspaper />
             </div>
             <div className="icon" onClick={() => setCurrent?.("adBudget")}>
               <FaBullhorn />
             </div>
      </nav>
    </footer>
  );
}
