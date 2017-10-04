/*****************************************************************************
 * UmanIT - Point d'entrée
 * Chargement des modules js
 * @author tcaron <tcaron@umanit.fr>
 *****************************************************************************/

;(function (jq, container) {
  'use strict';
  jq(function ($) {

    var modules = $('html').data('modules').split(/\s+/);

    for (var i = 0; i < modules.length; i++) {
      if (container[modules[i]] === undefined) {
        continue;
      }

      container[modules[i]]();
    }
  });
})(
  window.jQuery,
  window
);
