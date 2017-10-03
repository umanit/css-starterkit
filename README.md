:warning: _You are viewing current master branch using Twitter Bootstrap v4.0.0. For older version using Bootstrap 3.3.7 please switch to branch [bootstrap3](https://github.com/umanit/css-starterkit/tree/bootstrap3)_

# Hey!

This is a starter kit for setting up any web project faster.

## Requires

* [Install NodeJS](https://docs.npmjs.com/getting-started/installing-node)
* [Install Compass](http://compass-style.org/install/)
* Hologram (`sudo gem install hologram`)

## Installation

### Step 1

#### Symfony
The folder `assets` goes in `app/Resources/`.

Adjacent files (`.gitignore`, `gulpfile.js`, `package.json`, `package-lock.json`) go at the project root.

#### Wordpress
The folder `assets` goes in `wp-content/themes/{my-theme}`.

Adjacent files (`.gitignore`, `gulpfile.js`, `package.json`, `package-lock.json`) go at the project root.

#### Drupal
The folder `assets` goes in `sites/all/themes/{my-theme}`.

Adjacent files (`.gitignore`, `gulpfile.js`, `package.json`, `package-lock.json`) go at the project root.

#### Bolt
The folder `assets` goes in `public/theme/{my-theme}`.

Adjacent files (`.gitignore`, `gulpfile.js`, `package.json`, `package-lock.json`) go at the project root.

#### Custom
This one is for standalone HTML projects. The entire starterkit is dropped at the project root.

### Step 2

Then, run :

`npm install`

Then, open `gulpfile.js` and set the variable `techName` to :

 * bolt
 * drupal
 * symfony
 * wordpress

Set `themeName` to the name of your theme (used by Gulp in Drupal, Bolt and Wordpress).
