// import React, { useEffect, useState } from 'react';
// import { getAllUsers, getFollowingList } from '../../../../BackendIntegration/AxiosConnections/UserGetConnections/UserAxios';
// import { Link } from 'react-router-dom';
// import containers from '../../../CSS/containers.module.css';

// export default function Headerbar({ currentUser, setChatWithId, userId }) {
//   console.log("Headerbar currentUser:", currentUser);
//   const [users, setUsers] = useState([]);
//   const [followings, setFollowings] = useState([]);
//   const [selectedUserId, setSelectedUserId] = useState(null); // ✅ Track selected user

//   useEffect(() => {
//     const fetchFollowingsAndUsers = async () => {
//       const token = localStorage.getItem('token');
//       const effectiveUserId = userId || currentUser?.userID;
//       if (!effectiveUserId) return;

//       const followingData = await getFollowingList(effectiveUserId);
//       setFollowings(followingData || []);

//       const allUsers = await getAllUsers();
//       const filteredUsers = allUsers.filter(user =>
//         followingData.some(f => f.Following.userID === user.userID)
//       );
//       setUsers(filteredUsers.slice(0, 30));
//     };

//     fetchFollowingsAndUsers();
//   }, [currentUser, userId]);

//   return (
//     <header className={containers.headercontainer}>
//       <h4>ChatApp</h4>
//       <div style={styles.suggestSection}>
//         <div style={styles.suggestHeader}></div>
//         {users.length === 0 ? (
//           <p style={{ color: 'var(--text-subtitles)', fontSize: '0.9em' }}>No followings found.</p>
//         ) : (
//           <div style={styles.scrollableContainer}>
//             {users.map((user) => (
//               <div
//                 key={user.userID}
//                 style={{
//                   ...styles.suggestUser,
//                   backgroundColor: String(user.userID) === selectedUserId ? 'var(--highlight-color)' : 'var(--background-color-box)',
//                   border: String(user.userID) === selectedUserId ? '2px solid var(--accent-color)' : 'none',
//                 }}
//               >
//                 <button
//                   onClick={() => {
//                     setChatWithId(String(user.userID));
//                     setSelectedUserId(String(user.userID));
//                   }}
//                   style={styles.userButton}
//                 >
//                   <div style={styles.userInfo}>
//                     <Link to={`/Fashop/User/${user.userID}`} style={styles.link}>
//                       <img
//                         src={user.profilePicture || '/default-avatar.png'}
//                         alt={user.username}
//                         style={styles.profileImage}
//                       />
//                     </Link>
//                     <div style={styles.textContainer}>
//                       <p style={styles.username}>{user.username}</p>
//                       <p style={styles.additionalInfo}>{user.bio || "No bio available"}</p>
//                     </div>
//                   </div>
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }

// const styles = {
//   suggestSection: {
//     marginTop: '16px',
//     display: 'flex',
//     flexDirection: 'column',
//     width: '100%',
//     height: '100%',
//     flexGrow: 1,
//   },
//   suggestHeader: {
//     fontSize: '1.1em',
//     fontWeight: '600',
//     marginBottom: '8px',
//     color: 'var(--text-titles)',
//   },
// scrollableContainer: {
//   overflowY: 'scroll',
//   paddingRight: '8px',
//   width: '100%',
//   flexGrow: 1,
//   height: '100%',

// },

//   suggestUser: {
//     display: 'flex',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     marginBottom: '10px',
//     padding: '8px 12px',
//     borderRadius: '12px',
//     boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
//     width: '100%',
//     transition: 'all 0.2s ease-in-out',
//   },
//   userButton: {
//     display: 'flex',
//     alignItems: 'center',
//     textDecoration: 'none',
//     width: '100%',
//     cursor: 'pointer',
//     background: 'none',
//     border: 'none',
//     padding: 0,
//   },
//   userInfo: {
//     display: 'flex',
//     alignItems: 'center',
//     width: '100%',
//   },
//   profileImage: {
//     width: '40px',
//     height: '40px',
//     borderRadius: '50%',
//     marginRight: '12px',
//     border: '1px solid var(--text-subtitles)',
//   },
//   textContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
//   username: {
//     fontSize: '1em',
//     fontWeight: 'bold',
//     margin: '0',
//     color: 'var(--text-titles)',
//   },
//   additionalInfo: {
//     fontSize: '0.85em',
//     color: 'var(--text-subtitles)',
//     marginTop: '2px',
//   },
//   link: {
//     textDecoration: 'none',
//   },
// };
import React, { useEffect, useState } from 'react';
import { getAllUsers, getFollowingList } from '../../../../BackendIntegration/AxiosConnections/UserGetConnections/UserAxios';
import { Link } from 'react-router-dom';
import containers from '../../../CSS/containers.module.css';
import fallbackPic from '../../../../../public/fallback.webp'; // adjust the path as needed

export default function Headerbar({ currentUser, setChatWithId, userId }) {
  const [users, setUsers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchFollowingsAndUsers = async () => {
      const effectiveUserId = userId || currentUser?.userID;
      if (!effectiveUserId) return;

      const followingData = await getFollowingList(effectiveUserId);
      setFollowings(followingData || []);

      const allUsers = await getAllUsers();
      const filteredUsers = allUsers.filter(user =>
        followingData.some(f => f.Following.userID === user.userID)
      );
      setUsers(filteredUsers.slice(0, 30));
    };

    fetchFollowingsAndUsers();
  }, [currentUser, userId]);

  return (
    <header className={containers.headercontainer}>
      <h4 className={containers.fashonlyTitle}>Chat</h4>

      <div className={containers.scrollContainer}>
        {users.length === 0 ? (
          <p className={containers.emptyText}>No followings found.</p>
        ) : (
          users.map((user) => (
            <div
              key={user.userID}
              className={`${containers.userCard} ${String(user.userID) === selectedUserId ? containers.activeUser : ''}`}
              onClick={() => {
                setChatWithId(String(user.userID));
                setSelectedUserId(String(user.userID));
              }}
            >
              <Link to={`/Fashop/User/${user.userID}`} className={containers.userLink}>
                <img
                  src={user.profilePicture || fallbackPic}
                  alt={user.username}
                  className={containers.userAvatar}
                />
              </Link>
              <div className={containers.userDetails}>
                <p className={containers.username}>{user.username}</p>
                <p className={containers.bioText}>{user.bio || "No bio available"}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </header>
  );
}
