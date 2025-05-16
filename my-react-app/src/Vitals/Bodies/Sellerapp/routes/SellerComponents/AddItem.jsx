import React, { useState } from 'react';
import { addSellerItem } from '../../../../../BackendIntegration/AxiosConnections/SellerAxios'; // Adjust the import path accordingly
import styles from '../../../../CSS/Sellercss/SellerDashboard.module.css';

export default function AddItem({ goBack, onAdd, sellerId, groupId }) {
  const [item, setItem] = useState({
    itemName: '',
    category: '',
    price: '',
    image: '',
    description: '',
  });

  const handleChange = (e) => setItem({ ...item, [e.target.name]: e.target.value });

  // Function to handle adding an item via the API
  const handleSubmit = async () => {
    if (item.itemName && item.price) {
      try {
        const itemId = `${Date.now()}`; // Use current timestamp for unique itemId
        const response = await addSellerItem(sellerId, groupId, itemId, item);
        console.log('Item Added:', response);
        onAdd(item); // Call onAdd to update the UI after item is added
        goBack(); // Go back to previous page after adding the item
      } catch (error) {
        console.error('Error adding item:', error);
        alert('Failed to add item. Please try again.');
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>Add New Product</h2>
      <input name="itemName" placeholder="Item Name" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} />
      <input name="image" placeholder="Image URL" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
      <div className={styles.buttons}>
        <button onClick={handleSubmit}>Add Item</button>
        <button onClick={goBack}>Cancel</button>
      </div>
    </div>
  );
}
