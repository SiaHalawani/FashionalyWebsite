import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getExploreData } from '../../../../../../../BackendIntegration/AxiosConnections/UserGetConnections/ExploreAxios';
import ExploreSection from '../../../MainComponents/Explore/Exploresection';
import styles from '../../../../../../CSS/SUGGESTEDSELLERS.module.css';
import { scoreItem } from './scoringfunction';

export default function SuggestedSellerItems({ filters, weights }) {
  const [topItems, setTopItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchTopSuggestions = async () => {
      const sellers = await getExploreData();

      const allItems = sellers.flatMap(seller =>
        (seller.items || []).map(item => {
          let temperature;
          if (item.temperatureRange) {
            const match = item.temperatureRange.match(/^(-?\d+)-(-?\d+)/);
            if (match) {
              temperature = [parseInt(match[1], 10), parseInt(match[2], 10)];
            }
          }
          return {
            ...item,
            temperature,
            sellerId: seller.id,
            brandName: seller.brandName,
            brandLogo: seller.image
          };
        })
      );

      const scored = scoreItem(allItems, filters, weights)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      setTopItems(scored);
    };

    fetchTopSuggestions();
  }, [filters, weights]);

  const handleClick = (item) => {
    const itemId = item.itemID || item.id;
    if (itemId && item.sellerId) {
      navigate(`/Fashop/Item/${item.sellerId}/${itemId}`, {
        state: { background: location }
      });
    }
  };

 return (
  <div>
       <h1 className="addItemsHeader">Seller Suggestions</h1>
  <div className={styles.suggestedScrollWrapper}>
 
    {topItems.map(item => (
      <div
        key={item.id}
        className={styles.suggestedItemCard}
        onClick={() => handleClick(item)}
      >
        <img src={item.image || item.imageURL} alt={item.itemname || 'Item'} />
        <p>{item.itemname || item.itemName}</p>
      </div>
    ))}
  </div>
  </div>
);
}
