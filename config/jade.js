module.exports = function(grunt, options){
  return {
    options: {
      basedir: 'src',
      pretty: true,
      data: function(dest, src) {

        // Get filename for use in JADE files
        var fileName = String(src).split('/').pop().replace('.jade','');
        var shareImgFound = grunt.file.exists('src/img/share.png') || grunt.file.exists('src/img/' + fileName + '/share.png');

        return {
          fileName: fileName,
          shareImgFound: shareImgFound,
          gmail: grunt.option('gmail')
        };
      }
    }
  }
};