import React from 'react';

export default function SmallLoading() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid var(--background-color-secondary)',
    borderTop: '4px solid var(--text-titles)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};
