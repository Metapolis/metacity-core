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
                tsconfig: "tsconfig.json"
            }
        }
    });

    grunt.registerTask("default", [
        "copy",
        "ts"
    ]);

};
