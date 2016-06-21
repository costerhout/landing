;(function(mymodule) {
    'use strict';

    mymodule(window.jQuery);
}(function($) {
    'use strict';
    // Wait for jQuery to be fully loaded
    require(['jquery'], function($){
        // Wait for the DOM to be fully loaded
        $(function () {
            // Save away the title and subtitles query for later use
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
        });
    });
}));
