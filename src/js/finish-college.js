;(function(mymodule) {
    'use strict';

    mymodule(window.jQuery);
}(function($) {
    'use strict';

    $(function () {
        // Save away the query for later use
        var $titles = $('.title-change'),
            $subtitles = $('.fadein-end'),
            timeFade = 600,
            timeHold = 2000,
            timeRotate = 3000,
            // Set the initial state
            i = -1,
            rotateTitle = function () {
                // If we're not at the last title, then fade in the title, delay, and then fade out
                i++;
                console.log('fadein, delay, fadeout + set timer: ' + i + ', ' + $titles.eq(i).html());

                // Set the title to the desired index
                if (i < $titles.length - 1) {
                    $titles.eq(i)
                        .fadeIn(timeFade)
                        .delay(timeHold)
                        .fadeOut(timeFade, rotateTitle);
                } else if (i === $titles.length - 1) {
                    // We're at the end. Fade in the last title and fade in the subtitle
                    $titles.eq(i).fadeIn(timeFade);
                    $subtitles.fadeIn(timeFade);
                }
            };

        // Begin rotation
        rotateTitle();

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
