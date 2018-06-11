// webpack.config.js
var Encore = require('@symfony/webpack-encore');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
var styleguide = require('ruby-hologram-webpack-plugin');

/* *********************************************************************************************************************
 * Configuration générale
 * @todo : à l'initialisation du projet, renseigner ces variables
 * ******************************************************************************************************************* */

// Chemin où se trouve le dossier assets du starterkit
var assetPath = './assets';
// Path de build relatif au projet
var outputPath = 'assets/build';
// Path public relatif à la racine web
var publicPath = '/assets/build';
// Utiliser le hashage des fichiers générés ? (oui pour Symfony, non pour les autres projets)
var isHashed = false;

/* *********************************************************************************************************************
 * Fin de la configuration
 * ******************************************************************************************************************* */

Encore
    // Path de build relatif au projet
    .setOutputPath(outputPath)

    // Path publique relatif à la racine web
    .setPublicPath(publicPath)

    // Purge le répertoire de build avant execution
    .cleanupOutputBeforeBuild()

    // Ajout des dépendances de twitter bootstrap
    // @see https://getbootstrap.com/docs/4.0/getting-started/webpack/
    // @see https://symfony.com/doc/current/frontend/encore/custom-loaders-plugins.html#adding-custom-plugins
    .addPlugin(
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default'],
            // In case you imported plugins individually, you must also require them here:
        })
    )

    // Copie les assets statics (le répertoire de destination est déduit).
    .addPlugin(
        new CopyWebpackPlugin([
            {context: assetPath, from: 'fav/**/*'},
            {context: assetPath, from: 'fonts/**/*'},
            {context: assetPath, from: 'img/**/*'},
        ])
    )

    // Hologram
    .addPlugin(
        new styleguide({
            config: './hologram_config.yml'
        })
    )

    // Création d'un fichier unique 'app.js' pour tous les scripts
    .createSharedEntry('js/app', [
        'bootstrap',
        assetPath + '/js/boot.js',
        //assetPath + '/js/modules/[MON MODULE].js',
    ])

    // Création de la stylesheet
    .addStyleEntry('/css/style', assetPath + '/scss/style.scss')

    // Active SASS et Compass
    .enableSassLoader(function (options) {
        options.includePaths = [path.resolve(__dirname, "./node_modules/compass-mixins/lib")];
    })

    .enablePostCssLoader()

    // allow legacy applications to use $/jQuery as a global variable
    .autoProvidejQuery()

    .enableSourceMaps(!Encore.isProduction());

// Ajout un hash dans le nom du fichier (style.[hash].css)
if (isHashed) {
    Encore.enableVersioning();
} else {
  // @see https://github.com/symfony/webpack-encore/issues/136
  Encore.configureFilenames({
    js: '[name].js',
    css: '[name].css',
    images: 'img/[name].[ext]',
    fonts: 'fonts/[name].[ext]'
  });
}

// export the final configuration
module.exports = Encore.getWebpackConfig();