(function($) {
    $.fn.spinline = function(action, options) {

        if (!document['intervals']) {
            document['intervals'] = {};
        }

        var returnValues = [];

        this.each(function() {
            var $blockToAppend = $(this),
                interval,
                $spinner,
                id,
                defaults = {
                    height: '2px',
                    color: '#ff0000',
                    initialWidth: '5%',
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
                _getRandom = function (min, max) {
                    return (Math.floor(Math.random() * (max - min + 1)) + min);
                },
                _removeInterval = function () {
                    clearInterval(document['intervals'][id]);
                    document['intervals'][id] = undefined;
                    interval = undefined;
                },
                _setVariables = function () {
                    $spinner = $blockToAppend.find('.' + selectors.spinlineBar);
                    if ($spinner.length === 0) {
                        id = selectors.spinlineBarId + _getRandom(1000, 9000);
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

                        $spinner.animate({'width': newWidth + '%'}, _getRandom(100, 600));
                        $blockToAppend.trigger('spinline:increased', {currentWidth: currentWidth, newWidth: newWidth});
                    }, settings.frequency);

                    document['intervals'][id] = interval;
                },
                _createSpinner = function () {
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

                    $blockToAppend
                        .css('position', 'relative')
                        .append($spinner);
                },
                remove = function () {
                    _setVariables();
                    if ($spinner) {
                        $spinner.remove();
                    }
                    $blockToAppend.trigger('spinline:removed');
                },
                start = function () {
                    _createSpinner();
                    _startMove();
                    $blockToAppend.trigger('spinline:started');
                },
                pause = function () {
                    _setVariables();
                    _removeInterval(interval);
                    $blockToAppend.trigger('spinline:paused', {
                        currentWidth: _getWidthInPercent($blockToAppend, $spinner)
                    });
                },
                proceed = function () {
                    _setVariables();
                    var eventData = {
                        currentWidth: _getWidthInPercent($blockToAppend, $spinner)
                    };
                    $blockToAppend.trigger('spinline:proceed', eventData);

                    if ($spinner) {
                        _startMove();
                        $blockToAppend.trigger('spinline:proceeded', eventData);
                    }
                },
                finish = function () {
                    _setVariables();
                    if (!$spinner) {return;}
                    _removeInterval();
                    $spinner.animate({width: '100%'}, 300, 'swing', function () {
                        $spinner.animate({opacity: '0'}, 300, 'swing', function () {
                            $(this).remove();
                            $blockToAppend.trigger('spinline:finished');
                        });
                    });
                },
                set = function (value) {
                    _setVariables();
                    if (!$spinner) {
                        console.error('No spinline on this container. First call "start" method');
                        return;
                    }
                    $spinner.animate({width: value}, 50);
                },
                get = function () {
                    _setVariables();
                    if (!$spinner) {
                        console.error('No spinline on this container. First call "start" method');
                        return null;
                    }
                    returnValues.push({
                        element: $blockToAppend,
                        width: _getWidthInPercent($spinner, $blockToAppend)
                    });
                }
                ;
            switch (action) {
                case 'start': start(); break;
                case 'pause': pause(); break;
                case 'proceed': proceed(); break;
                case 'finish': finish(); break;
                case 'remove': remove(); break;
                case 'set': set(options); break;
                case 'get': get(); break;
                default: console.warn('Method "' + action + '" is not implemented'); break;
            }
        });

        if (returnValues.length > 0) {
            return returnValues;
        }

        return this;
    };
}(jQuery));
