class InternshipsController < ApplicationController
  before_filter :generate_cookie_hash
  before_filter :is_owner, :only => :update
  
  def generate_cookie_hash
    cookies[:hash] = SecureRandom.urlsafe_base64 if cookies[:hash] == nil
  end
  
  def is_owner
    internship = Internship.find(params[:id])
    if cookies[:hash] == internship.owner_hash
      true
    else
      false
    end
  end
  
  # GET /internships
  # GET /internships.json
  def index
    @internships = Internship.newer(params).paginate(:page => params[:page], :per_page => 10)
    
    respond_to do |format|
      format.html # index.html.erb
      format.json  { render :json => @internships }
    end
  end

  # GET /internships/1
  # GET /internships/1.json
  def show
    @internship = Internship.find(params[:id])

    respond_to do |format|
      format.html  {render :layout => false}         # show.html.erb
      format.json  { render :json => @internship }
    end
  end

  # GET /internships/new
  # GET /internships/new.xml
  def new
    @internship = Internship.new

    respond_to do |format|
      format.html # new.html.erb
      format.json  { render :json => @internship }
    end
  end

  # POST /internships
  # POST /internships.json
  def create
    @internship = Internship.new(params[:internship])
    @internship.description.strip!
    @internship.owner_hash = cookies[:hash]
    
    fields = params[:fields].split(",")
    fields.each do |desc|
      @internship.fields << Field.new(:description => desc.strip)
    end

    respond_to do |format|
      if @internship.save
        #format.html { redirect_to :action => :list } # now using default
        format.html { redirect_to(@internship) }
        format.json  { render :json => @internship, :status => :created, :location => @internship }
      else
        format.html { render :action => "new" }
        format.json  { render :json => @internship.errors, :status => :unprocessable_entity }
      end
    end 
  end

  # PUT /internships/1
  # PUT /internships/1.json
  def update
    params[:internship][:field_ids] ||= []
    @internship = Internship.find(params[:id])
    
    respond_to do |format|
      if @internship.owner_hash == cookies[:hash] and
        @internship.update_attributes(params[:internship])
        format.html { redirect_to(@internship, :notice => 'Internship was successfully updated.') }
        format.json  { head :ok }
      else
        format.html { render :action => "edit" }
        format.json  { render :json => @internship.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /internships/1
  # DELETE /internships/1.json
  def destroy
    @internship = Internship.find(params[:id])
    @internship.destroy

    respond_to do |format|
      format.html { redirect_to(internships_url) }
      format.json  { head :ok }
    end
  end
  
  def blocked
    @internships = Internship.all(:conditions => {:blocked => true})

    respond_to do |format|
      format.html # index.html.erb
      format.json  { render :json => @internships }
    end
  end
  
  def unblock
    @internship = Internship.find(params[:id])
    @internship.blocked = false
    @internship.save!
    
    respond_to do |format|
      format.html { redirect_to(internships_url) }
      format.json  { head :ok }
    end
  end
end
