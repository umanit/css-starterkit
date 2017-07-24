/** ***************************************************************************
 * Module Javascript chargeant les helpers
 * @author tcaron <tristan.caron@free.fr> ldaguise <luciledaguise@gmail.com>
 *****************************************************************************/

;(function(exports, $) {
    // Helpers responsive
    exports.BREAKPOINTS = {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
    };

    // Contrôle si la taille d'écran est plus petite que la taille max d'un mobile
    exports.isMobile = function() {
        return $(document).width() < exports.BREAKPOINTS.sm;
    };

    // Contrôle si la taille d'écran est plus grande qu'un mobile mais plus petite qu'un desktop
    exports.isTablet = function() {
        return exports.BREAKPOINTS.sm <= $(document).width() && $(document).width() < exports.BREAKPOINTS.md;
    };

    // Contrôle si la taille d'écran est plus grande que la taille minimum d'un desktop
    exports.isDesktop = function() {
        return exports.BREAKPOINTS.md <= $(document).width();
    };
})(
    window,
    window.jQuery
);
