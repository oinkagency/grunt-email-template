module.exports = function(grunt, options){
  return {
    build: ["build/**/*", "!build/_export", "!build/_export/*.{zip,txt}"],
    images: ["build/*/img"],
    assets: ["build/*/assets"]
  }
};