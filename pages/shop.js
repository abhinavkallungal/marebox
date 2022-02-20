import Categories from '../components/Categories';
import DirCategories from '../components/DirCategories';
import Items from '../components/Items';
import { useAuth } from '../hooks/useAuth'
import { Card, CardActionArea, CardContent, CardMedia, Container, Dialog, Grid, Typography } from '@material-ui/core'
import { Close, DeleteForever, KeyboardArrowUp } from '@material-ui/icons'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Home = () => {

    const auth = useAuth();
    const router = useRouter();
    const [ categories, setCategories ] = useState([]);
    const [ items, setItems ] = useState([]);

    useEffect(() => {
      const {sub} = router.query;
      var temp = [];

      var i = [];
      console.log(auth.items)
      // auth.items.map(item => {
      //   if (item.category) {
      //     i.push(item);
      //   }
      // })
      setItems([...i]);

      auth.categories.length > 0 && auth.categories.forEach(i => {
        if(!i.name.includes('/')){
          temp.push(i);
        }
      });
      setCategories(temp);
    },[auth, router])

    return (
        <>
            <div
              style={{
                backgroundColor: `${auth.themeBgColor}`,
                padding: `20px`
              }}
            >

              <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h5">
                <Link href="/"><a> {process.env.NEXT_PUBLIC_COMPANY_NAME || 'Home'} </a></Link>  <Link href="/shop"><a> Shop </a></Link>
              </Typography>

                {categories.length > 0 && (
                    <div style={{marginBottom: `20px`}}>
                        <Categories categories={categories}/>
                    </div>
                )}
                gfgdfgdfg
              <Items items={items}/>
            </div>
        </>
    )
}

export default Home
