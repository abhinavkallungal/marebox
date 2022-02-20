import axios from 'axios';
import { username, password, url, schema } from '../../utils/dbCredentials';

const db = async(req, res) => {

    const { conditions, get_attributes, operation, record, table, timestamp } = req.body;
    const headers = { 'Content-Type': 'application/json' };

    var dataObject = {
        operation,
        schema,
        table
    };

    if(operation === 'delete' || operation === 'search_by_hash') {
        dataObject = { ...dataObject, hash_values: [ record.id ] }
    }
    
    if(operation === 'delete_transaction_logs_before') {
        dataObject = { ...dataObject, timestamp }
    }

    if(operation === 'insert' || operation === 'update' || operation === 'upsert'){
        dataObject = { ...dataObject, records: [ record ] }
    }

    if(operation === 'search_by_hash') {
        dataObject = { ...dataObject, get_attributes };
    }

    if(operation === 'search_by_conditions'){
        dataObject = { ...dataObject, conditions };
    }

    const data = JSON.stringify(dataObject);

    const config = {
        auth: {
            username,
            password
        },
        headers,
        method: 'post',
        url,
        data
    };

    await axios(config)
        .then(response => {
            if(response.status === 200){
                var object = {
                    message: response.data.message
                };

                if(operation === 'insert'){
                    object = { ...object, id: response.data.inserted_hashes[0] };
                }

                res.status(200).json(object);
            }
        })
        .catch(error => {
            res.status(409).json({ error: error.response.data.error });
        });
}

export default db;