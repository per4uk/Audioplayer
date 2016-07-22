$( document ).ready( function() {

    var song;

    initAudio( $('.playlist li:first-child') );

    song.volume = 0.8;

    var time = $('.time');
    var volume = $('.volume');

    volume.slider({
        range: 'min',
        min: 1,
        max: 100,
        value: 80,
        start: function ( event, ui ) {},
        slide: function ( event, ui ) {

            song.volume = ui.value / 100;

        },
        stop: function ( event, ui ) {}
    });

    time.slider({
        range: 'min',
        min: 0, max: 10,
        start: function ( event, ui ) {},
        slide: function ( event, ui ) {

            song.currentTime = ui.value;

        },
        stop: function ( event, ui ) {}
    });

    function initAudio ( elem ) {

        var url = elem.attr('src');
        var title = elem.attr('song');
        var artist = elem.attr('artist');

        $('#audioplayer .song').text( title );
        $('#audioplayer .artist').text( artist );

        song = new Audio( 'data/' + url );
        song.volume = volume ? volume.slider( "option", "value" ) / 100 : 0.8;

        song.ontimeupdate = function () {

            var curtime = parseInt( song.currentTime, 10 );
            time.slider( 'value', curtime );

        };

        song.onended = function () {

            var next = $('.playlist li.active').next();
            if ( next.length == 0 ) {

                next = $('.playlist li:first-child');

            }
            initAudio( next );

        };

        song.onloadeddata = function () {

            playAudio();

        };

        $('.playlist li').removeClass( 'active' );
        elem.addClass( 'active' );

    };

    function playAudio () {

        song.play();

        time.slider( "option", "max", song.duration );

        $('.play').addClass( 'hidden' );
        $('.stop').addClass( 'visible' );

    };

    function stopAudio () {

        song.pause();

        $('.play').removeClass( 'hidden' );
        $('.stop').removeClass( 'visible' );

    };

    $('.play').click( function ( e ) {

        e.preventDefault();

        playAudio();

    });

    $('.stop').click( function ( e ) {

        e.preventDefault();

        stopAudio();

    });
 
    $('.next').click( function ( e ) {

        e.preventDefault();

        stopAudio();

        var next = $('.playlist li.active').next();
        if ( next.length == 0 ) {

            next = $('.playlist li:first-child');

        }
        initAudio( next );

    });

    $('.prev').click( function ( e ) {
        e.preventDefault();

        stopAudio();

        var prev = $('.playlist li.active').prev();
        if ( prev.length == 0 ) {

            prev = $('.playlist li:last-child');

        }
        initAudio( prev );

    });

    $('.playlist li').click( function () {

        stopAudio();
        initAudio( $(this) );

    });

});