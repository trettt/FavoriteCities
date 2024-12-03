import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Cities() {
  const router = useRouter();
  const { cityId } = router.query;

  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCity = async () => {
      if (!cityId) return;

      try {
        const res = await fetch(`/api/cities?cityId=${cityId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch city data.");
        }

        const data = await res.json();
        setCity(data);
      } catch (err) {
        console.error("Error fetching city:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCity();
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
