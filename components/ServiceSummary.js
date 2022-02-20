import { useAuth } from '../hooks/useAuth';
import { Box, Typography } from '@material-ui/core';

const ServiceSummary = ({ service }) => {
  const state = useAuth();
  const classes = state.useStyles();
  const { content, imageUrls, name } = service;

  return (
    <Box p={2} pt={3}>
      <Typography className={classes.heading} variant="h5">
        { name.split('/').slice(-1) }
      </Typography>
      <img
        height={200}
        src={
          (imageUrls && imageUrls[Math.floor(Math.random()*imageUrls.length)])
          ||
          `https://source.unsplash.com/featured/?${name}`
        }
      />
      <Typography className={classes.body} variant="body1">
        { content }
      </Typography>
    </Box>
  )
};

export default ServiceSummary;
