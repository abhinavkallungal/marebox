curl --location -u 'u:p' --request POST 'instanceUrl \
--header 'Content-Type: application/json' \
--data-raw '{
    "operation": "configure_cluster",
    "DISABLE_TRANSACTION_LOG": true
}'
