(function($) {
    $.fn.spinline = function(action, options) {

        if (!document['intervals']) {
            document['intervals'] = {};
        }

        this.each(function() {
            var $blockToAppend = $(this),
                interval,
                $spinner,
                id,
                defaults = {
                    height: '2px',
                    color: '#000',
                    initialWidth: '10%',
                    frequency: 500,
                    step: 3,
                    position: 'bottom'
                },
                settings = $.extend(true, {}, defaults, options);

            var selectors = {
                spinlineBar: 'spinline-bar',
                spinlineBarId: 'spinlineBar'
            };

            var _getWidthInPercent = function ($block, $parentBlock) {
                    return 100 / parseFloat($parentBlock.css('width')) * parseFloat($block.css('width'));
                },
                _removeInterval = function () {
                    clearInterval(document['intervals'][id]);
                    document['intervals'][id] = undefined;
                    interval = undefined;
                },
                _setVariables = function () {
                    $spinner = $blockToAppend.find('.' + selectors.spinlineBar);
                    if ($spinner.length === 0) {
                        id = selectors.spinlineBarId + (Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000);
                        $spinner = undefined;
                    } else {
                        id = $spinner.attr('id');
                        interval = document['intervals'][id];
                    }
                },
                _startMove = function () {
                    if (interval) {return;}

                    interval = setInterval(function () {
                        var currentWidth = _getWidthInPercent($spinner, $blockToAppend);

                        var newWidth = currentWidth + settings.step;

                        if (newWidth > 99) {
                            _removeInterval();
                            return;
                        }

                        $spinner.animate({'width': newWidth + '%'}, 300);

                    }, settings.frequency);

                    document['intervals'][id] = interval;
                },
                remove = function () {
                    _setVariables();
                    if ($spinner) {
                        $spinner.remove();
                    }
                },
                start = function () {
                    _setVariables();
                    if (!$spinner) {
                        $spinner = $('<div />')
                            .attr('id', id)
                            .css({
                                background: settings.color,
                                height: settings.height,
                                position: 'absolute',
                                left: 0,
                                width: 0,
                                boxShadow: "2px 0 20px " + settings.color
                            })
                            .addClass(selectors.spinlineBar);
                        $spinner.css(settings.position, 0);
                    }
                    $spinner.animate({width: settings.initialWidth}, 200);

                    $blockToAppend
                        .css('position', 'relative')
                        .append($spinner);

                    _startMove();
                },
                pause = function () {
                    _setVariables();
                    _removeInterval(interval);
                },
                proceed = function () {
                    _setVariables();

                    if ($spinner) {
                        _startMove();
                    }
                },
                finish = function () {
                    _setVariables();
                    if (!$spinner) {return;}
                    _removeInterval();
                    $spinner.animate({'width': '100%'}, 300, 'swing', function () {
                        $spinner.animate({'opacity': '0'}, 300, 'swing', function () {
                            $(this).remove();
                        });
                    });
                };

            switch (action) {
                case 'start': start(); break;
                case 'pause': pause(); break;
                case 'proceed': proceed(); break;
                case 'finish': finish(); break;
                case 'remove': remove(); break;
                default: start(); break;
            }
        });

        return this;
    };
}(jQuery));
