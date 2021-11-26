# file-system-api

This REST API serves the purpose of a file system and obtains  the full directory listing of a given directory path on the local filesystem where the api is running. Include the filename, full path, file size, extension/file type and created date

## Install

    npm install

## Run the app

    npm start src\app.js

# REST API

## Get root directory listing

### Request

`GET /listing/`

    curl -i -H 'Accept: application/json' http://localhost:4040/listing

### Response

    "status": "success",
    "origin": "Directory endpoint - Get directory listing in project root",
    "data": [
        {
            "name": "string",
            "size": "string",
            "directory": boolean,
            "created": "date",
            "extension": "string",
            "permissions": "string"
        }
    ],
    "message": "Directory listing fetched successfully"

## Get sub directory listing
`GET /listing/sub?path={path}`

### Response

    "status": "success",
    "origin": "Directory endpoint - Get directory listing in project root",
    "data": [
        {
            "name": "string",
            "size": "string",
            "directory": boolean,
            "created": "date",
            "extension": "string",
            "permissions": "string"
        }
    ],
    "message": "Sub directory listing fetched successfully"
