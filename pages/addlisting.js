import ListingForm from '../components/ListingForm';
import { useAuth } from '../hooks/useAuth';
import router from 'next/router';
import { useEffect, useState } from 'react';

const Add = () => {
  const state = useAuth();
  const [ verifiedByAdmin, setVerifiedByAdmin ] = useState(false);
  
  useEffect(() => {
    if(!state.userAuthData || !state.userAuthData.uid){
      router.push('/');
    }  
  },[state, router]);

  useEffect(() => {
    if (state.userAuthData && (state.userAuthData.email === process.env.NEXT_PUBLIC_ADMIN)){
      setVerifiedByAdmin(true);
    }
  }, [ state ]);

  if(state.userAuthData){
    return <ListingForm isNewListing={true} listing={{ addedBy: state.userAuthData.email, verifiedByAdmin }}/>;
  }
  return <div style={{ padding: `100px`, textAlign: `center` }}>Page doesn't exist</div>;
}

export default Add
