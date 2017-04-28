module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "./public",
                        src: ["**"],
                        dest: "./dist/public"
                    },
                    {
                        expand: true,
                        cwd: "./views",
                        src: ["**"],
                        dest: "./dist/views"
                    }
                ]
            }
        },
        ts: {
            app: {
                files: [{
                    src: ["server/\*\*/\*.ts", "!server/.baseDir.ts", "!server/\*\*/\*.d.ts"],
                    dest: "./dist"
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
            }
        },
        watch: {
            ts: {
                files: ["server/\*\*/\*.ts"],
                tasks: ["ts"]
            },
            views: {
                files: ["views/**/*.pug"],
                tasks: ["copy"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");

    grunt.registerTask("default", [
        "copy",
        "ts"
    ]);

};