import { Button, Container, Typography } from '@material-ui/core';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
    const router = useRouter();
    const [ sessionId, setSessionId ] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({
            sessionId
        });
        if(result.error){
            console.log(result.error.message);
        };
    };

    useEffect(() => {
        setSessionId(router.query.sessionId);
    }, [router])

    return(
        <Container>
            <br/>
            <form style={{textAlign: `center`}}  onSubmit={ handleSubmit }>
                    <Button color="primary" justifyContent="center" style={{ maxWidth: `500px` }} type="submit" variant="outlined">
                      <Typography gutterBottom variant="h5">
                          Proceed to payment gateway
                      </Typography>
                    </Button>
            </form>
        </Container>
    );
};

export default CheckoutPage;
