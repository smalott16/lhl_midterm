const wiki = require('wikijs').default;

const fetchWikiInfo = function(input) {
  return wiki()
    .page(input)
    .then((page) => {
      return page.info();
    })
    .then((result) => {
      if (!result.numEpisodes) {
        return false;
      }
      return true;
    })
    .catch((err) => {
      console.log("wiki error:", err.message);
    })
}

fetchWikiInfo('squid game')
  .then((result) => {

    console.log(result);

  })
  .catch((err) => {
    console.log("wiki error:", err.message);
  });

module.exports = { fetchWikiInfo };
