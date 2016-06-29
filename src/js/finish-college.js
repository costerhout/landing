/**
* @Author: Colin Osterhout <ctosterhout>
* @Date:   2016-06-13T08:44:26-08:00
* @Email:  ctosterhout@alaska.edu
* @Project: BERT
* @Last modified by:   ctosterhout
* @Last modified time: 2016-06-29T12:51:47-08:00
* @License: Released under MIT License. Copyright 2016 University of Alaska Southeast.  For more details, see https://opensource.org/licenses/MIT
*/

(function() {
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
        });
    });
})();
