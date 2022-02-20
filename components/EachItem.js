import CartAttributes from './CartAttributes';
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
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';

const EachItem = (props) => {
    const state = useAuth();
    const classes = state.useStyles();
    const router = useRouter();

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
                  state.deleteItem(item.id);
                  setItem({});
              } else{
                  setStatus({ ...status, ['error']: result.data.error });
              }
            });
    };

    const handleFavorite = e => {
        e.preventDefault();
        setFav(!fav);
        state.updateFavs(item.id, !fav);
    };

    useEffect(() => {
        if(item){
            const { id } = item;
            if(state.favs && state.favs.includes(id)){
                if(!fav) setFav(true);
            } else {
                if(fav) setFav(false);
            }
        }
    },[]);

    return(
      <>
        {item && item.imgURL && (
          <Grid item key={item.id} xs={props.xsSize} sm={props.smSize}>
            <Card
                className={classes.card}
                style={{
                    height: `${ props.fullScreen ? "100%" : "300" }`
                }}
            >
              <CardActionArea>
                <div style={{ textAlign: `center` }}>
                  <ItemImage item={item} mediaHt={props.mediaHt || props.fullScreen ? "50%" : "200"}/>
                </div>
              </CardActionArea>
              <CardContent style={{backgroundColor: `${state.themeBgColor}`}}>
                  <Grid container justify="space-between">
                      <Grid item xs={10}>
                          <Typography>
                              {item.name}
                          </Typography>
                      </Grid>
                      { (state.userAuthData && (state.userAuthData.email === process.env.NEXT_PUBLIC_ADMIN) )? (
                      <Grid item xs={2}>
                          {fav
                              ? <Favorite
                                    style={{ color: process.env.NEXT_PUBLIC_THEME_COLOR }}
                                    onClick={handleFavorite}
                              />
                              : <FavoriteBorder
                                  onClick={handleFavorite}
                                  style={{ color: process.env.NEXT_PUBLIC_THEME_COLOR }}
                              />
                          }
                      </Grid>
                      ) : <></> }
                  </Grid>
                  <Grid container justify="space-between">
                      { item.price > 0 ? (
                      <Grid item>
                          <Typography variant="body1">
                              Rs. { item.price }
                          </Typography>
                          { item.mrp &&
                              item.mrp > item.price ? (
                                <Typography style={{ textDecoration: `line-through` }} variant="body2">
                                    Rs. { item.mrp }
                                </Typography>
                             ) : <></>
                          }
                      </Grid>
                      ) : (
                      <Grid item>
                        <a
                          href={`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}&text='please send quote for ${item.name} at https://marebox.co.in/item/${item.id}'`}
                          target="_blank"
                        >
                          <Button color="primary"> Get Quote </Button>
                        </a>
                      </Grid>
                      )}
                      <Grid item>
                          { state.userAuthData && (state.userAuthData.email === process.env.NEXT_PUBLIC_ADMIN) && (
                              <>
                                  <EditItem item={item}/>
                                  <DeleteForever color="disabled" onClick={deleteItem} style={{ color: `orange` }}/>
                              </>
                          )}
                      </Grid>
                  </Grid>
              </CardContent>
              {props.fullScreen &&
              <CardContent>
              <Typography gutterBottom>
                <Markdown>
                  { item.description }
                </Markdown>
              </Typography>
              <br/>
                  <Grid container spacing={2}>
                  {item.attributes && Object.keys(item.attributes).map(key => (
                      <Grid item key={key} xs={6}>
                        <TextField
                          fullWidth
                          inputProps={{
	                            style: { color: `${state.themeColor}` },
                          }}
                          InputLabelProps={{
                            className: classes.label
                          }}
                          label={key}
                          readOnly
                          value={item.attributes[key]}
                        />
                      </Grid>
                  ))}
                  </Grid>
                  { item.price > 0 && (
                    <>
                  { state.userAuthData
                    ? <CartAttributes item={item}/>
                    : (
                      <Link href="/signin"><a>
                        <Button color="primary"> Sign in to Buy </Button>
                      </a></Link>
                    )
                  }
                    </>
                  )}

              </CardContent>
              }
            </Card>
          </Grid>
      )}
      </>
    )
}

export default EachItem;
