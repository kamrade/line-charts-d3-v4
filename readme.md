# Basic Gulp Project
### Used modules:
  - gulp-connect
  - browserify (+ vinyls-source-stream + vinyl-buffer)
  - gulp-uglify
  - gulp-rename
  - gulp-sass
  - gulp-autoprefixer
  - gulp-uncss
  - gulp-minify-css

###  Workflow
  1. Dev (Default). In folder 'dev'.
    * run server
    * copy html
    * compile sass
    * browserify (concat js with dependencies)
    * copy everything to ./dev
    * watching (browser livereload)

  2. Dist. In folder 'dist'.
    * copy html
    * compile sass
    * minify css
    * browserify (concat js with dependencies)
    * uglify(compress) js
    * copy everything to ./dist

###  Workflow
  * clone project
  * 'cd project name'
  * 'npm install'
  * 'npm start' or 'gulp' for development
  * 'npm run build' or 'gulp build' for build project. Build You can find in dist folder.
