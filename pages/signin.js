import {
    Avatar,
    Button,
    Checkbox,
    Container,
    CssBaseline,    
    FormControlLabel,
    TextField,
    Typography
} from '@material-ui/core';
import styles from '../styles/Home.module.css';
import { LockOutlined } from '@material-ui/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Auth = () => {
    const auth = useAuth();
    const router = useRouter();
    
    const [ data, setData ] = useState({
        email: '',
        password: '',
        newUser: false,
        isLoading: false,
        message: '',
        error: ''
    });
    const onChange = e => {
        const {name, value} = e.target;        
        setData({...data, ['isLoading']: false, ['message']: '', ['error']: '', [name]: value});        
    }
    const onChangeNewUser = () => {    
        const {newUser} = data;
        setData({...data, ['message']: '', ['error']: '', ['newUser']: !newUser});    
    }
    
    const onSubmit = async(e) => {
        e.preventDefault();
        const { email, password } = data;
        if (email && password) {
            setData({...data, ['isLoading']: true, ['error']: ''});          
            if(data.newUser){
                await auth.signUp(email, password).then((response) => {     
                    setData({...data, ['isLoading']: false});
                    response.error
                        ? setData({...data, ['error']: response.error.message})
                        : router.push('/');
                });
            }else{
                await auth.signIn({email, password}).then((response) => {                    
                    setData({...data, ['isLoading']: false});
                    response.error
                      ? setData({...data, ['error']: response.error.message})
                      : router.push('/');
                });
            }
        } else{
            setData({...data, ['error']: 'Please enter email and password'});
        }

    }

  const sendPasswordResetEmail = async(e) => {
        e.preventDefault();
        const { email } = data;
        if(email){
            const { email } = data;
            await auth.sendPasswordResetEmail(email).then((response) => {
                response.error
                    ? setData({...data, ['error']: response.error.message})
                    : setData({...data, ['message']: response});
            });
        } else{
            setData({...data, ['error']: 'Please enter email'});
        }
  }
  
  const sendEmailVerification = async(e) => {
        e.preventDefault();
        const { email } = data;
        if(email){
            const { email } = data;
            await auth.sendEmailVerification().then((response) => {
                response.error
                    ? setData({...data, ['error']: response.error.message})
                    : setData({...data, ['message']: response});
            });
        } else{
            setData({...data, ['error']: 'Please enter email'});
        }
  }

    /*useEffect(() => {
        if(auth.userAuthData && Object.entries(auth.userAuthData).length > 0){
          console.log('test', auth.userAuthData);
          router.push('/');
        }
    },[auth, router]);*/

    return(        
        <Container component="main" maxWidth="xs">
            <CssBaseline/>            
            <br/>
            <div className={styles.paper}>
                <Avatar className={styles.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Authentication
                </Typography>                
                <form className={styles.form} onSubmit={onSubmit} noValidate>
                    <TextField
                        autoFocus
                        autoComplete="email"
                        fullWidth
                        id = "email"
                        label="Email address" 
                        margin="normal"
                        name="email"
                        onChange={onChange}
                        placeholder="Enter Email address"
                        required
                        type="email"
                        value={data.email}
                        variant="outlined"                            
                    />
                    <TextField
                        autoComplete="current-password"
                        fullWidth
                        id="password"
                        label="Password"
                        margin="normal"
                        name="password"
                        onChange={onChange}
                        placeholder="Enter password"
                        required
                        type="password"
                        value={data.password}
                        variant="outlined"                      
                    />                                        
                    {data.isLoading && (<p style={{color: "orange"}}>Please wait...</p>)}
                    {data.message && (<p style={{color: "green"}}>{data.message}</p>)}
                    {data.error && (
                        <p style={{color: "red"}}>{data.error}</p>
                    )}

                    <FormControlLabel
                        control={
                        <Checkbox
                            checked={data.newUser}
                            color="primary"
                            name="newUser"
                            value="newUser"
                            onChange={onChangeNewUser}
                        />
                        }
                        label="New user"
                    />

                    {!data.newUser && (
                      <>
                        <br/>
                        <Button color="secondary" onClick={sendPasswordResetEmail}>Reset password</Button>
                        <Button color="secondary" onClick={sendEmailVerification}>Resend email verification</Button>
                      </>
                    )}

                    <Button
                        className={styles.submit}
                        color="primary"
                        fullWidth
                        type="submit"
                        variant="contained"
                    >
                        {data.newUser ? <>Sign up</> : <>Log in</> }
                    </Button>
                </form>
            </div>
        </Container>
    )
}

export default Auth
