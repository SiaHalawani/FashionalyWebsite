import { useState, useEffect } from 'react';
import styles from '../../../../../../CSS/PokeStyles.module.css';
import { useGlobalState } from '../../../../../../../BackendIntegration/UserData/GeneralDataManagement';
import { getPostById } from '../../../../../LinkPages/PostLinkPage/Axios';

export default function ViewPost({ item, goBack, onDeleteItem, onUpdateItem }) {
  const { refreshUserData } = useGlobalState();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!item?.id) return;

      try {
        const data = await getPostById(item.id);
        console.log('📦 ViewPost post:', data);
        setPost(data);
      } catch (error) {
        console.error('❌ Failed to fetch post with getPostById:', error);
      }
    };

    fetchPost();
  }, [item]);

  if (!post) return <div className={styles.container}>Loading post...</div>;

return (
  <div className={styles.filterTab}>
    <button className={styles.button} onClick={goBack}>← Back</button>
    <h2 className={styles.title}>View Post</h2>

    <img
      src={post.postImageURL || '/src/assets/fallback.png'}
      alt="Post"
      style={{
        width: '100%',
        borderRadius: 12,
        margin: '1rem 0',
        objectFit: 'cover',
        maxHeight: 200,
      }}
    />

    <div className={styles.filterGroup}>
      <p><b>Caption:</b> {post.postContent}</p>
      <p><b>Created:</b> {new Date(post.createdAt).toLocaleString()}</p>
      <p><b>Likes:</b> ❤️ {post.likesCount}</p>
      <p><b>Comments:</b> 💬 {post.commentsCount}</p>
    </div>
  </div>
);



}
