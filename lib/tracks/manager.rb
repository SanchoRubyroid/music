module Tracks
  TRACKS_PATH = File.join(Rails.root, 'public/files')

  class Manager
    def self.send(filename)
      File.join(TRACKS_PATH, filename)
    end

    def initialize
      @tracks = []

      Dir.foreach(TRACKS_PATH) do |filename|
        @tracks << Tracks::Track.new(filename) if filename[/\.mp3/]
      end

      @tracks.sort! {|a, b| "#{a.track}#{a.title}" <=> "#{b.track}#{b.title}"}
    end

    def each_track
      @tracks.each do |track|
        yield track
      end
    end
  end
end