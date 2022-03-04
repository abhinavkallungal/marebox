import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogContent,
  FormControlLabel,
  FormControl,
  Checkbox,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useRouter } from "next/router";

import { useAuth } from "../hooks/useAuth";

import FavoriteIcon from "@material-ui/icons/Favorite";
import {
  Business,
  Favorite,
  MenuBook,
  PowerSettingsNew,
  School,
  ShoppingBasket,
  ShoppingCart,
  SupervisorAccount,
} from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";

import MoreIcon from "@material-ui/icons/MoreVert";
import { Grid } from "@mui/material";
import Link from "next/link";

let logedin = true;

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
  const auth = useAuth();
  const router = useRouter();

  const [linkColor, setLinkColor] = useState({});
  const [s, setS] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [searchCategory, setSearchCategory] = useState("shop");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLinks = (linkName) => {
    setLinkColor({ [linkName]: "hotpink" });
  };

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setS(value);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    setIsChecked(!isChecked);
  };

  const changeSearchCategory = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setSearchCategory(e.target.value);
  };

  useEffect(() => {
    if (s.trim() !== "") {
      const path = `/search?l=${
        isChecked ? "or" : "and"
      }&s=${s.trim()}&sc=${searchCategory}`;
      router.push(path);
    } else {
      router.push(router.route);
    }
  }, [isChecked, s, searchCategory]);

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
      <MenuItem onClick={handleMobileMenuClose}>
        <Link href="/directory">
          <a>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <MenuBook />
            </IconButton>
            Directory
          </a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link href="/shop">
          <a>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <ShoppingBasket />
            </IconButton>
            Shop
          </a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link href="/Service">
          <a>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Business />
            </IconButton>
            Service
          </a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link href="/kb">
          <a>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <School />
            </IconButton>
            Knowledge Base
          </a>
        </Link>
      </MenuItem>

      {auth.userAuthData && auth.userAuthData.emailVerified ? (
        <MenuItem onClick={handleMobileMenuClose}>
          <Link href="/">
            <a>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge
                  badgeContent={auth.favs.length > 0 ? auth.favs.length : 0}
                  color="primary"
                >
                  <FavoriteIcon />
                </Badge>
              </IconButton>
              Wish List
            </a>
          </Link>
        </MenuItem>
      ) : null}
      {auth.userAuthData && auth.userAuthData.emailVerified ? (
        <MenuItem onClick={handleMobileMenuClose}>
          <Link href="/">
            <a>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge
                  badgeContent={
                    auth.totalPrice > 0
                      ? auth.totalPrice > 1000
                        ? `${auth.totalPrice / 1000}K`
                        : `${auth.totalPrice}`
                      : 0
                  }
                  color="primary"
                >
                  <ShoppingCart
                    onClick={() => {
                      handleLinks("cart");
                    }}
                  />
                </Badge>
              </IconButton>
              Cart
            </a>
          </Link>
        </MenuItem>
      ) : null}
      {auth.userAuthData && auth.userAuthData.emailVerified ? (
        <MenuItem onClick={handleMobileMenuClose}>
          <Link href="/">
            <a>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <AccountCircle />
              </IconButton>
              My Account
            </a>
          </Link>
        </MenuItem>
      ) : null}
      {auth.userAuthData && auth.userAuthData.emailVerified ? (
        <MenuItem onClick={() => auth.signOut()}>
          <Link href="/signin">
            <a>Log Out</a>
          </Link>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleMobileMenuClose}>
          <Link href="/signin">
            
            <p>Login</p>
          </Link>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow} style={{ backgroundColor: "#2E3E6F" }}>
      <AppBar position="static" style={{ backgroundColor: "transparent" }}>
        <Toolbar>
          {process.env.NEXT_PUBLIC_COMPANY_LOGO_URL && (
            <Grid item>
              <div>
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
          <div
            className={classes.search}
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
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
              disabled
              style={{ color: "#ffffff" }}
            />
          </div>
          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogContent>
              <InputBase
                autoComplete="s"
                id="s"
                label="Search Items / Listings..."
                name="s"
                onChange={onChange}
                autoFocus
                placeholder="Search Items / Listings..."
                style={{ padding: `3px 3px`, width: "100%", maxWidth: `500px` }}
                value={s || ""}
                variant="outlined"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={handleCheck}
                    color="primary"
                  />
                }
                label="OR Search"
              />
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="searchCategory"
                  defaultValue="shop"
                  name="radio-buttons-group"
                  onChange={changeSearchCategory}
                  row
                  value={searchCategory}
                >
                  <FormControlLabel
                    value="shop"
                    control={<Radio />}
                    label="Shop"
                  />
                  <FormControlLabel
                    value="directory"
                    control={<Radio />}
                    label="Directory"
                  />
                </RadioGroup>
              </FormControl>
            </DialogContent>
          </Dialog>
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

            {auth.userAuthData && auth.userAuthData.emailVerified ? (
              <IconButton>
                <Link href="/f">
                  <Badge
                    badgeContent={auth.favs.length > 0 ? auth.favs.length : 0}
                    color="primary"
                  >
                    <FavoriteIcon style={{ color: "#ffffff" }} />
                  </Badge>
                </Link>
              </IconButton>
            ) : null}
            {auth.userAuthData && auth.userAuthData.emailVerified ? (
              <IconButton>
                <Link href="/cart">
                  <Badge
                    badgeContent={
                      auth.totalPrice > 0
                        ? auth.totalPrice > 1000
                          ? `${auth.totalPrice / 1000}K`
                          : `${auth.totalPrice}`
                        : 0
                    }
                    color="primary"
                  >
                    <ShoppingCart
                      onClick={() => {
                        handleLinks("cart");
                      }}
                      style={{
                        color: "#ffffff",
                      }}
                    />
                  </Badge>
                </Link>
              </IconButton>
            ) : null}

            {auth.userAuthData && auth.userAuthData.emailVerified ? (
              <IconButton>
                <Link href="/addlisting">
                  <a>
                    <AccountCircle style={{ color: "#ffffff" }} />
                  </a>
                </Link>
              </IconButton>
            ) : null}

            {auth.userAuthData && auth.userAuthData.emailVerified ? (
              <Button
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => auth.signOut()}
              >
                <Link href="/login">
                  <a>Log Out</a>
                </Link>
              </Button>
            ) : (
              <Button aria-label="show 4 new mails" color="inherit">
                <Link href="/signin">
                  <a>Log in</a>
                </Link>
              </Button>
            )}
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
