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

    var result = []

    //This will read the file.
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (err) {
            console.log(err)
            return err;
        }
        //The following line will split the csv file line by line and store each of it in the vraiable dataArray.
        var dataArray = data.split("\n");

        var firstElement = dataArray[0].split(",");
        var resultCount = 0
        result.push({
            "id": parseInt(firstElement[0]),
            "correctAnswer": parseInt(firstElement[9]),
            "showFeedback": (firstElement[10].trim() === "YES"),
            "showVisualStack": (firstElement[11].trim() === "YES"),
            "attributes": [{
                "id": firstElement[1],
                "p1": parseInt(firstElement[2]),
                "p2": parseInt(firstElement[3]),
                "p3": parseInt(firstElement[4]),
                "name": firstElement[5],
                "valueP1": firstElement[6],
                "valueP2": firstElement[7],
                "valueP3": firstElement[8]
            }]
        })

        //The following loop creates an object for every line and then pushes it into the array.
        for (var i = 1; i < dataArray.length; i++) {

            //contains values which are separated by a comma in a line.
            var nextElement = dataArray[i].split(",");

            if (nextElement[0] == firstElement[0]) {
                result[resultCount].attributes.push({
                    "id": nextElement[1],
                    "p1": parseInt(nextElement[2]),
                    "p2": parseInt(nextElement[3]),
                    "p3": parseInt(nextElement[4]),
                    "name": nextElement[5],
                    "valueP1": nextElement[6],
                    "valueP2": nextElement[7],
                    "valueP3": nextElement[8]
                })
            } else {
                firstElement = dataArray[i].split(",");

                result.push({
                    "id": parseInt(nextElement[0]),
                    "correctAnswer": parseInt(nextElement[9]),
                    "showFeedback": (nextElement[10].trim() === "YES"),
                    "showVisualStack": (firstElement[11].trim() === "YES"),
                    "attributes": [{
                        "id": nextElement[1],
                        "p1": parseInt(nextElement[2]),
                        "p2": parseInt(nextElement[3]),
                        "p3": parseInt(nextElement[4]),
                        "name": nextElement[5],
                        "valueP1": nextElement[6],
                        "valueP2": nextElement[7],
                        "valueP3": nextElement[8]
                    }]
                })
                resultCount++
            }
        }

        // Convert the resultant array to json and  
        // generate the JSON output file. 
        let json = JSON.stringify(result);
        fs.writeFileSync(outputFilePath, json);

        return "Success!!"
    });
}

module.exports = {
    convertMultiAttribute,
    convertMultiAttributeDemo,
    convertAttributes
}
