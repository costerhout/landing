/**
 * Grunt Module
 */

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
        * Set project object
        */
        project: {
            basedir: '.',
            themedir: '../bert',
            test: '<%= project.basedir %>/test',
            theme: {
                css: '<%= project.themedir %>/dev/css',
                js: '<%= project.themedir %>/dev/js',
                scss: '<%= project.themedir %>/src/scss',
                bootstrap: '<%= project.themedir %>/src/bootstrap',
            },
            src: {
                js: '<%= project.basedir %>/src/js',
                scss: '<%= project.basedir %>/src/scss'
            },
            dist: {
                js: '<%= project.basedir %>/dist/js',
                css: '<%= project.basedir %>/dist/css'
            },
            dev: {
                js: '<%= project.basedir %>/dev/js',
                css: '<%= project.basedir %>/dev/css'
            }
        },
        sass: {
            dev: {
                options: {
                    precision: 8,
                    style: 'expanded',
                    loadPath: [
                        '<%= project.theme.bootstrap %>/assets/stylesheets',
                        '<%= project.src.scss %>',
                        '<%= project.src.scss %>/dev',
                        '<%= project.theme.scss %>/dev',
                        '<%= project.theme.scss %>'
                    ]
                },
                files: [
                    {
                    expand: true,
                    cwd: '<%= project.src.scss %>/',
                    src: ['**/*.scss'],
                    dest: '<%= project.dev.css %>/',
                    ext: '.css',
                    extDot: 'first'
                    }
                ]
            },
            dist: {
                options: {
                    precision: 8,
                    style: 'compact',
                    loadPath: [
                        '<%= project.theme.bootstrap %>/assets/stylesheets',
                        '<%= project.src.scss %>',
                        '<%= project.src.scss %>/dist',
                        '<%= project.theme.scss %>/dist',
                        '<%= project.theme.scss %>'
                    ]
                },
                files: [
                    {
                    expand: true,
                    cwd: '<%= project.src.scss %>/',
                    src: ['**/*.scss'],
                    dest: '<%= project.dist.css %>/',
                    ext: '.css',
                    extDot: 'first'
                    }
                ]
            }
        },
        postcss: {
            dist: {
                options: {
                    processors: [
                        require('pixrem')(), // add fallbacks for rem units
                        require('autoprefixer')({
                            browsers: [
                                "Android 2.3",
                                "Android >= 4",
                                "Chrome >= 20",
                                "Firefox >= 24",
                                "Explorer >= 8",
                                "iOS >= 6",
                                "Opera >= 12",
                                "Safari >= 6"
                            ]
                        }), // add vendor prefixes
                        require('cssnano')() // minify the result
                    ]
                },
                src: '<%= project.dist.css %>/**/*.css'
            },
            dev: {
                options: {
                    processors: [
                        require('pixrem')(), // add fallbacks for rem units
                        require('autoprefixer')({
                            browsers: [
                                "Android 2.3",
                                "Android >= 4",
                                "Chrome >= 20",
                                "Firefox >= 24",
                                "Explorer >= 8",
                                "iOS >= 6",
                                "Opera >= 12",
                                "Safari >= 6"
                            ]
                        }), // add vendor prefixes
                    ]
                },
                src: '<%= project.dev.css %>/**/*.css'
            }
        },
        // Preen the javascript files
        jshint: {
            all: [
                '<%= project.src.js %>/**/*.js'
            ]
        },
        /**
        * Combine multiple JS source files into one.
        */
        // Not used currently, but kept around in case we want to consolidate the various landing JS files
        concat: {
            js: {
                files: {
                    '<%= project.dist.js %>/<%= pkg.name %>.js': '<%= project.src.js %>/**/*.js',
                    '<%= project.dev.js %>/<%= pkg.name %>.js': '<%= project.src.js %>/**/*.js',
                }
            }
        },
        // Instead we just copy over the files over to the distribution and development directories
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= project.src.js %>/**/*.js'],
                        dest: '<%= project.dev.js %>/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= project.src.js %>/**/*.js'],
                        dest: '<%= project.dist.js %>/'
                    }
                ]
            }
        },
        /**
        * Uglify (minification of JS)
        *
        * Options:
        *   banner - This string gets prepended on to any output
        */
        uglify: {
            options: {
                banner: '/* Copyright 2016 University of Alaska Southeast (http://uas.alaska.edu) */',
                sourceMap: true,
                sourceMapIncludeSources: true
            },
            dynamic_mappings: {
                files: [
                    {
                        src: ['*.js', '!*.min.js'],
                        dest: '<%= project.dist.js %>',
                        cwd: '<%= project.dist.js %>',
                        ext: '.min.js',
                        expand: true
                    }
                ]
            }
        },
        /**
        * Watch
        */
        watch: {
            scss: {
                files: [ '<%= project.src.scss %>/**/*.scss' ],
                tasks: ['sass', 'postcss'],
            },
            js: {
                files: [ '<%= project.src.js %>/**/*.js' ],
                tasks: ['concat', 'uglify'],
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= project.basedir %>/**/*.html',
                    '<%= project.dev.css %>/**/*.css',
                    '<%= project.dev.js %>/**/*.js'
                    ]
            }
        },
        connect: {
            server: {
                options: {
                    base: ['<%= project.test %>'],
                    middleware: function(connect, options, middlewares) {
                        var connectSSI = require('connect-ssi');

                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }
                        var directory = options.directory || options.base[options.base.length - 1];

                        middlewares.unshift(connectSSI({
                            baseDir: directory,
                            ext: '.html'
                        }));
                        return middlewares;
                    },
                    livereload: true,
                    open: {
                        target: 'http://localhost:8000',
                        appName: 'open',
                        callback: function() {}
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');

    /**
    * Default task
    * Run 'grunt preflight' to compile everything
    * Run 'grunt' on the command line to start up the HTTP server
    */
    grunt.registerTask('default', [
        'connect', 'watch'
    ]);
    grunt.registerTask('preflight', [ 'copy', 'uglify', 'sass', 'postcss' ]);
}
