// import React, { useState, useEffect } from 'react';
// import { useGlobalState } from '../../../../BackendIntegration/UserData/GeneralDataManagement';

// import Userstyle from '../../../CSS/User.module.css';
// import ViewPost from '../../Mainapp/routes/MainComponents/User/ViewPost';
// import AddPost from '../../Mainapp/routes/MainComponents/User/AddPost';




// const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// const Post = () => {
//   const { data, setData, profileData } = useGlobalState();
//   const [activeLinkIndex, setActiveLinkIndex] = useState(0);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [currentAddPage, setCurrentAddPage] = useState(false);

//   const items = data?.posts || [];
//   const activeLink = items?.[activeLinkIndex] || { items: [] };

//   const handleItemClick = (item) => {
//     setSelectedItem(item);
//   };

//   // Handle adding a new item (post)
//   const handleAddItem = (item) => {
//     const newData = deepClone(data);
//     newData.posts[activeLinkIndex].items.push(item);
//     setData(newData);
//     localStorage.setItem("data", JSON.stringify(newData));
//     setCurrentAddPage(false);
//   };

//   // Handle deleting an item (post)
//   const handleDeleteItem = (itemId) => {
//     const currentData = deepClone(data);
//     currentData.posts = currentData.posts.map((link) => {
//       link.items = link.items.filter((item) => item.id !== itemId);
//       return link;
//     });
//     setData(currentData);
//     localStorage.setItem("data", JSON.stringify(currentData));
//   };

//   // Handle updating an item (post)
//   const handleUpdateItem = (updatedPost) => {
//     const currentData = deepClone(data);
//     currentData.posts = currentData.posts.map((link) => {
//       link.items = link.items.map((item) =>
//         item.id === updatedPost.id ? updatedPost : item
//       );
//       return link;
//     });

//     setData(currentData);
//     localStorage.setItem("data", JSON.stringify(currentData));
//   };

//   useEffect(() => {
//     const storedData = localStorage.getItem("data");
//     if (storedData) {
//       setData(JSON.parse(storedData)); // Set initial data from localStorage
//     }
//   }, []);

//   // Go back to the item list from Add Item page
//   const goBack = () => setCurrentAddPage(false);

//   // Render AddItem page (AddPost)
//   const renderAddPage = () => {
//     return (
//       <AddPost
//         goBack={goBack}
//         onAddItem={handleAddItem}
//         category={activeLink.title?.toLowerCase() || 'misc'}
//         userData={{ ...profileData, components: data }}
//         activeLink={activeLink}
//       />
//     );
//   };

//   // If Add Item page is active, render the AddPost component
//   if (currentAddPage) {
//     return renderAddPage();
//   }

//   // If an item is selected, show the corresponding ViewPost page
//   if (selectedItem) {
//     const itemId = selectedItem.id;
//     return (
//       <ViewPost
//         itemId={itemId}
//         goBack={() => setSelectedItem(null)}
//         onDeleteItem={handleDeleteItem}
//         onUpdateItem={handleUpdateItem}
//       />
//     );
//   }

//   return (
//     <div className={Userstyle.userContainer}>
//       <div className={Userstyle.userbodypage}>
//         <div className={Userstyle.navTabs}>
//           <div className={Userstyle.activeTab}>Posts</div>
//         </div>

//         <div className={Userstyle.linksBar}>
//           {items.map((link, i) => (
//             <div
//               key={i}
//               onClick={() => setActiveLinkIndex(i)}
//               className={Userstyle.linkItem}
//               style={{ borderBottom: activeLinkIndex === i ? '2px solid #8b5cf6' : 'none' }}
//             >
//               <span>{link.title}</span>
//             </div>
//           ))}
//         </div>

//         <div className={Userstyle.tabContent}>
//           <div className={Userstyle.gridItems}>
//             {activeLink.items.map((item, index) => {
//               const image = item.image || '/src/assets/fallback.png';
//               return (
//                 <div key={index} className={Userstyle.itemBox} onClick={() => handleItemClick(item)}>
//                   <img src={image} alt={item.caption} />
//                   <p className={Userstyle.itemLabel}><b>{item.caption}</b></p>
//                   <p className={Userstyle.itemSub}>{item.likes} Likes &nbsp;&nbsp; {item.comments} Comments</p>
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
// };

// export default Post;
import React, { useState, useEffect } from 'react';
import { useGlobalState } from '../../../../BackendIntegration/UserData/GeneralDataManagement';

import Userstyle from '../../../CSS/User.module.css';
import ViewPost from '../../Mainapp/routes/MainComponents/User/ViewPost';
import AddPost from '../../Mainapp/routes/MainComponents/User/AddPost';

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const Post = () => {
  const { data, setData, profileData } = useGlobalState();
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentAddPage, setCurrentAddPage] = useState(false);

  const items = data?.posts || [];
  const activeLink = items?.[activeLinkIndex] || { items: [] };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleAddItem = (item) => {
    const newData = deepClone(data);
    newData.posts[activeLinkIndex].items.push(item);
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));
    setCurrentAddPage(false);
  };

  const handleDeleteItem = (itemId) => {
    const currentData = deepClone(data);
    currentData.posts = currentData.posts.map((link) => {
      link.items = link.items.filter((item) => item.id !== itemId);
      return link;
    });
    setData(currentData);
    localStorage.setItem("data", JSON.stringify(currentData));
  };

  const handleUpdateItem = (updatedPost) => {
    const currentData = deepClone(data);
    currentData.posts = currentData.posts.map((link) => {
      link.items = link.items.map((item) =>
        item.id === updatedPost.id ? updatedPost : item
      );
      return link;
    });

    setData(currentData);
    localStorage.setItem("data", JSON.stringify(currentData));
  };

  // useEffect(() => {
  //   const storedData = localStorage.getItem("data");
  //   if (storedData) {
  //     const parsedData = JSON.parse(storedData);
  //     const storedUserID = parsedData?.profileData?.userID;
  //     const currentUserID = profileData?.userID;

  //     if (storedUserID === currentUserID) {
  //       setData(parsedData);
  //     } else {
  //       localStorage.removeItem("data");
  //     }
  //   }
  // }, [profileData?.userID]);
  useEffect(() => {
    // clear any old data from localStorage when component mounts
    localStorage.removeItem("data");
  }, []);
  const goBack = () => setCurrentAddPage(false);

  const renderAddPage = () => {
    return (
      <AddPost
        goBack={goBack}
        onAddItem={handleAddItem}
        category={activeLink.title?.toLowerCase() || 'misc'}
        userData={{ ...profileData, components: data }}
        activeLink={activeLink}
      />
    );
  };

  if (currentAddPage) {
    return renderAddPage();
  }

  if (selectedItem) {
    const itemId = selectedItem.id;
    return (
      <ViewPost
        itemId={itemId}
        goBack={() => setSelectedItem(null)}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
      />
    );
  }

  return (
    <div className={Userstyle.userContainer}>
      <div className={Userstyle.userbodypage}>
        <div className={Userstyle.navTabs}>
          <div className={Userstyle.activeTab}>Posts</div>
        </div>

        {/* <div className={Userstyle.linksBar}>
          {items.map((link, i) => (
            <div
              key={i}
              onClick={() => setActiveLinkIndex(i)}
              className={Userstyle.linkItem}
              style={{ borderBottom: activeLinkIndex === i ? '2px solid #8b5cf6' : 'none' }}
            >
              <span>{link.title}</span>
            </div>
          ))}
        </div> */}

        <div className={Userstyle.tabContent}>
          <div className={Userstyle.gridItems}>
            {activeLink.items.map((item, index) => {
              const image = item.image || '/src/assets/fallback.png';
              return (
                <div key={index} className={Userstyle.itemBox} onClick={() => handleItemClick(item)}>
                  <img src={image} alt={item.caption} />
                  <p className={Userstyle.itemLabel}><b>{item.caption}</b></p>
                  <p className={Userstyle.itemSub}>{item.likes} Likes &nbsp;&nbsp; {item.comments} Comments</p>
                </div>
              );
            })}

            <div className={Userstyle.itemBox} onClick={() => setCurrentAddPage(true)}>
              <div className={Userstyle.addBtn}>+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
