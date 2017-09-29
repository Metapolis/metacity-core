module.exports = function (grunt) {
    "use strict";
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.initConfig({
        ts: {
            server: {
                files: [{
                    src: ["src/**/*.ts", "test/**/*.ts", "!server/.baseDir.ts", "!server/**/*.d.ts"],
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
        }
    });

    grunt.registerTask("default", [
        "copy",
        "ts"
    ]);

};
