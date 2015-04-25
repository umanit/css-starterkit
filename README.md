# Ressources

## Convention

Répertoire de mes conventions de code par langage.

## Snippets

### Utilisation

* copier les fichiers sur votre machine à cet endroit : `C:\Users\*****\AppData\Roaming\Sublime Text 2\Packages\User`
* écrire le nom du snippet + `tab` / `entrée`

#### Remarques

* les étapes "1), 2), ..." représentent l'emplacement du curseur après la génération du snippet avec `tab`
* les unités sont en **em**

___

### snippets_subl

Snippets pour l'éditeur Sublime Text 2 (en travaux)

___

### snippets_Y

Snippets utilisables en association au framework Y avec l'éditeur Sublime Text 2 (par ordre alphabétique) : 

* `yico_b` / `yico_a` : crée la mixin de génération d'icône en :before / :after
	* 1) variable width
	* 2) variable height
	* 3) variable background-position X
	* 4) variable background-position Y
	* 5) variable context (défaut : @basefont)

* `ymq_min` / `ymq_max` : crée une media query en min-width / max-width
	* 1) variable breakpoint (`tiny`, `medium`, `large`, `big`, `max`)
	* 2) positionnement dans la media query

* `yshadow` / `yshadow_in` : crée la mixin de box-shadow externe / interne
	* 1) variable offset-x (défaut : 0)
	* 2) variable offset-y (défaut : 0)
	* 3) variable blur-radius (défaut : 10)
	* 4) variable spread-radius (défaut : 0)
	* 5) variable color (défaut : rgba(0, 0, 0, 0, .5))
	* 6) variable context (défaut : @basefont)

* `ytransition` : crée la mixin de transition
	* 1) variable property (défaut : all)
	* 2) variable duration (défaut : .3s)
	* 3) variable function (défaut : linear)
	* 4) variable delay (défaut : 0s)

* `yvh` / `yvh_reset` : crée la mixin .vh / .vh_reset