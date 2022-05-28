const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const STORES_SHORT_JSON_PATH = process.env.STORES_SHORT_JSON_PATH
const STORES_LONG_JSON_PATH = process.env.STORES_LONG_JSON_PATH

const getLongStores = (request, response) => {
    var obj;
    fs.readFile(STORES_LONG_JSON_PATH, 'utf8', function (err, data) {
        if (err) response.json(err)//throw err;
        response.json(JSON.parse(data))
    })
}

const getShortStores = (request, response) => {
    var obj;
    fs.readFile(STORES_SHORT_JSON_PATH, 'utf8', function (err, data) {
        if (err) response.json(err)//throw err;
        response.json(JSON.parse(data))
    })
}

module.exports = {
    getLongStores,
    getShortStores
}