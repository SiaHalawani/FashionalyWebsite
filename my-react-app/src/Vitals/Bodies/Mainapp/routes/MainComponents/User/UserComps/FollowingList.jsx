import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // Import useParams and useNavigate
import { getFollowingList, removeFollowing } from '../../../../../../../BackendIntegration/AxiosConnections/UserGetConnections/UserAxios'; // Import Axios functions
import styles from './FollowersFollowing.module.css';  // Import the CSS file

const FollowingListComponent = () => {
  const [following, setFollowing] = useState([]);
  const { userId } = useParams();  // Extract userId from the route
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchFollowing = async () => {
      const followingData = await getFollowingList(userId);  // Fetch following for the specific userId
      if (followingData) {
        // Remove duplicates based on userID
        const uniqueFollowing = Array.from(
          new Map(followingData.map(item => [item.Following.userID, item])).values()
        );
        setFollowing(uniqueFollowing);
      }
    };

    fetchFollowing();
  }, [userId]);  // Re-fetch if userId changes

  const handleRemoveFollowing = async (followingID) => {
    const result = await removeFollowing(userId, followingID);
    if (result) {
      // Filter out the removed following from the list
      setFollowing(following.filter(user => user.Following.userID !== followingID));
    }
  };

  // Handle Go Back
  const handleGoBack = () => {
    navigate(-1);  // Navigate to the previous page
  };

  return (
    <div className={styles.listContainer}>
      <button className={styles.goBackBtn} onClick={handleGoBack}>Go Back</button> {/* Go Back button */}
      <h2>Following List</h2>
      {following.length === 0 ? (
        <p className={styles.emptyState}>You are not following anyone.</p>
      ) : (
        <ul>
          {following.map(user => (
            <li key={user.Following.userID}>
              <img
                src={user.Following.profilePicture || '/default-avatar.png'}
                alt={user.Following.username}
              />
              <span>{user.Following.username}</span>
              <button onClick={() => handleRemoveFollowing(user.Following.userID)}>
                Remove Following
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowingListComponent;
