class InternshipsController < ApplicationController
  
  # GET /internships
  # GET /internships.json
  def index
    #@internships = Internship.all(:conditions => {:blocked => false})
    if (params[:query])
      @internships = Internship.newer(params[:query])
    else
      @internships = Internship.order("updated_at DESC").all
    end
    
    respond_to do |format|
      format.html # index.html.erb
      format.json  { render :json => @internships }
    end
  end
  
  # GET /internships/list
  # renders _internships partial only
  def list
    @internships = Internship.newer("")
    
    respond_to do |format|
      format.html  {render :layout => false }       # index.html.erb
      format.json  { render :json => @internships }
    end
  end

  # GET /internships/1
  # GET /internships/1.json
  def show
    @internship = Internship.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
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

  # GET /internships/1/edit
  def edit
    @internship = Internship.find(params[:id])
  end

  # POST /internships
  # POST /internships.json
  def create
    @internship = Internship.new(params[:internship])
    @internship.description.strip!

    respond_to do |format|
      if @internship.save
        format.html { redirect_to :action => :list }
        #format.html { redirect_to(@internship, :notice => 'Internship was successfully created.') }
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
      if @internship.update_attributes(params[:internship])
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
