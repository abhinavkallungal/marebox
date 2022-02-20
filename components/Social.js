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
  Radio,
  RadioGroup,
  Typography,
  Button
} from '@material-ui/core';

import {
  Facebook,
  Favorite,
  Home,
  Instagram,
  LocationOn,
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

const Social = () => {
  const auth = useAuth();
  const router = useRouter();

  const [linkColor, setLinkColor] = useState({});
  const [ s, setS ] = useState('');
  const [ isDialogOpen, setIsDialogOpen ] = useState(false);
  const [ isChecked, setIsChecked ] = useState(false);
  const [ searchCategory, setSearchCategory ] = useState('shop');

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
    <Grid
      container
      justify="center"
      style={{
        color: `${process.env.NEXT_PUBLIC_THEME_COLOR}`
      }}
    >
      { process.env.NEXT_PUBLIC_PHONE_NUMBER && (
        <Grid item>
          <a href={`tel: ${process.env.NEXT_PUBLIC_PHONE_NUMBER}`}>
            <Phone/>
          </a>
        </Grid>
      )}

      { process.env.NEXT_PUBLIC_FACEBOOK_URL && (
        <Grid item>
          <a href={process.env.NEXT_PUBLIC_FACEBOOK_URL} target="_blank">
            <Facebook/>
          </a>
        </Grid>
      )}

      { process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL && (
        <Grid item>
          <a href={process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL} target="_blank">
            <LocationOn/>
          </a>
        </Grid>
      )}

      { process.env.NEXT_PUBLIC_INSTAGRAM_URL && (
        <Grid item>
          <a href={process.env.NEXT_PUBLIC_INSTAGRAM_URL} target="_blank">
            <Instagram/>
          </a>
        </Grid>
      )}

      { process.env.NEXT_PUBLIC_WHATSAPP_NUMBER && (
        <Grid item>
          <a href={`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} target="_blank">
            <WhatsApp/>
          </a>
        </Grid>
      )}


      { process.env.NEXT_PUBLIC_YOUTUBE_URL && (
        <Grid item>
          <a href={ process.env.NEXT_PUBLIC_YOUTUBE_URL } target="_blank">
            <YouTube />
          </a>
        </Grid>
      )}

    </Grid>

  )
};

export default Social;
