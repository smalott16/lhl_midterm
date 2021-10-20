const { fetchWolframItem }  = require("./wolfram-api");
const { fetchGooglePlace }  = require("./google-maps-api");

const categoryEngine = function(input) {
  let category = '';

  return fetchWolframItem(input)
    .then((result) => {
      for (const word of result) {
        console.log("word: ", word);
        if (word.includes('movie') || word.includes('film') || word.includes('television series')) {
          return category = 'watch';
        }
        if (word.includes('book' || 'novel')) {
          return category = 'read';
        }
      }
        //call to google api
      return fetchGooglePlace(input)
        .then((result) => {
          for (const word of result) {
            if (word === 'cafe' || word === 'food' || word === 'restaurant' || word === 'bar' || word === 'night club') {
              return category = 'eat';
            } else {
              return category = 'buy';
            }
          }
        })
        .catch((err) => {
          console.log("google api error: ", err.message);
        })
    })
    .catch((err) => {
      console.log(err.message);
    })

}

module.exports = { categoryEngine }

