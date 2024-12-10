import { useState, useEffect } from "react";
import styles from "@/styles/city-card.module.css";
import { useAuthentication } from "@/utils/authenticationProvider";
import Link from "next/link";

export default function CityCard({ city }) {
  const { isUserAuthenticated } = useAuthentication();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const email = localStorage.getItem("user");
        if (email) {
          const res = await fetch(`/api/favorites?email=${email}`);
          const data = await res.json();
          if (data.cities && data.cities.includes(city.id.toString())) {
            setIsFavorite(true);
          }
        }
      } catch (error) {
        console.error("Fetching favorites failed:", error);
      }
    };
    if (isUserAuthenticated) {
      fetchFavorites();
    }
  }, [city.id, isUserAuthenticated]);

  const handleSaveCityToFavorite = async (event) => {
    event.preventDefault();
    try {
      const email = localStorage.getItem("user");
      if (email) {
        const res = await fetch(`/api/favorites`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            cityId: city.id,
          }),
        });
        const data = await res.json();
        setIsFavorite((prev) => !prev);
      }
    } catch (error) {
      console.error("Saving to favorites failed:", error);
    }
  };

  const truncatedCityName =
    city.name.length > 7 ? `${city.name.slice(0, 6)}...` : city.name;

  const truncatedCountry =
    city.country.length > 7 ? `${city.country.slice(0, 6)}...` : city.country;

  return (
    <Link href={`/cities/${city.id}`}>
      <div className={styles.card}>
        <div className={styles.cardTop}>
          <img
            src={city.country_flag}
            alt={`${city.country} flag`}
            height="45px"
          />
          <p className={styles.cityName}>{truncatedCityName}</p>
        </div>
        <div className={styles.cardBottom}>
          <p className={styles.country}>{truncatedCountry}</p>
          {isUserAuthenticated && (
            <button
              className={styles.favoriteButton}
              onClick={handleSaveCityToFavorite}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <span className="material-icons">
                {isFavorite ? "favorite" : "favorite_border"}
              </span>
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
