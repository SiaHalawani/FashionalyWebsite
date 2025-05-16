import styles from '../../../../CSS/Sellercss/mainseller.module.css';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createSellerAndUpdateUser } from '../../../../../BackendIntegration/AxiosConnections/SellerAxios';

export default function JoinSellerForm() {
  const { userID } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    brandName: '',
    website: '',
    instagram: '',
    email: '',
    phone: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async () => {
    const { brandName, instagram, email, phone } = form;

    if (!brandName || !instagram || !email || !phone) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not logged in.');
        return;
      }

      const sellerId = String(userID);

      const sellerData = {
        sellerId,
        SellerBrandName: form.brandName,
        Sellerwebsite: form.website,
        SellerInstagram: form.instagram,
        SellerEmail: form.email,
        Sellerphone: form.phone,
        SellerName: '',
        joined: new Date().toISOString(),
        verified: false,
        stats: {
          sales: '0',
          revenue: '0',
          followers: '0',
          orders: '0',
          returns: '0',
          rating: '0'
        },
        AdBudget: {
          spent: 0,
          currentFunds: 0,
          campaignStats: {
            clicks: '0',
            ctr: '0',
            impressions: 0
          }
        }
      };

      await createSellerAndUpdateUser(sellerId, sellerData, token);
      navigate(`/seller/${sellerId}`);
    } catch (err) {
      console.error("Error in handleSubmit:", err);
      setError('Failed to create seller profile.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Join the Creator Marketplace</h1>
      <p className={styles.subtitle}>
        Complete your seller profile to start listing your products and engaging with the community.
      </p>

      <div className={styles.form}>
        <input
          type="text"
          name="brandName"
          placeholder="Brand Name *"
          value={form.brandName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="website"
          placeholder="Website (optional)"
          value={form.website}
          onChange={handleChange}
        />
        <input
          type="text"
          name="instagram"
          placeholder="Instagram Handle *"
          value={form.instagram}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number *"
          value={form.phone}
          onChange={handleChange}
        />

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.formButtons}>
          <button className={styles.startButton} onClick={handleSubmit}>
            Start Selling
          </button>
          <button className={styles.backButton} onClick={() => navigate('/Home')}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
