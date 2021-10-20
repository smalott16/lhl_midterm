require("dotenv").config();
var axios = require('axios');
const api_key = process.env.GO_API_KEY;

const fetchGooglePlace = function(input) {

  var config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=formatted_address%2Ctype%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${api_key}`,
    headers: { }
  };

  return axios(config)
  .then(function (response) {
    console.log(response.data.candidates[0].types)
    const typesArr = response.data.candidates[0].types;
    console.log(typesArr)
    return typesArr;
  })
  .catch(function (error) {
    console.log(error);
  });
}


module.exports = { fetchGooglePlace };
