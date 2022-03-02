import React from 'react'
import { CardMedia, Grid, Typography, Card, Button } from '@mui/material'
import Link from 'next/link'
import {

    WhatsApp,
    
} from '@material-ui/icons';




function serviceCard({item}) {
    return (
        <>



            <Grid item xs={12} sm={6} md={3}   style={{padding:"10px"}} >
                
                <Link href={`/directory/${item?.id}`}>
                    <Card className='product-card'>

                        <CardMedia

                            className='product-card-image'
                            component="img"
                            height="150"
                            image={item?.imageUrls?.length>0 ? item.imageUrls[Math.floor(Math.random() * item.imageUrls.length)] : `https://source.unsplash.com/featured/?$`}
                        />

                        <div className='product-card-content'>
                            <div style={{  height: "100%", overflow: "hidden" }}>


                                <Typography variant='body1' style={{fontWeight:"bold"}} >{item?.name}</Typography>
                                <Typography variant='body2' style={{marginTop:"20px"}}>{item?.content?.substring(0, 150)}... </Typography>
                            </div>
                           


                        </div>
                    </Card>



                </Link>
            </Grid>





        </>
    )
}

export default serviceCard