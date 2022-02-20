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

const EachSection = ({ fullScreen, hierarchy, subSection }) => {

  console.log(subSection);

  const state = useAuth();
  const classes = state.useStyles();

  return(
          <Card style={{
                    backgroundColor: `${state.themeBgColor}`,
                    color: `${state.themeColor}`,
                    border: `0.1px solid ${ process.env.NEXT_PUBLIC_THEME_COLOR_SEC }`,
                    borderRadius: `5px`,
                    boxShadow: `0.5px 0.5px`,
                }}>
          <Link href={`/service/${hierarchy},${subSection.name}`}><a>
          <CardContent>
            <Typography className={classes.heading} variant="h5"> { subSection.name } </Typography>
          </CardContent>

          <CardContent>
            <img
              alt={subSection.name}
              height={fullScreen ? 200 : 100}
              src={(subSection.imageUrls && subSection.imageUrls[Math.floor(Math.random()*subSection.imageUrls.length)]) || `https://source.unsplash.com/featured/?${subSection.name}`}
          />
          </CardContent>

          <CardContent>
            <Typography variant="body1">
              { fullScreen
                ? <> { subSection.content } </>
                : <> { subSection.content.substring(0, 100) } ..... </>
              }
            </Typography>
          </CardContent>

          { fullScreen && subSection.features && (
          <CardContent>
            <Typography style={{ whiteSpace: `pre-line` }} variant="body1">
              Features: <br/> { subSection.features.substring(0, 100) }...
            </Typography>
          </CardContent>
          )}


          </a></Link>
          </Card>
  )
};

export default EachSection;
