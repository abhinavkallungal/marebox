import Services from '../components/Services';
import ServiceSummary from '../components/ServiceSummary';
import { useAuth } from '../hooks/useAuth';
import homePageSections from '../vars/homePageSections';
import {Box} from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';

const ServicesPage = () => {

  const router = useRouter();
  const state = useAuth();
  const classes = state.useStyles();
  const [ service, setService ] = useState({ });
  const [ services, setServices ] = useState([]);

  useEffect(() => {
    let temp = [];
    state.services.forEach( s => {
      if(!s.name.includes('/')){
        temp.push(s);
      }
    });
    console.log(homePageSections.services);
    setService(homePageSections.services);
    setServices([...temp]);
  }, [state, router]);


  return(
    <Grid style={{backgroundColor: `${state.themeBgColor}`,maxWidth:"1260px",margin:"0px auto",minHeight:"100vh"}}>
  
      { service.name && <ServiceSummary service={service} /> }
      <Typography variant='h4' >
         Related services
      </Typography>
      { services && <Services services={services} /> }
    </Grid>
  )
};

export default ServicesPage;
