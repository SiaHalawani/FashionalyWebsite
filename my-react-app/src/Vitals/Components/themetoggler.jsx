import { useTheme } from "../contexts/themecontext";
import components from '../CSS/components.module.css';
import React from 'react';
import { useGlobalState } from "../../BackendIntegration/UserData/GeneralDataManagement";
import axios from "axios";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const { profileData, refreshUserData } = useGlobalState();
  const token = localStorage.getItem("token");

  const themes = [
 'light', 'dark',
  'blue-neutral-light', 'blue-neutral', 'blue-neutral-dark',
  'pink-red-light', 'pink-red', 'pink-red-dark',
  'chocolate-brown-light', 'chocolate-brown', 'chocolate-brown-dark',
  'gray-mono-light', 'gray-mono', 'gray-mono-dark'

  ];

 const handleThemeChange = async (event) => {
  const newTheme = event.target.value;
  console.log("🎨 Selected new theme:", newTheme);

  setTheme(newTheme);
  localStorage.setItem('theme', newTheme); // ✅ persist theme
  console.log("🧩 setTheme executed & saved to localStorage");

  profileData.theme = newTheme;
  console.log("🔄 profileData.theme updated locally:", profileData.theme);

  try {
    console.log("📡 Sending PUT request to backend...");
    const res = await axios.put(
      'http://localhost:5005/api/users/update',
      { themePreference: newTheme },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log("✅ Theme updated on backend:", res.data);

    console.log("🔁 Calling refreshUserData...");
    await refreshUserData();
    console.log("✅ Global profile refreshed");
  } catch (err) {
    console.error("❌ Failed to update theme:", err.response?.data || err);
  }
};


  return (
    <div>
      <label htmlFor="theme-selector" style={{ marginRight: '10px' }}>
        Choose Theme:
      </label>
      <select
        id="theme-selector"
        value={theme}
        onChange={handleThemeChange}
        className={components.btn}
      >
        {themes.map((themeOption) => (
          <option key={themeOption} value={themeOption}>
            {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
