import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../store/loginContext";
import Links from "./ui/Links";
import FilterComponent from "./ui/FilterComponent";
import ROUTES from "../../routes/ROUTES";

const HeaderComponent = ({ isDarkTheme, onThemeChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { setLogin, login } = useContext(LoginContext);
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleThemeChange = (event) => {
    onThemeChange(event.target.checked);
  };

  const handleNavigation = (route) => {
    navigate(route);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogin(false);
    navigate(ROUTES.LOGIN);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {[
        { label: "HomePage", route: ROUTES.HOME, condition: login || !login },
        { label: "Favorite", route: ROUTES.FAVORITE, condition: login },
        {
          label: "My Card",
          route: ROUTES.MYCARD,
          condition: (login && login.isBusiness) || (login && login.isAdmin),
        },
        {
          label: "Create ",
          route: ROUTES.CREATECARD,
          condition: (login && login.isBusiness) || (login && login.isAdmin),
        },
        {
          label: "SandBox",
          route: ROUTES.SANDBOX,
          condition: login && login.isAdmin,
        },

        { label: "Login", route: ROUTES.LOGIN, condition: !login },
        { label: "Register Page", route: ROUTES.REGISTER, condition: !login },
        { label: "About Us ", route: ROUTES.ABOUT },
      ].map((item, index) =>
        item.condition !== undefined && item.condition ? (
          <MenuItem key={index} onClick={() => handleNavigation(item.route)}>
            <IconButton
              size="large"
              aria-label={`menu item ${index}`}
              color="inherit"
            ></IconButton>
            <p>{item.label}</p>
          </MenuItem>
        ) : null
      )}
    </Menu>
  );

  return (
    <Box sx={{ position: "sticky", left: 0, right: 0, top: 0, zIndex: 1000 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <img src="../assets/imgs/logo.png" alt="logo" />
          </Typography>
          <Links />
          <FilterComponent />
          <Box sx={{ my: 2, p: 1 }}>
            <Typography sx={{ display: { xs: "none", md: "inline" } }}>
              {isDarkTheme ? "Dark" : "Light"} Mode
            </Typography>
            <Switch checked={isDarkTheme} onChange={handleThemeChange} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: "flex" } }}>
            {login && (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="success-search-account-menu"
                aria-haspopup="true"
                onClick={() => navigate(`${ROUTES.PROFILE}/${login._id}`)}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex" } }}>
            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              size="large"
              aria-label="show more"
              aria-controls="primary-search-account-menu-mobile"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>

            {login && (
              <Box display="flex" alignItems="center">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="success-search-account-menu"
                  aria-haspopup="true"
                  onClick={handleLogout}
                  color="inherit"
                >
                  <ExitToAppIcon />
                </IconButton>
                <p>logout</p>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};

export default HeaderComponent;
