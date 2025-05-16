// import React, { useState } from 'react';
// import { useGlobalState } from '../../../../../BackendIntegration/UserData/GeneralDataManagement';
// import Userstyle from '../../../../CSS/User.module.css';
// import AddWardrobe from '../MainComponents/User/AddWardrobe';
// import ViewWardrobeItem from '../MainComponents/User/ViewWardrobeItem';

// const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// export default function Wardrobe() {
//   const { data, setData, profileData } = useGlobalState();
//   const [activeLinkIndex, setActiveLinkIndex] = useState(0);
//   const [currentAddPage, setCurrentAddPage] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const wardrobe = data?.wardrobe || [];
//   const activeLink = wardrobe?.[activeLinkIndex] || { items: [] };

//   const goBack = () => setCurrentAddPage(false);

//   const handleAddItem = (item) => {
//     const newData = deepClone(data);
//     newData.wardrobe[activeLinkIndex].items.push(item);
//     setData(newData);
//     setCurrentAddPage(false);
//   };

//   const handleDelete = (index) => {
//     if (wardrobe.length <= 1) return;
//     const newData = deepClone(data);
//     newData.wardrobe = newData.wardrobe.filter((_, i) => i !== index);
//     setData(newData);
//     setActiveLinkIndex(0);
//   };

//   if (currentAddPage) {
//     return (
//       <AddWardrobe
//         goBack={goBack}
//         onAddItem={handleAddItem}
//         category={activeLink.title?.toLowerCase() || 'misc'}
//         userData={{ ...profileData, components: data }}
//       />
//     );
//   }

//   if (selectedItem) {
//     return (
//       <ViewWardrobeItem
//         item={selectedItem}
//         goBack={() => setSelectedItem(null)}
//         onDelete={() => {
//           const newData = deepClone(data);
//           newData.wardrobe[activeLinkIndex].items = newData.wardrobe[activeLinkIndex].items.filter(
//             (item) => item.id !== selectedItem.id
//           );
//           setData(newData);
//           setSelectedItem(null);
//         }}
//         onUpdate={(updatedItem) => {
//           const newData = deepClone(data);
//           newData.wardrobe[activeLinkIndex].items = newData.wardrobe[activeLinkIndex].items.map((item) =>
//             item.id === selectedItem.id ? updatedItem : item
//           );
//           setData(newData);
//           setSelectedItem(updatedItem);
//         }}
//       />
//     );
//   }

//   return (
//     <div className={Userstyle.userContainer}>
//       <div className={Userstyle.userbodypage}>
//         <div className={Userstyle.navTabs}>
//           <div className={Userstyle.activeTab}>Wardrobe</div>
//         </div>

//         <div className={Userstyle.linksBar}>
//           {wardrobe.map((link, i) => (
//             <div
//               key={i}
//               onClick={() => setActiveLinkIndex(i)}
//               className={Userstyle.linkItem}
//               style={{ borderBottom: activeLinkIndex === i ? '2px solid #8b5cf6' : 'none' }}
//             >
//               <span>{link.title}</span>
//               {wardrobe.length > 1 && (
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDelete(i);
//                   }}
//                   className={Userstyle.deleteBtn}
//                 >
//                   ×
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>

//         <div className={Userstyle.tabContent}>
//           <div className={Userstyle.gridItems}>
//             {activeLink.items.map((item, index) => {
//               const image = item.image || item.preview || '/src/assets/fallback.png';
//               return (
//                 <div key={index} className={Userstyle.itemBox} onClick={() => setSelectedItem(item)}>
//                   <img src={image} alt={item.itemName} />
//                   <p className={Userstyle.itemLabel}><b>{item.itemName}</b></p>
//                   <p className={Userstyle.itemSub}>{item.category || item.brand || ''}</p>
//                 </div>
//               );
//             })}

//             <div className={Userstyle.itemBox} onClick={() => setCurrentAddPage(true)}>
//               <div className={Userstyle.addBtn}>+</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
export default function AdBudget() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Ad Budget</h1>
      <p>This is the Ad Budget page.</p>
      <p>Here you can manage your advertising budget.</p>
    </div>
  );
}