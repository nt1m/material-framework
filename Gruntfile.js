module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		clean: {
			dist: ["dist"]
		},
		copy: {
			js: {
				files: [
					{
						expand: true,
						cwd: "js/",
						src: "**.js",
						dest: "dist/",
						flatten: true,
						filter: "isFile"
					}
				]
			},
			css: {
				files: [
					{
						expand: true,
						cwd: "css/",
						src: "**.css",
						dest: "dist/",
						flatten: true,
						filter: "isFile"
					}
				]
			}
		},
		autoprefixer: {
			main: {
				expand: true,
				cwd: "dist/",
				src: "**/*.css",
				dest: "dist/",
				options: {
					browsers: [
						"Chrome > 21",
						"Firefox > 29",
						"IE > 9",
						"Safari > 6"
					],
					cascade: false
				}
			},
			uncompressed: {
				expand: true,
				cwd: "css/",
				src: "**/*.css",
				dest: "css/",
				options: {
					browsers: [
						"Chrome > 21",
						"Firefox > 29",
						"IE > 9",
						"Safari > 6"
					],
					cascade: false
				}
			}
		},
		uglify: {
			main: {
				options: {
					banner: "/******* Material Framework by Tim Nguyen ********/" +
					        "\n" +
					        "/** https://github.com/nt1m/material-framework/ **/\n"
				},
				files: [
					{
						expand: true,
						cwd: "dist/",
						src: "**.js",
						dest: "dist/",
					}
				]
			}
		},
		cssmin: {
			main: {
				options: {
					banner: "/******* Material Framework by Tim Nguyen ********/" +
					        "\n" +
					        "/** https://github.com/nt1m/material-framework/ **/"
				},
				files: [
					{
						expand: true,
						cwd: "dist/",
						src: "**.css",
						dest: "dist/",
					}
				]
			}
		},
		rename: {
			main: {
				files: [
					{src: ["dist/material.css"], dest: "dist/material.min.css"},
					{src: ["dist/material.js"], dest: "dist/material.min.js"}
				]
			}
		}
	});
	var npmTasksToLoad = [
		"grunt-autoprefixer",
		"grunt-contrib-cssmin",
		"grunt-contrib-clean",
		"grunt-contrib-copy",
		"grunt-contrib-uglify",
		"grunt-contrib-rename"
	];
	npmTasksToLoad.forEach(function(taskName) {
		grunt.loadNpmTasks(taskName);
	});
	grunt.registerTask("autoprefix", ["autoprefixer:uncompressed"]);
	grunt.registerTask("dist", ["clean:dist", "copy:js", "copy:css", "uglify:main", "autoprefixer:main", "cssmin:main", "rename:main"]);
};