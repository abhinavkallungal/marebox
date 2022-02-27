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
import ServiceCard from "./ServiceCard"

const EachService = ({ fullScreen, service }) => {

  const state = useAuth();
  const classes = state.useStyles();

  return (
    <>
      <ServiceCard />
      {/* <Card style={{
        backgroundColor: `${state.themeBgColor}`,
        color: `${state.themeColor}`,
        border: `0.1px solid ${process.env.NEXT_PUBLIC_THEME_COLOR_SEC}`,
        borderRadius: `5px`,
        boxShadow: `0.5px 0.5px`,
      }}>
        <Link href={`/service/${service.id}`}><a>
          <CardContent>
            <Typography className={classes.heading} variant="h5"> {service.name.split('/').slice(-1)} </Typography>


          </CardContent>

          <CardContent>
            <img
              alt={service.name}
              height={fullScreen ? 200 : 100}
              src={(service.imageUrls && service.imageUrls[Math.floor(Math.random() * service.imageUrls.length)]) || `https://source.unsplash.com/featured/?${service.name}`}
            />
          </CardContent>

          <CardContent>
            <Typography variant="body1">
              {fullScreen
                ? <> {service.content} </>
                : <> {service.content.substring(0, 100)} ..... </>
              }
            </Typography>
          </CardContent>

          {fullScreen && service.features && (
            <CardContent>
              <Typography style={{ whiteSpace: `pre-line` }} variant="body1">
                Features: <br /> {service.features.substring(0, 100)}...
              </Typography>
            </CardContent>
          )}


        </a></Link>
      </Card> */}
    </>
  )
};

export default EachService;
