import { loadStripe } from "@stripe/stripe-js";
import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Stripe from 'stripe';

const Thx = ({ customer }) => {
    useEffect(() => {
        localStorage.clear();
    },[]);
    return(
        <Typography gutterBottom style={{ textAlign: `center` }} variant="h6">
            <br/>
            Thanks for your order, {customer.name}.
            <br/>
            We will ship your order soon.
            <br/>
            <small> Please note that your favorites and cart items are cleared. </small>
        </Typography>
    );
};

export const getServerSideProps = async ctx => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.retrieve(ctx.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);

  return {
    props: {
      customer
    }
  };
};

export default Thx;
