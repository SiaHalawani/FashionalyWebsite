// WeatherContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentWeather } from "./WeatherAPI.JS"; 

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    async function fetch() {
      const data = await getCurrentWeather("Beirut");
      setWeather(data);
    }
    fetch();
  }, []);

  return (
    <WeatherContext.Provider value={weather}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}
