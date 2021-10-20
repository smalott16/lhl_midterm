require("dotenv").config();
var axios = require('axios');
const api_key = process.env.GO_API_KEY;

const fetchGooglePlace = function(input) {
  const inputLower = input.toLowerCase();
  console.log(inputLower);
  var config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=formatted_address%2Ctype%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${api_key}`,
    headers: { }
  };

  return axios(config)
  .then(function (response) {
    let typesArr = [];
    const restaurantName = response.data.candidates[0].name.toLowerCase();

    console.log(restaurantName)

    //checking if the input is a reasonable match to the assumed google place
    //we do this by checking if our input string is in the assumed place or if the assumed place is in the input string
    if(restaurantName.includes(inputLower) || inputLower.includes(restaurantName)) {
      const typesArr = response.data.candidates[0].types;
      return typesArr;
    }
    return typesArr;
  })
  .catch(function (error) {
    console.log(error);
  });
}

module.exports = { fetchGooglePlace };
