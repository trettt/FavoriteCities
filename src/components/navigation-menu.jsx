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
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NavigationMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const items = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Search", icon: <SearchIcon />, path: "/search" },
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
        {items.map(({ text, icon, path }) => (
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
      {session ? (
        <Button
          variant="outlined"
          color="error"
          onClick={() => signOut()}
          sx={{ textTransform: "none" }}
        >
          Sign Out
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => signIn()}
          sx={{ textTransform: "none" }}
        >
          Sign In
        </Button>
      )}
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
