import { useEffect, useState } from 'react';
import styles from '../../../../../CSS/PokeStyles.module.css';
import { useGlobalState } from '../../../../../../BackendIntegration/UserData/GeneralDataManagement';
import {
  getOutfitById,
  updateOutfit,
  deleteOutfit
} from '../../../../../../BackendIntegration/UserData/Editors/EditOutfit';

export default function ViewOutfitItem({ outfit, goBack, onDeleteItem }) {
  const { refreshUserData } = useGlobalState();
  const [editMode, setEditMode] = useState(false);
  const [currentOutfit, setCurrentOutfit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItemIDs, setSelectedItemIDs] = useState([]);

  useEffect(() => {
    const fetchOutfitDetails = async () => {
      if (!outfit?.outfitID) return;
      const fullData = await getOutfitById(outfit.outfitID);
      if (fullData) {
        setCurrentOutfit(fullData);
        setSelectedItemIDs(fullData.wardrobeitems?.map(item => item.itemID) || []);
      } else {
        console.error('❌ Failed to load outfit');
      }
      setLoading(false);
    };

    fetchOutfitDetails();
  }, [outfit]);

  const handleChange = (e) => {
    setCurrentOutfit({ ...currentOutfit, [e.target.name]: e.target.value });
  };

  const toggleItem = (itemID) => {
    setSelectedItemIDs(prev =>
      prev.includes(itemID)
        ? prev.filter(id => id !== itemID)
        : [...prev, itemID]
    );
  };

  const handleSave = async () => {
    setEditMode(false);
    const updated = await updateOutfit(
      currentOutfit.outfitID,
      currentOutfit.outfitName,
      selectedItemIDs
    );
    if (updated) {
      setCurrentOutfit(updated);
      setSelectedItemIDs(updated.wardrobeitems?.map(item => item.itemID) || []);
      await refreshUserData();
    }
  };

  const handleDelete = async () => {
    await deleteOutfit(currentOutfit.outfitID);
    onDeleteItem(currentOutfit.outfitID);
  };

  if (loading || !currentOutfit) {
    return <div className={styles.filterTab}>Loading outfit details...</div>;
  }

  return (
    <div className={styles.filterTab}>
      <button className={styles.button} onClick={goBack}>← Back</button>

      <h2 className={styles.title}>
        {editMode ? 'Edit Outfit' : currentOutfit.outfitName || 'Outfit'}
      </h2>

      <img
        src={currentOutfit.imageUrl || '/src/assets/fallback.png'}
        alt="Outfit"
        style={{
          width: '100%',
          borderRadius: 12,
          margin: '1rem 0',
          objectFit: 'cover',
          maxHeight: 200,
        }}
      />

      {editMode ? (
        <div className={styles.filterGroup}>
          <input
            className={styles.input}
            name="outfitName"
            value={currentOutfit.outfitName}
            onChange={handleChange}
            placeholder="Outfit Name"
          />
          <input
            className={styles.input}
            name="imageUrl"
            value={currentOutfit.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
          />

          <label><b>Click an item to remove or re-add it:</b></label>
          <div className={styles.gridItems}>
            {currentOutfit.wardrobeitems?.map((item) => {
              const selected = selectedItemIDs.includes(item.itemID);
              return (
                <div
                  key={item.itemID}
                  className={`${styles.itemBox} ${selected ? styles.selected : ''}`}
                  onClick={() => toggleItem(item.itemID)}
                >
                  <img src={item.imageURL || '/src/assets/fallback.png'} alt={item.itemName} />
                  <p className={styles.itemLabel}><b>{item.itemName}</b></p>
                  <p className={styles.itemSub}>{item.category || item.brand || ''}</p>
                </div>
              );
            })}
          </div>

          <div className={styles.buttonGroup}>

            <button className={styles.button} onClick={() => setEditMode(false)}>Cancel</button>
            <button className={styles.button} onClick={handleSave}>Save</button>
            
          </div>
        </div>
      ) : (
        <div className={styles.filterGroup}>
          <p><b>Total Items:</b> {currentOutfit.wardrobeitems?.length || 0}</p>
          <div className={styles.gridItems}>
            {currentOutfit.wardrobeitems?.map((item) => (
              <div key={item.itemID} className={styles.itemBox}>
                <img
                  src={item.imageURL || '/src/assets/fallback.png'}
                  alt={item.itemName}
                />
                <p className={styles.itemLabel}><b>{item.itemName}</b></p>
                <p className={styles.itemSub}>{item.category || item.brand || ''}</p>
              </div>
            ))}
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={() => setEditMode(true)}>Edit</button>
          </div>
        </div>
      )}

      <button
        onClick={handleDelete}
        className={styles.button}
        style={{ marginTop: '2rem', backgroundColor: '#911f1f' }}
      >
        Delete Outfit
      </button>
    </div>
  );
}
