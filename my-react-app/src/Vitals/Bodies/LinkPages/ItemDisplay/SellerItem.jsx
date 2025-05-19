import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getItemById } from '../../../../BackendIntegration/AxiosConnections/UserGetConnections/getSellerItem';
import { getSellerFull } from '../../../../BackendIntegration/AxiosConnections/UserGetConnections/getSellerById';
import {
  addWardrobeItem,
  getWardrobeID,
  getLastCategoryIDByWardrobeID
} from '../../../../BackendIntegration/UserData/Editors/Edititem';
import { useGlobalState } from '../../../../BackendIntegration/UserData/GeneralDataManagement';
import styles from './AdLinkPage.module.css';
import fallbackPic from '../../../../../public/fallback.webp'; // adjust the path as needed

export default function ItemLinkPage() {
  const { profileData } = useGlobalState();
  const { sellerId, itemId } = useParams();
  const [item, setItem] = useState(null);
  const [seller, setSeller] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const [itemData, sellerData] = await Promise.all([
          getItemById(sellerId, itemId),
          getSellerFull(sellerId)
        ]);
        setItem(itemData);
        setSeller(sellerData);
      } catch (err) {
        console.error('Error loading item data:', err);
      }
    };

    fetchItemData();
  }, [sellerId, itemId]);

  const handleAddAsPreset = async () => {
    const token = localStorage.getItem('token');
    if (!item || !token) return;

    const wardrobeID = await getWardrobeID();
    if (!wardrobeID) return alert("Failed to get wardrobe ID");

    const categoryID = await getLastCategoryIDByWardrobeID(wardrobeID);
    if (!categoryID) return alert("Failed to find 'other' category.");

    const normalize = (value, fallback, allowed = []) => {
      if (!value) return fallback;
      const capitalized = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      return allowed.includes(capitalized) ? capitalized : fallback;
    };

    const temperatureRange = item.temperature_range?.join('-') + '°C';

    const presetData = {
      itemName: item.itemname,
      imageURL: fallbackPic, 
      categoryID,
      wardrobeID,
      color: item.color || 'Beige',
      material: item.material || 'Cotton Blend',
      season: normalize(item.season, 'All', ['Spring', 'Summer', 'Autumn', 'Winter']),
      occasion: item.occasion || 'Casual',
      temperatureRange,
      brand: item.brand || 'Burberry',
      gender: item.gender || 'Unisex',
      type: item.type || 'Coat',
      price: parseFloat(item.price) || 149.99,
      favorite: false,
      visibility: 'private'
    };

    const result = await addWardrobeItem(presetData, token);
    if (result.success) {
      alert('✅ Item added as preset!');
    } else {
      alert('❌ Failed to add: ' + result.error);
    }
  };

return (
  <div className={styles.overlay}>
    <div className={styles.popup}>
      <button className={styles.closeButton} onClick={() => navigate(-1)}>×</button>

      {item && seller ? (
        <div className={styles.content}>
          <div className={styles.imageSection}>
            <div
              className={styles.imageBlurBackground}
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <img src={item.image} alt="Item" className={styles.adImage} />
            <p className={styles.username}>@{seller.SellerBrandName}</p>
          </div>

          <div className={styles.metaSection}>
            <h2 className={styles.caption}>{item.itemname}</h2>

            <div className={styles.meta}>
              <p><strong>Price:</strong> ${item.price}</p>
            </div>

            <h3>Item Details</h3>
            <div className={styles.infoBox}>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Material:</strong> {item.material}</p>
              <p><strong>Occasion:</strong> {item.occasion}</p>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Essential:</strong> {item.essential ? 'Yes' : 'No'}</p>
              <p><strong>Temperature Range:</strong> {item.temperature_range?.join(' – ')}°C</p>
              <p><strong>Gender:</strong> {item.gender}</p>
              <p><strong>Brand:</strong> {item.brand}</p>
            </div>

            <div className={styles.actions}>
              <button className={styles.moreBtn} onClick={handleAddAsPreset}>Add as Preset</button>
              <button className={styles.moreBtn}>Add to Cart</button>
            </div>

            <div className={styles.sellerInfo}>
              <h4>Seller Info</h4>
              <div className={styles.sellerGrid}>
                {[
                  { label: 'Brand', value: seller.SellerBrandName },
                  { label: 'Name', value: seller.SellerName },
                  { label: 'Email', value: seller.SellerEmail },
                  { label: 'Phone', value: seller.Sellerphone },
                  { label: 'Instagram', value: seller.SellerInstagram },
                  { label: 'Website', value: seller.Sellerwebsite },
                  { label: 'Verified', value: seller.verified ? 'Yes' : 'No' },
                  { label: 'Joined', value: new Date(seller.joined).toLocaleDateString() }
                ].map((field, index) => (
                  <div key={index} className={styles.sellerField}>
                    <label>{field.label}</label>
                    <p>{field.value}</p>
                  </div>
                ))}
              </div>

              <div className={styles.stats}>
                <p><strong>Sales:</strong> {seller.stats.sales}</p>
                <p><strong>Revenue:</strong> {seller.stats.revenue}</p>
                <p><strong>Followers:</strong> {seller.stats.followers}</p>
                <p><strong>Orders:</strong> {seller.stats.orders}</p>
                <p><strong>Returns:</strong> {seller.stats.returns}</p>
                <p><strong>Rating:</strong> {seller.stats.rating}</p>
              </div>

              <button
                className={styles.sellerButton}
                onClick={() =>
                  navigate(`/Fashop/Seller/${seller.SellerBrandName}`, {
                    state: { background: location }
                  })
                }
              >
                View More from Seller
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className={styles.loading}>Loading item data...</p>
      )}
    </div>
  </div>
);

}


/* 
───────────────────────────────────────────────────────────────
📝 NOTE: ADD BASE64 → FILE → HOSTED URL CONVERSION HERE LATER
───────────────────────────────────────────────────────────────

If `item.image` is in Base64 format (e.g. starts with "data:image/webp;base64,..."),
you need to convert it to a real hosted image URL before sending it to the backend.

WHY?
- Base64 is not a link — it's just inline image data.
- Your backend (or database) expects a proper image URL (e.g. "https://...").

✅ HOW TO IMPLEMENT THIS LATER:

1. Convert Base64 → File:
---------------------------------------
function base64ToFile(dataURL, filename = 'converted.png') {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

2. Upload to image service (e.g. ImageKit, Firebase, your own backend):
------------------------------------------------------------------------
const file = base64ToFile(item.image, 'converted.png');
const uploadedURL = await uploadImageViaBackend(file);

3. Replace the image field in presetData:
-----------------------------------------
imageURL: uploadedURL

4. Optional debug log:
-----------------------
console.log("✅ Uploaded image URL:", uploadedURL);

You can then safely send `presetData` to the backend using this clean URL.

NOTE: Make sure your `uploadImageViaBackend()` or any other uploader accepts a `File` object.

───────────────────────────────────────────────────────────────
END OF NOTE
───────────────────────────────────────────────────────────────
*/
