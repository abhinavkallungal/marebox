import EachListing from './EachListing';
import { useAuth } from '../hooks/useAuth';
import {
    CardMedia,
    Container,
    Dialog
} from '@material-ui/core';
import {
    Close
} from '@material-ui/icons';
import Link from 'next/link';
import { useState } from 'react';

const ListingImage = ({listing, mediaHt}) => {
  const auth = useAuth();
  const [openDialog, setOpenDialog] = useState(false);

  return(
    <>
      <Link href={`/listing/${listing.id}`}><a>
        <CardMedia
          alt={listing.name}
          component="img"
          height={mediaHt}
          image={listing.imgURL || `https://source.unsplash.com/featured/?${listing.categories} ${listing.businessType}`}
          /* onClick={() => setOpenDialog(true)} */
          title={listing.name}
        />
      </a></Link>
      <Dialog fullScreen onClose={() => {setOpenDialog(false)}} open={openDialog}>
          <div style={{ backgroundColor: `${auth.themeBgColor}`, width: `100%` }} >
            <Container maxWidth="xs">
            <Close onClick={() => { setOpenDialog(false) } } style={{ color: `${auth.themeColor}` }}/>
            <EachListing fullScreen={true} listing={listing} key={listing.id} smSize={12} xsSize={12}/>
            <br/>
            </Container>
          </div>
      </Dialog>
    </>
  )
}

export default ListingImage;
