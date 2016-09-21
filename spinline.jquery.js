(function($) {
    $.fn.spinline = function(action) {

        this.each(function() {
            var $blockToAppend = $(this);

            $blockToAppend
                .css('position', 'relative')
                .append(
                    $('<div />')
                        .css({
                            background: '#000',
                            height: '3px',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '80%'
                        })
                        .addClass('spinline-bar')
                );
        });

        return this;
    };
}(jQuery));
