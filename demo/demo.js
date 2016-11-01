$(function () {
    var $well = $('.well');

    $('.js-spinline-start').click(function () {
        $('.some-block').spinline('start', {
            color: '#ff0000',
            position: 'top'
        });
    });
    $('.js-spinline-start-bottom').click(function () {
        $('.some-block').spinline('start', {
            color: '#ff00ff',
            position: 'bottom'
        });
    });
    $('.js-spinline-pause').click(function () {
        $('.some-block').spinline('pause');
    });
    $('.js-spinline-proceed').click(function () {
        $('.some-block').spinline('proceed');
    });
    $('.js-spinline-finish').click(function () {
        $('.some-block').spinline('finish');
    });
    $('.js-spinline-remove').click(function () {
        $('.some-block').spinline('remove');
    });
    $('.js-spinline-finish-second').click(function () {
        $('#second-block').spinline('finish');
    });
    $('.js-spinline-random').click(function () {
        $('.some-block').spinline('set', (Math.floor(Math.random() * (99 - 3 + 1)) + 3) + '%');
    });
    $('.js-spinline-get-first').click(function () {
        var data = $('#first-block').spinline('get')[0];
        $well.append('First spinner value: ' + Math.round(data.width).toString() + '<br />');
    });
    $('.js-spinline-get-second').click(function () {
        var data = $('#second-block').spinline('get')[0];
        $well.append('Second spinner value: ' + Math.round(data.width).toString() + '<br />');
    });
});
