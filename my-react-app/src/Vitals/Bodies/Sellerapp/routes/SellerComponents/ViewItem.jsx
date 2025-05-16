import React, { useState } from 'react';
import styles from '../../../../CSS/PokeStyles.module.css';
import { useSellerState } from '../../../../../BackendIntegration/SellerData/SellerDataManagement';
import { editSellerItem } from '../../../../../BackendIntegration/AxiosConnections/SellerAxios';

export default function ViewItem({ item, goBack, onDelete, onUpdate }) {
  const { sellerProfile } = useSellerState();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ ...item });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await editSellerItem(sellerProfile?.sellerId, item.groupId || 'default-group', item.id, form);
      onUpdate?.({ ...form, id: item.id });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update item:', err);
    }
  };

  return (
    <div className={styles.filterTab}>
      <h2 className={styles.title}>{form.itemname || 'Item Details'}</h2>

      <div
        style={{
          width: '180px',
          height: '180px',
          borderRadius: '12px',
          backgroundImage: `url(${form.image || '/src/assets/fallback.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          margin: '0 auto 1.5rem',
          border: '2px solid var(--background-color-btn)',
        }}
      />

      <div className={styles.sliderGrid}>
        {[
          'category', 'type', 'color', 'brand', 'material', 'season',
          'gender', 'occasion', 'price'
        ].map((field) => (
          <div className={styles.sliderGroup} key={field}>
            <span className={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
            {isEditing ? (
              <input
                name={field}
                value={form[field] || ''}
                onChange={handleChange}
                className={styles.input}
              />
            ) : (
              <span className={styles.value}>{form[field] || '-'}</span>
            )}
          </div>
        ))}

        <div className={styles.sliderGroup}>
          <span className={styles.label}>Temperature Range</span>
          {isEditing ? (
            <>
              <input
                name="tempMin"
                type="number"
                value={form.temperature_range?.[0] || ''}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    temperature_range: [
                      Number(e.target.value),
                      prev.temperature_range?.[1] ?? 0
                    ]
                  }))
                }
                className={styles.input}
                placeholder="Min"
              />
              <input
                name="tempMax"
                type="number"
                value={form.temperature_range?.[1] || ''}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    temperature_range: [
                      prev.temperature_range?.[0] ?? 0,
                      Number(e.target.value)
                    ]
                  }))
                }
                className={styles.input}
                placeholder="Max"
              />
            </>
          ) : (
            <span className={styles.value}>
              {form.temperature_range?.[0] ?? '-'}°C to {form.temperature_range?.[1] ?? '-'}°C
            </span>
          )}
        </div>

        <div className={styles.sliderGroup}>
          <span className={styles.label}>Essential</span>
          {isEditing ? (
            <select
              name="essential"
              value={form.essential === 'true' ? 'true' : 'false'}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          ) : (
            <span className={styles.value}>
              {form.essential === 'true' || form.essential === true ? 'Yes' : 'No'}
            </span>
          )}
        </div>
      </div>

      <div className={styles.buttonGroup}>
        {isEditing ? (
          <>
            <button className={styles.button} onClick={handleUpdate}>Save</button>
            <button className={styles.button} onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button className={styles.button} onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button className={styles.button} onClick={onDelete}>Delete</button>
        <button className={styles.button} onClick={goBack}>Back</button>
      </div>
    </div>
  );
}
