import { useState, useEffect } from "react";
import styles from "@/styles/user-location-information.module.css"

export default function UserLocationInfo() {
  const [locationInfo, setLocationInfo] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const geoRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const geoData = await geoRes.json();
            const city = geoData.address.city || geoData.address.town || geoData.address.village;
            const country = geoData.address.country;

            setLocationInfo({ city, country });

            const weatherRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
            );
            const weatherData = await weatherRes.json();
            setWeatherInfo(weatherData.current_weather);
          } catch (err) {
            setError("Failed to fetch location or weather information.");
          }
        },
        (geoError) => {
          setError("Unable to retrieve location. Please enable location services.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>{error}</p>
      </div>
    );
  }

  if (!locationInfo || !weatherInfo) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>Loading your location and weather information...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Your Current Location</h2>
      <div className={styles.card}>
        <p className={styles.info}>
          <strong>City:</strong> {locationInfo.city}
        </p>
        <p className={styles.info}>
          <strong>Country:</strong> {locationInfo.country}
        </p>
        <p className={styles.info}>
          <strong>Weather:</strong> {weatherInfo.temperature}°C
        </p>
      </div>
    </div>
  );
}
