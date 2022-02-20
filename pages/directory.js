import Categories from '../components/Categories';
import Listings from '../components/Listings';
import DirCategories from '../components/DirCategories';
import { useAuth } from '../hooks/useAuth'
import { Card, CardActionArea, CardContent, CardMedia, Container, Dialog, Grid, Typography } from '@material-ui/core'
import { Close, DeleteForever, KeyboardArrowUp } from '@material-ui/icons'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Home = () => {

    const state = useAuth();
    const router = useRouter();
    const [ categories, setCategories ] = useState([]);
    const [ listings, setListings ] = useState([]);

    useEffect(() => {
        var temp = [];

        var tempListings = [];
        
        state.listings.forEach(listing => {
            if (listing.categories) {
                tempListings.push(listing);
            }
        })
        setListings(tempListings);

        state.categories.length > 0 && state.categories.forEach(i => {
            if(!i.name.includes('/')){
                temp.push(i);
            }
        });
        setCategories(temp);
    },[state, router])

    return (
        <>
            <div
              style={{
                backgroundColor: `${state.themeBgColor}`,
                padding: `20px`
              }}
            >

              <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h5">
                <Link href="/"><a> {process.env.NEXT_PUBLIC_COMPANY_NAME || 'Home'} </a></Link> > <Link href="/directory"><a> Directory </a></Link>
              </Typography>

                {process.env.NEXT_PUBLIC_NEED_DIR && (categories.length > 0) && (
                  <>
                      <div style={{marginBottom: `20px`}}>
                        <DirCategories categories={categories}/>
                      </div>
                  </>
                )}

              <Listings listings={listings}/>
            </div>
        </>
    )
}

export default Home