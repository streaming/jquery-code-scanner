(function ($) {
    $.fn.codeScanner = function (options) {
        var settings = $.extend({}, $.fn.codeScanner.defaults, options);

        return this.each(function () {
            var pressed = false;
            var chars = [];
            var $input = $(this);

            $(window).keypress(function (e) {
                var keycode = (e.which) ? e.which : e.keyCode;
                if (((keycode >= 65 && keycode <= 90) ||
                    (keycode >= 97 && keycode <= 122) ||
                    (keycode >= 48 && keycode <= 57)) &&
                    settings.ignoreKeyCodeList.indexOf(keycode) === -1
                ) {
                    chars.push(String.fromCharCode(e.which));
                }

                if (pressed == false) {
                    setTimeout(function () {
                        if (chars.length >= settings.minEntryChars) {
                            var barcode = chars.join('');
                            settings.onScan($input, barcode);
                        }
                        chars = [];
                        pressed = false;
                    }, settings.maxEntryTime);
                }
                pressed = true;
            });

            $(this).keypress(function (e) {
                if (settings.ignoreKeyCodeList.indexOf(e.which) > -1) {
                    e.preventDefault();
                }
            });

            return $(this);
        });
    };

    $.fn.codeScanner.defaults = {
        minEntryChars: 8,
        maxEntryTime: 500,
        ignoreKeyCodeList: [13],
        onScan: function ($element, barcode) {
            $element.val(barcode);
        }
    };
})(jQuery);
