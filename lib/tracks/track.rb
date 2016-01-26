require 'mp3info'

module Tracks
  class Track
    attr_reader :filename, :artist, :title, :track, :bitrate, :samplerate, :length, :filename

    def initialize(filename)
      @filename = filename
      @info = {}

      Mp3Info.open("#{TRACKS_PATH}/#{filename}") do |mp3|
        @artist = mp3.tag.artist
        @title = mp3.tag.title
        @track = mp3.tag.tracknum.to_i

        @bitrate = "#{mp3.bitrate} kbps"
        @samplerate = mp3.samplerate

        @length = sprintf("%02d:%02d", mp3.length/60, mp3.length%60)
      end
    end

    def fullpath
      @filepath
    end

    def name
      "#{artist} - #{title}"
    end

    def to_s
      [name, length, bitrate, samplerate].join(' | ')
    end
  end
end