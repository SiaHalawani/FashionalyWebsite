import React from 'react';
import styles from '../../../../CSS/Sellercss/SellerDashboard.module.css';

export default function SellerStats({ stats }) {
  return (
    <div className={styles.statsContainer}>
      <h2>Seller Dashboard</h2>
      <div className={styles.statsGrid}>
        <div className={styles.card}><h3>{stats.sales}</h3><p>Total Sales</p></div>
        <div className={styles.card}><h3>${stats.revenue}</h3><p>Revenue</p></div>
        <div className={styles.card}><h3>{stats.followers}</h3><p>Followers</p></div>
        <div className={styles.card}><h3>{stats.items}</h3><p>Items Listed</p></div>
      </div>
    </div>
  );
}
