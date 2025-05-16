// import { useState, useEffect } from 'react';
// import styles from '../../../../../CSS/PokeStyles.module.css';
// import {
//   createOutfit,
//   getWardrobeItemsByWardrobeId,
//   getWardrobeID
// } from '../../../../../../BackendIntegration/UserData/Editors/EditOutfit';
// import { uploadImageViaBackend } from '../../../../../../Utils/uploadImageToImageKit';

// export default function AddOutfit({ goBack, onAddItem }) {
//   const [outfitName, setOutfitName] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [items, setItems] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchItems = async () => {
//       const wardrobeID = await getWardrobeID();
//       const allItems = await getWardrobeItemsByWardrobeId(wardrobeID);
//       setItems(allItems);
//     };
//     fetchItems();
//   }, []);

//   const toggleItem = (itemID) => {
//     setSelectedItems(prev =>
//       prev.includes(itemID) ? prev.filter(id => id !== itemID) : [...prev, itemID]
//     );
//   };

// const handleImageChange = async (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     try {
//       const uploadedURL = await uploadImageViaBackend(file);
//       console.log("📸 Uploaded Outfit Image URL:", uploadedURL);  // <-- Debug here
//       setImageUrl(uploadedURL.trim()); // <-- Trim in case of leading/trailing whitespace
//       setError('');
//     } catch (err) {
//       console.error('Image upload failed:', err);
//       setError('Failed to upload image. Please try again.');
//     }
//   }
// };


//   const handleSubmit = async () => {
//     const finalImageUrl = imageUrl.trim(); // Ensure no leading/trailing whitespace
//      console.log("📝 Submitting outfit with image:", imageUrl);
//     const result = await createOutfit(outfitName, finalImageUrl, selectedItems);
//     if (result) {
//       onAddItem(result);
//       goBack();
//     } else {
//       setError('Failed to create outfit.');
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Create Outfit</h2>

//       <input
//         className={styles.input}
//         placeholder="Outfit Name"
//         value={outfitName}
//         onChange={(e) => setOutfitName(e.target.value)}
//       />

//       <input
//         className={styles.input}
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//       />

//       {error && <div className={styles.errorMessage}>{error}</div>}

//     <div className={styles.gridItems}>
//   {items.map((item) => {
//     const image = item.imageURL || item.preview || '/src/assets/fallback.png';
//     const isSelected = selectedItems.includes(item.itemID);

//     return (
//       <div
//         key={item.itemID}
//         className={`${styles.itemBox} ${isSelected ? styles.selected : ''}`}
//         onClick={() => toggleItem(item.itemID)}
//       >
//         <img src={image} alt={item.itemName} />
//         <p className={styles.itemLabel}><b>{item.itemName}</b></p>
//         <p className={styles.itemSub}>{item.category || item.brand || ''}</p>
//       </div>
//     );
//   })}
// </div>


//       <div className={styles.buttonRow}>
//         <button onClick={goBack} className={styles.cancelBtn}>Cancel</button>
//         <button onClick={handleSubmit} className={styles.addBtn}>Create Outfit</button>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react';
import styles from '../../../../../CSS/PokeStyles.module.css';
import {
  createOutfit,
  getWardrobeItemsByWardrobeId,
  getWardrobeID
} from '../../../../../../BackendIntegration/UserData/Editors/EditOutfit';
import { uploadImageViaBackend } from '../../../../../../Utils/uploadImageToImageKit';

export default function AddOutfit({ goBack, onAddItem }) {
  const [outfitName, setOutfitName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const wardrobeID = await getWardrobeID();
      const allItems = await getWardrobeItemsByWardrobeId(wardrobeID);
      setItems(allItems);
    };
    fetchItems();
  }, []);

  const toggleItem = (itemID) => {
    setSelectedItems(prev =>
      prev.includes(itemID) ? prev.filter(id => id !== itemID) : [...prev, itemID]
    );
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedURL = await uploadImageViaBackend(file);
        setImageUrl(uploadedURL.trim());
        setError('');
      } catch (err) {
        console.error('Image upload failed:', err);
        setError('Failed to upload image. Please try again.');
      }
    }
  };

  const handleSubmit = async () => {
    const finalImageUrl = imageUrl.trim();
    const result = await createOutfit(outfitName, finalImageUrl, selectedItems);
    if (result) {
      onAddItem(result);
      goBack();
    } else {
      setError('Failed to create outfit.');
    }
  };

  return (
    <div className={styles.filterTab}>
      <button className={styles.button} onClick={goBack}>← Back</button>

      <h2 className={styles.title}>Create Outfit</h2>

      <img
        src={imageUrl || '/src/assets/fallback.png'}
        alt="Outfit Preview"
        style={{
          width: '100%',
          borderRadius: 12,
          margin: '1rem 0',
          objectFit: 'cover',
          maxHeight: 200,
        }}
      />

      <div className={styles.filterGroup}>
        <input
          className={styles.input}
          placeholder="Outfit Name"
          value={outfitName}
          onChange={(e) => setOutfitName(e.target.value)}
        />

        <input
          className={styles.input}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {error && <div className={styles.errorMessage}>{error}</div>}

        <p><b>Select items for this outfit:</b></p>
        <div className={styles.gridItems}>
          {items.map((item) => {
            const image = item.imageURL || item.preview || '/src/assets/fallback.png';
            const isSelected = selectedItems.includes(item.itemID);

            return (
              <div
                key={item.itemID}
                className={`${styles.itemBox} ${isSelected ? styles.selected : ''}`}
                onClick={() => toggleItem(item.itemID)}
              >
                <img src={image} alt={item.itemName} />
                <p className={styles.itemLabel}><b>{item.itemName}</b></p>
                <p className={styles.itemSub}>{item.category || item.brand || ''}</p>
              </div>
            );
          })}
        </div>

        <div className={styles.buttonGroup}>

          <button className={styles.button} onClick={goBack}>Cancel</button>
          <button className={styles.button} onClick={handleSubmit}>Create Outfit</button>
          
        </div>
      </div>
    </div>
  );
}

