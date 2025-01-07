import * as React from "react";
import Grid from "@mui/material/Grid2";
import CityCard from "./city-card";

export default function Cities({ cities }) {
  return (
    <Grid container spacing={6}>
      {cities.map((city, index) => (
        <CityCard key={index} city={city}></CityCard>
      ))}
    </Grid>
  );
}
