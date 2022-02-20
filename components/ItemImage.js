import EachItem from './EachItem';
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

const ItemImage = ({item, mediaHt}) => {
  const auth = useAuth();
  const [openDialog, setOpenDialog] = useState(false);

  return(
    <>
      <Link href={`/item/${item.id}`}><a>
        <CardMedia
          alt={item.name}
          component="img"
          height={mediaHt}
          image={item.imgURL || `https://source.unsplash.com/featured/?${item.category}`}
          /* onClick={() => setOpenDialog(true)} */
          title={item.name}
        />
      </a></Link>
      <Dialog fullScreen onClose={() => {setOpenDialog(false)}} open={openDialog}>
          <div style={{ backgroundColor: `${auth.themeBgColor}`, width: `100%` }} >
            <Container maxWidth="xs">
            <Close onClick={() => { setOpenDialog(false) } } style={{ color: `${auth.themeColor}` }}/>
            <EachItem fullScreen={true} item={item} key={item.id} smSize={12} xsSize={12}/>
            <br/>
            </Container>
          </div>
      </Dialog>
    </>
  )
}

export default ItemImage;
