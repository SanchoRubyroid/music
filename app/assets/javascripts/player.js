$(function () {
    var wavesurfer = Object.create(WaveSurfer);

    wavesurfer.init({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple'
    });

    wavesurfer.on('ready', function () {
        var timeline = Object.create(WaveSurfer.Timeline);

        timeline.init({
            wavesurfer: wavesurfer,
            container: "#wave-timeline",
            timeInterval: 15
        });
    });

    $('#playpause').click(function(){
        wavesurfer.playPause();
        $(this).find('span').toggleClass('glyphicon-pause')
    })

    $('tr.track-container').click(function(){
        wavesurfer.load('/files/' + $(this).attr('data-filename'));
        $('#current-track').text($(this).find('td:first').text())
        $('#playpause span').removeClass('glyphicon-pause')
    })

    $('tr.track-container:first').click();
})

