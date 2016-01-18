module.exports = function(grunt) {
  grunt.registerTask("images", function(){

    // Read all jade files in the source root folder
    grunt.file.expand("src/*.jade").forEach(function (file) {

      // Variables
      var projectName = grunt.option("projectDir").replace(/ /g, "-");
      var versionName = file.replace("src/", "").replace(".jade", "");
      var packageName = projectName + "-" + versionName;
      var tasks = new Array();

      // Copy global images
      var copy = grunt.config.get("copy") || {}; // Get current config
      copy["images-" + versionName] = {
        files: [{
          expand: true,
          cwd: 'build/_cache/img',
          src: ['*.{png,jpg,jpeg,gif}'],
          dest: 'build/' + packageName + '/img'
        }]
      }
      grunt.config.set("copy", copy); // Save new config
      tasks.push("copy:" + "images-" + versionName); // Push tasks array

      // Minify and copy edm specific images
      if (grunt.file.exists("src/img/" + versionName)) {
        var imagemin = grunt.config.get("imagemin") || {}; // get current  config
        imagemin["edm-specific-" + versionName] = {
          files: [{
            expand: true,
            cwd: 'src/img/' + versionName + '/',
            src: ['*.{png,jpg,jpeg,gif}'],
            dest: 'build/' + packageName + '/img'
          }]
        }
        grunt.config.set("imagemin", imagemin); // Save new config
        tasks.push("imagemin:" + "edm-specific-" + versionName); // Push tasks array
      }

      // Run all tasks for this file
      grunt.registerTask(versionName + "_tasks", tasks);
      grunt.task.run(versionName + "_tasks");
    });
  });
};
