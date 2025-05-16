import { useEffect, useState } from 'react';
import styles from '../../../../../../CSS/PokeStyles.module.css';
import { getOutfitById } from '../../../../../../../BackendIntegration/UserData/Editors/EditOutfit';

export default function ViewOutfitItem({ item, goBack }) {
  const [currentOutfit, setCurrentOutfit] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchOutfitDetails = async () => {
    if (!item?.id) {
      console.error('❌ No item.id provided');
      return;
    }

    console.log('🧪 Incoming item:', item);
    console.log('📦 Fetching outfit using item.id:', item.id);

const fullData = await getOutfitById(Number(item.id));

    if (fullData) {
      console.log('✅ Fetched outfit:', fullData);
      setCurrentOutfit(fullData);
    } else {
      console.error('❌ Failed to fetch outfit');
    }

    setLoading(false);
  };

  fetchOutfitDetails();
}, [item]);

  if (loading || !currentOutfit) {
    return <div className={styles.container}>Loading outfit...</div>;
  }

return (
  <div className={styles.filterTab}>
    <button onClick={goBack} className={styles.button}>← Back</button>

    <img
      src={currentOutfit.imageUrl || '/src/assets/fallback.png'}
      alt="Outfit"
      style={{ width: '100%', borderRadius: 12, margin: '1rem 0', objectFit: 'cover', maxHeight: 200 }}
    />

    <h2 className={styles.title}>{currentOutfit.outfitName}</h2>
    <p><b>Items:</b> {currentOutfit.wardrobeitems?.length || 0}</p>

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
  </div>
);

}
