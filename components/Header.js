import ToggleTheme from './ToggleTheme';
import { useAuth } from '../hooks/useAuth';

import {
  AppBar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Radio,
  RadioGroup,
  Typography,
  Button
} from '@material-ui/core';

import {
  AccountCircle,
  Favorite,
  Instagram,
  MoreVert,
  Phone,
  PowerSettingsNew,
  Search,
  ShoppingCart,
  SupervisorAccount,
  WhatsApp,
  YouTube
} from '@material-ui/icons';

import { Alert } from '@material-ui/lab';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Header = () => {
  const auth = useAuth();
  const classes = auth.useStyles();
  const router = useRouter();

  const [linkColor, setLinkColor] = useState({});
  const [ s, setS ] = useState('');
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const [ isChecked, setIsChecked ] = useState(false);
  const [ searchCategory, setSearchCategory ] = useState('shop');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLinks = (linkName) => {
    setLinkColor({[linkName]: "hotpink"})
  }

  const onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setS(value);
  }

  const handleCheck = e => {
    e.preventDefault();
    setIsChecked(!isChecked);
  }

  const changeSearchCategory = e => {
    e.preventDefault();
    console.log(e.target.value);
    setSearchCategory(e.target.value);
  }

  useEffect(() => {
    if(s.trim() !== ''){
      const path = `/search?l=${isChecked ? 'or' : 'and'}&s=${s.trim()}&sc=${searchCategory}`
      router.push(path);
    } else {
        router.push(router.route);
    }
  },[isChecked, s, searchCategory])

  return (
    <AppBar style={{ backgroundColor: `${process.env.NEXT_PUBLIC_THEME_COLOR}`, padding: `0.5px 30px`}}>

        <Grid
          alignItems="center"
          container
          justify="space-between"
          style={{ color: `${auth.themeBgColor}`, padding: `2px` }}
        >

         

          {process.env.NEXT_PUBLIC_COMPANY_LOGO_URL && (
            <Grid item>
              <div onClick={() => {handleLinks('home')}}>
              <Link href="/"><a>
                  <img
                    src={process.env.NEXT_PUBLIC_COMPANY_LOGO_URL}
                    style={{backgroundColor: `${linkColor['home'] || process.env.NEXT_PUBLIC_THEME_COLOR}`, borderRadius: `50%`}}
                    alt="Logo"
                    width={35}
                    height={35}
                  />
              </a></Link>
              </div>
            </Grid>
          )}

          <Grid item>
            <Search onClick={() => {setIsDialogOpen(true)}} style={{color: `${auth.themeBgColor}`, borderRadius: `50%`}}/>
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
                style={{ padding: `3px 3px`, width: `500px` }}
                value={s || ''}
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
                    <FormControlLabel value="shop" control={<Radio />} label="Shop" />
                    <FormControlLabel value="directory" control={<Radio />} label="Directory" />
                  </RadioGroup>
                </FormControl>
              </DialogContent>
            </Dialog>
          </Grid>

          <Grid item>
            <ToggleTheme/>
          </Grid>
          
          <Grid item>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <MoreVert style={{color: `${auth.themeBgColor}`, borderRadius: `50%`}} />
              </IconButton>
              
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              classes = {{ paper: classes.paper}}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              
              <MenuItem onClick={handleClose}><Link href="/directory"><a>Directory</a></Link></MenuItem>
              <MenuItem onClick={handleClose}><Link href="/shop"><a>Shop</a></Link></MenuItem>
              <MenuItem onClick={handleClose}><Link href="/services"><a>Services</a></Link></MenuItem>
              <MenuItem onClick={handleClose}><Link href="/kb"><a>Knowledge Base</a></Link></MenuItem>
            </Menu>
          </Grid>

            { (auth.userAuthData && auth.userAuthData.emailVerified)
              ? (
                <>
                  <Grid item>
                    <Link href="/f"><a><Favorite
                      onClick={()=>{handleLinks('favorites')}}
                      style={{
                        backgroundColor:`${linkColor['favorites'] || 'inherit'}`,
                        borderRadius: `50%`
                      }}
                    /></a></Link>
                    <small> { auth.favs.length > 0 && auth.favs.length } </small>
                  </Grid>

                  <Grid item>
                    <Link href="/cart"><a><ShoppingCart
                      onClick={()=>{handleLinks('cart')}}
                      style={{
                        backgroundColor: `${linkColor['cart'] || 'inherit'}`,
                        borderRadius: `50%`
                      }}/>
                    </a></Link>
                    <small> { auth.totalPrice > 0 && (auth.totalPrice > 1000 ? `${auth.totalPrice/1000}K` : `${auth.totalPrice}`) } </small>
                    
                  </Grid>
                    
                    
                  

                  <Grid item>
                    <PowerSettingsNew  onClick={() => auth.signOut()}/>
                  </Grid>
                  { auth.userAuthData.emailVerified && (
                  auth.userAuthData.email === process.env.NEXT_PUBLIC_ADMIN ? (
                    <Grid item>
                      <Link href="/add">
                        <a>
                          <SupervisorAccount/>
                        </a>
                      </Link>
                    </Grid>
                    ) : (
                    <Grid item>
                      <Link href="/addlisting">
                        <a>
                          <AccountCircle/>
                        </a>
                      </Link>
                    </Grid>
                  )
                  )}
                </>
              ) : (
                <Grid item>
                  <Link href="/signin"><a>
                    <PowerSettingsNew/>
                  </a></Link>
                </Grid>
              )
            }
        </Grid>
    </AppBar>
)};

export default Header;
