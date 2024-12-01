import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import { CardActions, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Cities({ cities }) {
  if (cities.length === 0) {
    return <div>Search for some cities</div>;
  }

  const handleSaveCityToFavorite = async (event) => {
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
            cityId: event,
          }),
        });

        const data = await res.json();
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Grid container spacing={2}>
      {cities.map((city, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ maxWidth: 345 }}>
            <Link href={`/cities/${city.id}`}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={city.country_flag}
                  alt={city.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {city.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {city.country}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
            <CardActions disableSpacing>
              <IconButton
                aria-label="add to favorites"
                onClick={(event) => {
                  handleSaveCityToFavorite(city.id);
                }}
              >
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
