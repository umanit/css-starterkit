# Hey!

This is a starter kit for setting up any web project faster.

## Requires

* [Install NodeJS](https://docs.npmjs.com/getting-started/installing-node)
* [Install Compass](http://compass-style.org/install/)
* Hologram (`sudo gem install hologram`)

## Installation

First, run :

`npm install`

Then, open `gulpfile.js` and set the variable `isSymfony` at true if it's a Symfony project. Else, you can write the destinations path for assets in the `destPaths` object.

```
var destPaths = {
    css: './web/assets/css',
    js: './web/assets/js',
    img: './web/assets/img',
    fonts: './web/assets/fonts'
}
```

Tasks `js` et `fonts` are optional. They are required if you're in a Symfony project (they copy images and fonts to web directory)
