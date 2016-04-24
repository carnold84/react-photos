# React Photos

React Photos is an application to display photos built using React (https://facebook.github.io/react/).

## Precompilation

### Grunt

There is a Grunt task to compile JSX, concatenate all the files, minify them and compile the SASS.

    grunt

It also includes a task to watch for changes to any files in the src folder or SCSS files and run the Grunt tasks automatically.

    grunt watch

### JS

React Photos uses JSX, a React specific language, to create it's components and markup. JSX is not supported by browsers so it needs to be translated into regular HTML and Javascript. This can be done at runtime or the code can be precompiled. React Photos uses precompilation as it performs better and requires less code.

To precompile the code you will need to install the NodeJS dependencies by running the following in the root folder:

    npm install

You can then run the compile command in the root folder:

    babel src/ --presets react --out-dir=build/js

You can set the code to compile automatically when a change is detected by running:

    babel --watch src/ --presets react --out-dir=build/js

The code is published to the build folder. The build folder contains the files to be uploaded to the server. It should not contain anything else.

### SASS

You can compile the Sass files (.scss) by running the following in the root folder:

    sass --update scss:build/css --style compressed

You can set the code to compile automatically when a change is detected by running:

    sass --watch scss:build/css --style compressed

You can change the output style by changing the --style flag. See docs for style types (http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style)

    sass --watch scss:build/css --style expanded

## Babel

Babel is a Javascript compiler that allows the use of ES6 and compiles it to a wider supported standard such as ES5 (https://babeljs.io/)