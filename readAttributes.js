const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const MULTI_ATTRIBUTE_JSON_PATH = process.env.MULTI_ATTRIBUTE_JSON_PATH
const MULTI_ATTRIBUTE_DEMO_JSON_PATH = process.env.MULTI_ATTRIBUTE_DEMO_JSON_PATH

const getAttributes = (request, response) => {
    var obj;
    fs.readFile(MULTI_ATTRIBUTE_JSON_PATH, 'utf8', function (err, data) {
        if (err) response.json(err)//throw err;
        response.json(JSON.parse(data))
    })
}

const getAttributesDemo = (request, response) => {
    var obj;
    fs.readFile(MULTI_ATTRIBUTE_DEMO_JSON_PATH, 'utf8', function (err, data) {
        if (err) response.json(err)//throw err;
        response.json(JSON.parse(data))
    })
}

module.exports = {
    getAttributes,
    getAttributesDemo
}