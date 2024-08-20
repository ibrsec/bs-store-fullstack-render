import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton"; 
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useSelector } from "react-redux";
import useAuthServices from "../services/useAuthServices";
import { Link } from "react-router-dom";

const drawerWidth = 240; 

function AppBarComp(props) {
  const { token, username, isAdmin } = useSelector((state) => state.auth);
  const { logoutApi } = useAuthServices();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        BS-Store
      </Typography>
      <Divider />
      <List >
        {token && (
          <Link to="/">
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <Button sx={{ color: "black" }}>Home</Button>
              </ListItemButton>
            </ListItem>
          </Link>
        )}

        {token && isAdmin && (
          <Link to="/admin">
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <Button sx={{ color: "black" }}>Admin Panel</Button>
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        {token && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              {" "}
              <span sx={{ color: "black" }}>{username}</span>
            </ListItemButton>
          </ListItem>
        )}
        {token && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Button sx={{ color: "black" }} onClick={logoutApi}>
                Logout
              </Button>
            </ListItemButton>
          </ListItem>
        )}
        {!token && (
          <Link to="/login">
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <Button sx={{ color: "black" }}>{"Login"}</Button>
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        {!token && (
          <Link to="/register">
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <Button sx={{ color: "black" }}>{"Register"}</Button>
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        {/* {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem> 
        ))} */}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", marginBottom: "150px" }}>
      <CssBaseline />
      <AppBar component="nav" color="warning">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            BS-Store
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {token && (
              <Link to="/">
                <Button sx={{ color: "#fff" }}>Home</Button>
              </Link>
            )}
            {token && isAdmin && (
              <Link to="/admin">
                <Button sx={{ color: "#fff" }}>Admin Panel</Button>
              </Link>
            )}
            {token && <span sx={{ color: "#fff" }}>{username}</span>}
            {token && (
              <Button sx={{ color: "#fff" }} onClick={logoutApi}>
                Logout
              </Button>
            )}
            {!token && (
              <Link to="/login">
                <Button sx={{ color: "#fff" }}>{"Login"}</Button>
              </Link>
            )}
            {!token && (
              <Link to="/register">
                <Button sx={{ color: "#fff" }}>{"Register"}</Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default AppBarComp;
