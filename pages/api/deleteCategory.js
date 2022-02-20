import axios from 'axios';

const deleteCategory = async(req, res) => {
    const username = process.env.HDB_USERNAME;
    const password = process.env.HDB_PASSWORD;

    const url = process.env.NEXT_PUBLIC_HDB_URL;
    const schema = process.env.NEXT_PUBLIC_HDB_SCHEMA;

    const { operation, record, table } = req.body;
    const headers = { 'Content-Type': 'application/json' };

    const dataObject = {
        operation,
        sql: `DELETE FROM ${schema}.${table} where name = '${record.name}' OR name LIKE '${record.name}/%'`
    };
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
                res.status(200).json({ message: response.data.message });
            } else{
                res.status(response.status).json({ error: response.data.message });
            }
        })
        .catch(error => {
            console.log(error.response.status);
            console.log(error.response.data);
            res.status(error.response.status).json({ error: error.response.data.error });
        });
}

export default deleteCategory;
