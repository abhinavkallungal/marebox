import EachService from './EachService';
import {
  Grid,
} from '@material-ui/core';

const Services = ({services}) => {

  return(
      <Grid container spacing={2} style={{ paddingTop: `15px` }}>
        { services.map ( (service, idx) => (
          <Grid item sm={4} xs={12}>
            <EachService fullScreen={false} service={service} />
          </Grid>
        ))}
      </Grid>
  )

};

export default Services;
