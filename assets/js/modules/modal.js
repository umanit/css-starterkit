/*****************************************************************************
 * UmanIT - Module Javascript gérant les modales
 *
 * <a href="/ma-page" data-modal-target="#tbModal">S'ouvre dans une modale</a>
 * <a href="/action-dangereuse" data-confirm="Attention, action dangeureuse, etes-vous sur ?">Confirmation</a>
 *
 * Note : nécessite un gestion des layout standard et ajax ainsi qui markup compatible avec Twitter Bootstrap
 *
 * @requires bootstrap.js Twitter Bootstrap Modals
 *
 * @author tcaron@umanit.fr
 *****************************************************************************/

;(function (exports, $) {
    exports.modal = function () {

        $('body').append(
            '<div id="tbModal" class="modal fade" role="dialog">' +
            '    <div class="modal-dialog modal-lg">' +
            '        <div class="modal-content"></div>' +
            '    </div>' +
            '</div>'
        );


        $('body').append(
            '<div id="confirmation" class="modal">' +
            '    <div class="modal-dialog">' +
            '        <div class="modal-content">' +
            '            <div class="modal-header">' +
            '                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span' +
            '                            aria-hidden="true">×</span></button>' +
            '                <h4 class="modal-title">Confirmation</h4></div>' +
            '            <div class="modal-body"></div>' +
            '            <div class="modal-footer">' +
            '                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Annuler</button>' +
            '                <a href="#" class="btn btn-danger confirm-btn">Confirmer</a></div>' +
            '        </div>' +
            '    </div>' +
            '</div>'
        );


        function _loadModal(url, target, size) {
            // size doit être "sm, md ou lg"
            if (size) {
                $(target).find('.modal-dialog').removeClass('modal-lg').removeClass('modal-md').removeClass('modal-sm').addClass('modal-' + size);
            }
            $(target).modal('show');
            $(target).find('.modal-content').html('<div class="text-center"><img class="loader" src="/assets/img/loading.svg" alt="Chargement"></div>');
            if (url) {
                $(target).find('.modal-content').load(
                    url,
                    function () {
                        // rechargement checkbox
                        if (undefined !== window.checkbox) {
                            window.checkbox();
                        }
                        // rechargement ckeditor
                        if (undefined !== window.multilanguageeditor) {
                            window.multilanguageeditor();
                        }
                        // Trigg d'un event custom
                        $("#tbModal").trigger('tbModalChange');
                    }
                );
            }
        }

        // Message de confirmation
        $(document).on('click', '[data-confirm]', function (e) {
            e.preventDefault();
            $('#confirmation').find('.modal-body').html($(this).data("confirm"));

            // Report de l'attribut modal-target
            if ($(this).data("modal-target")) {
                $('#confirmation .confirm-btn').attr("data-modal-target", $(this).data("modal-target"));
            }
            // Report de l'attribut Size
            if ($(this).data("modalSize")) {
                $('#confirmation .confirm-btn').attr("data-modal-size", $(this).data("modalSize"));
            }

            $('#confirmation .confirm-btn').attr("href", $(this).attr("href"));
            $('#confirmation').modal('show');
            $('#confirmation .confirm-btn').focus();
        });

        // Fermeture de la modale de confiramtion
        $(document).on('click', '#confirmation .confirm-btn', function (e) {
            $("#confirmation").modal("hide");
        });

        // ouverture d'une modale
        $(document).on('click', '[data-modal-target]', function (e) {
            var size = "md";
            if ($(this).attr('data-modal-size')) {
                size = $(this).data('modal-size');
            }
            // on ne charge pas la modale si il y a aussi confirmation
            if (!$(this).data("confirm")) {
                e.preventDefault();
                _loadModal($(this).attr("href"), $(this).data("modal-target"), size);
            }
        });

        // Poster les formulaires dans les modales quand le submit a data-async=true
        $(document).on('click', '#tbModal form [type="submit"]', function (e) {
            if ($(this).data('async')) {
                e.preventDefault();
                var parentForm = $(this).closest('form');

                // si le formulaire a bin un attr ACTION
                if (parentForm.attr("action")) {
                    // ajout d'un input hidden avec la valeur du bouton submité a destination de symfony
                    $('<input type="hidden" value="' + $(this).val() + '" name="' + $(this).attr('name') + '"/>').appendTo(parentForm);

                    var url = parentForm.attr("action"),
                        serializedData = parentForm.serialize(),
                        modal = $("#tbModal");

                    // Affichage de la roue de loading
                    modal.find('.modal-footer').remove();
                    modal.find('.modal-body').html('<div class="text-center"><img width="100" class="loader" src="/assets/img/loading.svg" alt="Chargement"></div>');

                    // Chargement ajax
                    $.post(url, serializedData, function (data) {
                        modal.find('.modal-content').html(data);
                        // rechargement ckeditor
                        if (undefined !== window.multilanguageeditor) {
                            window.multilanguageeditor();
                        }
                        // rechargement checkbox
                        if (undefined !== window.checkbox) {
                            window.checkbox();
                        }
                        // Trigg d'un event custom
                        $("#tbModal").trigger('tbModalChange');
                    });
                } else {
                    console.warn("Le formulaire n'a pas d'attribut ACTION !");
                }
            }
        });

    };
})(
    window,
    window.jQuery
);
