#!/bin/bash
curl --location --request POST 'http://localhost:8080/backend/api/register' \
--header 'Content-Type: application/json' \
--data-raw '{
	"firstName": "wo2342w",
	"lastName": "wow",
	"email": "testEmail@email.com",
	"password": "wo3423424234w"
}
'
