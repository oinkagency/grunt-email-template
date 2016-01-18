module.exports = function(grunt, options){
  return {
    build: {
      path: 'http://<%= grunt.option("ipAddress") %>:<%= connect.build.options.port %>/build',
      app: 'Google Chrome'
    }
  }
};