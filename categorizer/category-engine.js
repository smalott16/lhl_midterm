const { fetchWolframItem }  = require("./wolfram-api");
const { fetchGooglePlace }  = require("./google-maps-api");
const { fetchWikiInfo } = require("./wiki-api");

const categoryEngine = function(input) {
  let category = '';

  //checks for movies, films, and television series (watch category)
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
      //second check for television shows (watch category)
      return fetchWikiInfo(input)
        .then((result) => {
          if (result) {
            return category = 'watch'
          }
          //restaurant check (eat category)
          return fetchGooglePlace(input)
            .then((result) => {
              //if empty aray (no restaurant match for input)
              if (result.length > 0) {
                for (const word of result) {
                  if (word === 'cafe' || word === 'food' || word === 'restaurant' || word === 'bar' || word === 'night club') {
                    return category = 'eat';
                  }
                }
              }
              //if all other checks passed, input most likely a product
              return category = 'buy';
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

