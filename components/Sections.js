import EachSection from './EachSection';
import { useAuth } from '../hooks/useAuth';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';

const Sections = ({ hierarchy, section, subSections }) => {
  console.log(subSections);
  const state = useAuth();
  const classes = state.useStyles();
  const { content, name } = section;

  return(
    <Box style={{backgroundColor: `${state.themeBgColor}`}}>
      <Box p={2}>
        <Typography className={classes.heading} variant="h4">
          { name }
        </Typography>
        <Typography className={classes.body} variant="body1">
          { content }
        </Typography>
      </Box>
      <Grid container spacing={2}>
        { subSections.map ( (subSection, idx) => (
          <Grid item sm={4} xs={12}>
            <EachSection fullScreen={false} hierarchy={hierarchy} subSection={subSection} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
};

export default Sections;
