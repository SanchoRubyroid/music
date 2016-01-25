module Tracks
  TRACKS_PATH = File.join(Rails.root, 'public/files')

  class Manager
    def initialize
      @tracks = []

      Dir.foreach(TRACKS_PATH) do |filename|
        @tracks << Tracks::Track.new(filename) if filename[/\.mp3/]
      end
    end

    def each_track
      @tracks.each do |track|
        yield track
      end
    end
  end
end