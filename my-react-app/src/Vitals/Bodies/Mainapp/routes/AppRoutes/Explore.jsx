import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../../../CSS/explore.module.css';
import phone from '../../../../CSS/phonenofooter.module.css';
import components from '../../../../CSS/components.module.css';
import containers from '../../../../CSS/containers.module.css';
import ExploreSection from '../MainComponents/Explore/Exploresection';
import ExploreFilter from '../MainComponents/Explore/ExploreFilter';
import { getExploreData, getWardrobeFeed } from '../../../../../BackendIntegration/AxiosConnections/UserGetConnections/ExploreAxios';
import { getAllUsers } from '../../../../../BackendIntegration/AxiosConnections/UserGetConnections/UserAxios';
import userGrid from '../../../../CSS/UserGrid.module.css';
import SmallLoading from '../../../../Components/SmallLoading';
import GlobalSearchResults from '../MainComponents/Explore/GlobalSearchResults';
import Masonry from 'react-masonry-css';

const masonryBreakpoints = {
  default: 3,
  1100: 2,
  700: 1
};
export default function Explore() {
  const navigate = useNavigate();
  const location = useLocation();

  const [exploreMode, setExploreMode] = useState('globalsearch');

  const [groupBy, setGroupBy] = useState('category');
  const [exploreData, setExploreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');
  const [savedFilters, setSavedFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (exploreMode === 'globalsearch') return;
    const fetchExplore = async (query = '') => {
      setLoading(true);
      if (exploreMode === 'shop') {
        const data = await getExploreData(query);
        setExploreData(data);
      } else if (exploreMode === 'users') {
        const data = await getAllUsers();
        setExploreData(data.slice(0, 20));
      } else if (exploreMode === 'following') {
        const items = await getWardrobeFeed();
        setExploreData(items);
      }
      setLoading(false);
    };
    fetchExplore(filterQuery);
  }, [exploreMode, filterQuery]);

  const removeFilter = (key) => {
    const updatedFilters = { ...savedFilters };
    delete updatedFilters[key];
    const query = Object.entries(updatedFilters)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&');
    setFilterQuery(query);
    setSavedFilters(updatedFilters);
  };

  const groupItems = (items, key) => {
    return items.reduce((acc, item) => {
      let value;
      switch (key) {
        case 'category': value = item.category?.toLowerCase() || item.type?.toLowerCase() || 'other'; break;
        case 'brand': value = item.brand?.toLowerCase() || 'unknown'; break;
        case 'season': value = item.season?.toLowerCase() || 'all'; break;
        case 'occasion': value = item.occasion?.toLowerCase() || 'general'; break;
        case 'user': value = `User ${item.userID}`; break;
        default: value = 'other';
      }
      if (!acc[value]) acc[value] = [];
      acc[value].push(item);
      return acc;
    }, {});
  };

  const handleSellerItemClick = (item, sellerId) => {
    const itemId = item.itemID || item.id;
    if (itemId && sellerId) {
      navigate(`/Fashop/Item/${sellerId}/${itemId}`, { state: { background: location } });
    }
  };

  const handleUserItemClick = (item) => {
    const itemId = item.itemID || item.id;
    const userId = item.userID;
    if (itemId && userId) {
      navigate(`/Fashop/UserItems/${itemId}`, { state: { background: location } });
    }
  };

  const handleUserClick = (user) => {
    if (user.userID) {
      navigate(`/Fashop/User/${user.userID}`);
    }
  };

  return (
    <div className={components.mainbg}>
      <div className={phone.phone}>
        {/* LEFT SECTION */}
        <div className={`${phone.pos_top} ${containers.headercontainer}`}>
          <div className={styles.modeSwitch}>
              <button onClick={() => setExploreMode('globalsearch')}>Global Search</button>

            <button onClick={() => setExploreMode('shop')}>Shop Items</button>
            {/* <button onClick={() => setExploreMode('users')}>Users</button> */}
            <button onClick={() => setExploreMode('following')}>Following Items</button>
          
            {(exploreMode === 'shop' || exploreMode === 'following') && (
              <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                <option value="category">Category</option>
                <option value="brand">Brand</option>
                <option value="season">Season</option>
                <option value="occasion">Occasion</option>
                {exploreMode === 'following' && <option value="user">User</option>}
              </select>
            )}
          </div>

          {showFilter && exploreMode === 'shop' && (
            <ExploreFilter
              initialFilters={savedFilters}
              onApply={(query, filters) => {
                const cleaned = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''));
                const newQuery = Object.entries(cleaned)
                  .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
                  .join('&');
                setFilterQuery(newQuery);
                setSavedFilters(cleaned);
                setShowFilter(false);
              }}
              onClose={() => setShowFilter(false)}
            />
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className={phone.pos_mid1}>
          <div className={styles.exploreWrapper}>
            <div className={styles.exploreContainer}>
              {exploreMode === 'globalsearch' && (
                <>
                  <GlobalSearchResults searchQuery={searchQuery} />
                </>
              )}

              {exploreMode !== 'globalsearch' && (
                <>
                  <div className={styles.searchBar}>
                    <div className={styles.activeFilters}>
                      {Object.entries(savedFilters).map(([key, value]) => (
                        <div key={key} className={styles.filterTag}>
                          {key}: {value}
                          <button onClick={() => removeFilter(key)}>×</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {loading ? (
                    <SmallLoading />
                  ) : exploreMode === 'users' ? (
                   <Masonry
  breakpointCols={{
    default: 7,
    1400: 6,
    1200: 5,
    1000: 4,
    800: 3,
    600: 2
  }}
  className={styles.exploreMasonryGrid}
  columnClassName={styles.exploreMasonryColumn}
>
  {exploreData.map((user) => (
    <div
      key={user.id}
      className={styles.card}
      onClick={() => handleUserClick(user)}
    >
      <img
        src={user.profilePic || '/default-avatar.png'}
        alt={user.username}
      />
      <p>{user.username}</p>
    </div>
  ))}
</Masonry>

                  ) : exploreMode === 'following' ? (<>
 <h2
  style={{
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: '600',
    margin: '30px 0 10px',
    color: 'var(--text-titles)'
  }}
>
  Your Followers' Items
</h2>
<p
  style={{
    textAlign: 'center',
    fontSize: '14px',
    color: 'var(--text-subtitles)',
    marginBottom: '24px'
  }}
>
  Browse the latest wardrobe items posted by people you follow.
</p>


  {Object.entries(groupItems(exploreData || [], groupBy)).map(([groupKey, items]) => (
    <div key={`group-${groupKey}`} className={styles.section}>
      <h2 className={styles.sectionTitle}>
        {groupKey.charAt(0).toUpperCase() + groupKey.slice(1)}
      </h2>
      <Masonry
        breakpointCols={{
          default: 8,
          1600: 6,
          1400: 5,
          1100: 4,
          900: 3,
          600: 2
        }}
        className={styles.exploreMasonryGrid}
        columnClassName={styles.exploreMasonryColumn}
      >
        {items.map(item => (
          <div
            key={item.itemID}
            className={styles.card}
            onClick={() => handleUserItemClick(item)}
           
          >
            <img src={item.imageURL} alt={item.itemName} />
            <p>{item.itemName}</p>
          </div>
        ))}
      </Masonry>
    </div>
  ))}
</>
   ) : (
  <>
    <h2
      style={{
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: '600',
        margin: '30px 0 10px',
        color: 'var(--text-titles)'
      }}
    >
      Explore All Shops
    </h2>
    <p
      style={{
        textAlign: 'center',
        fontSize: '14px',
        color: 'var(--text-subtitles)',
        marginBottom: '30px'
      }}
    >
      Discover curated pieces from sellers around the world. Each shop is uniquely styled and categorized.
    </p>

    {exploreData.map((seller) => {
      const grouped = groupItems(seller.items || [], groupBy);
      return (
        <div key={seller.id} className={styles.sellerSection}>
          <h2 className={styles.sellerShopTitle}>
            🛍️ {seller.brandName}
          </h2>

          {Object.entries(grouped).map(([groupKey, items]) => (
            <div key={`${seller.id}-${groupKey}`} className={styles.sellerGroup}>
              <h3 className={styles.sellerGroupTitle}>
                {groupKey.charAt(0).toUpperCase() + groupKey.slice(1)}
              </h3>

              <Masonry
                breakpointCols={{
                  default: 8,
                  1600: 6,
                  1400: 5,
                  1100: 4,
                  900: 3,
                  600: 2
                }}
                className={styles.exploreMasonryGrid}
                columnClassName={styles.exploreMasonryColumn}
              >
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={styles.card}
                    onClick={() => handleSellerItemClick(item, seller.id)}
                  >
                    <img src={item.image} alt={item.itemname} />
                    <p>{item.itemname}</p>
                  </div>
                ))}
              </Masonry>
            </div>
          ))}
        </div>
      );
    })}
  </>
)}
                </>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className={`${phone.pos_bottom} ${containers.footercontainer}`}>
          <div className={containers.desktopOnly}>
            <div className={containers.suggestSection}>
              <div className={containers.suggestHeader}>Suggested</div>
              <div className={containers.suggestUser}>
                <button>
                  <img src="/src/assets/avatar1.png" alt="Suggested" />
                  <div className={containers.suggestText}>
                    <p className={containers.username}>fashion@cool</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
