import { Card, CardActionArea, Button, CardMedia, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import styles from "../styles/Directory.module.css"
import { useAuth } from '../hooks/useAuth'
import { LocationOnOutlined, PhoneIphoneOutlined, EmailOutlined, ArrowForwardIos } from '@material-ui/icons';


function Directory() {
  const auth = useAuth()
  return (
    <>
      <Grid item xs={12} key="homePageSection.name" sm={12} md={12}>
        <Link >
          <Card className={styles.Banner}>

            <CardMedia

              className={styles.BannerImage}
              component="img"
              alt={"homePageSection.name"}
              height="300"
              image={`https://source.unsplash.com/featured/?${"homePageSection.name"} ${process.env.NEXT_PUBLIC_UNSPLASH_BANNER_TAG}`}
              title="homePageSection.name"
            />

            <div className='category-card-content'>
              <Grid container>
                <Grid item style={{ flex: 1 }} >
                  <Typography variant='h4'>Iconic Cafe in Manhattan</Typography>
                  <Grid container>
                    <Grid item style={{ display: "flex", alignItems: "center", margin: "0px 5px" }}>
                      <LocationOnOutlined />
                      70 Bright St New York, USA
                    </Grid>
                    <Grid item style={{ display: "flex", alignItems: "center", margin: "0px 5px" }} >
                      <PhoneIphoneOutlined />
                      +91 9638527410
                    </Grid>
                    <Grid item style={{ display: "flex", alignItems: "center", margin: "0px 5px" }}>
                      <EmailOutlined />
                      iconiccafe@gmail.com
                    </Grid>
                  </Grid>

                </Grid>
                <Grid item style={{ flex: 1 }}>

                </Grid>
              </Grid>


            </div>
          </Card>



        </Link>
      </Grid>

      <Grid container style={{ maxWidth: "1260px", margin: "20px auto" }} >

        <Grid item sx={12} md={8} style={{ padding: "20px" }} >
          <CardMedia
            component="img"
            alt={"homePageSection.name"}
            height="300"
            image={`https://source.unsplash.com/featured/?${"homePageSection.name"} ${process.env.NEXT_PUBLIC_UNSPLASH_BANNER_TAG}`}
            title="homePageSection.name"
            style={{ borderRadius: "15px" }}
          />

          <Card style={{ margin: "30px 0px", border: "1px solid #e5e7f2",borderRadius:"15px", boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px" }} >
            <div style={{ padding: "30px", borderBottom: "1px solid #e5e7f2" ,fontWeight: 600,color: "#566985"}}>
              <Typography variant='h5'>

              Description
              </Typography>
            </div>
            <div style={{ padding: "30px" }}>
              <Typography>
                Praesent eros turpis, commodo vel justo at, pulvinar mollis eros. Mauris aliquet eu quam id ornare. Morbi ac quam enim. Cras vitae nulla condimentum, semper dolor non, faucibus dolor. Vivamus adipiscing eros quis orci fringilla, sed pretium lectus viverra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec nec velit non odio aliquam suscipit. Sed non neque faucibus, condimentum lectus at, accumsan enim.
              </Typography>
              <Typography>
                Praesent eros turpis, commodo vel justo at, pulvinar mollis eros. Mauris aliquet eu quam id ornare. Morbi ac quam enim. Cras vitae nulla condimentum, semper dolor non, faucibus dolor. Vivamus adipiscing eros quis orci fringilla, sed pretium lectus viverra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec nec velit non odio aliquam suscipit. Sed non neque faucibus, condimentum lectus at, accumsan enim.
              </Typography>
              <div>

                <Button variant='contained' style={{ backgroundColor: "#2E3E6F", color: "#ffffff", padding: "10px 20px", borderRadius: "8px", margin: "15px 0px" }} endIcon={<ArrowForwardIos />}>
                  Checkout all listings
                </Button>
              </div>
            </div>

          </Card>
        </Grid>

        <Grid item sx={12} md={4} style={{width:"100%", padding: "20px" }} >

          <Card style={{ margin: "30px 0px", border: "1px solid #e5e7f2",borderRadius:"15px",boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px" }} >
            <div style={{ padding: "30px", borderBottom: "1px solid #e5e7f2" ,fontWeight: 600,color: "#566985"}}>
            <Typography variant='h5'>


              Working Hours
            </Typography>
            </div>
            <div style={{ padding: "30px" }}>
              <div style={{ display: 'flex', alignItems: "cemter", justifyContent: "space-between", borderBottom: "1px solid #e5e7f2", padding: "10px", color: "#878C9F", fontWeight: 600 }}>

                <Typography>
                  Monday
                </Typography>
                <Typography>
                  9 AM - 5 PM
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: "cemter", justifyContent: "space-between", borderBottom: "1px solid #e5e7f2", padding: "10px", color: "#878C9F", fontWeight: 600 }}>

                <Typography>
                  Tuesday
                </Typography>
                <Typography>
                  9 AM - 5 PM
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: "cemter", justifyContent: "space-between", borderBottom: "1px solid #e5e7f2", padding: "10px", color: "#878C9F", fontWeight: 600 }}>

                <Typography>
                Wednesday 
                </Typography>
                <Typography>
                  9 AM - 5 PM
                </Typography>
              </div>

              <div style={{ display: 'flex', alignItems: "cemter", justifyContent: "space-between", borderBottom: "1px solid #e5e7f2", padding: "10px", color: "#878C9F", fontWeight: 600 }}>

                <Typography>
                Thursday
                </Typography>
                <Typography>
                  9 AM - 5 PM
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: "cemter", justifyContent: "space-between", borderBottom: "1px solid #e5e7f2", padding: "10px", color: "#878C9F", fontWeight: 600 }}>

                <Typography>
                Friday
                </Typography>
                <Typography>
                  9 AM - 5 PM
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: "cemter", justifyContent: "space-between", borderBottom: "1px solid #e5e7f2", padding: "10px", color: "#878C9F", fontWeight: 600 }}>

                <Typography>
                Saturday
                </Typography>
                <Typography>
                  9 AM - 5 PM
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: "cemter", justifyContent: "space-between", borderBottom: "1px solid #e5e7f2", padding: "10px", color: "#878C9F", fontWeight: 600 }}>

                <Typography>
                Sunday
                </Typography>
                <Typography>
                  9 AM - 5 PM
                </Typography>
              </div>
              
            </div>

          </Card>

          <Card style={{ margin: "30px 0px", border: "1px solid #e5e7f2" ,borderRadius:"15px", boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px" }} >
            <div style={{ padding: "30px", borderBottom: "1px solid #e5e7f2" ,fontWeight: 600,color: "#566985"}}>
            <Typography variant='h5'>

            Location / Contacts
            </Typography>
            </div>
            <div style={{ padding: "30px" }}>
              <div style={{ display: 'flex', alignItems: "cemter", justifyContent: "space-between", borderBottom: "1px solid #e5e7f2", padding: "10px", color: "#878C9F", fontWeight: 600 }}>

                <Typography>
                  Monday
                </Typography>
                <Typography>
                  9 AM - 5 PM
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: "cemter", justifyContent: "space-between", borderBottom: "1px solid #e5e7f2", padding: "10px", color: "#878C9F", fontWeight: 600 }}>

                <Typography>
                  Tuesday
                </Typography>
                <Typography>
                  9 AM - 5 PM
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: "cemter", justifyContent: "space-between", borderBottom: "1px solid #e5e7f2", padding: "10px", color: "#878C9F", fontWeight: 600 }}>

                <Typography>
                Wednesday 
                </Typography>
                <Typography>
                  9 AM - 5 PM
                </Typography>
              </div>

              <div style={{ display: 'flex', alignItems: "cemter", justifyContent: "space-between", borderBottom: "1px solid #e5e7f2", padding: "10px", color: "#878C9F", fontWeight: 600 }}>

                <Typography>
                Thursday
                </Typography>
                <Typography>
                  9 AM - 5 PM
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: "cemter", justifyContent: "space-between", borderBottom: "1px solid #e5e7f2", padding: "10px", color: "#878C9F", fontWeight: 600 }}>

                <Typography>
                Friday
                </Typography>
                <Typography>
                  9 AM - 5 PM
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: "cemter", justifyContent: "space-between", borderBottom: "1px solid #e5e7f2", padding: "10px", color: "#878C9F", fontWeight: 600 }}>

                <Typography>
                Saturday
                </Typography>
                <Typography>
                  9 AM - 5 PM
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: "cemter", justifyContent: "space-between", borderBottom: "1px solid #e5e7f2", padding: "10px", color: "#878C9F", fontWeight: 600 }}>

                <Typography>
                Sunday
                </Typography>
                <Typography>
                  9 AM - 5 PM
                </Typography>
              </div>
              
            </div>

          </Card>
        </Grid>

      </Grid>
    </>
  )
}

export default Directory

