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

import {useEffect, useContext, useState} from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes, {element} from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

import { Context } from 'context/auth';

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";
import ListItemText from "@mui/material/ListItemText";
import {Collapse, ListItemButton, ListSubheader} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

function Sidenav({ color, brand, brandName, routes, ...rest }) {
  const [openDirecao, setOpenDirecao] = useState(false);
  const [openSecretaria, setOpenSecretaria] = useState(false);
  const [openCoordenacao, setOpenCoordenacao] = useState(false);
  const [openProfessor, setOpenProfessor] = useState(false);
  const [openAutenticacao, setOpenAutenticacao] = useState(true);

  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode, sidenavColor } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");
  const { roles } = useContext(Context);

  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, window.innerWidth < 1200 ? false : transparentSidenav);
      setWhiteSidenav(dispatch, window.innerWidth < 1200 ? false : whiteSidenav);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);


  const handleClickDirecao = () => {
        setOpenDirecao(!openDirecao);
  }
    const handleClickSecretaria = () => {
        setOpenSecretaria(!openSecretaria);
    }
    const handleClickCoordenacao = () => {
        setOpenCoordenacao(!openCoordenacao);
    }
    const handleClickProfessor = () => {
        setOpenProfessor(!openProfessor);
    }
    const handleClickAutenticacao = () => {
        setOpenAutenticacao(!openAutenticacao);
    }

    // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, href, route, perfis }) => {
    let returnValue;

    if (perfis && !perfis.some((item) => roles.includes(item))) {
      return;
    }
    switch (type) {
      case "collapseDirecao" :
          returnValue = href ? (
              <Collapse in={openDirecao}>
                  <Link
                    href={href}
                    key={key}
                    target="_blank"
                    rel="noreferrer"
                    sx={{ textDecoration: "none" }}
                  >
                    <SidenavCollapse
                      name={name}
                      icon={icon}
                      active={key === collapseName}
                      noCollapse={noCollapse}
                    />
                  </Link>
              </Collapse>
                ) : (
              <Collapse in={openDirecao}>
                  <NavLink key={key} to={route}>
                    <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
                  </NavLink>
              </Collapse>
          );
      break;
      case "collapseSecretaria" :
        returnValue = href ? (
            <Collapse in={openSecretaria}>
              <Link
                  href={href}
                  key={key}
                  target="_blank"
                  rel="noreferrer"
                  sx={{ textDecoration: "none" }}
              >
                <SidenavCollapse
                    name={name}
                    icon={icon}
                    active={key === collapseName}
                    noCollapse={noCollapse}
                />
              </Link>
            </Collapse>
        ) : (
            <Collapse in={openSecretaria}>
              <NavLink key={key} to={route}>
                <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
              </NavLink>
            </Collapse>
        );
        break;
      case "collapseCoordenacao" :
        returnValue = href ? (
            <Collapse in={openCoordenacao}>
              <Link
                  href={href}
                  key={key}
                  target="_blank"
                  rel="noreferrer"
                  sx={{ textDecoration: "none" }}
              >
                <SidenavCollapse
                    name={name}
                    icon={icon}
                    active={key === collapseName}
                    noCollapse={noCollapse}
                />
              </Link>
            </Collapse>
        ) : (
            <Collapse in={openCoordenacao}>
              <NavLink key={key} to={route}>
                <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
              </NavLink>
            </Collapse>
        );
        break;
      case "collapseProfessor" :
        returnValue = href ? (
            <Collapse in={openProfessor}>
              <Link
                  href={href}
                  key={key}
                  target="_blank"
                  rel="noreferrer"
                  sx={{ textDecoration: "none" }}
              >
                <SidenavCollapse
                    name={name}
                    icon={icon}
                    active={key === collapseName}
                    noCollapse={noCollapse}
                />
              </Link>
            </Collapse>
        ) : (
            <Collapse in={openProfessor}>
              <NavLink key={key} to={route}>
                <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
              </NavLink>
            </Collapse>
        );
        break;
        case "collapseAutenticacao" :
            returnValue = href ? (
                <Collapse in={openAutenticacao}>
                    <Link
                        href={href}
                        key={key}
                        target="_blank"
                        rel="noreferrer"
                        sx={{ textDecoration: "none" }}
                    >
                        <SidenavCollapse
                            name={name}
                            icon={icon}
                            active={key === collapseName}
                            noCollapse={noCollapse}
                        />
                    </Link>
                </Collapse>
            ) : (
                <Collapse in={openAutenticacao}>
                    <NavLink key={key} to={route}>
                        <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
                    </NavLink>
                </Collapse>
            );
            break;

      case "titleDirecao" :
          returnValue = (
            <MDTypography
                key={key}
                color={textColor}
                display="block"
                variant="caption"
                fontWeight="bold"
                fontSize={15}
                textTransform="uppercase"
                pl={1}
                // mt={2}
                // mb={1}
                // ml={1}
            >
              <ListItemButton onClick={handleClickDirecao}>
                {title}&nbsp;&nbsp;
                {openDirecao ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </MDTypography>
          );
      break;
      case "titleSecretaria" :
        returnValue = (
            <MDTypography
                key={key}
                color={textColor}
                display="block"
                variant="caption"
                fontWeight="bold"
                fontSize={15}
                textTransform="uppercase"
                pl={1}
                // mt={2}
                // mb={1}
                // ml={1}
            >
              <ListItemButton onClick={handleClickSecretaria}>
                {title}&nbsp;&nbsp;
                {openSecretaria ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </MDTypography>
        );
        break;
      case "titleCoordenacao" :
        returnValue = (
            <MDTypography
                key={key}
                color={textColor}
                display="block"
                variant="caption"
                fontWeight="bold"
                fontSize={15}
                textTransform="uppercase"
                pl={1}
                // mt={2}
                // mb={1}
                // ml={1}
            >
              <ListItemButton onClick={handleClickCoordenacao}>
                {title}&nbsp;&nbsp;
                {openCoordenacao ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </MDTypography>
        );
        break;
      case "titleProfessor" :
        returnValue = (
            <MDTypography
                key={key}
                color={textColor}
                display="block"
                variant="caption"
                fontWeight="bold"
                fontSize={15}
                textTransform="uppercase"
                pl={1}
                // mt={2}
                // mb={1}
                // ml={1}
            >
              <ListItemButton onClick={handleClickProfessor}>
                {title}&nbsp;&nbsp;
                {openProfessor ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </MDTypography>
        );
        break;
        case "titleAutenticacao" :
            returnValue = (
                <MDTypography
                    key={key}
                    color={textColor}
                    display="block"
                    variant="caption"
                    fontWeight="bold"
                    fontSize={15}
                    textTransform="uppercase"
                    pl={1}
                    // mt={2}
                    // mb={1}
                    // ml={1}
                >
                    <ListItemButton onClick={handleClickAutenticacao}>
                        {title}&nbsp;&nbsp;
                        {openAutenticacao ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </MDTypography>
            );
            break;

      case "divider" :
          returnValue = (
            <Divider
              key={key}
              light={
                (!darkMode && !whiteSidenav && !transparentSidenav) ||
                (darkMode && !transparentSidenav && whiteSidenav)
              }
            />
          );
      break;
    }

    return returnValue;
  });

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && <MDBox component="img" src={brand} alt="Brand" width="10rem" />}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >
            <MDTypography component="h6" variant="button" fontWeight="medium" color={textColor}>
              {brandName}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
