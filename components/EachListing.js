import EditListing from './EditListing';
import ListingGallery from './ListingGallery';
import ListingImage from './ListingImage';
import ListingSocial from './ListingSocial';
import Status from './Status';
import { useAuth } from '../hooks/useAuth';
import {
    Button,
    Grid,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Add,
  Business,
  Clear,
  Check,
  Close,
  ContactPhone,
  DeleteForever,
  Favorite,
  FavoriteBorder,
  Phone,
  Remove,
  Security,
  VerifiedUser,
  WhatsApp,
  WorkOutline
} from '@material-ui/icons';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';

const EachListing = (props) => {
    const state = useAuth();
    const classes = state.useStyles();

    const router = useRouter();
    const [ listing, setListing ] = useState(props.listing);
    const [ fav, setFav ] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
        message: '',
        error: ''
    });
    
    const address = listing.addressLine1 + (listing.addressLine2 !== null ? (', ' + listing.addressLine2) : '') + ', ' + listing.city + ', ' + listing.district + ', ' + listing.state + ' ' + listing.pinCode;

    const deleteListing = async() => {
        setLoading(true);
        await axios.post("/api/db", { operation: 'delete', record: listing, table: 'listings' })
            .then(result => {
              if(!result.data.error){
                  setStatus({ ...status, ['message']: result.data.message });
                  state.deleteListing(listing.id);
                  setListing({});
              } else{
                  setStatus({ ...status, ['error']: result.data.error });
              }
            });
    };

    const approveListing = async(bool) => {
      const record = {...listing, verifiedByAdmin: bool };
      await axios.post("/api/db", { operation: 'update', record, table: 'listings' })
       .then(res => {
         if(res.data.error){
           setStatus({ ...status, ['error']: res.data.error });
         } else{
           setStatus({ ...status, ['message']: res.data.message });
           state.updateListing(record);
           setListing({ ...record });
         }
       });
    };

    const handleFavorite = e => {
        e.preventDefault();
        setFav(!fav);
        state.updateFavs(listing.id, !fav);
    };

    useEffect(() => {
        if(listing){
            const { id } = listing;
            if(state.favs && state.favs.includes(id)){
                if(!fav) setFav(true);
            } else {
                if(fav) setFav(false);
            }
        }
    },[]);

    alert()

    return(
      <>
      
  
        {listing && (listing.verifiedByAdmin || (state.userAuthData && (state.userAuthData.email === process.env.NEXT_PUBLIC_ADMIN) )) &&(
          <Grid item key={listing.id} xs={props.xsSize} sm={props.smSize}>
            <Card
                className={classes.card}
                style={{
                    height: `${ props.fullScreen ? "100%" : "300" }`
                }}
            >
              <CardActionArea>
                <div style={{ textAlign: `center` }}>
                  <ListingImage listing={listing} mediaHt={props.mediaHt || props.fullScreen ? "300" : "200"}/>
                </div>
              </CardActionArea>
              
              <CardContent style={{backgroundColor: `${state.themeBgColor}`}}>
                  <Grid container justify="space-between">
                      <Grid item xs={10}>

                            {listing.name || listing.companyName} {'   '}
                            
                            { listing.logo && (
                              <img
                                alt={listing.companyName || listing.name}
                                height={45}
                                src={listing.logo}
                                title={listing.companyName || listing.name}
                              />
                            )}
                            
                            {listing.designation && <Typography gutterBottom variant="body2">{listing.designation}</Typography>}

                            <Typography gutterBottom variant="body2">
                              <a href={`tel: ${listing.mobileNumber1}`}>
                                <Phone style={{color: `hotpink`, verticalAlign: `middle`}}/> { listing.mobileNumber1 }
                              </a>
                            </Typography>
                      </Grid>

                      { (state.userAuthData && (state.userAuthData.email === process.env.NEXT_PUBLIC_ADMIN) ) ? (
                      <Grid item xs={2}>
                          {fav
                              ? <Favorite
                                    style={{ color: process.env.NEXT_PUBLIC_THEME_COLOR }}
                                    onClick={handleFavorite}
                              />
                              : <FavoriteBorder
                                  onClick={handleFavorite}
                                  style={{ color: process.env.NEXT_PUBLIC_THEME_COLOR }}
                              />
                          }
                      </Grid>
                      ) : <></> }
                  </Grid>

                  <Grid container>
                      <Grid item>
                          <Typography gutterBottom variant="body2">
                            Business type: { listing.businessType || listing.categories.replace('/', ' > ') }
                          </Typography>
                      </Grid>
                      <Grid item>
                          { state.userAuthData && (state.userAuthData.email === process.env.NEXT_PUBLIC_ADMIN) && (
                              <>
                                { (listing.verifiedByAdmin === true || listing.addedBy ===  process.env.NEXT_PUBLIC_ADMIN)
                                  ? <Clear onClick={() => approveListing(false)} />
                                  : <Check onClick={() => approveListing(true)} />
                                }
                                  <EditListing listing={listing}/>
                                  <DeleteForever color="disabled" onClick={deleteListing} style={{ color: `orange` }}/>
                              </>
                          )}
                      </Grid>
                          <Grid item xs={12} sm={12}>
                         <Typography gutterBottom>
                {listing.companyName || listing.name}
                {listing.establishedYear && <>{' '}since {listing.establishedYear}</>}
              </Typography>

              <Typography gutterBottom>
                { listing.categories.replace('/', ' > ') || listing.businessType }
              </Typography>
              
              {listing.description && (
                <Typography gutterBottom>
                  <Markdown>
                    { listing.description }
                  </Markdown>
                </Typography>
              )}
              
              </Grid>
              
                  </Grid>
              
              { props.fullScreen && (
              <>
                <Grid container>
                  <Grid item xs={4} sm={4}>
              { Object.keys(listing).map(key => {
                <Typography key={key}>
                  {key} : {listing[key]}
                </Typography>
              })}
              
              {listing.verifiedByAdmin && (
                            <Typography gutterBottom variant="body2">
                              Verified <VerifiedUser style={{ color: `green`, verticalAlign: `middle` }}/>
                            </Typography>
                          )}
                          
                          {listing.mareboxRecommendation === 'Trusted' && (
                            <Typography gutterBottom variant="body2">
                              Trusted <Security style={{ color: `green`, verticalAlign: `middle` }}/>
                            </Typography>
                          )}
                  </Grid>
              
                  <Grid item xs={8} sm={4}>
                  
                    {listing.mobileNumber2 && (
                      <Typography gutterBottom variant="body2">
                        <a href={`tel: ${listing.mobileNumber2}`}>
                          <Phone style={{color: `hotpink`, verticalAlign: `middle`}}/> { listing.mobileNumber2 }
                        </a>
                      </Typography>
                    )}
                    
                    {listing.telephoneNumber && (
                      <Typography gutterBottom variant="body2">
                        <a href={`tel: ${listing.telephoneNumber}`}>
                          <ContactPhone style={{color: `hotpink`, verticalAlign: `middle`}}/> { listing.telephoneNumber }
                        </a>
                      </Typography>
                    )}
                    
                    <ListingSocial listing={listing}/>
                    
                  </Grid>
              
              <Grid item xs={12} sm={4}>
              {address && (
                <Typography gutterBottom>
                  Address: <br/>
                  {address}
                </Typography>
              )}
              
                </Grid>
              
              <Grid item xs={12} sm={12}>
              {listing.workingHours && (
                <Typography gutterBottom variant="body2">
                  <WorkOutline style={{ color: `hotpink`, verticalAlign: `middle` }} />
                  Working Hours: {listing.workingHours.replace('-',' to ')}
                </Typography>
              )}
                {listing.workingDays && (
                  <Typography gutterBottom variant="body2">
                    <Business style={{ color: `hotpink`, verticalAlign: `middle` }} />
                    Working Days: {listing.workingDays
                      .replace('1',' Monday ')
                      .replace('2',' Tuesday ')
                      .replace('3',' Wednesday ')
                      .replace('4',' Thursday ')
                      .replace('5',' Friday ')
                      .replace('6',' Saturday ')
                      .replace('7',' Sunday ')
                    }
                  </Typography>
                )}
              </Grid>
                
                <Grid item xs={12} sm={12}>
                  <ListingGallery listing={listing}/>
                </Grid>
                
              </Grid>
              
              <br/>
              
              <Grid container spacing={1}>
              
                {listing.youTubeMediaLinks && (
                  <Grid item xs={12} sm={6}>
                    <CardMedia
                      component="iframe"
                      image={listing.youTubeMediaLinks.split(',')[Math.floor(Math.random() * listing.youTubeMediaLinks.split(',').length)]}
                    />
                  </Grid>
                )}
              
              <Grid item xs={12} sm={6}>
                {listing.videos && (
                  <CardMedia
                    component="video"
                    controls
                    image={listing.videos.split(',')[Math.floor(Math.random() * listing.videos.split(',').length)]}
                  />
                )}
              </Grid>
              </Grid>
              
              </>
              )}
              
              </CardContent>
            </Card>
          </Grid>
      )}
      </>
    )
}

export default EachListing;
