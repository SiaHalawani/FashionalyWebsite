import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";

/**
 * Fetch current weather by city or coordinates.
 * @param {string} location - city name or "lat,lon"
 * @returns {Promise<Object>} - Cleaned weather data
 */
export async function getCurrentWeather(location = "Beirut") {
  console.log(`📡 WeatherAPI call received for: ${location}`);

  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: API_KEY,
        q: location
      }
    });

    const { temp_c, condition, wind_kph, humidity, is_day } = response.data.current;

    const result = {
      temperature: temp_c,
      condition: condition.text.toLowerCase(),
      wind: wind_kph,
      humidity,
      isDay: is_day === 1
    };

    console.log("🌤️ WeatherAPI response:", result);

    return result;
  } catch (err) {
    console.error("❌ Weather API Error:", err.message);
    return null;
  }
}
