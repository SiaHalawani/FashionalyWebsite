import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // Import useParams and useNavigate
import { getFollowersList, removeFollower } from '../../../../../../../BackendIntegration/AxiosConnections/UserGetConnections/UserAxios'; // Import Axios functions
import styles from './FollowersFollowing.module.css';  // Import the CSS file

const FollowersListComponent = () => {
  const [followers, setFollowers] = useState([]);
  const { userId } = useParams();  // Extract userId from the route
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchFollowers = async () => {
      const followersData = await getFollowersList(userId);  // Fetch followers for the specific userId
      if (followersData) {
        // Remove duplicates based on userID
        const uniqueFollowers = Array.from(
          new Map(followersData.map(item => [item.Follower.userID, item])).values()
        );
        setFollowers(uniqueFollowers);
      }
    };

    fetchFollowers();
  }, [userId]);  // Re-fetch if userId changes

  const handleRemoveFollower = async (followerID) => {
    const result = await removeFollower(userId, followerID);
    if (result) {
      // Filter out the removed follower from the list
      setFollowers(followers.filter(user => user.Follower.userID !== followerID));
    }
  };

  // Handle Go Back
  const handleGoBack = () => {
    navigate(-1);  // Navigate to the previous page
  };

  return (
    <div className={styles.listContainer}>
      <button className={styles.goBackBtn} onClick={handleGoBack}>Go Back</button> {/* Go Back button */}
      <h2>Followers List</h2>
      {followers.length === 0 ? (
        <p className={styles.emptyState}>No one is following you yet.</p>
      ) : (
        <ul>
          {followers.map(user => (
            <li key={user.Follower.userID}>
              <img
                src={user.Follower.profilePicture || '/default-avatar.png'}
                alt={user.Follower.username}
              />
              <span>{user.Follower.username}</span>
              <button onClick={() => handleRemoveFollower(user.Follower.userID)}>
                Remove Follower
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowersListComponent;
