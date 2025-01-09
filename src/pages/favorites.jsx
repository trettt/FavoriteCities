import { useEffect, useState } from "react";
import { useAuthentication } from "@/utils/authenticationProvider";
import styles from "@/styles/favorites.module.css";
import FavoriteCitycard from "@/components/favorite-city-card";

export default function Favorites() {
  const { isUserAuthenticated } = useAuthentication();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const email = localStorage.getItem("user");
      if (email) {
        try {
          const res = await fetch(`/api/favorites?email=${email}`);
          const data = await res.json();
          console.log(data);
          if (data.cities) {
            setFavorites(data.cities);
          }
        } catch (error) {
          console.error("Failed to fetch favorites:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    if (isUserAuthenticated) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [isUserAuthenticated]);

  if (!isUserAuthenticated) {
    return (
      <div className={styles.message}>
        <h2>Please log in to view your favorite cities.</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.message}>
        <h2>Loading your favorite cities...</h2>
      </div>
    );
  }

  return (
    <div className={styles.favoritesPage}>
      <h1>Your Favorite Cities</h1>
      {favorites.length === 0 ? (
        <div className={styles.message}>
          <h2>No favorite cities added yet!</h2>
        </div>
      ) : (
        <div className={styles.grid}>
          {favorites.map((cityId) => (
            <FavoriteCitycard key={cityId} cityId={cityId} />
          ))}
        </div>
      )}
    </div>
  );
}