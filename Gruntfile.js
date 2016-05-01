module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        sass : {
            dist : {
                options : {
                    style : 'compressed',
                    sourcemap : 'none'
                },
                files : [{
                    expand : true,
                    cwd : 'scss',
                    src : ['*.scss'],
                    dest : 'build/css',
                    ext : '.css'
                }]
            }
        },
        babel : {
            options : {
                presets : ['react']
            },
            jsx : {
                files : [{
                    expand : true,
                    cwd : 'src/',
                    src : ['**/*.js'],
                    dest : 'compiled',
                    ext : '.js'
                }]
            }
        },
        concat: {
            dist: {
                src: ['compiled/**/*.js'],
                dest: 'build/js/bundle.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'build/js/bundle.min.js': ['build/js/bundle.js']
                }
            }
        },
        clean: {
            my_target: {
                src : ["compiled/"]
            }
        },
        watch: {
            src: {
              files: ['src/**/*.js', 'scss/**/*.scss'],
              tasks: ['default']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['sass', 'babel', 'concat', 'uglify', 'clean']);

};