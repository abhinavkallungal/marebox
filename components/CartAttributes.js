import EditItem from './EditItem';
import ItemImage from './ItemImage';
import Status from './Status';
import { useAuth } from '../hooks/useAuth';
import {
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
import { makeStyles } from '@material-ui/core/styles';
import { Add,
    Close,
    DeleteForever,
    Favorite,
    FavoriteBorder,
    Remove,
    WhatsApp
} from '@material-ui/icons';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => ({
    input: {
      color: process.env.NEXT_PUBLIC_THEME_COLOR
    },
    label: {
      color: process.env.NEXT_PUBLIC_THEME_COLOR
    }
}));

const CartAttributes = (props) => {
    const classes = useStyles();
    const auth = useAuth();
    const router = useRouter();

    const { item } = props;

    const [cartAttributes, setCartAttributes] = useState({});

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
        message: '',
        error: ''
    });

    const handleChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        setCartAttributes({ ...cartAttributes, [name]: value });
    };

    const updateCart = async(e) => {

      e.preventDefault();

      const email = auth.userAuthData.email;
      const { id } = item;
      const hash = email + id;
      const record = { ...item, cartAttributes, email, hash };

      setLoading(true);
      await auth.updateCartItems(record)
        .then(() => {
          setStatus({ ...status, ['message']: 'Cart updated' });
          setLoading(false);
        }).catch(error => {
          setStatus({ ...status, error });
        });

    }

    useEffect(() => {
      if(auth.userAuthData){
        const hash = auth.userAuthData.email + item.id;
        const cartItems = auth.cartItems;

        for(var i=0; i<cartItems.length; i++){
          if(cartItems[i].hash === hash && cartItems[i].cartAttributes){
            setCartAttributes({...cartItems[i].cartAttributes});
            break;
          }
        }
      }

    },[auth]);

    return(
        <form onSubmit={updateCart}>
          <Grid container spacing={2}>

            {item.varAttributes && Object.keys(item.varAttributes).map(key => (
              <Grid item key={key} xs={6}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel id={`${key}Label`}>{key}</InputLabel>
                  <Select
                    id={`${key}Select`}
                    labelId={`${key}Label`}
                    name={key}
                    onChange={handleChange}
                    value={ cartAttributes[key] || '' }
                  >
                    {item.varAttributes[key].map( i => (
                        <MenuItem key={i} value={i}>{i}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ))}

            <Grid item sm={2} xs={6}>
              <FormControl fullWidth margin="normal" required>
                <InputLabel id="qtyLabel" className={classes.label}>Quantity</InputLabel>
                <Select
                  id="qtyId"
                  labelId="qtyLabel"
                  name="qty"
                  onChange={handleChange}
                  value={ cartAttributes['qty'] || 0 }
                >
                  {[0, 1, 2, 3, 4, 5].map(i => (
                    <MenuItem key={i} value={i}> {i} </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

          </Grid>

        <Status loading={loading} status={status}/>
        <br/>
        <small>Note: Setting quantity to 0 removes the item from cart.</small>
        <br/><br/>
        <Button
          color="primary"
          fullWidth
          margin="normal"
          type="submit"
          variant="contained"
        >
          Update Cart
        </Button>
      </form>
    )
}

export default CartAttributes;
