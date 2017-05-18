module.exports = function (grunt) {
    "use strict";
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.initConfig({
        copy: {
            // client: {
            //     files: [{
            //         expand: true,
            //         cwd: "./client",
            //         src: ["**"],
            //         dest: "./dist/client"
            //     }]
            // },
            node: {
                files: [{
                    expand: true,
                    cwd: "./node_modules",
                    src: ["**"],
                    dest: "./dist/client/src/node_modules"
                }]
            }
        },
        // sass: { // Task
        //     dist: {
        //         options: {
        //             style: 'expanded',
        //             // tell Sass to look in the Bootstrap stylesheets directory when compiling
        //             loadPath: 'node_modules/bootstrap/scss'
        //         },// Target
        //         files: [{
        //             expand: true,
        //             cwd: 'styles',
        //             src: ['client/**/*.scss'],
        //             dest: 'dist/client',
        //             ext: '.css'
        //         }]
        //     }
        // },
        ts: {
            server: {
                files: [{
                    src: ["server/\*\*/\*.ts", "!server/.baseDir.ts", "!server/\*\*/\*.d.ts"],
                    dest: "./dist/server"
                }],
                options: {
                    module: "commonjs",
                    removeComments: true,
                    target: "es6",
                    lib: ["es6"],
                    types: ["reflect-metadata"],
                    moduleResolution: "node",
                    experimentalDecorators: true,
                    emitDecoratorMetadata: true,
                    preserveConstEnums: true,
                    outFile: "../../built/local/tsc.js",
                    sourceMap: false
                }
            }//,
            // client: {
            //     files: [{
            //         src: ["./dist/client/\*\*/\*.ts", "!./dist/client/.baseDir.ts", "!./dist/client/\*\*/\*.d.ts", "!./dist/client/src/node_modules/\*\*/\*.ts"],
            //         dest: "./dist/client/src"
            //     }],
            //     options: {
            //         baseUrl: "client/",
            //         target: "es6",
            //         module: "commonjs",
            //         moduleResolution: "node",
            //         sourceMap: true,
            //         emitDecoratorMetadata: true,
            //         experimentalDecorators: true,
            //         lib: ["es6", "dom"],
            //         types: ["reflect-metadata", "jasmine"],
            //         noImplicitAny: true,
            //         suppressImplicitAnyIndexErrors: true
            //     }
            // }
        },
        watch: {
            ts: {
                files: ["server/\*\*/\*.ts"],
                tasks: ["ts"],
                options: {
                    livereload: true
                }
            }//,
            // sass: {
            //     files: 'client/**/*.scss',
            //     tasks: ['sass:dev']
            // }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");

    grunt.registerTask("default", [
        "copy",
        //"sass",
        "ts"
    ]);

};
