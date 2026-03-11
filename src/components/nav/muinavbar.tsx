import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Stack, Button, Menu, MenuItem } from "@mui/material";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";

const MuiNavBar = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleProjectsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeMenus = () => {
    handleClose();
    handleMobileClose();
  };

  const goTo = (path: string) => {
    navigate(path);
    closeMenus();
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileAnchor, setMobileAnchor] = useState<null | HTMLElement>(null);
  const mobileOpen = Boolean(mobileAnchor);

  const handleMobileClick = (event: React.MouseEvent<HTMLElement>) => {
    setMobileAnchor(event.currentTarget);
  };

  const handleMobileClose = () => {
    setMobileAnchor(null);
  };

  const menuItemStyle = {
    fontFamily: "Bebas Neue, sans-serif",
    fontSize: "1.25rem",
    color: "black"
  };
  
  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: "#120131", minHeight: { xs: 70, md: 100 } }}>
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
          <DonutSmallIcon sx={{ color: "primary.main"}}/>
        </IconButton>
        <Typography variant="h4" color="white">
          React Playground
        </Typography>
        {isMobile ? (
        <>
          <IconButton color="primary" onClick={handleMobileClick} sx={{ marginLeft: "auto" }}>
            <MenuIcon/>
          </IconButton>

          <Menu anchorEl={mobileAnchor} open={mobileOpen} onClose={handleMobileClose}>
            <MenuItem sx={menuItemStyle} onClick={() => goTo("/")}>Home</MenuItem>
            <MenuItem sx={menuItemStyle} onClick={() => goTo("/profile")}>Profile</MenuItem>
            <MenuItem sx={menuItemStyle} onClick={() => goTo("/projects/films")}>Films</MenuItem>
            <MenuItem sx={menuItemStyle} onClick={() => goTo("/projects/nfl")}>NFL</MenuItem>
            <MenuItem sx={menuItemStyle} onClick={() => goTo("/projects/randmrest")}>Rick & Morty</MenuItem>
            <MenuItem sx={menuItemStyle} onClick={() => goTo("/projects/elexon")}>Elexon BMRS</MenuItem>
          </Menu>
        </>
      ) : (
        <Stack direction="row" spacing={2} sx={{ marginLeft: "auto" }}>
          <Button onClick={() => navigate("/")}>HOME</Button>
          <Button onClick={() => navigate("/profile")}>PROFILE</Button>
          <Button onClick={handleProjectsClick}>PROJECTS</Button>
        </Stack>
      )}
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem sx={menuItemStyle} onClick={() => goTo("/projects/films")}> 
              Films 
          </MenuItem>
          <MenuItem sx={menuItemStyle} onClick={() => goTo("/projects/nfl")}> 
              NFL 
          </MenuItem>
          <MenuItem sx={menuItemStyle} onClick={() => goTo("/projects/randmrest")}> 
              Rick and Morty REST 
          </MenuItem>
          <MenuItem sx={menuItemStyle} onClick={() => goTo("/projects/elexon")}> 
              Elexon BMRS 
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default MuiNavBar;
