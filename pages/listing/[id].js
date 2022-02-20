import EachListing from '../../components/EachListing';
import { useAuth } from '../../hooks/useAuth';
import { Grid, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Listing = () => {
  const router = useRouter();
  const { id } = router.query;
  const state = useAuth();

  const [ listing, setListing ] = useState({});
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    state.listings.forEach(l => {
      if(l.id === id){
        setListing({...l});
        var temp = [];
        l.categories.split(',').forEach(c => {
          if(c.trim()){
            temp.push(c);
          }
        });
        setCategories([...temp]);
      }
    });
  },[ router, state ])

  return (
    
    <Grid
      alignItems="center"
      container
      direction="column"
      style={{
        backgroundColor: `${state.themeBgColor}`,
      }}
    >
     <Grid item xs={12} sm={6} style={{textAlign: `center`}}>
      <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h5">
        <Link href="/">
          <a>
            {process.env.NEXT_PUBLIC_COMPANY_NAME || 'Home'}
          </a>
        </Link>
        {' > '}
        <Link href="/directory">
          <a>
            Directory
          </a >
        </Link>
        <br/>
      </Typography>
      <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h6">
        { categories && categories.map(c => (
          <>
            { c.trim() && c.trim().split('/').map((i, idx) => (
              <Link key={`/dc?c=${i}`} href={`/dc?c=${c.trim().split('/').slice(0,idx+1).join('/')}`}>
                <a> / {i}</a>
              </Link>
            ))}
          </>
        ))}
      </Typography>

      <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h5">
        { listing.name || listing.companyName }
      </Typography>
    </Grid>
      { listing.categories && <EachListing fullScreen={true} listing={listing} smSize={6} xsSize={12}/> }

    </Grid>
  )
}

export default Listing;