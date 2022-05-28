'use strict'
const express = require('express');
const app = express();
const dotenv = require('dotenv');
var compression = require('compression');

const cors = require('cors')
const fileUpload = require('express-fileupload');

const fromFile = require('./readFile')
const db = require('./queries')
const task = require('./csv-to-json')
const upload = require('./uploadFile')

dotenv.config();

const port = process.env.PORT || 5000;

app.use(compression())
app.use(cors()) //RESOLVE! Request header field Authorization is not allowed by Access-Control-Allow-Headers in preflight response
// default options
app.use(fileUpload()); //{debug: true}
app.use(express.json())
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });
/* this line tells Express to use the public folder as our static folder from which we can serve static files*/
app.use('/img', express.static('public/img'))
app.use('/csv', express.static('public/csv'))
app.use('/json', express.static('public/json'))

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

/**
 * GET DATA
 */
//Initial data
app.get('/versions', db.getVersions)
app.get('/psform/:sex', db.getPSFormData)
app.get('/apptext/:sex', db.getAppTextData)
app.get('/inituserdata/:version', db.getUserInitialData)

//Complete results
app.get('/bargains-result/:type', db.getBargainsResult)
app.get('/bargains-result-per-store/:type', db.getBargainsResultPerStore)
app.get('/survey-result/:type', db.getPSFormResults)
app.get('/demographic-result/:type', db.getUserFormResults)
app.get('/memory-result/:type', db.getMemoryTaskResult)
app.get('/users', db.getUsers)
app.get('/participants-count-result', db.getParticipantsCountResult)

//Per user results
app.get('/bargains-result/:type/:userId', db.getBargainsResultPerUser)
app.get('/bargains-result-per-store/:type/:userId', db.getBargainsResultPerStorePerUser)
app.get('/survey-result/:type/:userId', db.getPSFormResultsPerUser)
app.get('/demographic-result/:type/:userId', db.getUserFormResultsPerUser)
app.get('/memory-result/:type/:userId', db.getMemoryTaskResultPerUser)

app.get('/convert-short-stores', task.convertShortStores)
app.get('/convert-long-stores', task.convertLongStores)

app.get('/stores-long', fromFile.getLongStores);
app.get('/stores-short', fromFile.getShortStores);

app.post('/upload-stores', function (req, res) {
    req.setTimeout(500000);
    upload.uploadStores(req, res);
});
/**
 * SAVE DATA
 */
app.post("/psform", db.createPSForm);
app.post("/visualpattern", db.createVisualPattern);
app.post("/userinfo", db.createUserInfo);
app.post("/userlogtime", db.createUserLogTime);
app.post("/usergeneraldata", db.createUserGeneraldata);
app.post("/userbargain", db.createUserBargains);