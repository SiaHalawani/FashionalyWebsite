import { useState, useEffect } from 'react';
import { getSuggestedUsers, followUser } from '../../../../BackendIntegration/AxiosConnections/UserGetConnections/UserAxios';  // Import the Axios functions
import components from '../../../../../CSS/components.module.css';
import styles from '../../../CSS/button.module.css'; // Import button styles

export default function Recommended() {
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentUserId = 4;  // Static current user ID

    // Fetch recommended users (suggested users to follow)
    const fetchRecommended = async () => {
        setLoading(true);
        try {
            const suggestedUsers = await getSuggestedUsers(currentUserId);  // Get suggested users for current user
            setRecommended(suggestedUsers.slice(0, 5));  // Limit to 5 users
        } catch (error) {
            console.error('Error fetching recommended users:', error);
        }
        setLoading(false);
    };

    // Handle Follow functionality
    const handleFollowUser = async (userId, index) => {
        const result = await followUser(currentUserId, userId);  // Follow user with userId
        if (result) {
            alert(`User with ID ${userId} followed.`);
            // Remove the followed user from the list after following
            setRecommended(prevUsers => prevUsers.filter(user => user.userID !== userId)); // Remove the followed user
        }
    };

    useEffect(() => {
        fetchRecommended(); // Fetch suggested users when the component mounts
    }, []);

    return (
        <div className={components.recommendedContainer}>
            {loading ? (
                <p>Loading recommended content...</p>
            ) : (
                <div className={components.recommendedList}>
                    {recommended.length === 0 ? (
                        <p>No suggested users to follow.</p>
                    ) : (
                        recommended.map((user, index) => (
                            <div key={user.userID} className={components.recommendedItem}>
                                <img
                                    src={user.profilePicture || '/default-avatar.png'}
                                    alt={user.username}
                                    className={components.recommendedImage}
                                />
                                <div className={components.recommendedContent}>
                                    <p className={components.username}>{user.username}</p>
                                    <p>{user.bio || "No bio available"}</p>
                                    <button 
                                        className={`${styles.followBtn} ${user.followed ? 'following' : ''}`}
                                        onClick={() => handleFollowUser(user.userID, index)} 
                                        disabled={user.followed} // Disable button if already following
                                    >
                                        {user.followed ? 'Following' : 'Follow'}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
