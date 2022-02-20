import EachService from '../../components/EachService';
import Services from '../../components/Services';
import ServiceSummary from '../../components/ServiceSummary';
import { useAuth } from '../../hooks/useAuth';
import { Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Service = () => {

  const state = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [ service, setService ] = useState({});
  const [ services, setServices ] = useState([]);
  const [ listingType, setListingType ] = useState('');

  useEffect(() => {

    state.services.forEach( i => {
      if(i.id === id){
        setService({...i})
        setListingType('services');
      }
    });

    state.articles.forEach( i => {
      if(i.id === id){
        setService({...i})
        setListingType('articles');
      }
    });

  }, [ router, state ]);

  useEffect(() => {
    let temp = [];

    listingType && state[listingType].forEach( s => {
      if(s.name.startsWith(service.name + '/')){
        temp.push(s);
      }
    });

    setServices([...temp]);

  }, [ service ]);


  return (
    <Box style={{backgroundColor: `${state.themeBgColor}`}}>
      { service.name && <ServiceSummary service={ service } /> }
      { services && <Services services={ services } /> }
    </Box>
  )

};

export default Service;
