import Cities from "@/components/cities";
import { useState } from "react";
import styles from "@/styles/search.module.css";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [citiesData, setCitiesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const emptyInput = () => {
    setSearchQuery("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/cities?query=${encodeURIComponent(searchQuery)}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch the cities!");
      }
      const data = await res.json();
      setCitiesData(data);
      emptyInput();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles["content-box"]}>
          <h1 className={styles.heading}>Find your favorite places!</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <span
              className={`${styles["search-icon"]} material-symbols-outlined`}
            >
              search
            </span>

            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              type="text"
              className={styles.input}
              placeholder="e.g. Brasov..."
            />
          </form>

          {loading && <span className={styles.loader}></span>}

          {error && (
            <div className={styles.error}>
              <p>Error: {error.message}</p>
            </div>
          )}

          {!loading && !error && <Cities cities={citiesData} />}
        </div>
      </div>
    </>
  );
}