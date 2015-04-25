> Ce document est régulièrement mis à jour !

Je recense ici mes différentes règles et bonnes pratiques d'écritude de code CSS, **couplé au pré-processeur Less**.

## Sommaire : 

* [Nommage](#nommage)
* [Organisation](#organisation)
* [Commentaires](#commentaires)
* [Bonnes pratiques](#bonnes-pratiques)

## Nommage

Basé sur la méthode BEM (Block, Element, Modifier) et l'approche SMACSS, je réfléchis chaque élément en module, potentiellement composé d'un parent (Block), d'enfants (Element) et de variantes (Modifier).

### Règles communes

* les noms sont écrits en **anglais**
* les noms sont écrit en **minuscules**
* les noms sont préfixés du nom du module (parent)
* chaque portion de nom (parent, enfant, variante) peut comporter des **tirets simples** 

### Parent

* il s'agit du bloc englobant tous les éléments qui le composent
* exemple : `.video`

### Enfant

* il s'agit d'un élément situé à l'intérieur du bloc parent
* il ne peut pas y avoir un enfant d'un autre enfant, on se rapporte toujours au nom du parent
* il est préfixé d'un **double tiret**
* exemple `.video--title`

### Variante

* il s'agit d'un bloc reprenant les propriétés du module défini de base, mais modifiant certaines d'entre elles (`color`, `background`...)
* il est préfixé d'un **underscore**
* exemple : `.video_highlight` 

### Exemple 
	====
	HTML
	====
	<div class="video">
		<p class="video--title"></p>
	</div>

	<!-- variante -->
	<div class="video video_highlight">
		<p class="video--title"></p>
	</div>

	===
	CSS
	===
	.video {}
	.video_highlight {}
	.video--title {}

## Organisation

Avec Less, on couple des propriétés natives en CSS, avec des propriétés avec variables, des mixins avec paramètres, et des mixins sans paramètres.

J'ordonne ces groupes de prorpriétés comme ceci : 

1. Propriétés CSS natif
	* a) en premières, les propriétés de positionnement (display, position)
	* b) ensuite, pas de règle d'ordre de propriéts natives
2. Propriétés CSS avec variables
3. Mixins avec paramètres
4. Mixins sans paramètres
5. Pseudo-classes
6. Pseudo-éléments
7. Eléments enfants 
	* si l'imbrication est nécessaire
	* dans l’ordre défini dans le HTML

### Exemple 

	.video {
		display: block; /* 1a - porpriété CSS native de positionnement */
		color: #000; /* 1b - propriété native */
		background-color: @tango; /* 2 - propriété CSS avec variable
		.pa(15); /* 3 - mixin avec paramètre */
		.ma0; /* 4 - mixin sans paramètre */
		&:hover {} /* 5 - pseudo-classe */
		&:before {} /* 6 - pseudo-élément */
		.video--title {} /* 7 - élément enfant */
	}

### Exceptions

Afin d'améliorer la lisibilité des propriétés d'un élément, je respecte certaines exceptions : 

* si l'élément ne possède qu'une propriété, ou un groupe de propriétés similaires, **on passe sur une ligne**
	

		.video { color: #000; }

* si plusieurs propriétés appartiennent à un domaine de style similaire (couleur, positionnement, marges...), **on les passe sur une seule ligne**

		.video { color: #000; background-color: #ccc; }
		.video--title {
			color: #999;
			margin: 10px; padding: 5px;
		}

* si parmi ces propriétés similaires, l'une est écrite sous forme de mixin, on ne respecte plus l'ordre d'organisation des propriétés, et **on la place sur une seule ligne, avec les autres propriétés similaires**

		.video {
			color: #000; background-color: @tango;
			margin: 10px; .pa(5);
		}

## Commentaires

Je commente autant que nécessaire mon code afin de faciliter la maintenance, et la reprise de code.

* les commentaires sont écrits en **français**
* les commentaires sont écrits en **minuscules**
* les commentaires peuvent être catégorisés en suivant l'exemple de [phpDocumentor](http://tinyurl.com/klk4qsh)
	* `@example` : lien vers un exemple d'utilisation du code
	* `@link` : lien vers un site web en liaison avec le code (documentation, sources...)
	* `@note` : remarque sur le code
	* `@support` : explication de la modification effectuée lors de la maintenance du code, s'il s'agit d'un projet collaboratif, il faudra préciser l'auteur et une date de modification

## Bonnes pratiques

Je m'assure de la qualité de mon code en suivant plusieurs points.

* ne pas cibler un élément par son ID : le poids du sélecteur d'ID est compliqué à écraser
* limiter la taille du sélecteur (ne pas faire `#header #content .nav`, mais directement `nav`)
* limiter la dépendance à un contexte : un module doit être fonctionnel quelque soit son emplacement sur la page
* limiter l'usage de sélecteur d'élément (`p, ul, a...`) : un module ne doit pas dépendre d'une structure HTML, privilégier la sélection de la classe de l'élément
* ne pas qualifier les sélecteurs avec un sélecteur d'élément (`ul.nav`) 
* réduire la dépendance du nommage d'un élément à son contenu (`.box-flower`) : la mise en forme d'un module doit pouvoir être reprise quelque soit son contenu, il faut donc privilégier une classe générique non dépendante au contenu de l'élément pour le style global du module
* utiliser le système de multi-classe

		.btn {}
		.btn_primary {}
		<button class="btn"></button>
		<button class="btn btn_primary"></button>
		==========
		AU LIEU DE
		==========
		.btn, .btn_primary {}
		.btn_primary {}
		<button class="btn"></button>
		<button class="btn_primary"></button>
