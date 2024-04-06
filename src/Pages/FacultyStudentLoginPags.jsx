import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Switch,
  Alert,
  Menu,
  Button,
  MenuItem,
} from "@mui/material";
import "../Style/facultyStudentLogin.css";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import Flag from "react-flagkit";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));
import { useCookies } from "react-cookie";

const FacultyStudentLoginPags = ({ mode, setMode }) => {
  const store = useSelector((store) => store);
  const [showAlert, setShowAlert] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [cookie] = useCookies(["i18next"]);
  const codes = cookie.i18next === "en" ? "US" : cookie.i18next;
  const [languageCode, setLanguageCode] = useState(
    codes && codes.toUpperCase()
  );
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (store.admin.admin.showModal) {
      setShowAlert(true);
    }
    if (store.faculty.faculty.showModal) {
      setShowAlert(true);
    }
    if (store.dekan.dekan.showModal) {
      setShowAlert(true);
    }
    if (store.news.news.showModal) {
      setShowAlert(true);
    }
    if (store.student.student.showModal) {
      setShowAlert(true);
    }
  }, [
    store.admin.admin.showModal,
    store.dekan.dekan.showModal,
    store.faculty.faculty.showModal,
    store.news.news.showModal,
    store.student.student.showModal,
  ]);

  const language = [
    { code: "en", name: "English", country_code: "US" },
    { code: "uz", name: "Uzbek", country_code: "UZ" },
  ];
  return (
    <Box color={"text.primary"} bgcolor="background.default">
      <AppBar sx={{ height: "60px" }} position="sticky">
        <Container sx={{ height: "60px" }} maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }} disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontSize: { xs: 15, md: 22 },
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TonicDev
            </Typography>
            {showAlert && (
              <Alert
                sx={{
                  fontSize: { lg: 15, sm: 12, xs: 10 },
                  position: { xs: "absolute", md: "static" },
                  top: 70,
                  zIndex: 100,
                }}
                severity="warning"
              >
                {t("warning")}
              </Alert>
            )}
            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Flag country={languageCode} />
                &nbsp;
                <span className="text-white">
                  {languageCode === "US" ? "English" : "Uzbek"}
                </span>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {language.map(({ name, country_code, code }) => (
                  <li
                    key={country_code}
                    onClick={() => setLanguageCode(country_code)}
                  >
                    <MenuItem onClick={() => i18next.changeLanguage(code)}>
                      <Flag country={country_code} />
                      &nbsp;
                      {name}
                    </MenuItem>
                  </li>
                ))}
              </Menu>
              {/* <Link style={{ textDecoration: "none", color: "white" }} to="/">
                Login
              </Link> */}
              <MaterialUISwitch
                defaultChecked
                onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "center" },
          minHeight: 550,
          // alignItems: 'center',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default FacultyStudentLoginPags;
