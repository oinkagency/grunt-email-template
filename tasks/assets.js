module.exports = function(grunt) {
  grunt.registerTask("assets", function(){

    // Read all jade files in the source root folder
    grunt.file.expand("src/*.jade").forEach(function (file) {

      // Variables
      var projectName = grunt.option("projectDir").replace(/ /g, "-");
      var versionName = file.replace("src/", "").replace(".jade", "");
      var packageName = projectName + "-" + versionName;
      var tasks = new Array();

      // Copy global assets
      var copy = grunt.config.get("copy") || {}; // Get current config
      copy["assets-" + versionName] = {
        files: [{
          expand: true,
          filter: 'isFile',
          cwd: 'src/assets',
          src: ['*', '!_README.md'],
          dest: 'build/' + packageName + '/assets'
        }]
      }
      grunt.config.set("copy", copy); // Save new config
      tasks.push("copy:" + "assets-" + versionName); // Push tasks array

      // Copy edm specific assets
      if (grunt.file.exists("src/assets/" + versionName)) {
        var copy = grunt.config.get("copy") || {}; // get current  config
        copy["assets-edm-specific-" + versionName] = {
          files: [{
            expand: true,
            filter: 'isFile',
            cwd: 'src/assets/' + versionName + '/',
            src: ['*'],
            dest: 'build/' + packageName + '/assets'
          }]
        }
        grunt.config.set("copy", copy); // Save new config
        tasks.push("copy:" + "assets-edm-specific-" + versionName); // Push tasks array
      }

      // Run all tasks for this file
      grunt.registerTask(versionName + "_tasks", tasks);
      grunt.task.run(versionName + "_tasks");
    });
  });
};
