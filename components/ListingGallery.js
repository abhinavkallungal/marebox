import {
    CardMedia,
} from '@material-ui/core';

const ListingGallery = ({ listing }) => {
  return(
    <>
      { listing.images &&
        <CardMedia
          alt={listing.name || listing.businessName}
          component="img"
          height="200"
          image={listing.images.split(',')[Math.floor(Math.random() * listing.images.split(',').length)]}
          title={listing.name || listing.businessName}
        />
      }
    </>
  )
}

export default ListingGallery;
