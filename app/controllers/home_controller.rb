class HomeController < ApplicationController

  def index
    
    # @uploads = Upload.all
    @bodies = Upload.where(bodypart: 'body')
    @arms = Upload.where(bodypart: 'arms')
    @eyes = Upload.where(bodypart: 'eyes')
    @legs = Upload.where(bodypart: 'legs')
    @mouths = Upload.where(bodypart: 'mouth')

    @upload = Upload.new
  end

end
