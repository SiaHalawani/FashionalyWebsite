import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, getUserById } from './Axios';
import {
  likePost,
  unlikePost,
  getPostLikes
} from '../../../../BackendIntegration/LikeComment/Likes';
import {
  fetchComments,
  fetchCommentCount,
  submitComment
} from '../../../../BackendIntegration/LikeComment/Comments';
import { useGlobalState } from '../../../../BackendIntegration/UserData/GeneralDataManagement';
import styles from './AdLinkPage.module.css';

export default function PostLinkPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { profileData } = useGlobalState();
  const currentUserId = profileData?.userId;

  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [likeLoading, setLikeLoading] = useState(false);

useEffect(() => {
  const load = async () => {
    const fetchedPost = await getPostById(postId);
    if (fetchedPost) {
      setPost(fetchedPost);
      const fetchedUser = await getUserById(fetchedPost.userID);
      console.log("👤 User fetched:", fetchedUser); // ✅ ADD THIS LINE
      setUser(fetchedUser);

      const likes = await getPostLikes(postId);
      setLikesCount(likes);

      const allComments = await fetchComments(postId);
      setComments(allComments);

      const count = await fetchCommentCount(postId);
      setCommentCount(count);
    }
  };
  load();
}, [postId]);


  const handleLike = async () => {
    if (likeLoading) return;
    setLikeLoading(true);

    try {
      if (liked) {
        await unlikePost(postId);
        setLikesCount(prev => prev - 1);
      } else {
        await likePost(postId);
        setLikesCount(prev => prev + 1);
      }
      setLiked(prev => !prev);
    } catch (err) {
      console.error('Like/unlike failed:', err);
    }

    setLikeLoading(false);
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    try {
      await submitComment(postId, commentText);
      const updatedComments = await fetchComments(postId);
      const updatedCount = await fetchCommentCount(postId);
      setComments(updatedComments);
      setCommentCount(updatedCount);
      setCommentText('');
    } catch (err) {
      console.error('Comment failed:', err);
    }
  };

  return (
  <div className={styles.overlay}>
    <div className={styles.popup}>
      <button className={styles.closeButton} onClick={() => navigate(-1)}>×</button>

      {post && user ? (
        <div className={styles.content}>
          <div className={styles.imageSection}>
            <div
              className={styles.imageBlurBackground}
              style={{ backgroundImage: `url(${post.postImageURL})` }}
            />
            <img src={post.postImageURL} alt="Post" className={styles.adImage} />
            <p className={styles.username}>@{user.username}</p>
          </div>

          <div className={styles.metaSection}>
            <h2 className={styles.caption}>{post.postContent}</h2>

            <div className={styles.meta}>
              <button onClick={handleLike} disabled={likeLoading}>
                {liked ? '💖' : '🤍'} ({likesCount})
              </button>
            </div>

            <h3>Comments ({commentCount})</h3>
            <div className={styles.commentBox}>
              {comments.length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                comments.map((c, idx) => (
                  <div key={idx} className={styles.commentItem}>
                    {c.user?.profilePicture ? (
                      <img src={c.user.profilePicture} alt="User" />
                    ) : (
                      <div className={styles.defaultAvatar} />
                    )}
                    <div>
                      <strong>@{c.user?.username}</strong>
                      <p>{c.commentText}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className={styles.commentForm}>
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
              />
              <button onClick={handleCommentSubmit}>Post</button>
            </div>

            <div className={styles.infoBox}>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Created:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
              <button onClick={() => navigate(`/Fashop/User/${user.userID}`)}>
                View Profile
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className={styles.loading}>Loading post data...</p>
      )}
    </div>
  </div>
);

}
