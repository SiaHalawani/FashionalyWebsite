import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getItemById, getUserById } from './Axios';
import styles from '../../../CSS/AdLinkPage.module.css';

export default function ItemLinkPage() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchItem = async () => {
      const fetchedItem = await getItemById(itemId);
      setItem(fetchedItem);
      if (fetchedItem?.userID) {
        const userData = await getUserById(fetchedItem.userID);
        setUser(userData);
      }
    };
    fetchItem();
  }, [itemId]);

  return (
    <div className={styles.adContainer}>
      <div className={styles.adBox}>
    
        {item ? (
          <div className={styles.splitLayout}>
            <div className={styles.leftPanel}>
                  <button className={styles.backBtn} onClick={() => navigate(-1)}>← Go Back</button>
        <h1 className={styles.header}>{user?.username || 'Item'}</h1>

              <img src={item.imageURL} alt={item.itemName} className={styles.postImage} />
              <p className={styles.username}>@{user?.username}</p>
            </div>

            <div className={styles.rightPanel}>
              <h2 className={styles.caption}>{item.itemName}</h2>
              <div className={styles.meta}>
                <p><strong>Price:</strong> ${item.price}</p>
              </div>

              <h3>Item Details</h3>
              <div className={styles.infoBox}>
                <p><strong>Color:</strong> {item.color}</p>
                <p><strong>Material:</strong> {item.material}</p>
                <p><strong>Season:</strong> {item.season}</p>
                <p><strong>Temperature:</strong> {item.temperatureRange}</p>
                <p><strong>Occasion:</strong> {item.occasion}</p>
                <p><strong>Gender:</strong> {item.gender}</p>
                <p><strong>Type:</strong> {item.type}</p>
                <p><strong>Brand:</strong> {item.brand}</p>
                <p><strong>Visibility:</strong> {item.visibility}</p>
                <p><strong>Created:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>

              {user && (
                <div className={styles.sellerBox}>
                  <h3>Uploader Info</h3>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Bio:</strong> {user.bio || 'No bio provided'}</p>
                  <p><strong>Location:</strong> {user.location || 'Unknown'}</p>
                  <p><strong>Verified:</strong> {user.verified ? 'Yes' : 'No'}</p>
                  <p><strong>Joined:</strong> {new Date(user.joinDate).toLocaleDateString()}</p>

                  <div className={styles.stats}>
                    <p><strong>Followers:</strong> {user.followersCount}</p>
                    <p><strong>Following:</strong> {user.followingCount}</p>
                  </div>

                  <button
                    onClick={() => navigate(`/Fashop/User/${user.userID}`, { state: { background: location } })}
                  >
                    View User Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>Loading item data...</p>
        )}
      </div>
    </div>
  );
}
