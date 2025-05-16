// import React, { useState } from 'react';
// import styles from '../../../../../../CSS/PokeStyles.module.css';
// import { deleteWardrobeItem, updateWardrobeItem } from '../../../../../../../BackendIntegration/UserData/Editors/Edititem'; // adjust if needed
// import { useGlobalState } from '../../../../../../../BackendIntegration/UserData/GeneralDataManagement';

// import { uploadImageViaBackend } from '../../../../../../../Utils/uploadImageToImageKit';

// export default function ViewWardrobeItem({ item, goBack, onDelete, onUpdate }) {
//   const { refreshUserData } = useGlobalState();

//   const [editMode, setEditMode] = useState(false);
//   const [wardrobe, setWardrobe] = useState({ ...item });
//   const [error, setError] = useState('');
//   console.log('📦 ViewWardrobeItem item:', item);

//   const handleChange = (e) => {
//     setWardrobe({ ...wardrobe, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       try {
//         const uploadedURL = await uploadImageViaBackend(file);
//         setWardrobe({ ...wardrobe, imageURL: uploadedURL });
//       } catch (error) {
//         console.error('Image upload failed', error);
//         setError('Failed to upload image.');
//       }
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const temperatureRange = `${wardrobe.temperatureMin || 0}-${wardrobe.temperatureMax || 0}°C`;
//       const updatedItem = {
//         ...wardrobe,
//         price: parseFloat(wardrobe.price),
//         temperatureRange,
//       };
//       const result = await updateWardrobeItem(item.id, updatedItem);
//       onUpdate(result); // Update in parent/global state
      
//       setEditMode(false);
//       await refreshUserData();
//       setError('');
//     } catch (err) {
//       setError('Failed to update item.');
//     }
//   };

//   return (
//     <div className={styles.filterTab}>
//       <button className={styles.button} onClick={goBack}>← Back</button>

//       <h2 className={styles.title}>
//         {editMode ? 'Edit Item' : wardrobe.itemName || 'Wardrobe Item'}
//       </h2>

//       <img
//         src={wardrobe.image }
//         alt="Wardrobe"
//         style={{
//           width: '100%',
//           borderRadius: 12,
//           margin: '1rem 0',
//           objectFit: 'cover',
//           maxHeight: 200,
//         }}
//       />

//       {editMode ? (
//         <div className={styles.filterGroup}>
//           <input className={styles.input} name="itemName" value={wardrobe.itemName} onChange={handleChange} placeholder="Item Name" />
//           <input className={styles.input} type="file" accept="image/*" onChange={handleImageChange} />
//           <select className={styles.input} name="color" value={wardrobe.color} onChange={handleChange}>
//             <option>Red</option><option>Blue</option><option>Green</option><option>Black</option><option>White</option>
//           </select>
//           <select className={styles.input} name="material" value={wardrobe.material} onChange={handleChange}>
//             <option>Cotton</option><option>Wool</option><option>Polyester</option><option>Silk</option>
//           </select>
//           <select className={styles.input} name="season" value={wardrobe.season} onChange={handleChange}>
//             <option>Spring</option><option>Summer</option><option>Autumn</option><option>Winter</option>
//           </select>
//           <select className={styles.input} name="occasion" value={wardrobe.occasion} onChange={handleChange}>
//             <option>Casual</option><option>Formal</option><option>Party</option><option>Business</option>
//           </select>

//           <label>Temperature Range: {wardrobe.temperatureMin || 0}°C - {wardrobe.temperatureMax || 0}°C</label>
//           <input type="range" min="0" max="50" value={wardrobe.temperatureMin || 0} onChange={(e) => setWardrobe({ ...wardrobe, temperatureMin: e.target.value })} />
//           <input type="range" min="0" max="50" value={wardrobe.temperatureMax || 0} onChange={(e) => setWardrobe({ ...wardrobe, temperatureMax: e.target.value })} />

//           <select className={styles.input} name="brand" value={wardrobe.brand} onChange={handleChange}>
//             <option>Nike</option><option>Adidas</option><option>Puma</option><option>Reebok</option>
//           </select>
//           <select className={styles.input} name="gender" value={wardrobe.gender} onChange={handleChange}>
//             <option value="male">Male</option><option value="female">Female</option>
//           </select>
//           <input className={styles.input} name="price" value={wardrobe.price} onChange={handleChange} placeholder="Price" />
//           <label>
//             <input type="checkbox" checked={wardrobe.favorite} onChange={(e) => setWardrobe({ ...wardrobe, favorite: e.target.checked })} />
//             Favorite
//           </label>
//           <select className={styles.input} name="visibility" value={wardrobe.visibility} onChange={handleChange}>
//             <option value="public">Public</option><option value="private">Private</option>
//           </select>

//           {error && <div className={styles.errorMessage}>{error}</div>}

       
//         </div>
//       ) : (
//         <div className={styles.filterGroup}>
//           <p><b>Category:</b> {wardrobe.category}</p>
//           <p><b>Color:</b> {wardrobe.color}</p>
//           <p><b>Brand:</b> {wardrobe.brand}</p>
//           <p><b>Material:</b> {wardrobe.material}</p>
//           <p><b>Season:</b> {wardrobe.season}</p>
//           <p><b>Occasion:</b> {wardrobe.occasion}</p>
//           <p><b>Temp:</b> {wardrobe.temperatureMin}-{wardrobe.temperatureMax}°C</p>
//           <p><b>Gender:</b> {wardrobe.gender}</p>
//           <p><b>Price:</b> {wardrobe.price}</p>
//           <p><b>Favorite:</b> {wardrobe.favorite ? 'Yes' : 'No'}</p>
//           <p><b>Visibility:</b> {wardrobe.visibility}</p>

          
//         </div>
//       )}

     
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import styles from '../../../../../../CSS/PokeStyles.module.css';
import { getItemById } from '../../../../../LinkPages/UserItemPage/Axios';
import { deleteWardrobeItem, updateWardrobeItem } from '../../../../../../../BackendIntegration/UserData/Editors/Edititem';
import { useGlobalState } from '../../../../../../../BackendIntegration/UserData/GeneralDataManagement';
import { uploadImageViaBackend } from '../../../../../../../Utils/uploadImageToImageKit';

export default function ViewWardrobeItem({ item, goBack, onDelete, onUpdate }) {
  const { refreshUserData } = useGlobalState();
  const [editMode, setEditMode] = useState(false);
  const [wardrobe, setWardrobe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (item?.id) {
      getItemById(item.id)
        .then((data) => {
          setWardrobe({
            ...data,
            temperatureMin: parseInt(data.temperatureRange?.split('-')[0]) || 0,
            temperatureMax: parseInt(data.temperatureRange?.split('-')[1]) || 0
          });
        })
        .catch((err) => {
          console.error('❌ Failed to fetch full item:', err);
        });
    }
  }, [item]);

  const handleChange = (e) => {
    setWardrobe({ ...wardrobe, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedURL = await uploadImageViaBackend(file);
        setWardrobe({ ...wardrobe, imageURL: uploadedURL });
      } catch (error) {
        console.error('Image upload failed', error);
        setError('Failed to upload image.');
      }
    }
  };

  const handleSave = async () => {
    try {
      const temperatureRange = `${wardrobe.temperatureMin || 0}-${wardrobe.temperatureMax || 0}°C`;
      const updatedItem = {
        ...wardrobe,
        price: parseFloat(wardrobe.price),
        temperatureRange
      };
      const result = await updateWardrobeItem(wardrobe.itemID, updatedItem);
      onUpdate(result);
      await refreshUserData();
      setEditMode(false);
      setError('');
    } catch (err) {
      setError('Failed to update item.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteWardrobeItem(wardrobe.itemID);
      await refreshUserData();
      onDelete();
    } catch (err) {
      alert('Failed to delete item');
    }
  };

  if (!wardrobe) return <div className={styles.container}>Loading item...</div>;

  return (
    <div className={styles.filterTab}>
      <button className={styles.button} onClick={goBack}>← Back</button>
      <h2 className={styles.title}>{editMode ? 'Edit Item' : wardrobe.itemName || 'Wardrobe Item'}</h2>

      <img
        src={wardrobe.imageURL}
        alt="Wardrobe"
        style={{ width: '100%', borderRadius: 12, margin: '1rem 0', objectFit: 'cover', maxHeight: 200 }}
      />

      {editMode ? (
        <div className={styles.filterGroup}>
          <input className={styles.input} name="itemName" value={wardrobe.itemName} onChange={handleChange} placeholder="Item Name" />
          <input className={styles.input} type="file" accept="image/*" onChange={handleImageChange} />
          <select className={styles.input} name="color" value={wardrobe.color} onChange={handleChange}>
            <option>Red</option><option>Blue</option><option>Green</option><option>Black</option><option>White</option>
          </select>
          <select className={styles.input} name="material" value={wardrobe.material} onChange={handleChange}>
            <option>Cotton</option><option>Wool</option><option>Polyester</option><option>Silk</option>
          </select>
          <select className={styles.input} name="season" value={wardrobe.season} onChange={handleChange}>
            <option>Spring</option><option>Summer</option><option>Autumn</option><option>Winter</option>
          </select>
          <select className={styles.input} name="occasion" value={wardrobe.occasion} onChange={handleChange}>
            <option>Casual</option><option>Formal</option><option>Party</option><option>Business</option>
          </select>

          <label>Temperature Range: {wardrobe.temperatureMin || 0}°C - {wardrobe.temperatureMax || 0}°C</label>
          <input type="range" min="0" max="50" value={wardrobe.temperatureMin || 0} onChange={(e) => setWardrobe({ ...wardrobe, temperatureMin: e.target.value })} />
          <input type="range" min="0" max="50" value={wardrobe.temperatureMax || 0} onChange={(e) => setWardrobe({ ...wardrobe, temperatureMax: e.target.value })} />

          <select className={styles.input} name="brand" value={wardrobe.brand} onChange={handleChange}>
            <option>Nike</option><option>Adidas</option><option>Puma</option><option>Reebok</option>
          </select>
          <select className={styles.input} name="gender" value={wardrobe.gender} onChange={handleChange}>
            <option value="male">Male</option><option value="female">Female</option>
          </select>
          <input className={styles.input} name="price" value={wardrobe.price} onChange={handleChange} placeholder="Price" />
          <label>
            <input type="checkbox" checked={wardrobe.favorite} onChange={(e) => setWardrobe({ ...wardrobe, favorite: e.target.checked })} />
            Favorite
          </label>
          <select className={styles.input} name="visibility" value={wardrobe.visibility} onChange={handleChange}>
            <option value="public">Public</option><option value="private">Private</option>
          </select>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={handleSave}>Save</button>
            <button className={styles.button} onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className={styles.filterGroup}>
          <p><b>Category ID:</b> {wardrobe.categoryID}</p>
          <p><b>Color:</b> {wardrobe.color}</p>
          <p><b>Brand:</b> {wardrobe.brand}</p>
          <p><b>Material:</b> {wardrobe.material}</p>
          <p><b>Season:</b> {wardrobe.season}</p>
          <p><b>Occasion:</b> {wardrobe.occasion}</p>
          <p><b>Temperature:</b> {wardrobe.temperatureRange}</p>
          <p><b>Gender:</b> {wardrobe.gender}</p>
          <p><b>Price:</b> {wardrobe.price}</p>
          <p><b>Favorite:</b> {wardrobe.favorite ? 'Yes' : 'No'}</p>
          <p><b>Visibility:</b> {wardrobe.visibility}</p>

        </div>
      )}

  
    </div>
  );
}
