import React, { useEffect, useState } from 'react';
import { getAllUsers, getFollowingList } from '../../../../BackendIntegration/AxiosConnections/UserGetConnections/UserAxios';
import { Link } from 'react-router-dom';  // Import Link for routing
import containers from '../../../CSS/containers.module.css';

export default function Footer({ setChatWithId, userId }) {
  const [users, setUsers] = useState([]);
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    const fetchFollowingsAndUsers = async () => {
      const token = localStorage.getItem('token');
      const followingData = await getFollowingList(userId);  // Get the list of followings
      setFollowings(followingData || []);  // Set followings to state

      const allUsers = await getAllUsers();  // Get all users
      const filteredUsers = allUsers.filter(user =>
        followingData.some(following => following.Following.userID === user.userID)
      );  // Only keep users who are in the following list
      setUsers(filteredUsers.slice(0, 5));  // Set filtered users to state (limit to 5)
    };

    fetchFollowingsAndUsers();
  }, [userId]);

  return (
    <footer >
      <div >
      
      </div>
    </footer>
  );
}