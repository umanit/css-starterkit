# Hey !

Ce starterkit permet d'instancier l'intégration d'un projet web plus rapidement.
Il utilise [Webpack encore](https://symfony.com/doc/current/frontend.html).

## Pré-requis

* [Installer NodeJS](https://docs.npmjs.com/getting-started/installing-node)
* Installer `hologram` (`sudo gem install hologram`)

## Installation

Si besoin, ouvrir `webpack.config.js` et remplir les variables suivantes :

```js
// Chemin où se trouve le dossier assets du starterkit
var assetPath = './assets';
// Path de build relatif au projet
var outputPath = 'assets/build';
// Path public relatif à la racine web
var publicPath = '/assets/build';
// Utiliser le hashage des fichiers générés ? (oui pour Symfony, non pour les autres projets)
var isHashed = false;
```

Exécuter la commande suivante pour installer les packages :
```
yarn install
```

_That's all, folks!_

## Utilisation

Exécuter cette commande pour compiler les assets :
```
yarn run encore dev
```

Celle-ci pour que webpack écoute les modifications sur les fichiers et recompile :
```
yarn run encore dev --watch
```

Celle-ci pour compiler pour l'environnement de production (minification, ...)
```
yarn run encore production
```

Des scripts NPM sont à disposition pour simplifier l'appel des commandes précédentes :
```js
yarn build // => yarn run encore dev
yarn build:watch // => yarn run encore dev --watch
yarn prod // => yarn run encore prod
yarn prod:watch // => yarn run encore prod --watch
```

## Ajouter un module Javascript

Pour ajouter un module, créer un fichier dans `assets/js` et l'ajouter dans la fonction `createSharedEntry()` de `webpack.config.js`. Voir l'exemple :

```js
// Création d'un fichier unique 'app.js' pour tous les scripts
Encore.createSharedEntry('js/app', [
    'bootstrap',
    assetPath + '/js/modules/[MON MODULE].js',
    assetPath + '/js/boot.js'
])
```

⚠ Le fichier `boot.js` doit rester le dernier fichier inclus.

## Ajouter une librairie

Pour ajouter une librairie (JS, CSS), l'ajouter avec `Yarn`. Par exemple :

```
yarn add slick-carousel
```

Ensuite, dans notre JS, il suffit de l'inclure avant utilisation :

```
require('slick-carousel');
```