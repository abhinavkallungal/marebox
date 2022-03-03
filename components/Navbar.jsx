import React, { useState } from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  Button,
} from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";
import { Business, MenuBook,School,ShoppingBasket} from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Grid } from "@mui/material";
import Link from "next/link";

const styles = (theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 10,
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});

const ToolbarComponent = (props) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(false);

  const handleProfileMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMobileMenuOpen = (e) => {
    setMobileMoreAnchorEl(e.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const { classes } = props;

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={anchorEl}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={mobileMoreAnchorEl}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      <Link href="/directory">
        <>
        <IconButton aria-label="show 4 new mails" color="inherit" >
          <MenuBook />
        </IconButton>
        <p>Directory</p>
        </>
      </Link>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <ShoppingBasket />
        </IconButton>
        <p>Shop</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Business />
        </IconButton>
        <p>Service</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <School />
        </IconButton>
        <p>Knowledge Base</p>
      </MenuItem>

      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <FavoriteIcon />
        </IconButton>
        <p>Wish List</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Login</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow} style={{ backgroundColor: "#2E3E6F" }}>
      <AppBar position="static" style={{ backgroundColor: "transparent" }}>
        <Toolbar>
          {process.env.NEXT_PUBLIC_COMPANY_LOGO_URL && (
            <Grid item>
              <div
                onClick={() => {
                  handleLinks("home");
                }}
              >
                <Link href="/">
                  <a>
                    <img
                      src={process.env.NEXT_PUBLIC_COMPANY_LOGO_URL}
                      style={{ borderRadius: `50%` }}
                      alt="Logo"
                      width={35}
                      height={35}
                    />
                  </a>
                </Link>
              </div>
            </Grid>
          )}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button aria-label="show 4 new mails" color="inherit">
              <Link href="/directory">
                <a>Directory</a>
              </Link>
            </Button>
            <Button aria-label="show 4 new mails" color="inherit">
              <Link href="/shop">
                <a>Shop</a>
              </Link>
            </Button>
            <Button aria-label="show 4 new mails" color="inherit">
              <Link href="/services">
                <a>Services</a>
              </Link>
            </Button>
            <Button aria-label="show 4 new mails" color="inherit">
              <Link href="/kb">
                <a>Knowledge Base</a>
              </Link>
            </Button>

            <IconButton>
              <Badge badgeContent={4} color="primary">
                <FavoriteIcon style={{ color: "#ffffff" }} />
              </Badge>
            </IconButton>
            <Button aria-label="show 4 new mails" color="inherit">
              <Link href="/login">
                <a>Log in</a>
              </Link>
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default withStyles(styles)(ToolbarComponent);
