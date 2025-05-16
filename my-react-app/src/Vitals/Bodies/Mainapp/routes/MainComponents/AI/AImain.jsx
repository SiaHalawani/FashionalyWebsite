import styles from '../../../../../CSS/Aimain.module.css';

export default function AImain(props) {
  const handleClick = () => {
    props.setChange(!props.change);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>AI Generator</h1>

      <div className={styles.section}>
        <h2 className={styles.subtitle}>Outfit Generation</h2>
        <p className={styles.description}>
          Create custom outfit suggestions using your wardrobe and AI-powered styling preferences.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subtitle}>Style Your Look</h2>
        <p className={styles.description}>
          Upload your clothes or describe your vibe. The AI will create stunning outfits for you!
        </p>
        <button className={styles.startButton} onClick={handleClick}>
          Start Styling
        </button>
      </div>
    </div>
  );
}
