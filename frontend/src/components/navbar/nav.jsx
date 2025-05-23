import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const { isLoggedIn, logout, user } = useContext(AppContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = isLoggedIn
    ? [
        { text: "Home", path: "/" },
        { text: "Employees", path: "/employeeList" },
        { text: "Logout", action: handleLogout },
      ]
    : [{ text: "Login", path: "/login" }];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={2}
        sx={{
          backgroundColor: "#ffffff",
          color: "#333",
          paddingX: 2,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center" gap={1}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant={isMobile ? "subtitle1" : "h6"}
              component="div"
              sx={{
                fontWeight: "bold",
                color: "#1976d2",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              Logo
            </Typography>
          </Box>

          {/* Show user info on all screen sizes */}
          <Box display="flex" alignItems="center" gap={2}>
            {isLoggedIn && user?.userName && (
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar sx={{ width: 30, height: 30, bgcolor: "#1976d2" }}>
                  {user.userName.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body2">
                  Hello, <strong>{user.userName}</strong>
                </Typography>
              </Box>
            )}

            {/* Only show nav buttons on desktop */}
            {!isMobile &&
              navItems.map((item, index) =>
                item.path ? (
                  <Button
                    key={index}
                    variant="text"
                    sx={{
                      textTransform: "none",
                      fontWeight: 500,
                      color: "#1976d2",
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "#e3f2fd",
                      },
                    }}
                    onClick={() => navigate(item.path)}
                  >
                    {item.text}
                  </Button>
                ) : (
                  <Button
                    key={index}
                    variant="text"
                    sx={{
                      textTransform: "none",
                      fontWeight: 500,
                      color: "#d32f2f",
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "#fdecea",
                      },
                    }}
                    onClick={item.action}
                  >
                    {item.text}
                  </Button>
                )
              )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navItems.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => {
                  if (item.path) {
                    navigate(item.path);
                  } else {
                    item.action();
                  }
                }}
              >
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
