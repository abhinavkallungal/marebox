import axios from 'axios';
import { username, password, url, schema } from '../../utils/dbCredentials';

const Favorites = async(req, res) => {

    const { conditions, get_attributes, operation, record, table } = req.body;
    const headers = { 'Content-Type': 'application/json' };

    const dataObject = {
        get_attributes,
        hash_values: [ record.id ],
        operation,
        schema,
        table
    };
    const data = JSON.stringify(dataObject);

    const config = {
        auth: {
            username,
            password
        },
        data,
        headers,
        method: 'post',
        url
    };

    await axios(config)
        .then(response => {
            if(response.status === 200){
                res.status(200).json({ favorites: response.data[0].favorites });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(409).json({ error: error.response.data.error });
        });

}

export default Favorites;
