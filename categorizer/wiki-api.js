const wiki = require('wikijs').default;

const fetchWikiInfo = function(input) {
  return wiki()
    .page(input)
    .then((page) => {
      return page.info();
    })
    .then((result) => {
      //is there a key for numEpisodes OR director?
      if (result.numEpisodes || result.director) {
        return 'watch';
      // is there a key for director?
      } else if (result.author) {
        return 'read';
      }
      return false;
    })
    .catch((err) => {
      console.log("wiki error:", err.message);
    })
}

module.exports = { fetchWikiInfo };
