// import { useState, useEffect } from 'react';
// import styles from '../../../../../CSS/PokeStyles.module.css';
// import {
//   getPostById,
//   deletePost,
//   updatePost
// } from '../../../../../../BackendIntegration/UserData/Editors/EditPosts';
// import { useGlobalState } from '../../../../../../BackendIntegration/UserData/GeneralDataManagement';

// export default function ViewPost({ itemId, goBack, onDeleteItem, onUpdateItem }) {
//   const { refreshUserData } = useGlobalState();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);
//   const [newContent, setNewContent] = useState('');
//   const [newImageURL, setNewImageURL] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const data = await getPostById(itemId);
//         if (data) {
//           setPost(data);
//           setNewContent(data.postContent);
//           setNewImageURL(data.postImageURL);
//         } else {
//           setError('Post not found.');
//           onDeleteItem(itemId);
//         }
//       } catch (err) {
//         setError('Failed to fetch post.');
//         console.error(err);
//       }
//       setLoading(false);
//     };

//     if (itemId) fetchPost();
//   }, [itemId]);

//   const handleUpdate = async () => {
//     try {
//       const updatedPost = await updatePost(itemId, newContent, post.postType, newImageURL);
//       if (updatedPost) {
//         await refreshUserData();
//         setPost(updatedPost);
//         setEditMode(false);
//         onUpdateItem(updatedPost);
//       }
//     } catch (err) {
//       setError('Failed to update post.');
//       console.error(err);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await deletePost(itemId);
//       onDeleteItem(itemId);
//       goBack();
//     } catch (err) {
//       setError('Failed to delete post.');
//       console.error(err);
//     }
//   };

//   if (loading) return <div className={styles.filterTab}>Loading post...</div>;
//   if (error) return <div className={styles.filterTab}>{error}</div>;
//   if (!post) return null;

//   return (
//     <div className={styles.filterTab}>
//       <button className={styles.button} onClick={goBack}>← Back</button>

//       <h2 className={styles.title}>
//         {editMode ? 'Edit Post' : 'View Post'}
//       </h2>

//       {post.postImageURL && (
//         <img
//           src={post.postImageURL}
//           alt="Post"
//           style={{
//             width: '100%',
//             borderRadius: 12,
//             margin: '1rem 0',
//             objectFit: 'cover',
//             maxHeight: 200,
//           }}
//         />
//       )}

//       {editMode ? (
//         <div className={styles.filterGroup}>
//           <textarea
//             className={styles.input}
//             value={newContent}
//             onChange={(e) => setNewContent(e.target.value)}
//             placeholder="Edit post content"
//           />
//         <input
//   className={styles.input}
//   type="file"
//   accept="image/*"
//   onChange={async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       try {
//         const formData = new FormData();
//         formData.append('file', file);
//         const res = await fetch('http://localhost:5005/api/upload', {
//           method: 'POST',
//           body: formData,
//         });
//         const data = await res.json();
//         setNewImageURL(data.url); // or adjust based on your response
//       } catch (err) {
//         console.error('Image upload failed', err);
//         setError('Failed to upload image.');
//       }
//     }
//   }}
// />









//           {error && <div className={styles.errorMessage}>{error}</div>}

//           <div className={styles.buttonGroup}>
//             <button className={styles.button} onClick={handleUpdate}>Save</button>
//             <button className={styles.button} onClick={() => setEditMode(false)}>Cancel</button>
//           </div>
//         </div>
//       ) : (
//         <div className={styles.filterGroup}>
//           <div className={styles.groupBox}>
//             <p className={styles.itemLabel}><b>Content:</b></p>
//             <p>{post.postContent}</p>
//           </div>

//           <div className={styles.groupBox}>
//             <p><b>Posted:</b> {new Date(post.createdAt).toLocaleString()}</p>
//             <p>❤️ {post.likesCount} Likes &nbsp;&nbsp; 💬 {post.commentsCount} Comments</p>
//           </div>

//           <div className={styles.buttonGroup}>
//             <button className={styles.button} onClick={() => setEditMode(true)}>Edit</button>
//           </div>
//         </div>
//       )}

//       <button
//         onClick={handleDelete}
//         className={styles.button}
//         style={{ marginTop: '2rem', backgroundColor: '#911f1f' }}
//       >
//         Delete Post
//       </button>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import styles from '../../../../../CSS/PokeStyles.module.css';
import {
  getPostById,
  deletePost,
  updatePost
} from '../../../../../../BackendIntegration/UserData/Editors/EditPosts';
import { useGlobalState } from '../../../../../../BackendIntegration/UserData/GeneralDataManagement';
import { uploadImageViaBackend } from '../../../../../../Utils/uploadImageToImageKit';

export default function ViewPost({ itemId, goBack, onDeleteItem, onUpdateItem }) {
  const { refreshUserData } = useGlobalState();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newImageURL, setNewImageURL] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(itemId);
        if (data) {
          setPost(data);
          setNewContent(data.postContent);
          setNewImageURL(data.postImageURL);
        } else {
          setError('Post not found.');
          onDeleteItem(itemId);
        }
      } catch (err) {
        setError('Failed to fetch post.');
        console.error(err);
      }
      setLoading(false);
    };

    if (itemId) fetchPost();
  }, [itemId]);

  const handleUpdate = async () => {
    try {
      const updatedPost = await updatePost(itemId, newContent, post.postType, [newImageURL]);
      console.log('Updated Post:', updatedPost);
      if (updatedPost) {
        await refreshUserData();
        setPost(updatedPost);
        setEditMode(false);
        onUpdateItem(updatedPost);
      }
    } catch (err) {
      setError('Failed to update post.');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(itemId);
      onDeleteItem(itemId);
      goBack();
    } catch (err) {
      setError('Failed to delete post.');
      console.error(err);
    }
  };

  if (loading) return <div className={styles.filterTab}>Loading post...</div>;
  if (error) return <div className={styles.filterTab}>{error}</div>;
  if (!post) return null;
console.log('Post:', post);
  return (
    <div className={styles.filterTab}>
      <button className={styles.button} onClick={goBack}>← Back</button>

      <h2 className={styles.title}>
        {editMode ? 'Edit Post' : 'View Post'}
      </h2>

      {post.postImageURL && !editMode && (
        <img
          src={post.postImageURL}
          alt="Post"
          style={{
            width: '100%',
            borderRadius: 12,
            margin: '1rem 0',
            objectFit: 'cover',
            maxHeight: 200,
          }}
        />
      )}

      {editMode ? (
        <div className={styles.filterGroup}>
          <textarea
            className={styles.input}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Edit post content"
          />

          <input
            className={styles.input}
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (!file) return;

              try {
                const uploadedUrl = await uploadImageViaBackend(file);
                setNewImageURL(uploadedUrl);
                setError('');
              } catch (err) {
                console.error('Upload failed:', err);
                setError('Image upload failed. Please try again.');
              }
            }}
          />

          {newImageURL && (
            <img src={newImageURL} alt="Preview" className={styles.previewImage} />
          )}

          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.buttonGroup}>

                        <button className={styles.button} onClick={() => setEditMode(false)}>Cancel</button>
            <button className={styles.button} onClick={handleUpdate}>Save</button>

          </div>
        </div>
      ) : (
        <div className={styles.filterGroup}>
          <div className={styles.groupBox}>
            <p className={styles.itemLabel}><b>Content:</b></p>
            <p>{post.postContent}</p>
          </div>

          <div className={styles.groupBox}>
            <p><b>Posted:</b> {new Date(post.createdAt).toLocaleString()}</p>
            <p>❤️ {post.likesCount} Likes &nbsp;&nbsp; 💬 {post.commentsCount} Comments</p>
          </div>

          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={() => setEditMode(true)}>Edit</button>
          </div>
        </div>
      )}

      <button
        onClick={handleDelete}
        className={styles.button}
        style={{ marginTop: '2rem', backgroundColor: '#911f1f' }}
      >
        Delete Post
      </button>
    </div>
  );
}
