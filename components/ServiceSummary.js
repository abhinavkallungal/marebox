import { useAuth } from '../hooks/useAuth';
import { Box, Grid, Typography } from '@material-ui/core';
import styles from "../styles/ServiceSummary.module.css"
const ServiceSummary = ({ service }) => {
  const state = useAuth();
  const classes = state.useStyles();
  const { content, imageUrls, name } = service;

  return (
    <Grid container p={2} pt={3}>
      
      <Grid item sx={12} sm={12} md={6} className={styles.imgwrapper}>
      <img
     
        className={styles.img} 
        src={
          (imageUrls && imageUrls[Math.floor(Math.random()*imageUrls.length)])
          ||
          `https://source.unsplash.com/featured/?${name}`
        }
      />

        
      </Grid>
     


   

      <Grid item md={6}>
        

      <Typography className={[classes.heading,styles.heading]} variant="h5" style={{marginBottom:"20px"}}>
        { name.split('/').slice(-1) }
     
      </Typography>
     
      <Typography className={classes.body}>
        { content }
      </Typography>

     
      </Grid>
    </Grid>
  )
};

export default ServiceSummary;
