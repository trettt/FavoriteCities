import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useAuthentication } from "@/utils/authenticationProvider";

const pages = [
  { text: "Home", icon: <HomeIcon />, path: "/home" },
  { text: "Search", icon: <SearchIcon />, path: "/search" },
  { text: "Favorites", icon: <FavoriteIcon />, path: "/favorites" },
];

const profileActions = ["Logout"];

export default function NavigationMenu() {
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { isUserAuthenticated, setIsUserAuthenticated } = useAuthentication();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsUserAuthenticated(true);
    } else {
      setIsUserAuthenticated(false);
    }
    console.log("user", user);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavigate = (path) => {
    router.push(path);
    handleCloseNavMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsUserAuthenticated(false);
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.text}
                  onClick={() => handleNavigate(page.path)}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  {page.icon}
                  <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ text, icon, path }) => (
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
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isUserAuthenticated ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User Avatar" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {profileActions.map((action) => (
                    <MenuItem key={action} onClick={handleLogout}>
                      <Typography textAlign="center">{action}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton onClick={() => router.push("/authentication")}>
                  <LoginIcon />
                  <ListItemText>Authentication</ListItemText>
                </ListItemButton>
              </ListItem>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
