const { fetchWolframItem }  = require("./wolfram-api");


const categoryEngine = function(input) {
  let category = '';

  return fetchWolframItem(input)
    .then((result) => {
      for (const word of result) {
        if (word.includes('movie' || 'film' || 'television')) {
          return category = 'watch';
        }
        if (word.includes('book' || 'novel')) {
          return category = 'read';
        }
      }
      return category = 'buy';
    })
    .catch((err) => {
      console.log(err.message);
    })
}

// categoryEngine('vacuum')
//   .then((result) => {
//     console.log("return result", result);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   })

module.exports = { categoryEngine }

