$(function () {
    $('.js-spinline-start').click(function () {
        $('.some-block').spinline('start', {
            color: '#ff0000',
            position: 'top'
        });
    });
    $('.js-spinline-start-bottom').click(function () {
        $('.some-block').spinline('start', {
            color: '#ff0000',
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
});
