// import React, { useState, useEffect, useRef } from "react";
// import generator from "../../../../../CSS/generator.module.css";
// import { dummyUsers } from "../../../../../../BackendIntegration/UserData/UserDummyDatatest";
// import { scoreItem } from "./dummydata/scoringfunction";
// import { MoreHorizontal } from "lucide-react";
// import FilterTab from "./filter";
// import ItemDetailsPage from "./ItemDetailsPage";
// import StyloChatPopup from "./StyloPopup";
// import WeightEditorTab from "./weighteditor"; // Make sure this path is correct
// import { useGlobalState } from "../../../../../../BackendIntegration/UserData/GeneralDataManagement"; // ✅ adjust if needed
// import SuggestedSellerItems from "./dummydata/SuggestedSelleritems"; // adjust path as needed

// import { useWeather } from "../../../../../../API/WeatherContext";

// import { exportOutfit } from '../User/Outfits'; // adjust the path as needed
// import NamePromptModal from './dummydata/PromptModal'; // adjust path

// export default function OnAiClick() {
//   const { data } = useGlobalState();
//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [showWeights, setShowWeights] = useState(false);
//   const [showNamePrompt, setShowNamePrompt] = useState(false);



//   const [centerItems, setCenterItems] = useState([]);
//   const [leftItems, setLeftItems] = useState([]);
//   const [rightItems, setRightItems] = useState([]);

//   const weather = useWeather();

//   useEffect(() => {
//     console.log("🧠 OnAiClick mounted with data:", data);
//   }, []);
  
//   const [weights, setWeights] = useState({
//     gender: 1,
//     season: 1.5,
//     occasion: 10,
//     temperature_range: 2,
//     price: 2,
//     brand: 5,
//     color: 5,
//     material: 5,
//     type: 4,
//     metadataBonus: 0.8,
//     harmonyBonus: 2.5,
//     vibeBonus: 3,
//   });

//   const [filters, setFilters] = useState({
//     gender: "all",
//     season: "all",
//     occasion: "all",
//     temperature: 20,         // a moderate default
//     price_range: 200,        // max range
//     brand: "any",
//     color: "any",
//     material: "any"
//   });

//   const hasInitialized = useRef(false);
//   useEffect(() => {
//     if (!hasInitialized.current && weather) {
//       hasInitialized.current = true;
  
//       const dynamicSeason =
//         weather.temperature <= 10 ? "all" :
//         weather.temperature <= 20 ? "all" :
//         weather.temperature <= 27 ? "all" :
//         "all";
  
//       const dynamicFilters = {
//         gender: "all",
//         season: dynamicSeason,
//         occasion: "all",
//         temperature: weather.temperature,
//         price_range: 200,
//         brand: "any",
//         color: "any",
//         material: "any"
//       };
  
//       setFilters(dynamicFilters);
//       applyFilter(dynamicFilters);
//     }
//   }, [weather]);
  


  

//   const essentialCategories = ["hats", "shirt", "jacket", "pants", "shoes"];
//   const categoryAliases = {
//     top: "shirt",
//     outerwear: "jacket",
//     bottom: "pants",
//   };

//   const handleFilter = () => setShowFilter(true);
//   const closeFilter = () => setShowFilter(false);
// const handleExport = () => {
//   const allItems = [...leftItems, ...centerItems, ...rightItems];
//   const validItems = allItems.filter(item => item !== null && item !== undefined);
//   if (validItems.length === 0) return alert("❌ No valid items to export.");

//   // Trigger modal instead of prompt
//   setShowNamePrompt(true);
// };

// const confirmOutfitName = (name) => {
//   const allItems = [...leftItems, ...centerItems, ...rightItems];
//   const validItems = allItems.filter(item => item !== null && item !== undefined);
//   exportOutfit(name, validItems);
//   setShowNamePrompt(false);
// };

// const cancelOutfitName = () => setShowNamePrompt(false);
//   const applyFilter = (newFilters, customWeights = weights) => {
//     // Merge with current filters to avoid missing fields
//     const updatedFilters = { ...filters, ...newFilters };
//     setFilters(updatedFilters);
//     setShowFilter(false);
  
    
//     const userWardrobe = data?.wardrobe || [];

//     const wardrobeItems = userWardrobe.flatMap(section => section.items);
  
//     const normalizedItems = wardrobeItems.map(item => ({
//       ...item,
//       category: categoryAliases[item.category] || item.category
//     }));
  
//    const temperatureNormalizedItems = normalizedItems.map((item) => {
//   let temperature;
//   if (item.temperatureRange) {
//     const match = item.temperatureRange.match(/^(-?\d+)-(-?\d+)/);
//     if (match) {
//       temperature = [parseInt(match[1], 10), parseInt(match[2], 10)];
//     }
//   }
//   return { ...item, temperature };
// });

// const scored = scoreItem(temperatureNormalizedItems, updatedFilters, customWeights);

// console.log("Scored items:", scored);
  
//     // Center Grid: top 5 essentials
//     const centerSlots = essentialCategories.map((cat) => {
//       const bestMatch = scored
//         .filter(item => item.category === cat)
//         .sort((a, b) => b.score - a.score)[0];
//       return bestMatch || null;
//     });
  
//     const usedIds = new Set(centerSlots.filter(Boolean).map(i => i.id));
//     const extraEssentials = scored
//       .filter(item => essentialCategories.includes(item.category) && !usedIds.has(item.id))
//       .sort((a, b) => b.score - a.score)
//       .slice(0, 4); // fill 4 extra slots
  
//     const finalCenterItems = [...centerSlots, ...extraEssentials];
//     while (finalCenterItems.length < 9) finalCenterItems.push(null);
//     setCenterItems(finalCenterItems);
  
//     const allUsedIds = new Set(finalCenterItems.filter(Boolean).map(i => i.id));
//     const miscItems = scored.filter(item =>
//       !essentialCategories.includes(item.category) && !allUsedIds.has(item.id)
//     );
  
//     setLeftItems(miscItems.slice(0, 5));
//     setRightItems(miscItems.slice(5, 10));
//   };

//   const handleSelectItem = (item) => {
//     setCenterItems(prev => {
//       const newItems = [...prev];
//       const index = essentialCategories.indexOf(item.category);
//       if (index !== -1) newItems[index] = item;
//       return newItems;
//     });
//     setSelectedItem(null);
//   };

//   const updateFiltersFromStylo = (incomingFilters) => {
//     const merged = { ...filters, ...incomingFilters };
//     applyFilter(merged);
//   };

//   const renderBlock = (item, big = false, isDimmed = false) => {
//     const boxClass = big
//       ? `${generator.gridItemBox} ${isDimmed ? generator.dimmedItem : ""}`
//       : generator.smallItemBox;

//     if (!item) {
//       return (
//         <div className={boxClass} style={{ backgroundColor: "#ccc", opacity: 0.3 }}>
//           <p className={generator.itemName}>No item</p>
//         </div>
//       );
//     }

//     return (
//       <div
//         className={boxClass}
//         style={{ backgroundImage: `url(${item.image || item.imageUrl})` }}
//       >
//         <p className={generator.itemName}>{item.itemName}</p>
//         <MoreHorizontal
//           className={generator.icon}
//           size={big ? 20 : 16}
//           onClick={(e) => {
//             e.stopPropagation();
//             setSelectedItem(item);
//           }}
//         />
//       </div>
//     );
//   };

//   if (showFilter) {
//     return (
//       <FilterTab
//         onClose={closeFilter}
//         applyFilter={(newFilters) => applyFilter(newFilters, weights)}
//         currentFilters={filters}
//       />
//     );
//   }

//   if (selectedItem) {
//     return (
//       <ItemDetailsPage
//         item={selectedItem}
//         filters={filters}
//         onClose={() => setSelectedItem(null)}
//         onSelectItem={handleSelectItem}
//       />
//     );
//   }
//   if (showWeights) {
//     return (
//       <WeightEditorTab
//         weights={weights}
//         setWeights={setWeights}
//         onClose={() => setShowWeights(false)}
//       />
//     );
//   }
  

//   return (
//     <div className={generator.scrollWrapper}>
//     <div className={generator.generatorLayout}>
//       <StyloChatPopup
//   onFiltersReady={updateFiltersFromStylo}
//   onWeightsReady={setWeights}
// />


//       <div className={generator.wardrobeSection}>
//         <div className={generator.wardrobeLayout}>
//           <div className={generator.sideColumn}>
//             {Array.from({ length: 5 }).map((_, i) => (
//               <React.Fragment key={`left-${i}`}>
//                 {renderBlock(leftItems[i] || null)}
//               </React.Fragment>
//             ))}
//           </div>

//           <div className={generator.centerGrid}>
//             {centerItems.map((item, i) => (
//               <React.Fragment key={`center-slot-${i}`}>
//                 {renderBlock(item, true, i >= 5)}
//               </React.Fragment>
//             ))}
            
//           </div>

//           <div className={generator.sideColumn}>
//             {Array.from({ length: 5 }).map((_, i) => (
//               <React.Fragment key={`right-${i}`}>
//                 {renderBlock(rightItems[i] || null)}
//               </React.Fragment>
//             ))}
//           </div>
         
//         </div>
        
//       </div>

//       <div className={generator.controlcontainer}>
//         <div className={generator.propspreview}>
//           <div className={generator.propspreviewcontainer}>
//             <h2 className={generator.propspreviewtitle}>Basic</h2>
//             <div className={generator.propspreviewcontent}>
//               <p>Color: {filters.color}</p>
//               <p>Gender: {filters.gender}</p>
//               <p>Occasion: {filters.occasion}</p>
//             </div>
//           </div>
//           <div className={generator.propspreviewcontainer}>
//             <h2 className={generator.propspreviewtitle}>Budget</h2>
//             <div className={generator.propspreviewcontent}>
//               <p>Max Price: ${filters.price_range}</p>
//               <p>Brand: {filters.brand}</p>
//             </div>
//           </div>
//           <div className={generator.propspreviewcontainer}>
//             <h2 className={generator.propspreviewtitle}>Comfort Info</h2>
//             <div className={generator.propspreviewcontent}>
//               <p>Season: {filters.season}</p>
//               <p>Temperature: {filters.temperature}°C</p>
//               <p>Material: {filters.material}</p>
//             </div>
//           </div>
        

//         <div className={generator.propspreviewcontainer}>
//   <h2 className={generator.propspreviewtitle}>Weather</h2>
//   {weather && (
//     <div className={generator.propspreviewcontent}>
//       <p>Condition: {weather.condition}</p>
//       <p>Temperature: {weather.temperature}°C</p>
//       <p>Wind: {weather.wind} km/h</p>
//       <p>Humidity: {weather.humidity}%</p>
//       <p>{weather.isDay ? "☀️ Daytime" : "🌙 Nighttime"}</p>
//     </div>
//   )}
// </div>
// </div>



//         <div className={generator.controlbuttoncontainer}>
//           <button className={generator.controlbutton} onClick={handleFilter}>Filter</button>
//           <button className={generator.controlbutton} onClick={handleExport}>Export</button>
//           <button className={generator.controlbutton} onClick={() => setShowWeights(!showWeights)}>
//             Adjust Weights
//           </button>
//         </div>

        
//       </div>
      
//     </div>
    
//      <SuggestedSellerItems filters={filters} weights={weights} />

//        {showNamePrompt && (
//   <NamePromptModal
//     onConfirm={confirmOutfitName}
//     onCancel={cancelOutfitName}
//   />
// )}

   
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import generator from "../../../../../CSS/generator.module.css";
import { dummyUsers } from "../../../../../../BackendIntegration/UserData/UserDummyDatatest";
import { scoreItem } from "./dummydata/scoringfunction";
import { MoreHorizontal } from "lucide-react";
import FilterTab from "./filter";
import ItemDetailsPage from "./ItemDetailsPage";
import StyloChatPopup from "./StyloPopup";
import WeightEditorTab from "./weighteditor"; // Make sure this path is correct
import { useGlobalState } from "../../../../../../BackendIntegration/UserData/GeneralDataManagement"; // ✅ adjust if needed
import SuggestedSellerItems from "./dummydata/SuggestedSelleritems"; // adjust path as needed

import { useWeather } from "../../../../../../API/WeatherContext";

import { exportOutfit } from '../User/Outfits'; // adjust the path as needed
import NamePromptModal from './dummydata/PromptModal'; // adjust path

export default function OnAiClick() {
  const { data } = useGlobalState();
  const [showFilter, setShowFilter] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showWeights, setShowWeights] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);


  const [rotationIndex, setRotationIndex] = useState(0);

  const [storedExtras, setStoredExtras] = useState([]);



  const [centerItems, setCenterItems] = useState([]);
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);

  const weather = useWeather();


  const getCurrentItems = () => {
  const all = [...leftItems, ...centerItems, ...rightItems];
  return all.filter(item => item !== null && item !== undefined);
};


  useEffect(() => {
    console.log("🧠 OnAiClick mounted with data:", data);
  }, []);
  
  const [weights, setWeights] = useState({
    gender: 1,
    season: 1.5,
    occasion: 10,
    temperature_range: 2,
    price: 2,
    brand: 5,
    color: 5,
    material: 5,
    type: 4,
    metadataBonus: 0.8,
    harmonyBonus: 2.5,
    vibeBonus: 3,
  });

  const [filters, setFilters] = useState({
    gender: "all",
    season: "all",
    occasion: "all",
    temperature: 20,         // a moderate default
    price_range: 200,        // max range
    brand: "any",
    color: "any",
    material: "any"
  });

  const hasInitialized = useRef(false);
  useEffect(() => {
    if (!hasInitialized.current && weather) {
      hasInitialized.current = true;
  
      const dynamicSeason =
        weather.temperature <= 10 ? "all" :
        weather.temperature <= 20 ? "all" :
        weather.temperature <= 27 ? "all" :
        "all";
  
      const dynamicFilters = {
        gender: "all",
        season: dynamicSeason,
        occasion: "all",
        temperature: weather.temperature,
        price_range: 200,
        brand: "any",
        color: "any",
        material: "any"
      };
  
      setFilters(dynamicFilters);
      applyFilter(dynamicFilters);
    }
  }, [weather]);
  


  

  const essentialCategories = ["hats", "shirt", "jacket", "pants", "shoes"];
  const categoryAliases = {
    top: "shirt",
    outerwear: "jacket",
    bottom: "pants",
  };

  const handleFilter = () => setShowFilter(true);
  const closeFilter = () => setShowFilter(false);
const handleExport = () => {
  const items = getCurrentItems();
  if (items.length === 0) return alert("❌ No valid items to export.");
  setShowNamePrompt(true); // trigger modal
};


const confirmOutfitName = (name) => {
  const items = getCurrentItems();
  exportOutfit(name, items);
  setShowNamePrompt(false);
};


const cancelOutfitName = () => setShowNamePrompt(false);
  const applyFilter = (newFilters, customWeights = weights) => {
  // 1. Merge incoming filters
  const updatedFilters = { ...filters, ...newFilters };
  setFilters(updatedFilters);
  setShowFilter(false);

  // 2. Extract wardrobe data
  const userWardrobe = data?.wardrobe || [];
  const wardrobeItems = userWardrobe.flatMap(section => section.items);

  // 3. Normalize categories (e.g. top → shirt)
  const normalizedItems = wardrobeItems.map(item => ({
    ...item,
    category: categoryAliases[item.category] || item.category
  }));

  // 4. Normalize temperature ranges
  const temperatureNormalizedItems = normalizedItems.map((item) => {
    let temperature;
    if (item.temperatureRange) {
      const match = item.temperatureRange.match(/^(-?\d+)-(-?\d+)/);
      if (match) {
        temperature = [parseInt(match[1], 10), parseInt(match[2], 10)];
      }
    }
    return { ...item, temperature };
  });

  // 5. Score the wardrobe
  const scored = scoreItem(temperatureNormalizedItems, updatedFilters, customWeights);
  console.log("Scored items:", scored);

  // 6. Fill top 5 essential categories: hat, shirt, jacket, pants, shoes
  const centerSlots = essentialCategories.map((cat) => {
    const bestMatch = scored
      .filter(item => item.category === cat)
      .sort((a, b) => b.score - a.score)[0];
    return bestMatch || null;
  });

  const usedIds = new Set(centerSlots.filter(Boolean).map(i => i.id));

  // 7. Get extra essential items to rotate into last 4 slots
  const extraEssentials = scored
    .filter(item => essentialCategories.includes(item.category) && !usedIds.has(item.id))
    .sort((a, b) => b.score - a.score)
    .slice(0, 20); // get more for future rotation

  setStoredExtras(extraEssentials); // ✅ Store extras for rotation

  const rotatedExtras = extraEssentials.slice(0, 4);
  const finalCenterItems = [...centerSlots, ...rotatedExtras];

  // 8. Fill missing slots with nulls
  while (finalCenterItems.length < 9) finalCenterItems.push(null);
  setCenterItems(finalCenterItems);

  // 9. Fill left and right columns with non-essential items
  const allUsedIds = new Set(finalCenterItems.filter(Boolean).map(i => i.id));
const miscItems = scored.filter(item =>
  !essentialCategories.includes(item.category) &&
  !allUsedIds.has(item.id) &&
  (
    !filters.occasion || 
 
    (item.occasion && item.occasion.toLowerCase() === filters.occasion.toLowerCase())
  )
  
);

setLeftItems(miscItems.slice(0, 5));
setRightItems(miscItems.slice(5, 10));

};


  const handleSelectItem = (item) => {
    setCenterItems(prev => {
      const newItems = [...prev];
      const index = essentialCategories.indexOf(item.category);
      if (index !== -1) newItems[index] = item;
      return newItems;
    });
    setSelectedItem(null);
  };

  const updateFiltersFromStylo = (incomingFilters) => {
    const merged = { ...filters, ...incomingFilters };
    applyFilter(merged);
  };

  const renderBlock = (item, big = false, isDimmed = false, index = null, section = "") => {
  const boxClass = big
    ? `${generator.gridItemBox} ${isDimmed ? generator.dimmedItem : ""}`
    : generator.smallItemBox;

 const handleDragStart = (e) => {
  e.dataTransfer.setData("index", index);
  e.dataTransfer.setData("section", section);

  // Create a custom preview image
  const img = new Image();
  img.src = item.image || item.imageUrl;
  img.style.width = "80px";
  img.style.height = "80px";
  img.style.objectFit = "cover";

  // Required: must append to document
  document.body.appendChild(img);
  e.dataTransfer.setDragImage(img, 40, 40);

  // Optional: remove preview after short time
  setTimeout(() => document.body.removeChild(img), 0);
};

  const handleDrop = (e) => {
    const fromIndex = parseInt(e.dataTransfer.getData("index"));
    const fromSection = e.dataTransfer.getData("section");

    if (fromSection === "center" && section === "center" && fromIndex !== index) {
      setCenterItems(prev => {
        const newItems = [...prev];
        [newItems[fromIndex], newItems[index]] = [newItems[index], newItems[fromIndex]];
        return newItems;
      });
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  if (!item) {
    return (
      <div
        className={boxClass}
        style={{ backgroundColor: "#ccc", opacity: 0.3 }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p className={generator.itemName}>No item</p>
      </div>
    );
  }

  return (
    <div
      className={boxClass}
      style={{ backgroundImage: `url(${item.image || item.imageUrl})` }}
      draggable={section === "center"}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <p className={generator.itemName}>{item.itemName}</p>
      <MoreHorizontal
        className={generator.icon}
        size={big ? 20 : 16}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedItem(item);
        }}
      />
    </div>
  );
};


  if (showFilter) {
    return (
      <FilterTab
        onClose={closeFilter}
        applyFilter={(newFilters) => applyFilter(newFilters, weights)}
        currentFilters={filters}
      />
    );
  }

  if (selectedItem) {
    return (
      <ItemDetailsPage
        item={selectedItem}
        filters={filters}
        onClose={() => setSelectedItem(null)}
        onSelectItem={handleSelectItem}
      />
    );
  }
  if (showWeights) {
    return (
      <WeightEditorTab
        weights={weights}
        setWeights={setWeights}
        onClose={() => setShowWeights(false)}
      />
    );
  }
  

  return (
    <div className={generator.scrollWrapper}>
    <div className={generator.generatorLayout}>
      <StyloChatPopup
  onFiltersReady={updateFiltersFromStylo}
  onWeightsReady={setWeights}
/>


      <div className={generator.wardrobeSection}>
        <div className={generator.wardrobeLayout}>
          <div className={generator.sideColumn}>
            {Array.from({ length: 5 }).map((_, i) => (
              <React.Fragment key={`left-${i}`}>
                {renderBlock(leftItems[i] || null)}
              </React.Fragment>
            ))}
          </div>

       <div className={generator.centerGrid}>
  {centerItems.map((item, i) => (
    <React.Fragment key={`center-slot-${i}`}>
      {renderBlock(item, true, i >= 5, i, "center")}
    </React.Fragment>
  ))}
</div>


          <div className={generator.sideColumn}>
            {Array.from({ length: 5 }).map((_, i) => (
              <React.Fragment key={`right-${i}`}>
                {renderBlock(rightItems[i] || null)}
              </React.Fragment>
            ))}
          </div>
         
        </div>
        
      </div>

      <div className={generator.controlcontainer}>
        <div className={generator.propspreview}>
          <div className={generator.propspreviewcontainer}>
            <h2 className={generator.propspreviewtitle}>Basic</h2>
            <div className={generator.propspreviewcontent}>
              <p>Color: {filters.color}</p>
              <p>Gender: {filters.gender}</p>
              <p>Occasion: {filters.occasion}</p>
            </div>
          </div>
          <div className={generator.propspreviewcontainer}>
            <h2 className={generator.propspreviewtitle}>Budget</h2>
            <div className={generator.propspreviewcontent}>
              <p>Max Price: ${filters.price_range}</p>
              <p>Brand: {filters.brand}</p>
            </div>
          </div>
          <div className={generator.propspreviewcontainer}>
            <h2 className={generator.propspreviewtitle}>Comfort Info</h2>
            <div className={generator.propspreviewcontent}>
              <p>Season: {filters.season}</p>
              <p>Temperature: {filters.temperature}°C</p>
              <p>Material: {filters.material}</p>
            </div>
          </div>
        

        <div className={generator.propspreviewcontainer}>
  <h2 className={generator.propspreviewtitle}>Weather</h2>
  {weather && (
    <div className={generator.propspreviewcontent}>
      <p>Condition: {weather.condition}</p>
      <p>Temperature: {weather.temperature}°C</p>
      <p>Wind: {weather.wind} km/h</p>
      <p>Humidity: {weather.humidity}%</p>
      <p>{weather.isDay ? "☀️ Daytime" : "🌙 Nighttime"}</p>
    </div>
  )}
</div>

<div style={{ textAlign: "center", marginTop: "10px" }}>
  <button
    onClick={() => {
      setRotationIndex(prev => {
        const newIndex = (prev + 4) % storedExtras.length;
        const nextExtras = storedExtras.slice(newIndex, newIndex + 4);
        const updated = [...centerItems.slice(0, 5), ...nextExtras];
        while (updated.length < 9) updated.push(null);
        setCenterItems(updated);
        return newIndex;
      });
    }}
    className={generator.controlbutton}
  >
    Show Next Alternatives
  </button>
</div>

</div>



        <div className={generator.controlbuttoncontainer}>
          <button className={generator.controlbutton} onClick={handleFilter}>Filter</button>
          <button className={generator.controlbutton} onClick={handleExport}>Export</button>
          <button className={generator.controlbutton} onClick={() => setShowWeights(!showWeights)}>
            Adjust Weights
          </button>
        </div>

        
      </div>
      
    </div>
    
     <SuggestedSellerItems filters={filters} weights={weights} />

       {showNamePrompt && (
  <NamePromptModal
    onConfirm={confirmOutfitName}
    onCancel={cancelOutfitName}
  />
)}

   
    </div>
  );
}
