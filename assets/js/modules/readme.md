## Javascript

Les javascripts sont découpés en modules et chargés à la demande. Chaque Bundle embarque ses javascripts.

Les librairies tierces sont ajoutées au CoreBundle dans le sous dossier "vendor"

Les modules sont définis dans les fichiers sous `modules/`. Un module par fichier

### Architecture des bundles

```
   - CoreBundle/
       + Resources/
           + assets/
               + js/
                   + vendor/                # Seulement pour le CoreBundle et AdminBundle
                   |   + jquery/
                   |   + ...
                   + modules/
                   |   + mon_module1.js
                   |   + mon_module2.js
                   |   + mon_module3.js
                   + boot.js                # Seulement pour le CoreBundle et AdminBundle
```

### boot.js et chargement

Les modules sont déclarés dans les fichier `modules.js` (ou dans des fichiers fragmentés sous le dossier "modules" de chaque Bundle) et doivent respecter la syntaxe suivante :

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

Le CoreBundle fournit `boot.js` qui se charge de charger tous les modules. `boot.js` lit l'attribut `data-modules` de la balise `<html>`.

Afin de charger un module, vous devez le déclarer en l'ajoutant au bloc Twig `{% block js_module %}` en ayant pris soin de rappeler le parent.

Exemple :

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


## Modales

En BO comme en FO les modales Bootstrap 3 sont utilisés. Ne pas se baser sur la doc des modales bootstrap.

Pour qu'un lien s'ouvre dans une modale :

```HTML
<a href="/my/controller" data-target="#akModal">Cliquez moi !</a>
```

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

### akModalChange Event

La modale déclanche un trigger nommé `akModalChange` afin de faciliter les traitements de callback.

Ce event javascript peut être utilisé pour lancer des appels asynchrones sur l'écran en fond (pour mettre à jour une liste qui vient d'être modifiée par la modale par exemple).

```Javascript
$('#akModal').on('akModalChange', function(){
    // Do your stuffs here
});
```

## Confirmation

Une confirmation au clic sur un lien peut être mise en place de la façon suivante :

```HTML
<a href="/fr/search" data-confirm="Attention ! Vous êtes sur le point de faire un truc qui nécéssite une confirmation !">Cliquez moi !</a>
```
ou pour un formulaire : 
```HTML
<button type="submit" data-confirm="vous allez soumettre un truc !">Submit</button>
```

Une petite modale s'affichera avec en contenu texte, la valeur du `data-confirm`.

# SIP

Le SIP permet de restreinde l'accès de salarié sur une page.

Cette restriction se base sur le périmètre de l'employee et une date (optionnel).

Si la rêgle match avec l'utilisateur courant, il est redirigé vers une page, en remplacant si besoin ses rôles par un rôle paramétrable.

Exemple de paramétrage SIP (à mettre dans `app/config/akkalia.yml`) :
```YAML
akkalia_user:
    sip:
        -
           perimeter: ['1.25', '1.27', '1.32.125.583']
           date:
               begin: '2017-02-29T15:52:00+0100'
               end: '2017-03-29T15:52:00+0100'
           replace_role: 'ROLE_USER'
           page: 5
```

Le paramètre `page` correspond à l'identifiant technique d'une page dans `Contenus` > `Pages`> du BO.

