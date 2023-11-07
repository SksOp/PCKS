import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { paths } from "src/router";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "src/hooks/auth";
import { useActiveLink } from "src/hooks/router";
import { alpha, useTheme } from "@mui/material";

const pages = [
  {
    name: "Home",
    path: paths.root,
    auth: true,
  },
  {
    name: "Dashboard",
    path: paths.dashboard.root,
    auth: true,
  },
  {
    name: "Students",
    path: paths.dashboard.student.root,
    auth: true,
  },
  {
    name: "Results",
    path: paths.dashboard.result.root,
    auth: true,
  },
  {
    name: "Logout",
    path: paths.logout,
    auth: true,
  },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const theme = useTheme();

  const pagesWithActiveState = pages.map((page) => ({
    ...page,
    active: useActiveLink(page.path),
  }));

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "black",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={paths.root}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Prem Chandra Kids School
          </Typography>

          {user && (
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
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
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pagesWithActiveState.map((page) => (
                  <MenuItem key={page.name} onClick={() => navigate(page.path)}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PCKS
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "flex-end",
              display: { xs: "none", md: "flex" },
              gap: 1,
            }}
          >
            {pagesWithActiveState.map((page) => {
              if (page.auth && !user) return null;
              return (
                <Button
                  key={page.name}
                  onClick={() => navigate(page.path)}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    backgroundColor: page.active
                      ? alpha(theme.palette.primary.main, 0.1)
                      : "unset",
                  }}
                  disableRipple={page.active}
                  variant={page.active ? "text" : "contained"}
                >
                  {page.name}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
