import EachListing from './EachListing';
import EditListing from './EditListing';
import Status from './Status';
import { useAuth } from '../hooks/useAuth';
import { db } from '../utils/firebase';
import {
    Box,
    Button,
    Grid,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Dialog,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core';
import { Add,
    Close,
    DeleteForever,
    KeyboardArrowUp,
    Remove,
    WhatsApp
} from '@material-ui/icons';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Listings = ({ listings, title }) => {
  const router = useRouter();
  const auth = useAuth();
  
  console.log(listings);

  return(
    <>
      { title && (
        <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h6">
          Listings <small>({listings.length})</small>
        </Typography>
      )}
      <Grid container spacing={2}>
          {listings.map(listing => (
            <EachListing fullScreen={false} listing={listing} key={listing.id} smSize={3} xsSize={12}/>
          ))}
      </Grid>
    </>
  )
};

export default Listings;