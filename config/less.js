module.exports = function(grunt, options){
  return {
    'inlined-styles': {
      files: {
        'build/_cache/html/css/inline.css': 'src/less/inline.less'
      }
    },
    'head-style': {
      files: {
        'build/_cache/html/css/head.css': 'src/less/head.less'
      }
    }
  }
};