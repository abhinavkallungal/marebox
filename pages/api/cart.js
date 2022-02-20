import axios from 'axios';
import { username, password, url, schema } from '../../utils/dbCredentials';

const Cart = async(req, res) => {

    const dataObject = {...req.body, schema};
    const data = JSON.stringify(dataObject);

    const config = {
        auth: {
            username,
            password
        },
        data,
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        url
    };

    await axios(config)
        .then(response => {
            if(response.status === 200){
                res.status(200).json({ cartItems: response.data });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(409).json({ error: error.response.data.error });
        });

}

export default Cart;
