import Categories from '../components/Categories';
import DirCategories from '../components/DirCategories';
import Items from '../components/Items';
import Listings from '../components/Listings';
import SearchComponent from '../components/SearchComponent';

import { useAuth } from '../hooks/useAuth'
import homePageSections from '../vars/homePageSections';
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@material-ui/core'
import { Close, DeleteForever, KeyboardArrowUp } from '@material-ui/icons'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Home = () => {

  const state = useAuth();
  const classes = state.useStyles();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [listings, setListings] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const { sub } = router.query;
    var temp = [];
    state.categories.length > 0 && state.categories.forEach(i => {
      if (!i.name.includes('/')) {
        temp.push(i);
      }
    });
    setCategories(temp);

    const newListings = state.listings;
    newListings.sort((a, b) => (a.__updatedTime__ > b.__updatedTime__) ? 1 : ((b.__updatedTime__ > a.__updatedTime__) ? -1 : 0))
    setListings([...newListings.slice(1, 5)]);

    const newItems = state.listings;
    newItems.sort((a, b) => (a.__updatedTime__ > b.__updatedTime__) ? 1 : ((b.__updatedTime__ > a.__updatedTime__) ? -1 : 0))
    setItems([...newItems.slice(1, 5)]);

  }, [state, router])

  return (
    <div style={{ backgroundColor: `${state.themeBgColor}`, paddingTop: "0px" }}>

      <SearchComponent />

     

      <Grid container
        spacing={2}
        style={{ padding: `15px` ,margin:"20px auto"}}
      > 


        {Object.values(homePageSections).map(homePageSection => (

          <Grid item xs={12} key={homePageSection.name} sm={6} md={3}>
            <Link href={homePageSection.link}>
              <Card className='category-card'>

                <CardMedia

                  className='category-card-image'
                  component="img"
                  alt={homePageSection.name}
                  height="150"
                  image={`https://source.unsplash.com/featured/?${homePageSection.name} ${process.env.NEXT_PUBLIC_UNSPLASH_BANNER_TAG}`}
                  title={homePageSection.name}
                />

                <div className='category-card-content'>
                  
                  <Typography variant='h4'>{homePageSection.name}</Typography>
                  <Typography> {homePageSection.description}</Typography>
                </div>
              </Card>



             </Link>
          </Grid>
        ))}
      </Grid>
      



      {listings && (
        <div style={{ padding: `10px` }}>
          <Typography style={{ color: `hotpink` }} variant="h5">New Listings:</Typography>
          <Listings listings={listings} />
        </div>
      )}

      {items && (
        <div style={{ padding: `10px` }}>
          <Typography style={{ color: `hotpink` }} variant="h5">New Items:</Typography>
          <Items items={items} />
        </div>
      )}
    </div>
  )
}

export default Home