// Plugins
var gulp = require('gulp'),
    compass = require('gulp-compass'), // Compilation en Sass avec Compass
    minifyCSS = require('gulp-minify-css'), // Minification CSS
    concat = require('gulp-concat'), // Concaténation de fichiers
    uglify = require('gulp-uglify'), // minifier JS
    plumber = require('gulp-plumber'), // Permet, lors d'actions pipées que le script plante pas même si erreurs
    iconfont = require('gulp-iconfont'), // Créer une font d'après des icônes.
    consolidate = require('gulp-consolidate'), // Mécanisme de génération de CSS d'après un template
    rename = require('gulp-rename'), // Renommer un fichier
    order = require('gulp-order'), // Ordonner le traitement de fichiers
    argv = require('yargs').argv, // Récupérer arguments de la commande gulp
    gulpif = require('gulp-if'), // Conditionnelles dans gulp
    jshint = require('gulp-jshint'); // Linter JS

var kitPrefix = './',
    destPaths = {
        css: './assets/css',
        js: './assets/js',
        img: './assets/img',
        fonts: './assets/fonts'
    };

/** si cette variable est à true, les chemins sont configurés pour un projet Symfony.
 * @type boolean
 */
var isSymfony = false;

// @todo : configurer les variables pour les autres types de projets.

/**
 * Chemin vers les ressources là ou elles seront accessibles par le serveur.
 * @type {Object}
 *
 * Examples
    In a Symfony project :
    var destPaths = {
        css: './web/assets/css',
        js: './web/assets/js',
        img: './web/assets/img',
        fonts: './web/assets/fonts'
    }

    In a Drupal8 project :
    var destPaths = {
        css: './web/themes/umanit/{MYPROJECT}/css',
        js: './web/themes/umanit/{MYPROJECT}/js',
    }

    In a Drupal7 project :
    var destPaths = {
        css: './sites/all/themes/{MYPROJECT}/css',
        js: './sites/all/themes/{MYPROJECT}/js',
    }

    In a Wordpress project :
    var destPaths = {
        css: './wp-content/themes/{MYPROJECT}/css',
        js: './wp-content/themes/{MYPROJECT}/js',
    }

    In a Bolt project :
    var destPaths = {
        css: './public/theme/{MYPROJECT}/css',
        js: './public/theme/{MYPROJECT}/js',
    }

    etc...
 */

if (isSymfony) {
    kitPrefix = './app/Resources/';
    destPaths = {
        css: './web/assets/css',
        js: './web/assets/js',
        img: './web/assets/img',
        fonts: './web/assets/fonts'
    }
}

// SASS et minification, compilation en CSS
gulp.task('css', function () {
    console.log(destPaths.css);
    gulp.src('assets/scss/**/*.scss')
        .pipe(plumber())
        .pipe(compass({
            sass: kitPrefix + 'assets/scss',
            css: destPaths.css,
            font: destPaths.fonts,
            images: destPaths.img,
            line_comments: true
        }))
        .pipe(gulpif(argv.production, minifyCSS()))
        .pipe(gulp.dest(destPaths.css))
    ;
});

// On copie les images ailleurs (de app/Resources à web/)
gulp.task('images', function () {
  gulp.src(kitPrefix + '/assets/img/**/*')
    .pipe(plumber())
    .pipe(gulp.dest(destPaths.img));
});

// On copie les fonts ailleurs (de app/resources à web/)
gulp.task('fonts', function () {
  gulp.src(kitPrefix + '/assets/fonts/**/*')
    .pipe(plumber())
    .pipe(gulp.dest(destPaths.fonts));
});


// Check des erreurs js
gulp.task('lint', function() {
  gulp.src(kitPrefix + '/assets/js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
  ;
});

// JS et minification
gulp.task('js', function () {
    gulp.src(kitPrefix + '/assets/js/**/*.js')
        .pipe(plumber())
        .pipe(order([
            //"vendor/jquery-3.1.0.min.js",
            "vendor/**/*.js",
            "boot.js",
            "**/*.js"
        ]))
        .pipe(concat('scripts.js'))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(gulp.dest(destPaths.js))
    ;
});

// La tâche par défaut (gulp) regénère tous les assets.
// le paramètre --production exécute les tâches js et css en minifiant les fichiers.
gulp.task('default', ['lint', 'js', 'images', 'fonts', 'css']);

gulp.task('watch', function () {
    var onChange = function (event) {
        console.log('File '+event.path+' has been '+event.type);
    };
    gulp.watch(kitPrefix + 'assets/scss/**/*.scss', ['css']).on('change', onChange);
    gulp.watch(kitPrefix + 'assets/js/**/*.js', ['js']).on('change', onChange);
    gulp.watch(kitPrefix + 'assets/img/**/*', ['images']).on('change', onChange);
    gulp.watch(kitPrefix + 'assets/fonts/**/*', ['fonts']).on('change', onChange);
});

