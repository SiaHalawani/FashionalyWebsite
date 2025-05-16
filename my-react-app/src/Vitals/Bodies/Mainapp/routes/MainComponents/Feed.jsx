import { useRef, useState, useEffect } from 'react';
import styles from '../../../../CSS/feed.module.css';
import { fetchExplorePosts, registerPostClick } from '../../../../../BackendIntegration/AxiosConnections/ExploreSellerPostApi';
import { getSuggestedUsers, followUser } from '../../../../../BackendIntegration/AxiosConnections/UserGetConnections/UserAxios';
import { getFeedPosts } from '../../../../../BackendIntegration/AxiosConnections/FriendlyFeed';
import { likePost, unlikePost, getPostLikes } from '../../../../../BackendIntegration/LikeComment/Likes';
import { fetchCommentCount } from '../../../../../BackendIntegration/LikeComment/Comments';
import { useNavigate, useLocation } from 'react-router-dom';

import components from '../../../../CSS/components.module.css';
import stylesButton from '../../../../CSS/button.module.css';
import { useGlobalState } from '../../../../../BackendIntegration/UserData/GeneralDataManagement';
import SmallLoading from '../../../../Components/SmallLoading'; // adjust path if needed
import Masonry from 'react-masonry-css';


import { getFollowedStories, createStory, getUserStories } from '../../../../../BackendIntegration/StoriesHighlights/storyAxios';

import StoryPopup from './Feeds/Storypopup'; // adjust path
import AddStoryPopup from './Feeds/AddStoryPopup';
import MyStoryPopup from './Feeds/MyStoryPopup';
const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1
};

export default function Feed() {
  const location = useLocation();
  const [activeStory, setActiveStory] = useState(null);
const [showAddPopup, setShowAddPopup] = useState(false);
const [myStoryPopup, setMyStoryPopup] = useState(false);

const [userStories, setUserStories] = useState([]);


  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const { profileData } = useGlobalState();
  const currentUserId = profileData?.userId;
  const [visibleCount, setVisibleCount] = useState(10);

  const [feedData, setFeedData] = useState([]);
  const [commentsCount, setCommentsCount] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [likeLoading, setLikeLoading] = useState({});
  const [recommended, setRecommended] = useState([]);
  const [feedLoading, setFeedLoading] = useState(true);
  const [loading, setLoading] = useState(false);
// 🔧 Move both functions OUTSIDE the useEffect
const loadUserStories = async () => {
  try {
    const [followedRes, myRes] = await Promise.all([
      getFollowedStories(),
      getUserStories(currentUserId)
    ]);

    console.log("📦 Followed users' stories:", followedRes.data);
    console.log("🧍 My stories:", myRes.data);

    const myStories = myRes.data || [];
    const myStory = myStories.length > 0
      ? { ...myStories[0], isOwn: true }
      : null;

    const followed = followedRes.data || [];

    setUserStories([
      ...(myStory ? [myStory] : []),
      ...followed
    ]);
  } catch (err) {
    console.error("❌ Failed to load stories:", err);
  }
};



const loadFeed = async () => {
  setFeedLoading(true);
  try {
    const [adsRaw, postsRaw] = await Promise.all([
      fetchExplorePosts('user123'),
      getFeedPosts()
    ]);

    const ads = adsRaw.map((ad, i) => ({
      id: `ad_${i}`,
      type: 'ad',
      brand: ad.brandName,
      description: ad.caption,
      image: ad.image,
      postId: ad.postId,
      sellerId: ad.sellerId,
      likes: ad.likes,
      comments: ad.comments,
    }));

    const posts = postsRaw.map(post => ({
      id: `post_${post.postID}`,
      type: 'post',
      ...post
    }));

    const mixedFeed = [];
    let adIndex = 0;
    for (let i = 0; i < posts.length; i++) {
      mixedFeed.push(posts[i]);
      if ((i + 5) % 3 === 0 && adIndex < ads.length) {
        mixedFeed.push(ads[adIndex]);
        adIndex++;
      }
    }

    setFeedData(mixedFeed);

    const likeMap = {};
    const commentMap = {};
    await Promise.all(postsRaw.map(async (post) => {
      likeMap[post.postID] = await getPostLikes(post.postID);
      commentMap[post.postID] = await fetchCommentCount(post.postID);
    }));
    setLikeCounts(likeMap);
    setCommentsCount(commentMap);
  } catch (err) {
    console.error("❌ Failed to load feed:", err);
  }
  setFeedLoading(false);
};

// ✅ Then just this one clean useEffect
useEffect(() => {
  loadFeed();
  loadUserStories();
}, []);


  const handleAddStory = async () => {
  const mediaURL = prompt("Enter story image or video URL:");
  if (!mediaURL) return;

  try {
    await createStory({
      mediaURL,
      mediaType: "image", // or "video"
      caption: "My new story!",
      visibility: "followers"
    });
    await loadUserStories(); // Refresh after adding
  } catch (err) {
    console.error("❌ Story creation failed:", err);
  }
};

  

  const toggleLike = async (postID) => {
    if (likeLoading[postID]) return;
    setLikeLoading(prev => ({ ...prev, [postID]: true }));

    try {
      if (likedPosts[postID]) {
        await unlikePost(postID);
        setLikedPosts(prev => ({ ...prev, [postID]: false }));
        setLikeCounts(prev => ({ ...prev, [postID]: prev[postID] - 1 }));
      } else {
        await likePost(postID);
        setLikedPosts(prev => ({ ...prev, [postID]: true }));
        setLikeCounts(prev => ({ ...prev, [postID]: (prev[postID] || 0) + 1 }));
      }
    } catch (err) {
      console.error("❌ Like error:", err);
    }

    setLikeLoading(prev => ({ ...prev, [postID]: false }));
  };

  const handleFollowUser = async (userId) => {
    const result = await followUser(currentUserId, userId);
    if (result) {
      setRecommended(prev => prev.filter(user => user.userID !== userId));
    }
  };

  const renderPost = (post) => {
    if (post.type === 'ad') {
      return (
        
        <div className={`${styles.adBox} ${post.type === 'ad' ? styles.adTint : ''}`} key={post.id}>

          <div className={styles.metaInfo}>
          <p className={styles.adDesc}>Advertisement</p>
            {/* <span> {post.likes}</span>
            <span> {post.comments?.length || 0}</span> */}
          </div>
          <p className={styles.adTitle} onClick={() => navigate(`/Fashop/Seller/${post.brand}`)}>{post.brand}</p>
          
        <img
  src={post.image}
  className={styles.adImage}
  alt="ad"
  onClick={() => navigate(`/Fashop/Ad/${post.sellerId}/${post.postId}`, {
    state: { background: location }
  })}
/>
 <p className={styles.adDesc}>{post.description}</p>
        </div>
      );
    }

    return (
      <div className={styles.adBox} key={post.id}>
        <div className={styles.postHeader}>
          <img
            src={post.user.profilePicture || '/src/assets/profilepic.png'}
            className={styles.avatar}
            alt="avatar"
            onClick={() => navigate(`/Fashop/User/${post.user.userID}`)}
          />
          <p className={styles.username} onClick={() => navigate(`/Fashop/User/${post.user.userID}`)}>
            {post.user.username}
          </p>
        </div>
        <img
          src={post.postImageURL}
          className={styles.adImage}
          alt="user post"
          onClick={() => 
            
           navigate(`/Fashop/Post/${post.postID}`, { state: { background: location } })
        }
        />
        <p className={styles.adDesc}>{post.postContent}</p>
        <div className={styles.metaInfo}>
          <span
            style={{ cursor: 'pointer', opacity: likeLoading[post.postID] ? 0.4 : 1 }}
            onClick={() => toggleLike(post.postID)}
          >
            {likedPosts[post.postID] ? '💖' : '🤍'} {likeCounts[post.postID] || 0}
          </span>
          <span>💬 {commentsCount[post.postID] || 0}</span>
        </div>
      </div>
    );
  };

  return (
    
  <div className={styles.feedWrapper}>
    {feedLoading ? (
      <div className={styles.fullPageLoader}>
        <SmallLoading />
      </div>
    ) : (
      <div className={styles.scrollArea}>
  {/* === STORIES BAR === */}
  <div className={styles.storiesContainer} ref={scrollRef}>
    <div className={styles.storiesTrack}>
      {/* ➕ Add Story Bubble */}
      <div
        className={styles.myAddStoryBubble}
        onClick={() => setShowAddPopup(true)}
      >
        <div className={styles.addStoryCircle}>+</div>
        <span>Add Story</span>
      </div>

      {/* 👁 View My Story Bubble (if it exists) */}
      {userStories.find(s => s.isOwn) && (
        <div
          className={styles.myViewStoryBubble}
          onClick={() => setMyStoryPopup(true)}
        >
          <img
            src={userStories.find(s => s.isOwn).mediaURL}
            alt="My story"
          />
          <span>Your Stories</span>
        </div>
      )}

      {/* 🧍 Other user stories */}
      {Object.values(
        userStories
          .filter(story => !story.isOwn)
          .reduce((acc, story) => {
            const userId = story.user?.userID || 'unknown';
            if (!acc[userId]) acc[userId] = story;
            return acc;
          }, {})
      ).map((story, index) => (
        <div
          key={index}
          className={styles.storyBubble}
          onClick={() => setActiveStory(story)}
        >
          <img src={story.mediaURL} alt={story.caption || "story"} />
          <span>@{story.user?.username || "user"}</span>
        </div>
      ))}
    </div>
  </div>

  {/* === FEED POSTS === */}
  <Masonry
    breakpointCols={breakpointColumnsObj}
    className={styles.masonryGrid}
    columnClassName={styles.masonryColumn}
  >
    {feedData.length === 0 ? (
      <p>No content available.</p>
    ) : (
      feedData.slice(0, visibleCount).map(renderPost)
    )}
  </Masonry>

  {visibleCount < feedData.length && (
    <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '12px',
  textAlign: 'center'
}}>
    <button
      onClick={() => setVisibleCount(prev => prev + 10)}
      className={stylesButton.followBtn}
      style={{ marginTop: '20px' }}
    >
      View More
    </button>
    </div>
  )}
</div>

    )}

    {activeStory && (
  <StoryPopup story={activeStory} onClose={() => setActiveStory(null)} />
)}

{showAddPopup && (
  <AddStoryPopup
    onClose={() => setShowAddPopup(false)}
    onStoryAdded={loadUserStories}
  />
)}

{myStoryPopup && currentUserId && (
  <MyStoryPopup
    userId={currentUserId}
    onClose={() => setMyStoryPopup(false)}
    onDeleted={loadUserStories}
  />
)}




    
  </div>
);

}
