const { fetchWolframItem }  = require("./wolfram-api");
const { fetchGooglePlace }  = require("./google-maps-api");
const { fetchWikiInfo } = require("./wiki-api");

const categoryEngine = function(input) {
  let category = '';

  return fetchWolframItem(input)
    .then((result) => {
      for (const word of result) {

        if (word.includes('movie') || word.includes('film') || word.includes('television series')) {
          return category = 'watch';
        }
        if (word.includes('book' || 'novel')) {
          return category = 'read';
        }
      }

      //call to wiki api
      return fetchWikiInfo(input)
        .then((result) => {
          if (result) {
            return category = 'watch'
          }

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
          console.log("wiki api error: ", err.message);
        })
    })
    .catch((err) => {
      console.log("wolfram api error: ", err.message);
    })
}

module.exports = { categoryEngine }

