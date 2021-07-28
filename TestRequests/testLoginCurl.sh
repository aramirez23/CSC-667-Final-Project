#!/bin/bash
curl --location --request POST 'http://localhost:8080/backend/api/login' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email": "testEmail@email.com",
	"password": "wo3423424234w"
}
'
