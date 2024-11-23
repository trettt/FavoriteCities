import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Cities() {
  const router = useRouter();
  const { cityId } = router.query;

  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCityFromLocalStorage = (cityId) => {
    try {
      const cities = localStorage.getItem("savedCities");
      const parsedCities = cities ? JSON.parse(cities) : [];
      return parsedCities.find((city) => String(city.id) === String(cityId));
    } catch (err) {
      console.error("Error retrieving city from local storage:", err);
      return null;
    }
  };

  useEffect(() => {
    if (cityId) {
      const retrievedCity = getCityFromLocalStorage(cityId);

      if (retrievedCity) {
        setCity(retrievedCity);
      } else {
        setError(new Error("City not found in local storage."));
      }

      setLoading(false);
    }
  }, [cityId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (!city) {
    return <p>City not found!</p>;
  }

  return (
    <>
      <h1>{city.name}</h1>
      <p>Country: {city.country}</p>
      <p>Latitude: {city.latitude}</p>  
      <p>Longitude: {city.longitude}</p>
      {city.country_flag && (
        <img src={city.country_flag} alt={`${city.name} flag`} />
      )}
      {city.weather && (
        <div>
          <p>Temperature: {city.weather.temperature}°C</p>
        </div>
      )}
    </>
  );
}
