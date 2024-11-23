import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid2";
import Link from "next/link";

export default function Cities({ cities }) {
  if (cities.length === 0) {
    return <div>Search for some cities</div>;
  }

  return (
    <Grid container spacing={2}>
      {cities.map((city, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Link href={`/cities/${city.id}`}>
            <Card sx={{ maxWidth: 345 }}>
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
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
