/*****************************************************************************
 * Module Javascript chargeant les helpers
 * @author tcaron <tristan.caron@free.fr>
 *****************************************************************************/

;(function(exports, $) {
    exports.helpers= function() {

        // Helpers responsive

        window.BREAKPOINTS = {
            xs: 768,
            sm: 992,
            md: 1200
        };

        function is(size){
            return $(document).width() <= size;
        }

        window.isMobile = function(){
            return is(window.BREAKPOINTS.xs);
        };

        window.isTablet = function(){
            return is(window.BREAKPOINTS.sm);
        };

        window.isDesktop = function(){
            return is(window.BREAKPOINTS.md);
        };
    };
})(
  window,
  window.jQuery
);
