import Status from '../components/Status';
import { useAuth } from '../hooks/useAuth'
import { db } from '../utils/firebase';

import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Dialog,
    Grid,
    Typography
} from '@material-ui/core';
import { Close, DeleteForever } from '@material-ui/icons'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const EachCategory = (props) => {
    const auth = useAuth();
    const [ category, setCategory ] = useState(props.category);
    const [ noOfListings, setNoOfListings ] = useState(0);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
        message: '',
        error: ''
    });

    const deleteCategory = async(id) => {
        setLoading(true);
        await axios.post( "/api/deleteCategory", {
            operation: 'sql',
            record: category,
            table: 'categories'
        }).then(result => {
            if(result.data.error){
                setStatus({ ...status, ['error']: result.data.error });
            } else{
                setStatus({ ...status, ['message']: result.data.message });
                auth.deleteCategory(id);
                setCategory({});
            }
        });
    };

    const [ openDialog, setOpenDialog ] = useState(false)
    const closeDialog = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        var temp = 0;
        auth.listings.forEach( i => {
          if(i.categories){
            i.categories.split(',').forEach( j => {
              if (j.trim().startsWith(category.name)){
                  temp = temp + 1;
              } else {
              }
            });
          }
        });
        setNoOfListings(temp)
    },[auth]);

    return (
        <>{category && category.imgURL && (noOfListings > 0) &&
            <Grid item key={category.id} xs={6} sm={3}>
                <Card
                    style={{
                        border: `0.1px solid ${ process.env.NEXT_PUBLIC_THEME_COLOR_SEC }`,
                        borderRadius: `5px`,
                        boxShadow: `0.5px 0.5px`
                    }}
                >
                    <CardActionArea>
                        <div style={{ textAlign: `center` }}>
                          <Link href={`/dc?c=${category.name}`}>
                              <a>
                                  <CardMedia
                                      alt={category.name}
                                      component="img"
                                      height="200"
                                      image={category.imgURL || "https://source.unsplash.com/weekly?water"}
                                      title={category.name}
                                  />
                              </a>
                          </Link>
                        </div>
                        <CardContent
                          style={{
                            backgroundColor: `${auth.themeBgColor}`,
                            color: `${auth.themeColor}`
                          }}
                        >
                            <Grid container justify="space-between">
                                <Grid item xs={10}>
                                    <Link href={`/dc?c=${category.name}`}>
                                        <a>
                                          <Typography>
                                            {category.name.split('/').reverse()[0]}({noOfListings})
                                          </Typography>
                                        </a>
                                    </Link>
                                </Grid>
                                <Grid item xs={2}>
                                    { auth.userAuthData && (auth.userAuthData.email === process.env.NEXT_PUBLIC_ADMIN) && (<DeleteForever
                                      onClick={() => deleteCategory(category.id)}
                                      style={{ color: `orange` }}
                                    />)}
                                </Grid>
                            </Grid>
                        </CardContent>
                        { loading || status.error || status.message && (
                        <CardActions>
                            <Status loading={loading} status={status}/>
                        </CardActions>
                        )}
                    </CardActionArea>
                </Card>
            </Grid>
        }</>
    )
}

const DirCategories = ({categories}) => {
    return (
          <div>
              <Typography gutterBottom style={{color: `${process.env.NEXT_PUBLIC_THEME_COLOR}` }} variant="h6">
                  Categories{/*<small>({categories.length})</small>*/}
              </Typography>
              <Grid container spacing={2}>
                  {categories.map((category, idx) => (
                      <EachCategory category={category} key={idx}/>
                  ))}
              </Grid>
          </div>
    )
}

export default DirCategories
