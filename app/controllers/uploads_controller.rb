class UploadsController < ApplicationController

  before_action :set_upload, only: [:show, :edit, :update, :remove_image]
 
  def index
    @uploads = Upload.order('created_at DESC')
  end
 
  def show
    
  end

  def destroy
    @upload = Upload.find(params[:id])
    if @upload.destroy
      redirect_to '/uploads'
    end
  end
 
  def new
    @uploads = Upload.new

  end
 
  def create
    @upload = Upload.new(upload_params)
    if @upload.save
      redirect_to '/'
    else
      render :new
    end


  end
 
  def edit
    
  end
  
 
  private
 
  def upload_params
    params.require(:upload).permit(:image, :bodypart)
  end
 
  def set_upload
    @upload = Upload.find(params[:id])
  end

end