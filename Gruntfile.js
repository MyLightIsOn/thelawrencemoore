/*
 * grunt-contrib-handlebars
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 Tim Branyen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        clean: ["js/templates/templates.js"],

        handlebars: {
            compile: {
                options: {
                    namespace: "JST",
                    processName: function(filePath) {
                        return filePath.replace('js/templates/','').replace('.hbs','');
                        /*return filePath.replace(/^templates\//, '').replace(/.hbs$/, '');*/
                    }
                },
                files: {
                    "js/templates/templates.js": ["js/templates/*.hbs"]
                }
            }
        },

        watch: {
            templates: {
                files: ['js/templates/*.hbs'],
                tasks: ['handlebars']
            }
        }
    });


    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['clean', 'handlebars', 'watch']);
};
