import { useState, useEffect } from 'react';
import { useGlobalState } from '../../../../../../BackendIntegration/UserData/GeneralDataManagement';
import styles from '../../../../../CSS/PokeStyles.module.css';
import { uploadImageViaBackend } from '../../../../../../Utils/uploadImageToImageKit';
import axios from 'axios';

export default function AddWardrobeItem({ goBack, onAddItem, activeLink }) {
  const { profileData } = useGlobalState();
   const { refreshUserData } = useGlobalState();
  

  // Initialize state variables
  const [itemName, setItemName] = useState('');
  const [imageURL, setImageURL] = useState('https://example.com/');  // Base URL for the image input
  const [color, setColor] = useState('Red');  // Default color
  const [material, setMaterial] = useState('Cotton');  // Default material
  const [season, setSeason] = useState('Spring');  // Default to Spring
  const [occasion, setOccasion] = useState('Casual');  // Default to Casual
  const [temperatureMin, setTemperatureMin] = useState(10); // Default min temperature
  const [temperatureMax, setTemperatureMax] = useState(18); // Default max temperature
  const [brand, setBrand] = useState('Nike');  // Default brand
  const [gender, setGender] = useState('male');  // Default to Male
  const [price, setPrice] = useState(50);  // Default price value
  const [favorite, setFavorite] = useState(false);
  const [visibility, setVisibility] = useState('public');  // Default to public
  const [error, setError] = useState(''); // State to hold error messages

  // Validation state
  const [validationErrors, setValidationErrors] = useState({
    itemName: false,
    imageURL: false,
    color: false,
    material: false,
    price: false,
    temperatureRange: false,
    gender: false,
  });

  // Handle image file input change and upload image
  const handleImageChange = async (e) => {
    const file = e.target.files[0];  // Get the selected file
    if (file) {
      try {
        const uploadedURL = await uploadImageViaBackend(file); // Call the upload function
        setImageURL(uploadedURL);  // Set the image URL in the state
      } catch (error) {
        console.error('Error uploading image:', error);
        setError('Failed to upload image.');
      }
    }
  };

  // UseEffect to initialize image base URL when the page loads
  useEffect(() => {
    setImageURL('https://example.com/');  // Default base URL for the image input
  }, []);

  // Validation function
  const validateForm = () => {
    let errors = {};

    // Item name validation (required)
    errors.itemName = !itemName;

    // Image URL validation (required, must be a valid URL)
    errors.imageURL = !imageURL || !/^https?:\/\/[^ ]+\.[a-z]{2,6}(?:\/[^\s]*)?$/.test(imageURL);

    // Color validation (required)
    errors.color = !color;

    // Material validation (required)
    errors.material = !material;

    // Price validation (required, must be a number)
    errors.price = !price || isNaN(price);

    // Temperature range validation (required, min should be less than max)
    errors.temperatureRange = temperatureMin >= temperatureMax;

    // Gender validation (required)
    errors.gender = !gender;

    setValidationErrors(errors);
    return Object.keys(errors).every((key) => !errors[key]);
  };

  const handleAdd = async () => {
    if (!validateForm()) {
      return; // Stop submission if form is invalid
    }

    const token = localStorage.getItem('token'); // Get the token from localStorage

    // Ensure categoryID, wardrobeID are integers, and price is a number
    const categoryID = activeLink ? parseInt(activeLink.id, 10) : null; // Convert categoryID to an 
    console.log(categoryID);
    console.log(activeLink);

//     const wardrobeID = activeLink?.wardrobeID;

// if (wardrobeID == null || wardrobeID !== activeLink.wardrobeID) {
//   setError("Invalid wardrobe selected.");
//   return;
// }
const wardrobeID = profileData?.wardrobeID ? parseInt(profileData.wardrobeID, 10) : null;

if (!wardrobeID) {
  setError("Wardrobe ID not found. Please refresh and try again.");
  return;
}

    //const wardrobeID = profileData ? parseInt(profileData.userId, 10) : null; // Convert wardrobeID to an integer
    const numericPrice = parseFloat(price); // Convert price to a number
    const temperatureRange = `${temperatureMin}-${temperatureMax}°C`; // Format temperature range as "min-max°C"

    // Prepare the wardrobe item object
    const newItem = {
      itemName,
      imageURL,  // The URL of the uploaded image
      categoryID,
      wardrobeID,
      color,
      material,
      season,
      occasion,
      temperatureRange, // Add the formatted temperature range
      brand,
      gender,  // Gender from the dropdown
      price: numericPrice, // Ensure price is correctly formatted
      favorite,
      visibility,
      type: "Coat" // Add type field as per your target structure
    };

    try {
      // Make the API call to add the wardrobe item to the backend
      const response = await axios.post('http://localhost:5005/api/wardrobe-items', newItem, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure Bearer token is being sent correctly here
        },
      });

      // Check for both 200 and 201 status codes
      if (response.status === 200 || response.status === 201) {
        const addedItem = response.data; // The new item returned from the backend
        onAddItem(addedItem); // Add the new item to the UI
        goBack(); // Go back to the list view
        console.log('Wardrobe item added successfully:', addedItem);
        await refreshUserData();
        setError(''); // Clear any previous error message
      } else {
        console.error('Failed to add wardrobe item, unexpected status:', response.status);
        setError('Failed to add wardrobe item. Please try again.'); // Set error message
      }
    } catch (error) {
      console.error('Error adding wardrobe item:', error.response ? error.response.data : error);
      setError('An error occurred. Please try again.'); // Set error message
    }
  };



  
const [colorOptions, setColorOptions] = useState(['Red', 'Blue', 'Green', 'Black', 'White']);
const [materialOptions, setMaterialOptions] = useState(['Cotton', 'Wool', 'Polyester', 'Silk']);
const [seasonOptions, setSeasonOptions] = useState(['Spring', 'Summer', 'Autumn', 'Winter', 'All']);
const [occasionOptions, setOccasionOptions] = useState(['Casual', 'Formal', 'Party', 'Business']);

const [newColor, setNewColor] = useState('');
const [newMaterial, setNewMaterial] = useState('');
const [newSeason, setNewSeason] = useState('');
const [newOccasion, setNewOccasion] = useState('');

const addColor = () => {
  if (newColor && !colorOptions.includes(newColor)) {
    setColorOptions([...colorOptions, newColor]);
    setColor(newColor);
    setNewColor('');
  }
};

const addMaterial = () => {
  if (newMaterial && !materialOptions.includes(newMaterial)) {
    setMaterialOptions([...materialOptions, newMaterial]);
    setMaterial(newMaterial);
    setNewMaterial('');
  }
};

const addSeason = () => {
  if (newSeason && !seasonOptions.includes(newSeason)) {
    setSeasonOptions([...seasonOptions, newSeason]);
    setSeason(newSeason);
    setNewSeason('');
  }
};

const addOccasion = () => {
  if (newOccasion && !occasionOptions.includes(newOccasion)) {
    setOccasionOptions([...occasionOptions, newOccasion]);
    setOccasion(newOccasion);
    setNewOccasion('');
  }
};

  // ✅ Styled version with identical logic, layout improved and structured visually like wardrobe viewer
return (
  <div className={styles.filterTab}>
    <button className={styles.button} onClick={goBack}>← Back</button>

    <h2 className={styles.title}>Add New Wardrobe Item</h2>

    <img
      src={imageURL || '/src/assets/fallback.png'}
      alt="Preview"
      style={{
        width: '100%',
        borderRadius: 12,
        margin: '1rem 0',
        objectFit: 'cover',
        maxHeight: 200,
      }}
    />

    <div className={styles.filterGroup}>
      <label>Item Name</label>
      <input
        className={`${styles.input} ${validationErrors.itemName ? styles.errorInput : ''}`}
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      {validationErrors.itemName && <div className={styles.errorText}>Item Name is required</div>}

      <label>Image Upload</label>
      <input
        className={`${styles.input} ${validationErrors.imageURL ? styles.errorInput : ''}`}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {validationErrors.imageURL && <div className={styles.errorText}>Invalid image URL</div>}

      <label>Color</label>
      <select className={`${styles.input} ${validationErrors.color ? styles.errorInput : ''}`} value={color} onChange={(e) => setColor(e.target.value)}>
        {colorOptions.map((opt, idx) => <option key={idx}>{opt}</option>)}
      </select>
      <div className={styles.inlineRow}>
        <input className={styles.smallInput} placeholder="Add color" value={newColor} onChange={(e) => setNewColor(e.target.value)} />
        <button className={styles.smallButton} onClick={addColor}>+</button>
      </div>
      {validationErrors.color && <div className={styles.errorText}>Color is required</div>}

      <label>Material</label>
      <select className={`${styles.input} ${validationErrors.material ? styles.errorInput : ''}`} value={material} onChange={(e) => setMaterial(e.target.value)}>
        {materialOptions.map((opt, idx) => <option key={idx}>{opt}</option>)}
      </select>
      <div className={styles.inlineRow}>
        <input className={styles.smallInput} placeholder="Add material" value={newMaterial} onChange={(e) => setNewMaterial(e.target.value)} />
        <button className={styles.smallButton} onClick={addMaterial}>+</button>
      </div>
      {validationErrors.material && <div className={styles.errorText}>Material is required</div>}

      <label>Season</label>
      <select className={styles.input} value={season} onChange={(e) => setSeason(e.target.value)}>
        {seasonOptions.map((opt, idx) => <option key={idx}>{opt}</option>)}
      </select>
      <div className={styles.inlineRow}>
        <input className={styles.smallInput} placeholder="Add season" value={newSeason} onChange={(e) => setNewSeason(e.target.value)} />
        <button className={styles.smallButton} onClick={addSeason}>+</button>
      </div>

      <label>Occasion</label>
      <select className={styles.input} value={occasion} onChange={(e) => setOccasion(e.target.value)}>
        {occasionOptions.map((opt, idx) => <option key={idx}>{opt}</option>)}
      </select>
      <div className={styles.inlineRow}>
        <input className={styles.smallInput} placeholder="Add occasion" value={newOccasion} onChange={(e) => setNewOccasion(e.target.value)} />
        <button className={styles.smallButton} onClick={addOccasion}>+</button>
      </div>

      <label>Temperature Range: {temperatureMin}°C / {temperatureMax}°C</label>
      <input type="range" min="-50" max="50" value={temperatureMin} onChange={(e) => setTemperatureMin(e.target.value)} />
      <input type="range" min="-50" max="50" value={temperatureMax} onChange={(e) => setTemperatureMax(e.target.value)} />
      {validationErrors.temperatureRange && <div className={styles.errorText}>Invalid temperature range</div>}

      <label>Brand</label>
      <select className={styles.input} value={brand} onChange={(e) => setBrand(e.target.value)}>
        <option>Nike</option><option>Adidas</option><option>Puma</option><option>Reebok</option>
      </select>

      <label>Gender</label>
      <select className={`${styles.input} ${validationErrors.gender ? styles.errorInput : ''}`} value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="male">Male</option><option value="female">Female</option>
      </select>
      {validationErrors.gender && <div className={styles.errorText}>Gender is required</div>}

      <label>Price</label>
      <input
        className={`${styles.input} ${validationErrors.price ? styles.errorInput : ''}`}
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      {validationErrors.price && <div className={styles.errorText}>Price must be a valid number</div>}

      <label>Favorite</label>
      <label>
        <input type="checkbox" checked={favorite} onChange={(e) => setFavorite(e.target.checked)} />
        Mark as Favorite
      </label>

      <label>Visibility</label>
      <select className={styles.input} value={visibility} onChange={(e) => setVisibility(e.target.value)}>
        <option value="public">Public</option><option value="private">Private</option>
      </select>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.buttonGroup}>
        
        <button className={styles.button} onClick={goBack}>Cancel</button>
        <button className={styles.button} onClick={handleAdd}>Add Wardrobe Item</button>
        
      </div>
    </div>
  </div>
);


}
