import {
  AppBar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button
} from '@material-ui/core';
import {
  Favorite,
  Home,
  PowerSettingsNew,
  ShoppingCart,
  WhatsApp,
  YouTube
} from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Banner = () => {
  const auth = useAuth();
  const [linkColor, setLinkColor] = useState({});
  const handleLinks = (linkName) => {
    setLinkColor({[linkName]: "hotpink"})
  }

    return (
          <Box className='banner'  style={{border:"2px solid red"}}>
            
              <Grid container>
                  <Grid item xs={12} sm={12} style={{height:'100vh'}}>
                    <Card style={{ backgroundColor: `${process.env.NEXT_PUBLIC_THEME_COLOR}`, color: `${auth.themeBgColor}` ,minHeight:'500px'}}>
                      <CardActionArea>
                        { process.env.NEXT_PUBLIC_COMPANY_BANNER_URL && (
                          <CardMedia
                            component="img"
                            alt={ process.env.NEXT_PUBLIC_COMPANY_NAME }
                            image={ `https://media.istockphoto.com/photos/artificial-intelligence-and-communication-network-concept-picture-id1297832728?b=1&k=20&m=1297832728&s=170667a&w=0&h=6kLz5QqY7DihAzzznA_hcMy8MxhtdNPkgeVu-gLETog` ||
                              `https://source.unsplash.com/featured/?${process.env.NEXT_PUBLIC_UNSPLASH_BANNER_TAG}`
                            }
                            title={ process.env.NEXT_PUBLIC_COMPANY_NAME }
                          />
                        )}
                      </CardActionArea>
                      { process.env.NEXT_PUBLIC_COMPANY_BANNER_NEXT == 'true' && (
                      <CardContent>
                          <Typography
                            style={{
                              fontFamily: `Monospace`,
                              textShadow: `1px 1px`
                            }}
                            variant="h3"
                            component="h1"
                          >
                            { process.env.NEXT_PUBLIC_COMPANY_NAME }
                          </Typography>
                          <Typography paragraph variant="h5">
                              { process.env.NEXT_PUBLIC_SUB_TITLE_1 }
                          </Typography>
                          <Typography component="p" paragraph variant="subtitle2">
                              { process.env.NEXT_PUBLIC_SUB_TITLE_2 }
                              fgdfgdfgsdfgfgg
                          </Typography>
                      </CardContent>
                      )}
                    </Card>
                  </Grid>
              </Grid>
          </Box>
      )
};

export default Banner;
