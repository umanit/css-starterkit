/** ***************************************************************************
 * Module Javascript chargeant les helpers
 * @author tcaron <tcaron@umanit.fr>, ldaguise <ldaguise@umanit.fr>
 *****************************************************************************/

// Helpers responsive
let BREAKPOINTS = {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200
  };

// Contrôle si la taille d'écran est plus petite que la taille max d'un mobile
let isMobile = function () {
  return $(document).width() < exports.BREAKPOINTS.sm;
};

// Contrôle si la taille d'écran est plus grande qu'un mobile mais plus petite qu'un desktop
let isTablet = function () {
  return exports.BREAKPOINTS.sm <= $(document).width() && $(document).width() < exports.BREAKPOINTS.md;
};

// Contrôle si la taille d'écran est plus grande que la taille minimum d'un desktop
let isDesktop = function () {
  return exports.BREAKPOINTS.md <= $(document).width();
};
