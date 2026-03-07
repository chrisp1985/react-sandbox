import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Stack, Button, Menu, MenuItem } from "@mui/material";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import { useNavigate } from "react-router-dom";

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

  const goTo = (path: string) => {
    navigate(path);
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
          <DonutSmallIcon />
        </IconButton>
        <Typography variant="h6" color="white">
          MuiNav
        </Typography>
        <Stack direction="row" spacing={2} sx={{ marginLeft: "auto" }}>
          <Button color="inherit" onClick={() => navigate("/")}>
            HOME
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            PROFILE
          </Button>
          <Button color="inherit" onClick={handleProjectsClick}>
            PROJECTS
          </Button>
        </Stack>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => goTo("/projects/films")}>
            Films
          </MenuItem>
          <MenuItem onClick={() => goTo("/projects/nfl")}>
            NFL
          </MenuItem>
          <MenuItem onClick={() => goTo("/projects/randmrest")}>
            Rick and Morty REST
          </MenuItem>
          <MenuItem onClick={() => goTo("/projects/elexon")}>
            Elexon BMRS
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default MuiNavBar;
