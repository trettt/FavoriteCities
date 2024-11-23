import Box from "@mui/material/Box";
import Cities from "@/components/cities";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

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
      saveCitiesToLocalStorage(data);
      emptyInput();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const saveCitiesToLocalStorage = (cities) => {
    try {
      localStorage.setItem("savedCities", JSON.stringify(cities));
      console.log("Cities saved to local storage.");
    } catch (err) {
      console.error("Error saving cities to local storage:", err);
    }
  };

  return (
    <>
      <Box>
        <h1>Search</h1>
        <form variant="standard" onSubmit={handleSubmit}>
          <Input
            id="input-with-icon"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          ></Input>
        </form>
      </Box>
      {loading && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div>
          <p>Error: {error.message}</p>
        </div>
      )}
      {!loading && !error && <Cities cities={citiesData} />}
    </>
  );
}
