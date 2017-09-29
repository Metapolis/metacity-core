module.exports = function (grunt) {
    "use strict";
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.initConfig({
        copy: {
            client: {
                files: [{
                    expand: true,
                    cwd: "./client/dist",
                    src: ["**"],
                    dest: "./dist/client/src"
                }]
            }
        },
        ts: {
            server: {
                files: [{
                    src: ["server/**/*.ts", "!server/.baseDir.ts", "!server/**/*.d.ts"],
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
            },
        },
        watch: {
            client: {
                files: 'client/dist/**/*',
                tasks: ['copy:client'],
                options: {
                    livereload: true
                }
            }
        }
    });

    grunt.registerTask("default", [
        "copy",
        "ts"
    ]);

};
