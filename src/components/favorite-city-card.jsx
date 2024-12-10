import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/styles/favorte-city-card.module.css"

export default function FavoriteCitycard({ cityId }) {
    const [city, setCity] = useState(null);
  
    useEffect(() => {
      const fetchCity = async () => {
        try {
          const res = await fetch(`/api/cities?cityId=${cityId}`);
          const data = await res.json();
          setCity(data);
        } catch (error) {
          console.error("Failed to fetch city details:", error);
        }
      };
      fetchCity();
    }, [cityId]);
  
    if (!city) {
      return (
        <div className={styles.cityCard}>
          <p>Loading...</p>
        </div>
      );
    }
  
    return (
      <Link href={`/cities/${city.id}`}>
        <div className={styles.cityCard}>
          <img src={city.image} alt={city.name} className={styles.cityImage} />
          <div className={styles.cityInfo}>
            <h3>{city.name}</h3>
            <p>{city.country}</p>
          </div>
        </div>
      </Link>
    );
  }