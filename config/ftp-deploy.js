module.exports = function(grunt, options){
  return {
    build: {
      auth: {
        host: 'server.com',
        port: 21
      },
      src: 'build',
      dest: '/',
      exclusions: ['build/**/.DS_Store',
                   'build/**/Thumbs.db',
                   'build/_cache',
                   'build/_export'],
      forceVerbose: true
    }
  }
};