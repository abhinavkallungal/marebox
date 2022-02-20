import { CardContent, Typography } from '@material-ui/core';
import { ContactPhone, Email, Facebook, Instagram, Language, LinkedIn, LocationOn, Twitter, WhatsApp, YouTube } from '@material-ui/icons';

const ListingSocial = ({ listing }) => {
  return (
    <Typography gutterBottom variant="body2">

      { listing.telePhone && (
        <>
          <a href={`tel: ${listing.telePhone}`}>
            <ContactPhone style={{ color: `hotpink`, verticalAlign: `middle` }}/> { listing.telePhone }
          </a>
          <br/>
        </>
      )}
      
       { listing.whatsApp && (
        <>
          <a href={`https://api.whatsapp.com/send?phone=${listing.whatsApp}`} target="_blank">
            <WhatsApp style={{ color: `hotpink`, verticalAlign: `middle` }}/> { listing.whatsApp }
          </a>
          <br/>
        </>
      )}

      <br/>
      
      { listing.email && (
          <>
            <a href={`mailto:${listing.email}`} >
              <Email style={{ color: `hotpink`, verticalAlign: `middle` }}/>
            </a>
          </>
      )}

      { listing.facebookUrl && (
          <>
            <a href={listing.facebookUrl}>
              <Facebook style={{ color: `hotpink`, verticalAlign: `middle` }}/>
            </a>
          </>
      )}

      { listing.instagramUrl && (
        <>
          <a href={listing.instagramUrl}>
            <Instagram style={{ color: `hotpink`, verticalAlign: `middle` }}/>
          </a>
        </>
      )}

      { listing.linkedInUrl && (
        <>
          <a href={listing.linkedInUrl}>
            <LinkedIn style={{ color: `hotpink`, verticalAlign: `middle` }}/>
          </a>
        </>
      )}

      { listing.plusCode && (
        <>
          <a href={`https://plus.codes/${listing.plusCode}`}>
            <LocationOn style={{ color: `hotpink`, verticalAlign: `middle` }}/>
          </a>
        </>
      )}

      { listing.twitterUrl && (
        <>
          <a href={listing.twitterUrl}>
            <Twitter style={{ color: `hotpink`, verticalAlign: `middle` }}/>
          </a>
        </>
      )}

      { listing.website && (
        <>
          <a href={listing.website}>
            <Language style={{ color: `hotpink`, verticalAlign: `middle` }}/>
          </a>
        </>
      )}

      

      { listing.youTubeUrl && (
        <>
          <a href={listing.youTubeUrl} target="_blank">
            <YouTube style={{ color: `hotpink`, verticalAlign: `middle` }}/>
          </a>
        </>
      )}

    </Typography>
  )
}

export default ListingSocial;
