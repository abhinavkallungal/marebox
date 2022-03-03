import Copyright from '../components/Copyright';
import Head from '../components/Head';
import Header from '../components/Header';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import '../styles/globals.css';
import theme from '../theme';
import { Box, Container, ThemeProvider } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  
  const router = useRouter();
  const state = useAuth();
  
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    
    /*if(
        router.route && 
        (['/add', '/cart', '/checkout', '/f', 'thx'].some(i => {
          return router.route.includes(i);
        }))
      ){
      console.log(state);
      if(!state.userAuthData.uid){
        router.push('/signin');
      }
    }*/
    
  }, [state, router]);

  return (
    <ThemeProvider theme={theme}>
    <AuthProvider>
     <Head/>
     <div>
       <div>
          <Header/>
        
       </div>
       
       <Box >
          <Component {...pageProps}/>
          <Copyright/>
       </Box>
     </div>
    </AuthProvider>
    </ThemeProvider>
  )
}

export default MyApp;