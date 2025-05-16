import { useEffect, useState } from 'react';
import styles from '../../../../CSS/Sellercss/mainseller.module.css';
import JoinSellerForm from './JoinSellerForm';

export default function MainSeller() {
  const [joining, setJoining] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  // On first load, check if user has a seller account
  useEffect(() => {
    const hasSellerAccount = localStorage.getItem('isSeller') === 'true';
    setIsSeller(hasSellerAccount);
  }, []);

  // If user is not a seller or hasn't completed onboarding
  if (!isSeller || joining) {
    return (
      <JoinSellerForm
        goBack={() => setJoining(false)}
        onComplete={() => {
          localStorage.setItem('isSeller', 'true');
          setIsSeller(true);
          setJoining(false);
        }}
      />
    );
  }

  // Seller Dashboard (after successful onboarding)
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Seller Dashboard</h1>

      <div className={styles.grid}>
        <div className={styles.section}>
          <h2 className={styles.subtitle}>Reach Thousands</h2>
          <p className={styles.description}>
            Connect with a vibrant fashion community and expand your brand across the platform.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.subtitle}>Manage Your Shop</h2>
          <p className={styles.description}>
            Upload products, track orders, and grow your business using our seamless seller tools.
          </p>
        </div>

        <div className={styles.sectionBottom}>
          <h2 className={styles.subtitle}>Ready to Grow?</h2>
          <p className={styles.description}>
            Access powerful analytics, boost visibility, and run your store from anywhere.
          </p>
        </div>
      </div>
    </div>
  );
}
