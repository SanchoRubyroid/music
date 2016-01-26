$(function () {
    var wavesurfer = Object.create(WaveSurfer);

    wavesurfer.init({
        container: '#waveform',
        waveColor: '#80deea',
        progressColor: '#00bcd4'
    });

    wavesurfer.on('ready', function () {
        $('#bottom-line .controls').show()
        $('#bottom-line .progress').hide()

        var timeline = Object.create(WaveSurfer.Timeline);

        timeline.init({
            wavesurfer: wavesurfer,
            container: "#wave-timeline",
            timeInterval: 15
        });

        if($('#autoplay').hasClass('true')) wavesurfer.play();
    });

    wavesurfer.on('play', function(){
        $('#playpause span').addClass('glyphicon-pause')
    })

    wavesurfer.on('pause', function(){
        $('#playpause span').removeClass('glyphicon-pause')
    })

    wavesurfer.on('loading', function(percent){
        $('#bottom-line .progress-bar').css('width', percent+'%')
    })

    wavesurfer.on('finish', function(){
        $('#step-forward').click()
    })

    $('#playpause').click(function(){
        wavesurfer.playPause();
        $('#autoplay').toggleClass('true')
    })

    $('#step-backward').click(function(){
        $('tr.track-container.current').prev().click()
    })

    $('#step-forward').click(function(){
        $('tr.track-container.current').next().click()
    })

    $('tr.track-container').click(function(){
        $('tr.track-container').removeClass('current')
        $(this).addClass('current')

        $('#bottom-line .controls').hide()
        $('#bottom-line .progress').show()
        $('#bottom-line .progress-bar').css('width', 0)

        wavesurfer.load('/files/' + $(this).attr('data-filename'));
        $('#current-track').text($(this).find('td:first').text())
        $('#playpause span').removeClass('glyphicon-pause')
    })

    $('button.download').click(function(e){
        e.stopPropagation();

        filename = $(this).attr('data-filename')
        if(filename == 'current')
            filename = $('tr.track-container.current').attr('data-filename')
        window.location.href = 'download?filename=' + filename
    })

    $('tr.track-container:first').click();
})

