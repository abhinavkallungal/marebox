import { password, schema, url, username } from './dbCredentials';
import axios from 'axios';

const dbWrite = async(data, operation, table) => {
    var myHeaders = new Headers({
        "Authorization": `Basic ${window.btoa(`${username}:${password}`)}`
    });
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      operation,
      schema,
      table,
      "records": [ data ]
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return await fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            return result;
        })
        .catch(error => {
            console.log('error', error);
            return error;
        });
};

export default dbWrite;
