import EachItem from './EachItem';
import EditItem from './EditItem';
import Status from './Status';
import { db } from '../utils/firebase';
import { useAuth } from '../hooks/useAuth';
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

const Items = ({items, title}) => {
  const router = useRouter();
  const auth = useAuth();
  //const [ items, setItems ] = useState([]);
  const [ refresh, setRefresh ] = useState(false);

  return (
    <div>
      { title && (
        <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h6">
          Items <small>({items.length})</small>
        </Typography>
      )}
      <Grid container spacing={2}>
          {items.map(item => (
            <EachItem fullScreen={false} item={item} key={item.id} smSize={3} xsSize={6}/>
          ))}
      </Grid>
    </div>
  );
};

export default Items;
