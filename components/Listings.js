import EachListing from './EachListing';
import EditListing from './EditListing';
import Status from './Status';
import { useAuth } from '../hooks/useAuth';
import { db } from '../utils/firebase';
import {
    
    Grid,
  
    Typography,
} from '@material-ui/core';

import { useRouter } from 'next/router';
import ProducrCard from './ProductCard';


const Listings = ({ listings, title }) => {
  const router = useRouter();
  const auth = useAuth();
  
  console.log(listings);

  return(
    <>

<Grid container >
      <ProducrCard/>
      <ProducrCard/>
      <ProducrCard/>
      <ProducrCard/>

        </Grid>
   


      { title && (
        <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h6">
          Listings <small>({listings.length})</small>
        </Typography>
      )}
      
      <Grid container spacing={2}>
          {listings.map(listing => (
            <EachListing fullScreen={false} listing={listing} key={listing.id} smSize={3} xsSize={12}/>
          ))}
      </Grid>
    </>
  )
};

export default Listings;