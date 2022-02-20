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
          <Box>
              <Grid container style={{opacity: `0.5`}}>
                  <Grid item xs={12} sm={12}>
                    <Card style={{ backgroundColor: `${process.env.NEXT_PUBLIC_THEME_COLOR}`, color: `${auth.themeBgColor}` }}>
                      <CardActionArea>
                        { process.env.NEXT_PUBLIC_COMPANY_BANNER_URL && (
                          <CardMedia
                            component="img"
                            alt={ process.env.NEXT_PUBLIC_COMPANY_NAME }
                            image={ process.env.NEXT_PUBLIC_COMPANY_BANNER_URL ||
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
