// Reading the file using default 
// fs npm package  
const fs = require("fs");
const dotenv = require('dotenv');
dotenv.config();

const MULTI_ATTRIBUTE_CSV_PATH = process.env.MULTI_ATTRIBUTE_CSV_PATH
const MULTI_ATTRIBUTE_DEMO_CSV_PATH = process.env.MULTI_ATTRIBUTE_DEMO_CSV_PATH
const MULTI_ATTRIBUTE_JSON_PATH = process.env.MULTI_ATTRIBUTE_JSON_PATH
const MULTI_ATTRIBUTE_DEMO_JSON_PATH = process.env.MULTI_ATTRIBUTE_DEMO_JSON_PATH

const convertMultiAttribute = (request, response) => {
    response.json(convertAttributes(MULTI_ATTRIBUTE_CSV_PATH, MULTI_ATTRIBUTE_JSON_PATH))
}

const convertMultiAttributeDemo = (request, response) => {
    response.json(convertAttributes(MULTI_ATTRIBUTE_DEMO_CSV_PATH, MULTI_ATTRIBUTE_DEMO_JSON_PATH))
}

const convertAttributes = (inputFilePath, outputFilePath) => {
    // ### Reading DATA from file
    var filePath = inputFilePath

    var attributes = []

    //This will read the file.
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (err) {
            console.log(err)
            return err;
        }
        //The following line will split the csv file line by line and store each of it in the vraiable dataArray.
        var dataArray = data.split("\n");

        //The following loop creates an object for every line and then pushes it into the array.
        for (var i = 0; i < dataArray.length; i++) {
            // var temp = {};
            //contains values which are separated by a comma in a line.
            var valuesArray = dataArray[i].split(",");

            attributes.push({
                "id": parseInt(valuesArray[0]),
                "attributeId": valuesArray[1],
                "p1": parseInt(valuesArray[2]),
                "p2": parseInt(valuesArray[3]),
                "p3": parseInt(valuesArray[4]),
                "property": valuesArray[5],
                "pralka1": valuesArray[6],
                "pralka2": valuesArray[7],
                "pralka3": valuesArray[8],
                "correctAnswer": parseInt(valuesArray[9]),
                "showFeedback": (valuesArray[10].trim() === "YES")
            })
        }

        // Convert the resultant array to json and  
        // generate the JSON output file. 
        let json = JSON.stringify(attributes);
        fs.writeFileSync(outputFilePath, json);

        return "Success!!"
    });
}

module.exports = {
    convertMultiAttribute,
    convertMultiAttributeDemo,
    convertAttributes
}
