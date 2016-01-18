module.exports = function(grunt) {
  grunt.registerTask("compress-and-create-txt", function() {

    // Read all jade files in the source root folder
    grunt.file.expand("src/*.jade").forEach(function (file) {

      // Variables
      var projectName = grunt.option("projectDir").replace(/ /g, "-");
      var versionName = file.replace("src/", "").replace(".jade", "");
      var packageName = projectName + "-" + versionName;
      var tasks = new Array();

      // Compress task
      var compress = grunt.config.get("compress") || {}; // Get current config
      compress[versionName] = {
        options: {
          archive: "build/_export/" + packageName + ".zip"
        },
        expand: true,
        cwd: "build",
        src: packageName + "/**",
      };
      grunt.config.set("compress", compress); // Save new config
      tasks.push("compress:" + versionName); // Push tasks array

      // Premailer task
      if(!grunt.file.exists('build/_export/' + packageName + '.txt')){
        var premailer = grunt.config.get("premailer") || {}; // Get current config
        premailer[versionName] = {
          src: 'build/' + packageName + '/index.html',
          dest: 'build/_export/' + packageName + '.txt'
        };
        grunt.config.set("premailer", premailer); // Save new config
        tasks.push("premailer:" + versionName); // Push tasks array
      } else {
        grunt.log.error((packageName + ".txt").cyan + " will not be overwritten automatically, remove it first to generate an updated version.");
      }

      // Run all tasks for this file
      grunt.registerTask(versionName + "_tasks", tasks);
      grunt.task.run(versionName + "_tasks");
    });
  });
};
