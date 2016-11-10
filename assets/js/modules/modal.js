/*****************************************************************************
 * Module Javascript gérant les modales
 * @author tcaron <tristan.caron@free.fr>
 *****************************************************************************/

;(function(exports, $) {
    exports.modal= function() {

        function _loadModal(url, target, size) {
            // size doit être "sm, md ou lg"
            if (size) {
                $(target).find('.modal-dialog').removeClass('modal-lg').removeClass('modal-md').removeClass('modal-sm').addClass('modal-'+size);
            }
            $(target).modal('show');
            if (url) {
                $(target).find('.modal-content').html('<div class="text-center"><img class="loader" src="/assets/bo/images/loading.svg" alt="Chargement"></div>');
                $(target).find('.modal-content').load(
                    url,
                    function(){
                        // rechargement checkbox
                        if (undefined !== window.checkbox) {
                            window.checkbox()
                        }
                        // rechargement ckeditor
                        if (undefined !== window.multilanguageeditor) {
                            window.multilanguageeditor()
                        }
                        // Trigg d'un event custom
                        $("#tbModal").trigger('tbModalChange');
                    }
                );
            }
        }

        // Message de confirmation
        $(document).on('click', '[data-confirm]', function(e) {
            e.preventDefault();
            $('#confirmation').find('.modal-body').html($(this).data("confirm"));

            // Traitement si bouton submit
            if ($(this).attr("type") == "submit") {

                // Récupération du bouton original
                var originalSubmit = $(this);

                // Changement du comportement au click et soumission du formulaire
                $('#confirmation .confirm-btn').click(function(e){
                    e.preventDefault();
                    e.stopPropagation();
                    // Suppression de l'attr data-confirm, sinon on tourne en rond.
                    originalSubmit.removeAttr('data-confirm');
                    // On reclick le button pour qu'il soit inclu dans le POST
                    originalSubmit.click();
                });

            } else {
                // Report de l'attribut target
                if ($(this).data("target")) {
                    $('#confirmation .confirm-btn').attr("data-target", $(this).data("target"));
                }
                // Report de l'attribut Size
                if ($(this).data("modalSize")) {
                    $('#confirmation .confirm-btn').attr("data-modal-size", $(this).data("modalSize"));
                }

                $('#confirmation .confirm-btn').attr("href", $(this).attr("href"));
            }
            $('#confirmation').modal('show');
            $('#confirmation .confirm-btn').focus();
        });

        // Fermeture de la modale de confiramtion
        $(document).on('click', '#confirmation .confirm-btn', function(e){
            $("#confirmation").modal("hide");
        });

        // ouverture d'une modale
        $(document).on('click', '[data-target]', function(e) {
            var size = "md";
            if ($(this).attr('data-modal-size')) {
                size = $(this).data('modal-size');
            }
            // on ne charge pas la modale si il y a aussi confirmation
            if (!$(this).data("confirm")) {
                e.preventDefault();
                _loadModal($(this).attr("href"), $(this).data("target"), size);
            }
        });

        // Poster les formulaires dans les modales quand le submit a data-async=true
        $(document).on('click', '#tbModal form [type="submit"]', function(e) {
            if($(this).data('async')){
                e.preventDefault();
                var parentForm = $(this).closest('form');

                // si le formulaire a bin un attr ACTION
                if(parentForm.attr("action")) {
                    // ajout d'un input hidden avec la valeur du bouton submité a destination de symfony
                    $('<input type="hidden" value="'+$(this).val()+'" name="'+$(this).attr('name')+'"/>').appendTo(parentForm);

                    var url = parentForm.attr("action"),
                        serializedData = parentForm.serialize(),
                        modal = $("#tbModal");

                    // Affichage de la roue de loading
                    modal.find('.modal-footer').remove();
                    modal.find('.modal-body').html('<div class="text-center"><img width="100" class="loader" src="/assets/bo/images/loading.svg" alt="Chargement"></div>');

                    // Chargement ajax
                    $.post( url, serializedData, function(data) {
                        modal.find('.modal-content').html(data);
                        // rechargement ckeditor
                        if (undefined !== window.multilanguageeditor) {
                            window.multilanguageeditor()
                        }
                        // rechargement checkbox
                        if (undefined !== window.checkbox) {
                            window.checkbox()
                        }
                        // Trigg d'un event custom
                        $("#tbModal").trigger('tbModalChange');
                    });
                } else {
                    console.warn("Le formulaire n'a pas d'attribut ACTION !");
                }
            }
        });

    }
})(
  window,
  window.jQuery
);
