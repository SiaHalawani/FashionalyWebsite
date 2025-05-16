import React, { useEffect, useState } from 'react';
import { useGlobalState } from '../../../../BackendIntegration/UserData/GeneralDataManagement';
import { getUserOutfits } from '../../../../BackendIntegration/UserData/UserAxios';
import AddOutfit from '../../Mainapp/routes/MainComponents/User/AddOutfit';
import ViewOutfitItem from '../../Mainapp/routes/MainComponents/User/ViewOutfitItem';
import Userstyle from '../../../CSS/User.module.css';

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const Outfit = () => {
  const { profileData } = useGlobalState();
  const [outfits, setOutfits] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentAddPage, setCurrentAddPage] = useState(false);

  // Load outfits on mount
  useEffect(() => {
    const fetchOutfits = async () => {
      const result = await getUserOutfits();
      if (result) setOutfits(result);
    };
    fetchOutfits();
  }, []);

  const handleAddItem = (newOutfit) => {
    setOutfits(prev => [...prev, newOutfit]);
    setCurrentAddPage(false);
  };

  const handleDeleteItem = (outfitID) => {
    
    setOutfits(prev => prev.filter(item => item.outfitID !== outfitID));
    setSelectedItem(null);
  };

  const handleUpdateItem = (updatedOutfit) => {
    setOutfits(prev =>
      prev.map(item =>
        item.outfitID === updatedOutfit.outfitID ? updatedOutfit : item
      )
    );
    setSelectedItem(updatedOutfit);
  };

  // Unified goBack handler
  const goBack = () => {
    if (selectedItem) {
      setSelectedItem(null);
    } else {
      setCurrentAddPage(false);
    }
  };

  // === View Add Outfit Page ===
  if (currentAddPage) {
    return <AddOutfit goBack={goBack} onAddItem={handleAddItem} />;
  }

  // === View Outfit Item ===
  if (selectedItem) {
    return (
      <ViewOutfitItem
        outfit={selectedItem}
        goBack={goBack}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
      />
    );
  }

  // === Default Grid View ===
  return (
    <div className={Userstyle.userContainer}>
      <div className={Userstyle.userbodypage}>
        <div className={Userstyle.navTabs}>
          <div className={Userstyle.activeTab}>Outfits</div>
        </div>

        <div className={Userstyle.tabContent}>
          <div className={Userstyle.gridItems}>
            {outfits.map((item, index) => {
              const previewImage = item.imageUrl || '/src/assets/fallback.png';
              return (
                <div
                  key={index}
                  className={Userstyle.itemBox}
                  onClick={() => setSelectedItem(item)}
                >
                  <img src={previewImage} alt={item.outfitName} />
                  <p className={Userstyle.itemLabel}><b>{item.outfitName}</b></p>
                  <p className={Userstyle.itemSub}>
                    Items: {item.wardrobeitems?.length || 0}
                  </p>
                </div>
              );
            })}

            {/* Add Outfit Button */}
            <div
              className={Userstyle.itemBox}
              onClick={() => setCurrentAddPage(true)}
            >
              <div className={Userstyle.addBtn}>+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outfit;
