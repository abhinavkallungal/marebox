import EachService from '../../components/EachService';
import Services from '../../components/Services';
import ServiceSummary from '../../components/ServiceSummary';
import { useAuth } from '../../hooks/useAuth';
import { Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Article = () => {

  const state = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [ service, setService ] = useState({});
  const [ services, setServices ] = useState([]);

  useEffect(() => {
    state.articles.forEach( i => {
      if(i.id === id){
        setService({...i})
      }
    });
  }, [ router, state ]);

  useEffect(() => {
    let temp = [];
    state.articles.forEach( s => {
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

export default Article
;
