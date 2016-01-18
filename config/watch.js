module.exports = function(grunt, options){
  return {
    options: {
      livereload: true
    },
    html: {
      options: {cwd: 'src'},
      files: ['*.jade', 'layouts/**/*.jade', 'languages/*.jade'],
      tasks: ['html']
    },
    css: {
      options: {cwd: 'src'},
      files: 'less/*.less',
      tasks: ['less', 'html']
    },
    images: {
      options: {cwd: 'src'},
      files: ['img/**/*.{jpg,jpeg,png,gif}', '!img/images', '!img/_README.md'],
      tasks: ['clean:images', 'imagemin:global', 'images']
    },
    assets: {
      options: {cwd: 'src'},
      files: ['assets/**/*', '!assets/_README.md'],
      tasks: ['clean:assets', 'assets']
    },
    configFiles: {
      files: ['Gruntfile.js', 'config/*.js', 'tasks/*.js'],
      tasks: ['build'],
      options: { reload: true }
    }
  }
};