import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { wardrobe } from '../routes/MainComponents/AI/dummydata/dummydata';
import components from '../../../CSS/components.module.css';
import generator from '../../../CSS/generator.module.css';

export default function ItemDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item, filters } = location.state || {};

  if (!item) return <div style={{ padding: '2rem' }}>Item not found.</div>;

  const similarItems = wardrobe.filter(
    w =>
      w.category === item.category &&
      w.id !== item.id &&
      w.gender === item.gender &&
      w.occasion?.includes(filters.occasion)
  );

  return (
    <div className={components.mainbg} style={{ padding: '2rem' }}>
      <button onClick={() => navigate(-1)} className={generator.controlbutton}>
        ← Back
      </button>

      <h1 style={{ marginTop: '1rem', color: '#1b1919' }}>{item.itemName}</h1>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <img
          src={item.imageUrl}
          alt={item.itemName}
          style={{ width: '250px', borderRadius: '12px' }}
        />

        <div>
          <p><strong>Category:</strong> {item.category}</p>
          <p><strong>Brand:</strong> {item.brand}</p>
          <p><strong>Color:</strong> {item.color}</p>
          <p><strong>Gender:</strong> {item.gender}</p>
          <p><strong>Season:</strong> {item.season?.join(', ')}</p>
          <p><strong>Occasion:</strong> {item.occasion?.join(', ')}</p>
          <p><strong>Material:</strong> {item.material}</p>
          <p><strong>Price:</strong> ${item.price}</p>
          <p><strong>Temp Range:</strong> {item.temperature_range?.join('°C to ')}°C</p>
        </div>
      </div>

      <h2 style={{ marginTop: '3rem' }}>Similar Items</h2>
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '1rem',
        paddingTop: '1rem'
      }}>
        {similarItems.map(sim => (
          <div
            key={sim.id}
            onClick={() => navigate(`/item/${sim.id}`, { state: { item: sim, filters } })}
            style={{
              minWidth: '140px',
              cursor: 'pointer',
              border: '1px solid #ddd',
              borderRadius: '10px',
              padding: '10px',
              textAlign: 'center'
            }}
          >
            <img
              src={sim.imageUrl}
              alt={sim.itemName}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <p style={{ marginTop: '0.5rem' }}>{sim.itemName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
