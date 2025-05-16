import styles from '../../../../CSS/Seller.module.css';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../../../../BackendIntegration/UserData/GeneralDataManagement';

export default function Seller() {
  const navigate = useNavigate();
  const { profileData } = useGlobalState();


  const handleClick = () => {
    console.log(profileData.userId);
    navigate(`/seller/${profileData.userId}`);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Become a Seller</h1>

      <div className={styles.gridContainer}>
        <div className={styles.section}>
          <h2 className={styles.subtitle}>Why Sell on Fashonly?</h2>
          <p className={styles.description}>
            Reach thousands of fashion lovers and grow your brand with a seamless digital storefront.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.subtitle}>Easy Setup</h2>
          <p className={styles.description}>
            Upload your items, set your prices, and start selling. We take care of visibility, traffic, and logistics.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.subtitle}>Join the Creator Marketplace</h2>
          <p className={styles.description}>
            Whether you're a small business or a fashion enthusiast, Fashonly gives you tools to shine.
          </p>
          <button className={styles.startButton} onClick={handleClick}>
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}
