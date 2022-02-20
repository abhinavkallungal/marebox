import ItemForm from '../components/ItemForm';
import { useAuth } from '../hooks/useAuth';
import router from 'next/router';
import { useEffect } from 'react';

const Add = () => {
  const state = useAuth();
  
  useEffect(() => {
    if(!state.userAuthData || !state.userAuthData.uid){
      router.push('/');
    }  
  },[state, router]);
  
  if(state.userAuthData && (state.userAuthData.email === process.env.NEXT_PUBLIC_ADMIN)){
    return <ItemForm isNewItem={true} item={{}}/>;
  }
  return <div style={{ padding: `100px`, textAlign: `center` }}>Page doesn't exist</div>;
}

export default Add