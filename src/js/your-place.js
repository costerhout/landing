;(function(mymodule) {
    'use strict';

    mymodule(window.jQuery, window, document);
}(function($, window, document) {
    'use strict';

    $(function () {
        // Determine if the Zopim client is loaded up and available
        if (typeof $zopim !== 'undefined') {
            // Tell the zopim client to hide immediately upon API ready
            $zopim(function () {
                $zopim.livechat.window.hide();
            });

            // Add a click handler to open up the zopim livechat window
            $('#your-place #lets-talk').click(function () {
                $zopim.livechat.window.show();
            });
        }

        // If a user clicks on the "Send me information" header then focus on the form item
        $('#your-place #send-me-information').click(function () {
            $('#entry_1738965336').focus();
        });

        // If the user clicks on the "Start your application" header then redirect to the admissions item
        $('#your-place #start-your-application').click(function () {
            document.location.href='http://uas.alaska.edu/apply';
        });
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
}));
