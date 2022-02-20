import { password, schema, url, username } from './dbCredentials.js';

const dbDelete = async(id, table) => {

    var myHeaders = new Headers({
        "Authorization": `Basic ${window.btoa(`${username}:${password}`)}`
    });

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "hash_values": [ id ],
      "operation": "delete",
      schema,
      table,
      "sql": `SELECT * FROM ${schema}.${table} ORDER BY name`
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    return await fetch(url, requestOptions)
      .then(response => response.json())
      .then(result => result)
      .catch(error => error);

}

export default dbDelete;
