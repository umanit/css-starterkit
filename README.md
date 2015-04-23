# Ressources

## Snippets

### Utilisation

* copier les fichiers sur votre machine à cet endroit : `C:\Users\*****\AppData\Roaming\Sublime Text 2\Packages\User`
* écrire le nom du snippet + `tab`

#### Remarques

* les étapes "1), 2), ..." représentent l'emplacement du curseur après la génération du snippet avec `tab`
* les unités sont en ** em **

___

### snippets_subl

Snippets pour l'éditeur Sublime Text 2 (en travaux)

___

### snippets_zframework

Snippets utilisables en association au zframework avec l'éditeur Sublime Text 2

* `zmq-min` / `zmq-max` : crée une media query en min-width / max-width
	* 1) variable breakpoint (`tiny`, `medium`, `large`, `big`, `max`)
	* 2) positionnement dans la media query


* `zico-b` / `zico-a` : crée la mixin de génération d'icône en :before / :after
	* 1) variable width
	* 2) variable height
	* 3) variable background-position X
	* 4) variable background-position Y
	* 5) variable context (défaut : @basefont)

* `zshadow` \ `zshadow-in`: crée la mixin de box-shadow externe / interne
	* 1) variable offset-x (défaut : 0)
	* 2) variable offset-y (défaut : 0)
	* 3) variable blur-radius (défaut : 10)
	* 4) variable spread-radius (défaut : 0)
	* 5) variable color (défaut : rgba(0, 0, 0, 0, .5))
	* 5) variable context (défaut : @basefont)