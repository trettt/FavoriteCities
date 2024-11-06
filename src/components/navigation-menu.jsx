import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  LocationCity as CityIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";

import { useRouter } from "next/router";

export default function NavigationMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const items = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Search", icon: <SearchIcon />, path: "/search" },
    { text: "Cities", icon: <CityIcon />, path: "/cities" },
    { text: "Favorites", icon: <FavoriteIcon />, path: "/favorites" },
  ];

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 200, padding: 2 }} role="presentation">
      <Box>
        <IconButton onClick={toggleDrawer(false)}>
          <FaArrowCircleLeft />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <List>
      {items.map(({ text, icon, path }, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton onClick={() => router.push(path)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText
              primary={text}
              primaryTypographyProps={{ fontWeight: "medium" }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    </Box>
  );

  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
        sx={{
          fontSize: "1.9rem",
        }}
        color="white"
      >
        <FaArrowCircleRight />
      </Button>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
