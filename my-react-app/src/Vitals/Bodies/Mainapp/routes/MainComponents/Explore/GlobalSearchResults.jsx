import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { globalSearch } from '../../../../../../BackendIntegration/AxiosConnections/UserGetConnections/ExploreAxios';
import styles from '../../../../../CSS/explore.module.css';
import Masonry from 'react-masonry-css';

const masonryBreakpoints = {
  default: 6,
  1400: 5,
  1200: 4,
  900: 3,
  600: 2
};

export default function GlobalSearchSection({ searchQuery }) {
  const [query, setQuery] = useState(searchQuery);
  const [results, setResults] = useState({
    users: [],
    items: [],
    posts: [],
    collections: [],
    outfits: []
  });

  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim() !== '') {
        const data = await globalSearch(query);
        setResults({
          users: data.users?.results || [],
          items: data.items?.results || [],
          posts: data.posts?.results || [],
          collections: data.collections?.results || [],
          outfits: data.outfits?.results || []
        });
      }
    };
    fetchResults();
  }, [query]);

  const handleItemClick = (item) => {
    const itemId = item.itemID || item.id;
    const userId = item.userID;
    if (itemId) {
      navigate(`/Fashop/UserItems/${itemId}`, { state: { background: location } });
    }
  };

  const handleUserClick = (user) => {
  
    if (user.id) {
      navigate(`/Fashop/User/${user.id}`);
    }
  };

  const handlePostClick = (post) => {
    const postId = post.postID || post.id;
    if (postId) {
      navigate(`/Fashop/Post/${postId}`, { state: { background: location } });
    }
  };

  const handleOutfitClick = (outfit) => {
    const outfitId = outfit.outfitID || outfit.id;
    if (outfitId) {
      navigate(`/Fashop/Outfit/${outfitId}`, { state: { background: location } });
    }
  };

  const renderItemsMasonry = (label, dataArray, onClick) => {
    if (!dataArray || dataArray.length === 0) return null;
    return (
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{label}</h2>
        <Masonry
          breakpointCols={masonryBreakpoints}
          className={styles.exploreMasonryGrid}
          columnClassName={styles.exploreMasonryColumn}
        >
          {dataArray.map((item, index) => (
            <div
              key={item.id || index}
              className={styles.card}
              onClick={() => onClick?.(item)}
              style={{ transform: `scale(${0.95 + Math.random() * 0.1})` }}
            >
              <img
                src={
                  item.imageURL ||
                  item.image ||
                  item.profilePic ||
                  item.postImageURL ||
                  item.previewImage ||
                  '/fallback.jpg'
                }
               
              />
              <p>
                {item.itemName ||
                  item.title ||
                  item.username ||
                  item.caption ||
                  item.outfitName ||
                  'Untitled'}
              </p>
            </div>
          ))}
        </Masonry>
      </div>
    );
  };

  const renderTabContent = () => {
    if (activeTab === 'all') {
      return (
        <>
          {renderItemsMasonry('Users', results.users, handleUserClick)}
          {renderItemsMasonry('Items', results.items, handleItemClick)}
          {renderItemsMasonry('Posts', results.posts, handlePostClick)}
          {/* {renderItemsMasonry('Collections', results.collections)} */}
          {renderItemsMasonry('Outfits', results.outfits, handleOutfitClick)}
        </>
      );
    }
    if (activeTab === 'users') return renderItemsMasonry('Users', results.users, handleUserClick);
    if (activeTab === 'items') return renderItemsMasonry('Items', results.items, handleItemClick);
    if (activeTab === 'posts') return renderItemsMasonry('Posts', results.posts, handlePostClick);
    // if (activeTab === 'collections') return renderItemsMasonry('Collections', results.collections);
    if (activeTab === 'outfits') return renderItemsMasonry('Outfits', results.outfits, handleOutfitClick);
    return null;
  };

  return (
    <div className={styles.globalSearch}>
 <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: '600', margin: '20px 0', color: 'var(--text-titles)' }}>
  Global Search
</h2>

      <div className={styles.searchBar}>
       
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search globally..."
        />
        <button disabled>Search</button>
      </div>

      <select
        value={activeTab}
        onChange={(e) => setActiveTab(e.target.value)}
        className={styles.tabSelector}
      >
        <option value="all">All</option>
        <option value="users">Users</option>
        <option value="items">Items</option>
        <option value="posts">Posts</option>
        {/* <option value="collections">Collections</option> */}
        <option value="outfits">Outfits</option>
      </select>

      <div className={styles.tabContent}>{renderTabContent()}</div>
    </div>
  );
}
