;(function(mymodule) {
    'use strict';

    mymodule(window.jQuery, window, document);
}(function($, window, document) {
    'use strict';

    // Wait for jQuery to be fully loaded
    require(['jquery'], function($){
        // Wait for the DOM to be fully loaded
        $(function () {
            $('.goto-request-form').click(function() {
                // Get the target to scroll to
                var $target = $('#request-form'), timeAnimate = 500;

                // Begin the animation
                $('html, body').animate({
                    scrollTop: $target.offset().top
                }, timeAnimate);

                // Put the cursor in the first field
                $('#entry_1738965336').focus();

                return false;
            });

            $('.zopim-fade-in').hide();

            // Determine if the Zopim client is loaded up and available
            if (typeof $zopim !== 'undefined') {
                // Tell the zopim client to hide immediately upon API ready
                $zopim(function () {
                    $zopim.livechat.window.hide();

                    // Add a click handler to open up the zopim livechat window
                    $('.chat-open').click(function () {
                        $zopim.livechat.window.show();
                    });

                    // Fade the open chat button in
                    $('.zopim-fade-in').fadeIn(500);
                });
            }
            /*
            TODO - complete whenever IT gives me the go-ahead for CURL installation on serverside

            // Modify forms - hook into the submission process
            $('form[data-post-proxy]').each(function () {
                // Hook into the submission event
                $(this).submit(function (ev) {
                    var action_proxy = $(this).attr('data-post-proxy');

                    // Inform the user that we're working away
                    // TODO - Placeholder
                    console.log('Submitting');

                    // TODO - Convert data in preparation to sending to post proxy
                        // Instead of embedding desired POST action we are going to provide a lookup index for the remote end.  This way the serverside isn't an open POST proxy.

                    // Perform POST action
                    $.ajax({
                        type: 'POST',
                        url: action_proxy,
                        data: $( this ).serialize(),
                        crossDomain: true
                    }).done(function () {
                        // Update display with status update.
                        // TODO placeholder
                        console.log('Done with submission');
                    });
                    // $.post(
                    //     $( this ).attr('action'),
                    //     $( this ).serialize(),
                    //     formSubmitSuccess
                    // );

                    // Stop the default action from happening
                    ev.preventDefault();
                });
            });
            */
        });
    });
}));
