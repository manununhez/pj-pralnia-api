const fs = require('fs');
const task = require('./csv-to-json')
const dotenv = require('dotenv');
dotenv.config();

const STORES_SHORT_CSV_PATH = process.env.STORES_SHORT_CSV_PATH
const STORES_LONG_CSV_PATH = process.env.STORES_LONG_CSV_PATH
const STORES_SHORT_JSON_PATH = process.env.STORES_SHORT_JSON_PATH
const STORES_LONG_JSON_PATH = process.env.STORES_LONG_JSON_PATH
const CSV_UPLOAD_FILES_PATH = 'public/csv/'

const uploadStores = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            status: false,
            message: 'No files were uploaded.'
        });
    }

    if (Object.keys(req.files.stores).length > 2) {
        return res.status(500).send({
            status: false,
            message: 'Max files to upload: 2'
        });
    }

    for (let key of Object.keys(req.files.stores)) {
        let store = req.files.stores[key];

        if (store.mimetype !== 'text/csv') {
            return res.status(500).send({
                status: false,
                message: 'Files extension allowed: CSV'
            });
        }
    }

    //CLEAN DIRECTORIES BEFORE CREATE NEW ONES
    try {
        var file1 = "./" + CSV_UPLOAD_FILES_PATH + "stores-long.csv"
        var file2 = "./" + CSV_UPLOAD_FILES_PATH + "stores-short.csv"
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
    for (let key of Object.keys(req.files.stores)) {
        let store = req.files.stores[key];

        if (store.mimetype !== 'text/csv') {
            return res.status(500).send({
                status: false,
                message: 'Files extension allowed: CSV'
            });
        }
    }


    let data = [];

    //loop all files
    for (let key of Object.keys(req.files.stores)) {
        // _.forEach(_.keysIn(req.files.stores), (key) => {
        let store = req.files.stores[key];

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
    task.convertStores(STORES_SHORT_CSV_PATH, STORES_SHORT_JSON_PATH)
    task.convertStores(STORES_LONG_CSV_PATH, STORES_LONG_JSON_PATH)
}

module.exports = {
    uploadStores
}
