module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    // configuration du projet
    grunt.initConfig({
        // watch
        watch: {
            config: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },

            css: {
                files: ['assets/scss/**/*.scss'],
                tasks: ['sass:dev'], 
            }			
        },

        // sass
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    sourcemap: 'inline'
                },
                files: {
                    'assets/css/style.css': 'assets/scss/style.scss',
                    'assets/css/bootstrap.css': 'assets/scss/bootstrap.scss'
                }
            }, 
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    'assets/css/style.css': 'assets/scss/style.scss'
                }
            }
        },

        // postcss
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: ['last 2 versions', 'ie >= 9']}),
                    require('cssnano')()
                ]
            },
            dist: {
                src: 'assets/css/**/*.css'
            }
        },

        // browser sync
        browserSync: {
            // Environment: Wordpress
            dev: {
                bsFiles: {
                    src: [
                        'assets/css/**/*.css',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './'
                }
            }
        }
    });

    // Tâches par défaut : exécuter manuellement la commande 'grunt nom-de-la-tache' dans l'invite de commande
    // Pour la tâche 'default', exécuter simplement la commande 'grunt'
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('dist', ['sass:dist', 'postcss:dist']);

};
