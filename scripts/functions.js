$(function () {

    'use strict';

    $(document).ready(function() {

        if ($( window ).width() < 638) {
            $('.thumbnails-container').find('.thumbnail').each(function(){
                $(this).removeAttr('data-toggle');
            });
        }

        $('.modal').each(function () {
            var t = $(this),
                d = t.find('.modal-dialog'),
                fadeClass = (t.is('.fade') ? 'fade' : '');
            // render dialog
            t.removeClass('fade')
                .addClass('invisible')
                .css('display', 'block');
            // read and store dialog height
            d.data('height', d.height());
            // hide dialog again
            t.css('display', '')
                .removeClass('invisible')
                .addClass(fadeClass);
        });
        // phase two - set margin-top on every dialog show
        $('.modal').on('show.bs.modal', function () {
            var t = $(this),
                d = t.find('.modal-dialog'),
                dh = d.data('height'),
                w = $(window).width(),
                h = $(window).height();
            // if it is desktop & dialog is lower than viewport
            // (set your own values)
            if (w > 380 && (dh + 60) < h) {
                d.css('margin-top', Math.round(0.96 * (h - dh) / 2));
            } else {
                d.css('margin-top', '');
            }
        });

    });
});
