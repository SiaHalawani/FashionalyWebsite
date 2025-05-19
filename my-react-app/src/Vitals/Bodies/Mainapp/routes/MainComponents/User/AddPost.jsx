// // import { useState } from 'react';
// // import { useGlobalState } from '../../../../../../BackendIntegration/UserData/GeneralDataManagement';
// // import { uploadImageViaBackend } from '../../../../../../Utils/uploadImageToImageKit';

// // import styles from '../../../../../CSS/PokeStyles.module.css';
// // import axios from 'axios';

// // export default function AddPost({ goBack, onAddItem, activeLink }) {
// //   const { profileData } = useGlobalState();
// //     const { refreshUserData } = useGlobalState();
// //   const [caption, setCaption] = useState('');
// //   const [image, setImage] = useState('');
// //   const [error, setError] = useState(''); // State to hold error messages

// //   const handleAdd = async () => {
// //     const token = localStorage.getItem('token'); // Get the token from localStorage

// //     // Log the token and post data to verify they're correct
// //     console.log('Token:', token);
// //     console.log('Collection ID:', activeLink.id);
// //     console.log('Prepared post data:', {
// //       collectionID: activeLink.id,
// //       postContent: caption,
// //       postImageURL: image,
// //       postType: 'public',
// //     });

// //     const collectionID = activeLink.id; // Use the passed activeLink prop to get the correct collectionID
// // console.log('Collection ID:', collectionID);
// // console.log('IMAGE: ', image);
// //     // Prepare the post object
// //     const newPost = {
// //       collectionID, // Use collectionID from activeLink
// //       postContent: caption,
// //       postImageURL: image,
// //       postType: 'public', // This can be dynamic based on the user's choice
// //     };

// //     try {
// //       // Make the API call to add the post to the backend
// //       const response = await axios.post('http://localhost:5005/api/posts', newPost, {
// //         headers: {
// //           Authorization: `Bearer ${token}`, // Ensure Bearer token is being sent correctly here
// //         },
// //       });

// //       // Check for both 200 and 201 status codes
// //       if (response.status === 200 || response.status === 201) {
// //         const addedPost = response.data; // The new post returned from the backend
// //         onAddItem(addedPost); // Add the new post to the UI
// //          refreshUserData(); // Refresh user data after adding the post
// //         goBack(); // Go back to the list view
// //         console.log('Post added successfully:', addedPost);
// //         setError(''); // Clear any previous error message
// //       } else {
// //         console.error('Failed to add post, unexpected status:', response.status);
// //         setError('Failed to add post. Please try again.'); // Set error message
// //       }
// //     } catch (error) {
// //       console.error('Error adding post:', error);
// //       setError('An error occurred. Please try again.'); // Set error message
// //     }
   
// //   };

// //   // return (
// //   //   <div className={styles.container}>
// //   //     <h2 className={styles.heading}>Add New Post</h2>

// //   //     <input
// //   //       className={styles.input}
// //   //       placeholder="Caption"
// //   //       value={caption}
// //   //       onChange={(e) => setCaption(e.target.value)}
// //   //     />

// //   //     <input
// //   //       className={styles.input}
// //   //       placeholder="Image URL"
// //   //       value={image}
// //   //       onChange={(e) => setImage(e.target.value)}
// //   //     />

// //   //     {/* Display error message if there is one */}
// //   //     {error && <div className={styles.errorMessage}>{error}</div>}

// //   //     <div className={styles.buttonRow}>
// //   //       <button onClick={goBack} className={styles.cancelBtn}>Cancel</button>
// //   //       <button onClick={handleAdd} className={styles.addBtn}>Add Post</button>
// //   //     </div>
// //   //   </div>
// //   // );

// //   return (
// //     <div className={styles.container}>
// //       <h2 className={styles.heading}>Add New Post</h2>
  
// //       <input
// //         className={styles.input}
// //         placeholder="Caption"
// //         value={caption}
// //         onChange={(e) => setCaption(e.target.value)}
// //       />
  
// //       <input
// //         className={styles.input}
// //         type="file"
// //         accept="image/*"
// //         onChange={async (e) => {
// //           const file = e.target.files[0];
// //           if (!file) return;
  
// //           try {
// //             const uploadedUrl = await uploadImageViaBackend(file);
// //             setImage(uploadedUrl);
// //             setError('');
// //           } catch (err) {
// //             console.error('Upload failed:', err);
// //             setError('Image upload failed. Please try again.');
// //           }
// //         }}
// //       />
  
// //       {/* Preview uploaded image */}
// //       {image && (
// //         <img src={image} alt="Preview" className={styles.previewImage} />
// //       )}
  
// //       {/* Display error message if there is one */}
// //       {error && <div className={styles.errorMessage}>{error}</div>}
  
// //       <div className={styles.buttonRow}>
// //         <button onClick={goBack} className={styles.cancelBtn}>Cancel</button>
// //         <button onClick={handleAdd} className={styles.addBtn}>Add Post</button>
// //       </div>
// //     </div>
// //   );
  
// // }


// import { useState } from 'react';
// import { useGlobalState } from '../../../../../../BackendIntegration/UserData/GeneralDataManagement';
// import { uploadImageViaBackend } from '../../../../../../Utils/uploadImageToImageKit';

// import styles from '../../../../../CSS/PokeStyles.module.css';
// import axios from 'axios';

// export default function AddPost({ goBack, onAddItem, activeLink }) {
//   const { refreshUserData } = useGlobalState();
//   const [caption, setCaption] = useState('');
//   const [image, setImage] = useState('');
//   const [error, setError] = useState('');

//   const handleAdd = async () => {
//     const token = localStorage.getItem('token');
//     const newPost = {
//       collectionID: activeLink.id,
//       postContent: caption,
//       postImageURL: image,
//       postType: 'public',
//     };

//     try {
//       const response = await axios.post('http://localhost:5005/api/posts', newPost, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200 || response.status === 201) {
//         const addedPost = response.data;
//         onAddItem(addedPost);
//         refreshUserData();
//         goBack();
//         setError('');
//       } else {
//         console.error('Unexpected response:', response.status);
//         setError('Failed to add post. Please try again.');
//       }
//     } catch (error) {
//       console.error('Add post error:', error);
//       setError('An error occurred. Please try again.');
//     }
//   };

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       try {
//         const uploadedUrl = await uploadImageViaBackend(file);
//         setImage(uploadedUrl);
//         setError('');
//       } catch (err) {
//         console.error('Image upload failed:', err);
//         setError('Image upload failed. Please try again.');
//       }
//     }
//   };

//   return (
//     <div className={styles.filterTab}>
//       <button className={styles.button} onClick={goBack}>← Back</button>

//       <h2 className={styles.title}>Add New Post</h2>

//       <img
//         src={image || '/src/assets/fallback.png'}
//         alt="Post Preview"
//         style={{
//           width: '100%',
//           borderRadius: 12,
//           margin: '1rem 0',
//           objectFit: 'cover',
//           maxHeight: 200,
//         }}
//       />

//       <div className={styles.filterGroup}>
//         <input
//           className={styles.input}
//           placeholder="Caption"
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//         />

//         <input
//           className={styles.input}
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//         />

//         {error && <div className={styles.errorMessage}>{error}</div>}

//         <div className={styles.buttonGroup}>

//           <button className={styles.button} onClick={goBack}>Cancel</button>
//           <button className={styles.button} onClick={handleAdd}>Add Post</button>
          
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from 'react';
import { useGlobalState } from '../../../../../../BackendIntegration/UserData/GeneralDataManagement';
import { uploadImageViaBackend } from '../../../../../../Utils/uploadImageToImageKit';

import styles from '../../../../../CSS/PokeStyles.module.css';
import axios from 'axios';
import ImageEditorPopup from '../../../../Editor/ItemEditor';

export default function AddPost({ goBack, onAddItem, activeLink }) {
  const { refreshUserData } = useGlobalState();
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  const handleAdd = async () => {
    const token = localStorage.getItem('token');
    const newPost = {
      collectionID: activeLink.id,
      postContent: caption,
      postImageURL: image,
      postType: 'public',
    };

    try {
      const response = await axios.post('http://localhost:5005/api/posts', newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        const addedPost = response.data;
        onAddItem(addedPost);
        refreshUserData();
        goBack();
        setError('');
      } else {
        console.error('Unexpected response:', response.status);
        setError('Failed to add post. Please try again.');
      }
    } catch (error) {
      console.error('Add post error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedUrl = await uploadImageViaBackend(file);
        setImage(uploadedUrl);
        setError('');
      } catch (err) {
        console.error('Image upload failed:', err);
        setError('Image upload failed. Please try again.');
      }
    }
  };

  return (
    <div className={styles.filterTab}>
      <button className={styles.button} onClick={goBack}>← Back</button>

      <h2 className={styles.title}>Add New Post</h2>

      {image && !showEditor ? (
        <>
          <img
            src={image}
            alt="Preview"
            className={styles.previewImage}
          />
          <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={() => setShowEditor(true)}>Edit Image</button>
          </div>
        </>
      ) : null}

      <div className={styles.filterGroup}>
        <input
          className={styles.input}
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <input
          className={styles.input}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={goBack}>Cancel</button>
          <button className={styles.button} onClick={handleAdd}>Add Post</button>
        </div>
      </div>

      {showEditor && (
      <ImageEditorPopup
  imageUrl={image}
  onSave={async (editedDataUrl) => {
    try {
      const blob = await (await fetch(editedDataUrl)).blob();
      const file = new File([blob], "edited-image.png", { type: "image/png" });
      const uploadedUrl = await uploadImageViaBackend(file);
      setImage(uploadedUrl);
      setShowEditor(false);
    } catch (err) {
      console.error('Edited image upload failed:', err);
      setError('Edited image upload failed');
    }
  }}
  onCancel={() => setShowEditor(false)}
/>

      )}
    </div>
  );
}