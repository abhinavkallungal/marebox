import Categories from '../components/Categories';
import Items from '../components/Items';
import { useAuth } from '../hooks/useAuth';
import {
    Typography,
} from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Category = () => {
  const router = useRouter();
  const auth = useAuth();
  const [ items, setItems ] = useState([]);
  const [ refresh, setRefresh ] = useState(false);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      const c = router.query.c;
      setCategory(c);

      if(c){
        var i = [];
        auth.items.map(item => {
            if (item.category.startsWith(c)) {
                i.push(item);
            }
        })
        setItems([...i]);
        var temp = [];
        for(var i=0; i<auth.categories.length; i++){
            const name = auth.categories[i].name;
            if(name.startsWith(c + '/')){
                temp.push(auth.categories[i]);
            }
        }
        setCategories([...temp]);
      }
  }, [auth, router]);

  return (
    <div
      style={{
        backgroundColor: `${auth.themeBgColor}`,
        padding: `20px`
      }}
    >
        <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h5">
            <Link href="/"><a> {process.env.NEXT_PUBLIC_COMPANY_NAME || 'Home'} </a></Link> > <Link href="/shop"><a> Shop </a></Link>
            { category && category.split('/').map((i, idx) => (
                <Link key={`/c?c=${i}`} href={`/c?c=${category.split('/').slice(0,idx+1).join('/')}`}>
                    <a> > {i}</a>
                </Link>
            ))}
        </Typography>
        {categories.length > 0 && (
            <div style={{marginBottom: `20px`}}>
                <Categories categories={categories}/>
            </div>
        )}
        <Items items={items}/>
    </div>
  );
};

export default Category;
