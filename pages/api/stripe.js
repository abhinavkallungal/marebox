import Stripe from 'stripe';

export default async (req, res) => {
    const items = req.body;
    const email = items[0].email;

    var line_items = [];
    items.map(i => {
        if(i){
            const { category, description, id, imgURL, name, price } = i;
            const qty = i.cartAttributes.qty;

            line_items.push({
                price_data: {
                  currency: 'inr',
                  product_data: {
                    name,
                    description: description || category,
                    images: [imgURL]
                  },
                  // price is the lowest curreny denomination which is paisa in India
                  unit_amount: price * 100,
                },
                quantity: qty,
            });
        };
    });
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
        customer_email: email,
        line_items,
        payment_method_types: ['card'],
        shipping_address_collection: {
            allowed_countries: ['IN']
        },
        mode: 'payment',
        success_url: process.env.STRIPE_SUCCESS_URL + "?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: process.env.STRIPE_CANCEL_URL
    });
    res.status(200).json({ session });
};
