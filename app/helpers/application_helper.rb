module ApplicationHelper
  
  def present(object, klass = nil)
    klass ||= "#{object.class}Presenter".constantize
    presenter = klass.new(object, self)
    yield presenter if block_given?
    presenter
  end
  
  def markdown(text)
    options = [:hard_wrap, :filter_html, :autolink, :no_intraemphasis, :xhtml]
    Redcarpet.new(text, *options).to_html.html_safe
  end
  
  def gravatar_url(comment)
    default_url = root_url + asset_path("default_avatar.png")
    gravatar_id = Digest::MD5.hexdigest(comment.email.downcase)
    "http://gravatar.com/avatar/#{gravatar_id}.png?s=40&d=#{CGI.escape(default_url)}"
  end
  
end
