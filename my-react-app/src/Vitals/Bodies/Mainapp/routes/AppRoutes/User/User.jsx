import React, { useState } from 'react';
import { useGlobalState } from '../../../../../../BackendIntegration/UserData/GeneralDataManagement';
import ProfileHeader from '../../MainComponents/User/UserComps/ProfileHeader';
import TabNavigation from '../../MainComponents/User/UserComps/TabNavigation';
import LinkBar from '../../MainComponents/User/UserComps/LinkBar';
import ViewItemPage from '../../MainComponents/User/UserComps/ViewItemPage';
import EditProfile from '../../MainComponents/User/UserComps/EditProfile';
import Userstyle from '../../../../../CSS/User.module.css';

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

export default function User() {
  const { data, setData, profileData, setProfileData } = useGlobalState();
  const [activeTab, setActiveTab] = useState('wardrobe');
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);

  const currentCategory = data?.[activeTab] || [];
  const activeLink = currentCategory?.[activeLinkIndex] || { items: [] };

  const getTotalCount = (section) => {
    if (!data?.[section]) return 0;
    return data[section].reduce((acc, link) => acc + (link.items?.length || 0), 0);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleGoBack = () => {
    setSelectedItem(null);
  };

  if (selectedItem) {
    return (
    <ViewItemPage
  currentViewPage={activeTab}
  selectedItem={selectedItem}
  setSelectedItem={setSelectedItem}
  data={data}
  setData={setData}
  activeTab={activeTab}
  activeLinkIndex={activeLinkIndex}
  profileData={profileData}
  renderViewPage={(Component, props) => <Component {...props} />}
/>

    );
  }

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
      <ProfileHeader
        profileData={profileData}
        setEditingProfile={setEditingProfile}
        getTotalCount={getTotalCount}
      />
      <div className={Userstyle.userbodypage}>
        <TabNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          getTotalCount={getTotalCount}
        />
       {(activeTab !== 'posts' && activeTab !== 'outfits') && (
  <LinkBar
    currentCategory={currentCategory}
    setActiveLinkIndex={setActiveLinkIndex}
    activeLinkIndex={activeLinkIndex}
    activeTab={activeTab}
  />
)}

        <div className={Userstyle.tabContent}>
          <div className={Userstyle.gridItems}>
            {activeLink.items?.map((item, index) => {
              const image = item.image || item.preview || '/src/assets/fallback.png';
              const title = item.title || item.caption || item.itemName || '';
              const subtitle = item.category || item.brand || '';

              return (
                <div
                  key={index}
                  className={Userstyle.itemBox}
                  onClick={() => handleItemClick(item)}
                >
                  <img src={image} alt={title} />
                  <p className={Userstyle.itemLabel}><b>{title}</b></p>
                  <p className={Userstyle.itemSub}>{subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
