import EachService from './EachService';
import {
  Grid,
} from '@material-ui/core';
import ServiceCard from "./ServiceCard"


const Services = ({services}) => {

  return(
      <Grid container spacing={2} style={{ paddingTop: `15px`,marginTop:"40px" }}>
        { services.map ( (service, idx) => (
          
           
            <ServiceCard item={service}  />

          
        ))}
      </Grid>
  )

};

export default Services;
