import { useSellerState } from "../../../../../BackendIntegration/SellerData/SellerDataManagement";
import { useState } from "react";
import styles from "./AdBudget.module.css";
import { updateAdBudget } from "../../../../../BackendIntegration/AxiosConnections/SellerAxios";

export default function AdBudget() {
  const { sellerProfile, setSellerProfile } = useSellerState();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(""); // New: store input

  const handleDummyPayment = async () => {
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      setPaymentStatus("Please enter a valid amount.");
      return;
    }

    try {
      const result = await updateAdBudget(sellerProfile.sellerId, amount);

      // Update locally
      setSellerProfile(prev => ({
        ...prev,
        adBudget: {
          ...prev.adBudget,
          currentBudget: (prev.adBudget?.currentBudget || 0) + amount
        }
      }));

      setPaymentStatus(result.message);
      setPaymentAmount(""); // Clear input after success
    } catch (err) {
      console.error(err);
      setPaymentStatus("Payment failed.");
    }
  };

  const adBudget = sellerProfile?.adBudget || null;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Ad Budget Management</h1>

      <div className={styles.card}>
        <h2 className={styles.subheader}>Current Ad Budget Info</h2>
        {adBudget ? (
          <ul className={styles.budgetList}>
            <li><strong>Current Budget:</strong> ${adBudget.currentBudget}</li>
            <li><strong>Spent:</strong> ${adBudget.spent}</li>
          </ul>
        ) : (
          <p className={styles.notSet}>Ad budget info not set yet.</p>
        )}
      </div>

      <div className={styles.card}>
        <h2 className={styles.subheader}>Add Funds to Ad Budget</h2>
        <p> 💳 Enter the amount you want to add </p>

        <input
          type="number"
          placeholder="Enter amount ($)"
          className={styles.inputField}
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
        />

        <button className={styles.paypalButton} onClick={handleDummyPayment}>
         Pay
        </button>

        {paymentStatus && <p className={styles.successMsg}>{paymentStatus}</p>}
      </div>
    </div>
  );
}
