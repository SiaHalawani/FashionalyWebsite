// import { useState } from 'react';
// import { FaTshirt, FaFolder, FaMale, FaPen } from 'react-icons/fa'; // Importing the icons
// import containers from '../../../CSS/containers.module.css';

// export default function Headerbar({ setCurrentSection }) {
//   const [activeLink, setActiveLink] = useState('wardrobe'); // Default to 'wardrobe'

//   const handleNavClick = (section) => {
//     setCurrentSection(section);  // Update current section in parent component
//     setActiveLink(section);  // Update the active link styling
//   };

//   return (
//     <header className={containers.headercontainer}>
//       <h4>ItemEditor</h4>

//       <div className={containers.responsiveNav}>
//         <div
//           className={`${containers.icon} icon ${activeLink === 'wardrobe' ? containers.activeLink : ''}`}
//           onClick={() => handleNavClick('wardrobe')}
//         >
//           <FaTshirt />
//           <span>Wardrobe</span>
//         </div>
// {/* Implement later
//         <div
//           className={`${containers.icon} icon ${activeLink === 'collection' ? containers.activeLink : ''}`}
//           onClick={() => handleNavClick('collection')}
//         >
//           <FaFolder />
//           <span>Collection</span>
//         </div> */}

//         <div
//           className={`${containers.icon} icon ${activeLink === 'outfit' ? containers.activeLink : ''}`}
//           onClick={() => handleNavClick('outfit')}
//         >
//           <FaMale />
//           <span>Outfit</span>
//         </div>

//         <div
//           className={`${containers.icon} icon ${activeLink === 'post' ? containers.activeLink : ''}`}
//           onClick={() => handleNavClick('post')}
//         >
//           <FaPen />
//           <span>Post</span>
//         </div>
//       </div>
//     </header>
//   );
// }



import { useState } from 'react';
import containers from '../../../CSS/containers.module.css';
import { Shirt, Folder, UserRound, PenLine } from 'lucide-react';

export default function Headerbar({ setCurrentSection }) {
  const [activeLink, setActiveLink] = useState('wardrobe');

  const handleNavClick = (section) => {
    setCurrentSection(section);
    setActiveLink(section);
  };

  const navItems = [
    { id: 'wardrobe', label: 'Wardrobe', icon: <Shirt size={18} /> },
    // { id: 'collection', label: 'Collection', icon: <Folder size={18} /> }, // Enable when needed
    { id: 'outfit', label: 'Outfit', icon: <UserRound size={18} /> },
    { id: 'post', label: 'Post', icon: <PenLine size={18} /> },
  ];

  return (
    <header className={containers.headercontainer}>
      <h4 className={containers.fashonlyTitle}>Item Editor</h4>

      <div className={containers.responsiveNav}>
        {navItems.map(({ id, label, icon }) => (
          <div
            key={id}
            onClick={() => handleNavClick(id)}
            className={`${containers.icon} ${activeLink === id ? containers.activeLink : ''}`}
          >
            {icon}
            <span>{label}</span>
          </div>
        ))}
      </div>
    </header>
  );
}
