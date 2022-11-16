/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator, setDarkMode,
} from "context";
import Switch from "@mui/material/Switch";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";
import TwitterIcon from "@mui/icons-material/Twitter";
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from "@mui/icons-material/Facebook";
import {Share, Instagram} from "@mui/icons-material";
import {RWebShare} from "react-web-share";

function DashboardNavbar({ absolute, light, isMini }) {

  const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /**
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    // window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      // color="inherit"
      // sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            {/*<MDBox pr={1}>*/}
            {/*  <MDInput label="Pesquisar aqui" />*/}
            {/*</MDBox>*/}
            <MDBox color={light ? "white" : "inherit"}>
              {/*<Link to="/authentication/sign-in/basic">*/}
              {/*  <IconButton sx={navbarIconButton} size="small" disableRipple>*/}
              {/*    <Icon sx={iconsStyle}>account_circle</Icon>*/}
              {/*  </IconButton>*/}
              {/*</Link>*/}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              {/*<IconButton*/}
              {/*  size="small"*/}
              {/*  disableRipple*/}
              {/*  color="inherit"*/}
              {/*  sx={navbarIconButton}*/}
              {/*  onClick={handleConfiguratorOpen}*/}
              {/*>*/}
              {/*  <Icon sx={iconsStyle}>settings</Icon>*/}
              {/*</IconButton>*/}
              {/*<IconButton*/}
              {/*  size="small"*/}
              {/*  disableRipple*/}
              {/*  color="inherit"*/}
              {/*  sx={navbarIconButton}*/}
              {/*  aria-controls="notification-menu"*/}
              {/*  aria-haspopup="true"*/}
              {/*  variant="contained"*/}
              {/*  onClick={handleOpenMenu}*/}
              {/*>*/}
              {/*  <Icon sx={iconsStyle}>notifications</Icon>*/}
              {/*</IconButton>*/}
              <IconButton >
                <MDTypography variant="h6">Light / Dark</MDTypography>
                <Switch checked={darkMode} onChange={handleDarkMode} />
                <RWebShare data={{
                  title:' Compartilhe',
                  url: 'https://www.alf5.com.br/',
                }} onClick={() => console.log("Compartilhamento realizado com sucesso!")}
                >
                  <ShareIcon color='secondary'/>
                </RWebShare>
              </IconButton>
              {renderMenu()}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
