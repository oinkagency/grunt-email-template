module.exports = function(grunt) {

  var path = require('path');
  var fs = require('fs');

  function getHostVals(inHost) {
    var tmpData;
    var hostFile = path.resolve(inHost.hostPath || '.host');

    // If host values are provided in the grunt file itself
    var host = inHost.host;
    var port = inHost.port;
    if (typeof host != 'undefined' && host != null && typeof port != 'undefined' && port != null) return {
      host: host,
      port: port
    };

    // If there is a valid host file provided
    if (fs.existsSync(hostFile)) {
      tmpData = JSON.parse(grunt.file.read(hostFile));
      if (inHost.hostKey) return tmpData[inHost.hostKey] || {};
      if (inHost.host) return tmpData[inHost.host] || {};
    } else if (inHost.hostKey) grunt.warn('\'hostKey\' configuration provided but no valid \'.host\' file found!');

    return {};
  }

  grunt.registerTask("generate-preview-links", function(){

    var host = getHostVals(grunt.config.get("ftp-deploy").build.auth).host;

    // Read all jade files in the source root folder
    grunt.file.expand("src/*.jade").forEach(function (file) {
      
      // Variables
      var projectName = grunt.option("projectDir").replace(/ /g, "-");
      var versionName = file.replace("src/", "").replace(".jade", "");
      var packageName = projectName + "-" + versionName;
      var url = "http://" + host + "/" + packageName;

      // Output
      console.log(url.cyan);
    });
  });
};
