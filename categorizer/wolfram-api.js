require("dotenv").config();
const request = require('request-promise-native');
var parser = require('fast-xml-parser');

const appID = process.env.WA_API_KEY;


const fetchWolframItem = function(searchItem) {

  const options = {
    attributeNamePrefix : "",
    attrNodeName: "attr", //default is 'false'
    textNodeName : "#text",
    ignoreAttributes : false,
    ignoreNameSpace : false,
    allowBooleanAttributes : false,
    parseNodeValue : true,
    parseAttributeValue : true,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    numParseOptions:{
      hex: true,
      leadingZeros: true,
    },
  };

  return request(`http://api.wolframalpha.com/v2/query?input=${searchItem}&appid=${appID}`)
    .then((result) => {
        const jsonObj = parser.parse(result, options);
        const itemDescriptions = []
        let assumptions

        //if no assumptions are returned by the wolfram api, return a blank array
        if (!('assumptions' in jsonObj.queryresult)) {
          return itemDescriptions;
        }

        //this next line of code assumes that Wolframs first group of assumptions is best if there is a clash
        if (jsonObj.queryresult.assumptions.attr.count > 1) {
          assumptions = jsonObj.queryresult.assumptions.assumption[0].value;
        } else {
          assumptions = jsonObj.queryresult.assumptions.assumption.value
        }

        //add all assumption descriptors to an array
        for (let i = 0; i < assumptions.length; i++) {
          itemDescriptions.push(assumptions[i].attr.desc);
        }
        return itemDescriptions;
      })
    .catch((err) =>{
      console.log(err.message);
    })
};

module.exports = { fetchWolframItem };
