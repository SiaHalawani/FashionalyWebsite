// src/Pages/ErrorPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../CSS/ErrorPage.module.css';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.errorContainer}>
      <h1>😵 Oops! Something went wrong.</h1>
      <p>We couldn’t load this page. Please try again later.</p>
      <button onClick={() => navigate('/login')}>Exit</button>
    </div>
  );
}
