module.exports = function(grunt) {
  grunt.registerTask("html", function(){

    // Read all jade files in the source root folder
    grunt.file.expand("src/*.jade").forEach(function (file) {

      // Variables
      var projectName = grunt.option("projectDir").replace(/ /g, "-");
      var versionName = file.replace("src/", "").replace(".jade", "");
      var packageName = projectName + "-" + versionName;
      var tasks = new Array();

      // Jade task
      var jade = grunt.config.get("jade") || {}; // Get current config
      jade[versionName] = {
        src: "src/" + versionName + ".jade",
        dest: "build/_cache/html/" + versionName + ".html"
      }
      grunt.config.set("jade", jade); // Save new config
      tasks.push("jade:" + versionName); // Push tasks array

      // EmailBuilder task
      var emailBuilder = grunt.config.get("emailBuilder") || {}; // Get current config
      emailBuilder[versionName] = {
        src: "build/_cache/html/" + versionName + ".html",
        dest: "build/_cache/inlined/" + versionName + ".html"
      }
      grunt.config.set("emailBuilder", emailBuilder); // Save new config
      tasks.push("emailBuilder:" + versionName); // Push tasks array

      // Prettify task
      var prettify = grunt.config.get("prettify") || {}; // Get current config
      prettify[versionName] = {
        src: "build/_cache/inlined/" + versionName + ".html",
        dest: "build/" + packageName + "/index.html"
      }
      grunt.config.set("prettify", prettify); // Save new config
      tasks.push("prettify:" + versionName); // Push tasks array

      // Run all tasks for this file
      grunt.registerTask(versionName + "_tasks", tasks);
      grunt.task.run(versionName + "_tasks");
    });
  });
};
