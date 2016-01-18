module.exports = function(grunt, options){
  return {
    options: {
      title: '<%= grunt.option("projectDir") %>'
    },
    build: {
      options: {
        message: 'Build complete'
      }
    },
    export: {
      options: {
        message: 'Export complete'
      }
    },
    server: {
      options: {
        message: 'Server is ready. Watch tasks starting up...'
      }
    }
  }
};