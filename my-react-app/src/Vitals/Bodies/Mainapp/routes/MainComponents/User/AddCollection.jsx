import { useState } from 'react';
import styles from '../../../../../CSS/PokeStyles.module.css';

export default function AddCollection({ goBack, onAddItem, userData }) {
  const outfitLinks = userData?.components?.outfits || [];
  const outfits = outfitLinks.flatMap(link => link.items || []);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [styleTags, setStyleTags] = useState('');
  const [selectedOutfits, setSelectedOutfits] = useState([]);

  const handleAdd = () => {
    const newCollection = {
      id: Date.now(),
      title: name,
      category,
      image,
      author,
      styleTag: styleTags.split(',').map(tag => tag.trim()),
      outfits: selectedOutfits.map(o => o.id),
      items: selectedOutfits.map(outfit => ({
        id: outfit.id,
        title: outfit.title || outfit.itemName || 'Untitled',
        preview: outfit.image || '/src/assets/fallback.png',
      })),
    };

    onAddItem(newCollection);
    console.log('%c✅ Collection added. Updated dummyData:', 'color: limegreen; font-weight: bold;');
    console.log(JSON.stringify(newCollection, null, 2));
    goBack();
  };

  const toggleOutfit = (outfit) => {
    const already = selectedOutfits.find(o => o.id === outfit.id);
    setSelectedOutfits((prev) =>
      already ? prev.filter(o => o.id !== outfit.id) : [...prev, outfit]
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add Collection</h2>

      <input className={styles.input} placeholder="Collection Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className={styles.input} placeholder="Category (e.g. spring, winter)" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input className={styles.input} placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
      <input className={styles.input} placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input className={styles.input} placeholder="Style Tags (comma-separated)" value={styleTags} onChange={(e) => setStyleTags(e.target.value)} />

      <h3 className={styles.subheading}>Choose Outfits</h3>
      <div className={styles.scrollContainer}>
        {outfits.map(outfit => (
          <div
            key={outfit.id}
            className={`${styles.outfitCard} ${selectedOutfits.find(o => o.id === outfit.id) ? styles.selected : ''}`}
            onClick={() => toggleOutfit(outfit)}
          >
            <img src={outfit.image || '/src/assets/fallback.png'} alt={outfit.title || outfit.itemName} className={styles.outfitImage} />
            <p className={styles.outfitTitle}>{outfit.title || outfit.itemName}</p>
          </div>
        ))}
      </div>

      {selectedOutfits.length > 0 && (
        <>
          <h4 className={styles.subheading}>Added to Collection</h4>
          <div className={styles.selectedGrid}>
            {selectedOutfits.map(outfit => (
              <div key={outfit.id} className={styles.selectedItem}>
                <img src={outfit.image || '/src/assets/fallback.png'} alt={outfit.title || outfit.itemName} className={styles.selectedImage} />
                <p>{outfit.title || outfit.itemName}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className={styles.buttonRow}>
        <button onClick={goBack} className={styles.cancelBtn}>Cancel</button>
        <button onClick={handleAdd} className={styles.addBtn}>Add Collection</button>
      </div>
    </div>
  );
}
