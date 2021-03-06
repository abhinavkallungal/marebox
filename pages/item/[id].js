
import EachItem from '../../components/EachItem';
import { useAuth } from '../../hooks/useAuth';
import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProductDetailes from '../../components/ProductDetailes';

const Item = () => {
  const router = useRouter();
  const auth = useAuth();
  const [ item, setItem ] = useState({});
  const [ category, setCategory ] = useState('');

  useEffect(() => {
      const { id } = router.query;

      auth.items.forEach(i => {
        if(i.id === id){
          setItem(i);
          setCategory(i.category);
        }
      });

      console.log(item);

  }, [auth, router]);

  return (
    <Grid
      container
      direction="column"
      style={{
        backgroundColor: `${auth.themeBgColor}`,
      }}
    >
      {/* <Grid item xs={12} sm={6} style={{color:"#111",fontSize:"12px"}}>
        <Typography gutterBottom  variant="h5">
          <Link href="/">
            <a>
              {process.env.NEXT_PUBLIC_COMPANY_NAME || 'Home'}
            </a>
          </Link>
          {' > '}
          <Link href="/shop">
            <a> Shop </a>
          </Link>
          { category && category.split('/').map((i, idx) => (
              <Link key={`/c?c=${i}`} href={`/c?c=${category.split('/').slice(0,idx+1).join(' / ')}`}>
                  <a>{` / ${i} `} </a>
              </Link>
          ))}
          { item.name && ` : ${item.name}` }
        </Typography>
      </Grid> */}
      <ProductDetailes item={item}/>

   <EachItem fullScreen={true} item={item} key={item.id} smSize={6} xsSize={12}/> 

    </Grid>
  );
};

export default Item;
