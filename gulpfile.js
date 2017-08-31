/**
 * À ÉDITER
 * @type string : le nom du thème, si besoin
 */
var themeName = 'my_theme';

/**
 * À ÉDITER
 * @type string : le nom de la technologie à choisir parmis bolt, custom, drupal, symfony, wordpress.
 */
var techName = 'custom';


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
    jshint = require('gulp-jshint'), // Linter JS
    hologram = require('gulp-hologram'), // Génération du guide de style
    path = require('path'); // Gestionnaire de chemins

// Variables selon les typologies de projets.
var parameters = {
    bolt: {
        kitPrefix: './public/theme/' + themeName,
        destPaths: {
            css: './public/theme/' + themeName + '/assets/css',
            js: './public/theme/' + themeName + '/assets/js',
            styleguide: './public/styleguide',
        },
    },
    custom: {
        kitPrefix: './',
        destPaths: {
            css: './assets/css',
            js: './assets/js',
            styleguide: './styleguide',
        },
    },
    drupal: {
        kitPrefix: './sites/all/themes/' + themeName,
        destPaths: {
            css: './sites/all/themes/' + themeName + '/assets/css',
            js: './sites/all/themes/' + themeName + '/assets/js',
            styleguide: './sites/all/themes/' + themeName + '/styleguide',
        },
    },
    symfony: {
        kitPrefix: './app/Resources/',
        destPaths: {
            css: './web/assets/css',
            js: './web/assets/js',
            img: './web/assets/img',
            fonts: './web/assets/fonts',
            styleguide: './web/styleguide',
        },
    },
    wordpress: {
        kitPrefix: './wp-content/themes/' + themeName,
        destPaths: {
            css: './wp-content/themes/' + themeName + '/assets/css',
            js: './wp-content/themes/' + themeName + '/assets/js',
            styleguide: './wp-content/themes/' + themeName + '/styleguide',
        },
    },
};

// SASS et minification, compilation en CSS
gulp.task('css', function() {
    return gulp.src(parameters[techName].kitPrefix + '/assets/scss/**/*.scss')
        .pipe(plumber())
        .pipe(compass({
            project: path.join(__dirname, parameters[techName].kitPrefix, '/assets'),
            sass: 'scss',
            css: 'css',
            font: 'fonts',
            image: 'img',
            line_comments: true
        }))
        .on('error', onError)
        .pipe(gulpif(argv.production, minifyCSS()))
        .pipe(gulpif(argv.prod, minifyCSS()))
        .pipe(gulp.dest('css'))
        ;
});

// Génération du guide de style
gulp.task('hologram', ['css'], function() {
    gulp.src(parameters[techName].kitPrefix + '/assets/hologram/hologram_config.yml')
        .pipe(plumber())
        .pipe(hologram());
});
// Déplace le guide de style dans un dossier public (accessible depuis un serveur web)
gulp.task('styleguide', ['hologram'], function() {
    if (techName !== 'custom') {
        setTimeout(function () {
            gulp.src(parameters[techName].kitPrefix + '/assets/hologram/**/*.*')
                .pipe(gulp.dest(parameters[techName].destPaths.styleguide));
        }, 500);
    }
});

// On copie les images ailleurs (de app/Resources à web/)
gulp.task('images', function () {
    if (techName == 'symfony') {
        gulp.src(parameters[techName].kitPrefix + '/assets/img/**/*')
            .pipe(plumber())
            .pipe(gulp.dest(parameters[techName].destPaths.img));
    } else {
        console.log('Nothing to do.');
    }
});

// On copie les fonts ailleurs (de app/resources à web/)
gulp.task('fonts', function () {
    if (techName == 'symfony') {
        gulp.src(parameters[techName].kitPrefix + '/assets/fonts/**/*')
            .pipe(plumber())
            .pipe(gulp.dest(parameters[techName].destPaths.fonts));
    } else {
        console.log('Nothing to do.');
    }
});


// Check des erreurs js
gulp.task('lint', function() {
    gulp.src(parameters[techName].kitPrefix + '/assets/js/modules/*.js')
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
    ;
});

// JS et minification
gulp.task('js', function () {
    gulp.src([
        parameters[techName].kitPrefix + '/assets/js/**/*.js',
        '!' + parameters[techName].kitPrefix + '/assets/js/scripts.js'])
        .pipe(plumber())
        .pipe(order([
            "vendor/jquery-3.2.1.min.js",
            "vendor/**/*.js",
            "boot.js",
            "**/*.js"
        ]))
        .pipe(concat('scripts.js'))
        .pipe(gulpif(argv.production, uglify()))
        .pipe(gulpif(argv.prod, uglify()))
        .pipe(gulp.dest(parameters[techName].destPaths.js))
    ;
});

// La tâche par défaut (gulp) regénère tous les assets.
// le paramètre --production exécute les tâches js et css en minifiant les fichiers.
gulp.task('default', ['lint', 'js', 'images', 'fonts', 'styleguide']);

gulp.task('watch', function () {
    var onChange = function (event) {
        console.log('File '+event.path+' has been '+event.type);
    };
    gulp.watch(parameters[techName].kitPrefix + 'assets/scss/**/*.scss', ['css']).on('change', onChange);
    gulp.watch(parameters[techName].kitPrefix + 'assets/css/**/*.css', ['styleguide']).on('change', onChange);
    gulp.watch(parameters[techName].kitPrefix + 'assets/js/**/*.js', ['js']).on('change', onChange);
    gulp.watch(parameters[techName].kitPrefix + 'assets/img/**/*', ['images']).on('change', onChange);
    gulp.watch(parameters[techName].kitPrefix + 'assets/fonts/**/*', ['fonts']).on('change', onChange);
});

/**
 * Ceci a été rajouté depuis l'ajout d'Hologram qui créait un bug avec les fichiers compass gulpés qui ne se réécrivent pas avec une erreur de saisie.
 * @param err
 */
function onError(err) {
    console.log(err);
    this.emit('end');
}
