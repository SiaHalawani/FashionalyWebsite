import React, { useState } from 'react';
import { useGlobalState } from '../../../../../BackendIntegration/UserData/GeneralDataManagement';
import Userstyle from '../../../../CSS/User.module.css';
import AddPost from '../MainComponents/User/AddPost';
import AddWardrobe from '../MainComponents/User/AddWardrobe';
import AddOutfit from '../MainComponents/User/AddOutfit';
import AddCollection from '../MainComponents/User/AddCollection';
import ViewPost from '../MainComponents/User/ViewPost';
import ViewWardrobeItem from '../MainComponents/User/ViewWardrobeItem';
import ViewOutfitItem from '../MainComponents/User/ViewOutfitItem';
import ViewCollection from '../MainComponents/User/ViewCollection';
import EditProfile from '../MainComponents/User/EditProfile';

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export default function User() {
  const { data, setData, profileData, setProfileData } = useGlobalState();
  const [activeTab, setActiveTab] = useState('wardrobe');
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const [currentAddPage, setCurrentAddPage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);

  const currentCategory = data?.[activeTab] || [];
  const activeLink = currentCategory?.[activeLinkIndex] || { items: [] };

  const getTotalCount = (section) => {
    if (!data?.[section]) return 0;
    return data[section].reduce((acc, link) => acc + (link.items?.length || 0), 0);
  };

  const addItem = () => {
    if (!activeTab) return;
    setCurrentAddPage(activeTab);
  };

  const deleteLink = (index) => {
    if (currentCategory.length <= 1) return;
    const newData = deepClone(data);
    newData[activeTab] = newData[activeTab].filter((_, i) => i !== index);
    setData(newData);
    setActiveLinkIndex(0);
  };

  const renderAddPage = (Component) => (
    <Component
      goBack={() => setCurrentAddPage(null)}
      onAddItem={(item) => {
        const newData = deepClone(data);
        newData[activeTab][activeLinkIndex].items.push(item);
        setData(newData);
        setCurrentAddPage(null);
      }}
      userData={{ ...profileData, components: data }}
      category={activeLink.title?.toLowerCase() || 'misc'}
    />
  );

  // Dynamic add page handler
  if (currentAddPage === 'posts') return renderAddPage(AddPost);
  if (currentAddPage === 'wardrobe') return renderAddPage(AddWardrobe);
  if (currentAddPage === 'outfits') return renderAddPage(AddOutfit);
  if (currentAddPage === 'collections') return renderAddPage(AddCollection);

  // Item Viewer
  if (selectedItem) {
    const commonProps = {
      item: selectedItem,
      goBack: () => setSelectedItem(null),
      onDelete: () => {
        const newData = deepClone(data);
        newData[activeTab][activeLinkIndex].items = newData[activeTab][activeLinkIndex].items.filter(
          (item) => item.id !== selectedItem.id
        );
        setData(newData);
        setSelectedItem(null);
      },
      onUpdate: (updatedItem) => {
        const newData = deepClone(data);
        newData[activeTab][activeLinkIndex].items = newData[activeTab][activeLinkIndex].items.map((item) =>
          item.id === selectedItem.id ? updatedItem : item
        );
        setData(newData);
        setSelectedItem(updatedItem);
      }
    };

    if (activeTab === 'posts') return <ViewPost {...commonProps} />;
    if (activeTab === 'wardrobe') return <ViewWardrobeItem {...commonProps} />;
    if (activeTab === 'outfits') return <ViewOutfitItem {...commonProps} />;
    if (activeTab === 'collections') return <ViewCollection {...commonProps} />;
  }

  // Profile Editor
  if (editingProfile) {
    return (
      <EditProfile
        user={profileData}
        onCancel={() => setEditingProfile(false)}
        onSave={(updated) => {
          setProfileData(updated);
          setEditingProfile(false);
        }}
      />
    );
  }

  return (
    <div className={Userstyle.userContainer}>
      <div className={Userstyle.userheadpage}>
        <div className={Userstyle.profileTop}>
          <div className={Userstyle.profilePicContainer}>
            <img src={profileData.profilePicture} alt="Profile" className={Userstyle.profilePic} />
            <button className={Userstyle.editBtn} onClick={() => setEditingProfile(true)}>Edit</button>
          </div>
         <div className={Userstyle.profileStats}>
  <p className={Userstyle.username}><b>{profileData.fullName || profileData.username}</b></p>
  <p className={Userstyle.userbio}>{profileData.bio || 'No bio yet'}</p>
  <p className={Userstyle.userbio}><i>{profileData.about || ''}</i></p>

  <div className={Userstyle.userinfo}>
    <p><strong>Email:</strong> {profileData.email}</p>
    <p><strong>Phone:</strong> {profileData.phone || 'Not provided'}</p>
    <p><strong>Location:</strong> {profileData.location || 'Not specified'}</p>
    <p><strong>Theme:</strong> {profileData.themePreference}</p>
    <p><strong>Join Date:</strong> {new Date(profileData.joinDate).toLocaleDateString()}</p>
  </div>

  <p className={Userstyle.userinfo}>
    Posts: {getTotalCount('posts')} | Wardrobe: {getTotalCount('wardrobe')} | Outfits: {getTotalCount('outfits')} | Collections: {getTotalCount('collections')}
  </p>
</div>

          <div className={Userstyle.followStats}>
            <div><p><b>{(profileData.followers / 1000).toFixed(1)}K</b></p><p>Followers</p></div>
            <div><p><b>{profileData.following.toLocaleString()}</b></p><p>Following</p></div>
          </div>
        </div>
      </div>

      <div className={Userstyle.userbodypage}>
        <div className={Userstyle.navTabs}>
          {['posts', 'wardrobe', 'outfits', 'collections'].map((section) => (
            <div
              key={section}
              onClick={() => {
                setActiveTab(section);
                setActiveLinkIndex(0);
              }}
              className={activeTab === section ? Userstyle.activeTab : Userstyle.tabItem}
            >
              {getTotalCount(section)} {section.charAt(0).toUpperCase() + section.slice(1)}
            </div>
          ))}
        </div>

        <div className={Userstyle.linksBar}>
          {currentCategory.map((link, i) => (
            <div
              key={`${link.title}-${i}`}
              onClick={() => setActiveLinkIndex(i)}
              className={Userstyle.linkItem}
              style={{ borderBottom: activeLinkIndex === i ? '2px solid #8b5cf6' : 'none' }}
            >
              <span>{link.title}</span>
              {currentCategory.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteLink(i);
                  }}
                  className={Userstyle.deleteBtn}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <div className={Userstyle.tabContent}>
          <div className={Userstyle.gridItems}>
            {activeLink.items.map((item, index) => {
              const image = item.image || item.preview || '/src/assets/fallback.png';
              let title = item.title || item.caption || item.itemName || '';
              let subtitle = item.category || item.brand || '';

              return (
                <div key={index} className={Userstyle.itemBox} onClick={() => setSelectedItem(item)}>
                  <img src={image} alt={title} />
                  <p className={Userstyle.itemLabel}><b>{title}</b></p>
                  <p className={Userstyle.itemSub}>{subtitle}</p>
                </div>
              );
            })}

            <div className={Userstyle.itemBox} onClick={addItem}>
              <div className={Userstyle.addBtn}>+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
