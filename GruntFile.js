module.exports = function(grunt) {
    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

        watch: {
            scripts: {
                files: ['theme/assets/js/*.js', 'theme/assets/less/*', 'index.html', 'theme/assets/static/img'],
                tasks: ['newer:uglify', 'newer:less', 'newer:imagemin'],
                options: {
                    spawn: false,
                    livereload: true,
                },
            },            
        },
        wiredep: {
            task: {
                src: [
                    'index.html'
                ],

                options: {}
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'theme/assets/js/*.js',
                dest: 'build/js/theme.min.js'
            }
        },
        less: {
            dev: {
                options: {
                    compress: false,
                    sourceMap: true,
                    outputSourceFiles: true,
                    paths: ["less/"]
                },
                files: {
                    "build/css/theme.min.css": "theme/assets/less/theme.less"
                }
            },
            prod: {
                options: {
                    compress: true,
                    paths: ["less/"]
                },
                files: {
                    "build/css/theme.min.css": "theme/assets/less/theme.less"
                }
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    dest: 'build',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/{,*/}*.webp',
                        '{,*/}*.html',
                        'styles/fonts/{,*/}*.*'
                    ]
                },{
                    //for bootstrap fonts
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: ['fonts/*.*'],
                    dest: 'build'
                }, {

                    //for font-awesome
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'build'
                }]
            },
          },
        imagemin: {                          // Task
          static: {                          // Target
            options: {                       // Target options
              optimizationLevel: 3,
              svgoPlugins: [{ removeViewBox: false }],
              //use: [mozjpeg()]
            },
            files: {                         // Dictionary of files
              // 'dist/img.png': 'src/img.png', // 'destination': 'source'
              // 'dist/img.jpg': 'src/img.jpg',
              // 'dist/img.gif': 'src/img.gif'
            }
          },
          dynamic: {                         // Another target
            files: [{
              expand: true,                  // Enable dynamic expansion
              cwd: 'theme/assets/static/img',                   // Src matches are relative to this path
              src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
              dest: 'build/img'                  // Destination path prefix
            }]
          }
        }          
        
    });
    grunt.loadNpmTasks('grunt-contrib-copy');    
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-wiredep');

    grunt.registerTask('default', ['newer:uglify', 'newer:less', 'newer:imagemin', 'newer:copy']);
};