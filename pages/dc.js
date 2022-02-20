import DirCategories from '../components/DirCategories';
import Listings from '../components/Listings';
import { useAuth } from '../hooks/useAuth';
import {
    Typography,
} from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Category = () => {
  // hooks can be called only inside a body function
  const router = useRouter();
  const auth = useAuth();
  const [ listings, setListings ] = useState([]);
  const [ refresh, setRefresh ] = useState(false);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      const c = router.query.c;
      setCategory(c);

      if(c){
        var i = [];
        auth.listings.forEach(listing => {
            listing.categories && listing.categories.split(',').map( j => {
              if (j.trim() === c) {
                i.push(listing);
              }
            })
        })
        console.log(i);
        setListings([...i]);
        var temp = [];
        for(var i=0; i<auth.categories.length; i++){
            const name = auth.categories[i].name;
            if(name.startsWith(c + '/')){
                temp.push(auth.categories[i]);
            }
        }
        setCategories([...temp]);
      }
  }, [auth]);

  return (
    <div
      style={{
        backgroundColor: `${auth.themeBgColor}`,
        padding: `20px`
      }}
    >
        <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h5">
            <Link href="/"><a> {process.env.NEXT_PUBLIC_COMPANY_NAME || 'Home'} </a></Link> > <Link href="/directory"><a> Directory </a></Link>
            { category && category.split('/').map((i, idx) => (
                <Link key={`/dc?c=${i}`} href={`/dc?c=${category.split('/').slice(0,idx+1).join('/')}`}>
                    <a> > {i}</a>
                </Link>
            ))}
        </Typography>
        {categories.length > 0 && (
            <div style={{marginBottom: `20px`}}>
                <DirCategories categories={categories}/>
            </div>
        )}
        <Listings listings={listings}/>
    </div>
  );
};

export default Category;
