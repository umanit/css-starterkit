## Javascript

Les javascripts sont découpés en modules et chargés à la demande.

Les librairies tierces sont ajoutées dans le sous dossier "vendor"

Les modules sont définis dans les fichiers sous `modules/`. Un module par fichier

### Architecture

```
           + assets/
               + js/
                   + vendor/
                   |   + jquery/
                   |   + ...
                   + modules/
                   |   + mon_module1.js
                   |   + mon_module2.js
                   |   + mon_module3.js
                   + boot.js
```

### boot.js et chargement

Les modules sont déclarés dans des fichiers fragmentés sous le dossier "modules" et doivent respecter la syntaxe suivante :

```Javascript
/**
 * Nom du module
 * Description intelligible du module
 */
;(function(exports, $) {
    exports.nom_du_module = function() {
        // Feel free to stick your stuff here.
    }
})(
    window,
    window.jQuery
);

```

`boot.js` se charge de charger tous les modules. `boot.js` lit l'attribut `data-modules` de la balise `<html>`.

Afin de charger un module, vous devez le déclarer dans la balise HTML

Exemple en TWIG :

```
    {% block js_modules %}{{parent()}} nom_du_module{% endblock js_modules %}
```

### Dépendences

Veillez à vérifier les dépendences entre modules... au moins de manière informative
```Javascript
    // Flashbag doit être chargé !
    if (undefined === window.flashbag) {
        console.warn("Le module flashbag n'est pas chargé !");
    }
```


## modale.js

En BO comme en FO les modales Bootstrap 3 sont utilisés. Ne pas se baser sur la doc des modales bootstrap.

Pour qu'un lien s'ouvre dans une modale :

```HTML
<a href="/my/controller" data-modal-target="#tbModal">Cliquez moi !</a>
```

NB : "#tbModal" pour "Twitter Bootstrap Modal".

### Formulaire dans modales

Par défaut, les formualaires soumis au sein d'une modale redirige vers le layout classique. Si le retour du formulaire doit demeurer dans la modale, il est nécessaire d'ajouter le data attribute `data-async="true"` **sur l'input ou le button submit**.

eg. :

```HTML
<input type="submit" data-async="true" value="Envoyer la purée" />

```
ou

```HTML
<button type="submit" data-async="true">Envoyer la purée</button>

```

/!\ Attention, le formulaire doit avoir un attribut "ACTION" !


### Taille de la modale

Ajouter une taille parmis "sm", "md" ou "lg" pour avoir une modale de taille petite, moyenne ou large.

```HTML
<button type="submit" data-modal-size="lg">Envoyer la purée en grand !</button>

```

### tbModalChange Event

La modale déclanche un trigger nommé `tbModalChange` afin de faciliter les traitements de callback.

Ce event javascript peut être utilisé pour lancer des appels asynchrones sur l'écran en fond (pour mettre à jour une liste qui vient d'être modifiée par la modale par exemple).

```Javascript
$('#tbModal').on('tbModalChange', function(){
    // Do your stuffs here
});
```

### Confirmation

Une confirmation au clic sur un lien peut être mise en place de la façon suivante :

```HTML
<a href="/fr/search" data-confirm="Attention ! Vous êtes sur le point de faire un truc qui nécéssite une confirmation !">Cliquez moi !</a>
```
ou pour un formulaire : 
```HTML
<button type="submit" data-confirm="vous allez soumettre un truc !">Submit</button>
```

Une petite modale s'affichera avec en contenu texte, la valeur du `data-confirm`.
