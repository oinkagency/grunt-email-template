module.exports = function(grunt, options){
  return {
    build: {
      options: {
        hostname: '0.0.0.0',
        port: 8000,
        base: '',
        livereload: true
      }
    }
  }
};