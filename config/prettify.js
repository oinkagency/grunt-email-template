module.exports = function(grunt, options){
  return {
    options: {
      "indent": 2,
      "condense": true,
      "indent_inner_html": true,
      "unformatted": [
      "a",
      "code",
      "pre",
      "sup",
      "span",
      "i",
      "b",
      "br"
      ]
    }
  }
};