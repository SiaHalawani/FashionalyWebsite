import React from "react";
import logo from '../../assets/logo.png';

export default function LoadingScreen() {
  return (
    <div style={styles.background}>
      <div style={styles.center}>
        <img src={logo} alt="Fashionly Logo" style={styles.logo} />
        <h1 style={styles.title}>Fashionly</h1>
        <p style={styles.subtitle}>
          Loading<span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </p>
      </div>

      {/* Inline CSS for animation */}
      <style>
        {`
          .dot {
            animation: blink 1.5s infinite;
            font-weight: bold;
          }

          .dot:nth-child(2) {
            animation-delay: 0.2s;
          }

          .dot:nth-child(3) {
            animation-delay: 0.4s;
          }

          @keyframes blink {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  background: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "var(--background-color)",
  },
  center: {
    textAlign: "center",
    animation: "fadeIn 0.8s ease-in-out",
  },
  logo: {
    width: "120px",
    height: "auto",
    marginBottom: "1.2rem",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
  },
  title: {
    fontSize: "3rem",
    fontWeight: "bold",
    color: "var(--text-titles)",
    margin: "0.5rem 0",
  },
  subtitle: {
    fontSize: "1.25rem",
    color: "var(--text-subtitles)",
    marginTop: "1rem",
    display: "flex",
    justifyContent: "center",
    gap: "0.2rem",
  },
};

