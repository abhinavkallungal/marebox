import Services from '../components/Services';
import ServiceSummary from '../components/ServiceSummary';
import { useAuth } from '../hooks/useAuth';
import homePageSections from '../vars/homePageSections';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Kb = () => {

  const router = useRouter();
  const state = useAuth();
  const classes = state.useStyles();
  const [ service, setService ] = useState({ });
  const [ services, setServices ] = useState([]);

  useEffect(() => {
    let temp = [];
    console.log(state.articles);
    state.articles.forEach( s => {
      if(!s.name.includes('/')){
        temp.push(s);
      }
    });
    setService(homePageSections.kb);
    setServices([...temp]);
  }, [state, router]);


  return(
    <Box style={{backgroundColor: `${state.themeBgColor}`}}>
      { service.name && <ServiceSummary service={service} /> }
      { services && <Services services={services} /> }
    </Box>
  )
};

export default Kb;
