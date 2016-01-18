module.exports = function(grunt, options){
  return {
    options: {
      basedir: 'src',
      pretty: true,
      data: function(dest, src) {

        // Get filename for use in JADE files
        var fileName = String(src).split('/').pop().replace('.jade','');

        return {
          fileName: fileName,
          gmail: grunt.option('gmail'),
        };
      }
    }
  }
};