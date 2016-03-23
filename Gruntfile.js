module.exports = function (grunt) {

  var path = require('path');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  });

  // Global grunt variables
  grunt.option('projectDir', process.cwd().split("/").pop()); // Save the project name according to the root directory name
  grunt.option('gmail', grunt.option('gmail') || false); // Gmail flag, default is false

  // Load grunt configurations automatically and define the configuration for all the tasks
  var configs = require('load-grunt-configs')(grunt);
  grunt.initConfig(configs);  

  // Lookup and save IP address
  var os = require('os');
  var ifaces = os.networkInterfaces();

  Object.keys(ifaces).forEach(function (ifname) {
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      // Save in Grunt option
      grunt.option('ipAddress', iface.address);
    });
  });

  var userfolder = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
  if (!userfolder) {
    throw new Error('Could not find a valid user home path.');
  }
  grunt.option('userfolder', userfolder)

  // Display project name and ip address
  grunt.log.subhead((" " + grunt.option("projectDir") + " (" + grunt.option("ipAddress") + ") ").green.inverse);
  if(grunt.option('gmail')){
    grunt.log.writeln('Gmail rendering'.bold + ': Media queries disabled');
  }

  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // Record execution time of tasks
  require('time-grunt')(grunt);

  // Load all tasks in the tasks folder
  grunt.loadTasks("tasks");

  // Create build task
  grunt.registerTask('build', [
    'clean',
    'less',
    'imagemin:global',
    'html',
    'images',
    'assets',
    'notify:build'
  ]);

  grunt.registerTask('export', [
    'build',
    'compress-and-create-txt',
    'ftp-deploy',
    'notify:export',
    'generate-preview-links'
  ]);

  // Create server task
  grunt.registerTask('server', [
    'connect',
    'open',
    'notify:server',
    'watch'
  ]);

  // Create development task
  grunt.registerTask('dev', [
    'build',
    'server'
  ]);

  // Create default task
  grunt.registerTask('default', ['dev']);
};
