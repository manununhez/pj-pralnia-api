const fs = require('fs');
const multiAttribute = require('./csv-to-json-attribute')
const dotenv = require('dotenv');
dotenv.config();


const MULTI_ATTRIBUTE_CSV_PATH = process.env.MULTI_ATTRIBUTE_CSV_PATH
const MULTI_ATTRIBUTE_DEMO_CSV_PATH = process.env.MULTI_ATTRIBUTE_DEMO_CSV_PATH
const MULTI_ATTRIBUTE_JSON_PATH = process.env.MULTI_ATTRIBUTE_JSON_PATH
const MULTI_ATTRIBUTE_DEMO_JSON_PATH = process.env.MULTI_ATTRIBUTE_DEMO_JSON_PATH
const CSV_UPLOAD_FILES_PATH = 'public/csv/'
const CSV_UPLOAD_FILES_PATH_INPUT_ALL = "./" + CSV_UPLOAD_FILES_PATH + "input-all.csv"
const CSV_UPLOAD_FILES_PATH_INPUT_ALL_DEMO = "./" + CSV_UPLOAD_FILES_PATH + "input-all-demo.csv"

const uploadAttributes = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            status: false,
            message: 'No files were uploaded.'
        });
    }

    if (Object.keys(req.files.attributes).length > 2) {
        return res.status(500).send({
            status: false,
            message: 'Max files to upload: 2'
        });
    }

    for (let key of Object.keys(req.files.attributes)) {
        let store = req.files.attributes[key];

        if (store.mimetype !== 'text/csv') {
            return res.status(500).send({
                status: false,
                message: 'Files extension allowed: CSV'
            });
        }
    }

    //CLEAN DIRECTORIES BEFORE CREATE NEW ONES
    try {
        var file1 = CSV_UPLOAD_FILES_PATH_INPUT_ALL
        var file2 = CSV_UPLOAD_FILES_PATH_INPUT_ALL_DEMO
        if (fs.existsSync(file1)) {
            fs.unlink(file1, (err) => {
                if (err) throw err;
                console.log(file1 + ' was deleted');
            });
        }

        if (fs.existsSync(file2)) {
            fs.unlink(file2, (err) => {
                if (err) throw err;
                console.log(file2 + ' was deleted');

            });
        }
    } catch (err) {
        console.error(err)
    }


    //Upload new files
    for (let key of Object.keys(req.files.attributes)) {
        let store = req.files.attributes[key];

        if (store.mimetype !== 'text/csv') {
            return res.status(500).send({
                status: false,
                message: 'Files extension allowed: CSV'
            });
        }
    }


    let data = [];

    //loop all files
    for (let key of Object.keys(req.files.attributes)) {
        // _.forEach(_.keysIn(req.files.attributes), (key) => {
        let store = req.files.attributes[key];

        //move photo to uploads directory
        store.mv(CSV_UPLOAD_FILES_PATH + store.name);

        //push file details
        data.push({
            name: store.name,
            path: CSV_UPLOAD_FILES_PATH + store.name,
            mimetype: store.mimetype,
            size: store.size
        });
    }

    //return response
    res.send({
        status: true,
        message: 'Files are uploaded',
        data: data
    });

    //Update JSON files
    multiAttribute.convertAttributes(MULTI_ATTRIBUTE_CSV_PATH, MULTI_ATTRIBUTE_JSON_PATH)
    multiAttribute.convertAttributes(MULTI_ATTRIBUTE_DEMO_CSV_PATH, MULTI_ATTRIBUTE_DEMO_JSON_PATH)
}

module.exports = {
    uploadAttributes
}
