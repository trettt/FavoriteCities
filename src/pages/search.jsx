import Box from "@mui/material/Box";
import * as React from "react";
import Cities from "@/components/cities";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [citiesData, setCitiesData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

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
