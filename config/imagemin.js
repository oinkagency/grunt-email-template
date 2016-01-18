var jpegRecompress = require('imagemin-jpeg-recompress');

module.exports = function(grunt, options){
  return {
    options: {
      use: [jpegRecompress({
        quality: 'veryhigh',
        loops: 4
      })]
    },
    global: {
      files: [{
        expand: true,
        cwd: 'src/img/',
        src: ['*.{png,jpg,jpeg,gif}'],
        dest: 'build/_cache/img'
      }]
    }
  }
};