class PlayerController < ApplicationController

  def index
    @tracks_manager = Tracks::Manager.new
  end

  def download
    send_file Tracks::Manager.send(params[:filename])
  end
end
