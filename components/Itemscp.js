import EditItem from '.\/EditItem';
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
    Favorite,
    FavoriteBorder,
    KeyboardArrowUp,
    Remove,
    WhatsApp
} from '@material-ui/icons';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ItemImage = ({item, mediaHt}) => {
  const [openDialog, setOpenDialog] = useState(false)
  return(
    <>
      <CardMedia
          alt={item.name}
          component="img"
          height={mediaHt}
          image={item.imgURL}
          onClick={() => setOpenDialog(true)}
          title={item.name}
      />
      <Dialog fullScreen onClose={() => {setOpenDialog(false)}} open={openDialog}>
          <Container maxWidth="xs">
          <Close onClick={() => { setOpenDialog(false) } }/>
          <EachItem fullScreen={true} item={item} key={item.id} smSize={12} xsSize={12}/>
          <br/>
          </Container>
      </Dialog>
    </>
  )
}

const EachItem = (props) => {
    const auth = useAuth();
    const router = useRouter();

    const [ cartAttributes, setCartAttributes ] = useState({ qty: 0 });
    const [ item, setItem ] = useState(props.item);
    const [ fav, setFav ] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
        message: '',
        error: ''
    });

    const deleteItem = async() => {
        setLoading(true);
        await axios.post("/api/db", { operation: 'delete', record: item, table: 'items' })
            .then(result => {
              if(!result.data.error){
                  setStatus({ ...status, ['message']: result.data.message });
                  auth.deleteItem(item.id);
                  setItem({});
              } else{
                  setStatus({ ...status, ['error']: result.data.error });
              }
            });
    };

    const handleChange = e => {
        e.preventDefault();
        const {name, value} = e.target;
        setCartAttributes({...cartAttributes, [name]: value});
    };

    const handleFavorite = e => {
        e.preventDefault();
        setFav(!fav);
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        const email = auth.userAuthData.email;
        const hash = email + item.id;
        const record = {...item, cartAttributes, email, hash};

        setLoading(true);
        await axios.post("/api/db", { operation: 'delete', record: item, table: 'items' })
            .then(result => {
              if(!result.data.error){
                  setStatus({ ...status, ['message']: result.data.message });
                  auth.deleteItem(item.id);
                  setItem({});
              } else{
                  setStatus({ ...status, ['error']: result.data.error });
              }
            });

        auth.updateCartItems(record);
    }

    useEffect(() => {
        if(item){
            const { id } = item;
            if(auth.favs && auth.favs.includes(id)){
                if(!fav) setFav(true);
            } else {
                if(fav) setFav(false);
            }
        }
    },[]);

    useEffect(() => {
        if(item){
            const { id } = item;
            auth.updateFavs(id, fav);
        }
    },[fav]);

    return(
      <>
        {item && item.imgURL && (
          <Grid item key={item.id} xs={props.xsSize} sm={props.smSize}>
            <Card
                style={{
                    border: `0.1px solid ${ process.env.NEXT_PUBLIC_THEME_COLOR_SEC }`,
                    borderRadius: `5px`,
                    boxShadow: `0.5px 0.5px`,
                    height: `${ props.fullScreen ? "100%" : "300" }`
                }}
            >
              <CardActionArea>
                <div style={{ textAlign: `center` }}>
                  <ItemImage item={item} mediaHt={props.fullScreen ? "50%" : "200"}/>
                </div>
              </CardActionArea>
              <CardContent>
                  <Grid container justify="space-between">
                      <Grid item xs={10}>
                          <Typography variant="body1">
                              {item.name}
                          </Typography>
                      </Grid>
                      <Grid item xs={2}>
                          {fav
                              ? <Favorite
                                    style={{color: process.env.NEXT_PUBLIC_THEME_COLOR }}
                                    onClick={handleFavorite}
                              />
                              : <FavoriteBorder
                                  onClick={handleFavorite}
                                  style={{color: process.env.NEXT_PUBLIC_THEME_COLOR }}
                              />
                          }
                      </Grid>
                  </Grid>
                  <Grid container justify="space-between">
                      <Grid item>
                          <Typography variant="body1">
                              Rs. { item.price }
                          </Typography>
                      </Grid>
                      <Grid item>
                          {auth.userAuthData && (
                              <>
                                  <EditItem item={item}/>
                                  <DeleteForever color="disabled" onClick={deleteItem}/>
                              </>
                          )}
                      </Grid>
                  </Grid>
              </CardContent>
              {props.fullScreen &&
              <CardActions>
              <Container maxWidth="xs">
                <form onSubmit={onSubmit}>
              <Typography gutterBottom>
                  Description: <br/>
                  {item.description}
              </Typography>
              <br/>
                  <Grid container spacing={2}>
                  {item.attributes && Object.keys(item.attributes).map(key => (
                      <Grid item key={key} xs={6}>
                        <TextField
                          fullWidth
                          label={key}
                          readOnly
                          value={item.attributes[key]}
                        />
                      </Grid>
                  ))}
                  </Grid>

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
                            value={cartAttributes[key] || ''}
                          >
                            {item.varAttributes[key].map( i => (
                                <MenuItem key={i} value={i}>{i}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        </Grid>
                    ))}

                    <Grid item xs={6}>
                      <FormControl fullWidth margin="normal" required>
                        <InputLabel id="qtyLabel">Quantity</InputLabel>
                        <Select
                          id="qtyId"
                          labelId="qtyLabel"
                          name="qty"
                          onChange={handleChange}
                          value={ cartAttributes['qty'] }
                        >
                          <MenuItem value={0}>0</MenuItem>
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                          <MenuItem value={3}>3</MenuItem>
                          <MenuItem value={4}>4</MenuItem>
                          <MenuItem value={5}>5</MenuItem>
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
              </Container>
              </CardActions>
              }
            </Card>
          </Grid>
      )}
      </>
    )
}

const Items = (props) => {
  const router = useRouter();
  const auth = useAuth();
  const [ items, setItems ] = useState([]);
  const [ refresh, setRefresh ] = useState(false);

  useEffect(() => {
      const { c } = router.query;

      if(c){
        var i = [];
        auth.items.map(item => {
            if (item.category.startsWith(c)) {
                i.push(item);
            }
        })
        setItems([...i]);
      }
  }, [auth.items, router]);

  return (
    <div>
      <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h6">
          Items <small>({items.length})</small>
      </Typography>
      <Grid container spacing={2} style={{backgroundColor: `#FFFFFF`}}>
          {items.map(item => (
            <EachItem fullScreen={false} item={item} key={item.id} smSize={3} xsSize={6}/>
          ))}
      </Grid>
    </div>
  );
};

export default Items;
