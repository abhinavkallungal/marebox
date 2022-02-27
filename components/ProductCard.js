import React from 'react'
import { CardMedia, Grid, Typography, Card, Button } from '@mui/material'
import Link from 'next/link'
import {

    WhatsApp,
    YouTube
} from '@material-ui/icons';




function ProducrCard({item}) {
    return (
        <>

            <Grid item xs={12} sm={6} md={3}   style={{padding:"10px"}} >
                <Link href={`/item/${item?.id}`}>
                    <Card className='product-card'>

                        <CardMedia

                            className='product-card-image'
                            component="img"
                            height="150"
                            image={item?.imgURL ? item.imgURL : `https://source.unsplash.com/featured/?$`}
                        />

                        <div className='product-card-content'>
                            <div style={{ borderBottom: " 1px solid #efefee", height: "80px", overflow: "hidden" }}>


                                <Typography variant='body1' style={{fontWeight:"bold"}} >{item?.name}</Typography>
                                <Typography variant='body2'>USED IN CONSTRACTION MATERIAL WATER ABSORBTION 0.6% </Typography>
                            </div>
                            <div style={{display:"flex",alignItems:'center',justifyContent:'space-between',height:"60px"}}>

                                    <div style={{display:"inline-block"}}>
                                        {
                                            item?.mrp ?  <Typography variant="caption text" style={{display:"block", textDecoration:"line-through"}}>  MRP:{item.mrp}/- </Typography> :null
                                        }
                                       
                                       {
                                        item?.price ?
                                           <Typography variant="span" style={{fontWeight:"bold"}}>
                                            RS:{item.price} 
                                        </Typography> :null
                                        }

                                    </div>
                                    

                                <Button variant='contained' style={{ backgroundColor: " #42D955", color: "#fff", zIndex: '15', padding: "5px 15px" }} onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}&text='please send quote for ${item.name} at https://marebox.co.in/item/${item.id}'`, '_blank');
                                 
                                    
                                                 
                                }
                                } endIcon={<WhatsApp />}>
                                    Get a Quote

                                </Button>
                                


                            </div>


                        </div>
                    </Card>



                </Link>
            </Grid>





        </>
    )
}

export default ProducrCard