import Items from '../components/Items';
import Listings from '../components/Listings';
import { useAuth } from '../hooks/useAuth'
import { Card, CardActionArea, CardContent, CardMedia, Container, Dialog, Grid, Typography } from '@material-ui/core'
import { Close, DeleteForever, KeyboardArrowUp } from '@material-ui/icons'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Search = () => {

    const auth = useAuth();
    const router = useRouter();
    const [ items, setItems ] = useState([]);
    const [ listings, setListings ] = useState([]);

    useEffect(() => {
        // logic, search terms, search category
        const { l, s, sc } = router.query;
        let i = [];

        if(sc === 'shop'){
          setListings([]);
          auth.items.map(item => {
            if(s && l === 'and') {
              const searchFound = s.split(' ').every(sTerm => {
                return Object.values(item).join().toLowerCase().includes(sTerm.toLowerCase());
              })

              if(searchFound && item.category) {
                i.push(item);
              }

            } else if(s && l === 'or') {
              const searchFound = s.split(' ').some(sTerm => {
                return Object.values(item).join().toLowerCase().includes(sTerm.toLowerCase());
              })

              if(searchFound && item.category) {
                i.push(item);
              }
            }
            setItems([...i]);
          });
        } else if(sc === 'directory'){
          setItems([]);
          auth.listings.map(listing => {
            if(s && l === 'and') {
              const searchFound = s.split(' ').every(sTerm => {
                return Object.values(listing).join().toLowerCase().includes(sTerm.toLowerCase());
              })

              if(searchFound && listing.categories) {
                i.push(listing);
              }
            } else if(s && l === 'or') {
                const searchFound = s.split(' ').some(sTerm => {
                  return Object.values(listing).join().toLowerCase().includes(sTerm.toLowerCase());
                })

              if(searchFound && listing.categories) {
                i.push(listing);
              }
            }

            setListings([...i]);
          });
        } else {
          router.push('/');
        }

    },[auth, router])

    return (
        <>

            <div
              style={{
                backgroundColor: `${auth.themeBgColor}`,
                padding: `20px`
              }}
              
            >
              { items.length > 0 && <Items items={items}/> }
              { listings.length > 0  && <Listings listings={listings}/> }
            </div>
        </>
    )
}

export default Search
