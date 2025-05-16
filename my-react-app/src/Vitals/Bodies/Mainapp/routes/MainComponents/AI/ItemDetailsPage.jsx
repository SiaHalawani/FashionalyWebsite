import React, { useState, useEffect } from 'react';
import components from '../../../../../CSS/components.module.css';
import generator from '../../../../../CSS/generator.module.css';

export default function ItemDetailsPage({ item, onClose, onSelectItem }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!item) return null;

  return (
    <div className={components.mainbg} style={{ padding: '2rem' }}>
      <button 
        onClick={onClose} 
        className={generator.controlbutton}
        style={{ marginBottom: '1rem' }}
      >
        ← Back to Wardrobe
      </button>

      <div style={{ 
        display: 'flex', 
        gap: '2rem', 
        marginTop: '1rem',
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        <img
          src={item.image || item.imageUrl}
          alt={item.itemName}
          style={{ 
            width: '250px', 
            height: '250px',
            objectFit: 'cover',
            borderRadius: '12px'
          }}
          onError={(e) => {
            e.target.src = 'https://placehold.co/250x250?text=No+Image';
          }}
        />

        <div>
          <h2 style={{ marginTop: 0 }}>{item.itemName}</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <div>
              <p><strong>Category:</strong> {item.category || 'N/A'}</p>
              <p><strong>Type:</strong> {item.type || 'N/A'}</p>
              <p><strong>Brand:</strong> {item.brand || 'N/A'}</p>
              <p><strong>Style:</strong> {item.style || 'N/A'}</p>
              <p><strong>Fit:</strong> {item.fit || 'N/A'}</p>
              <p><strong>Price:</strong> {item.price ? `$${Number(item.price).toFixed(2)}` : 'N/A'}</p>
            </div>
            <div>
              <p><strong>Color:</strong> {item.color || 'N/A'}</p>
              <p><strong>Material:</strong> {item.material || 'N/A'}</p>
              <p><strong>Season:</strong> {Array.isArray(item.season) ? item.season.join(', ') : item.season || 'N/A'}</p>
              <p><strong>Temperature Range:</strong> {Array.isArray(item.temperature) ? `${item.temperature[0]}°C to ${item.temperature[1]}°C` : `${item.temperature ?? 'N/A'}°C`}</p>
              <p><strong>Occasion:</strong> {item.occasion || 'N/A'}</p>
              <p><strong>Essential:</strong> {item.essential ? 'Yes' : 'No'}</p>
            </div>
          </div>

          <button
            onClick={() => onSelectItem(item)}
            className={generator.controlbutton}
            style={{ 
              marginTop: '1.5rem',
              padding: '0.5rem 1.5rem'
            }}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}
