jQuery.fn.wakShow = function() {
	var self = $(this);
	
	self.css("opacity", 0)
	self.css("display", "block")

	var t = self.css("top");
	t = parseInt(t);
	
	self.css("top", t-10)

	self.animate({opacity: 1.00, top: t}, 1000)

	return this;
}

jQuery.fn.wakHide = function() {
	var self = $(this);
	var t = self.css("top");
	t = parseInt(t);
		
	self.animate({opacity: 0.00, top: t-10}, 1000, function () {
		self.css("display", "none")
		self.css("top", t)
	})
	
	return this;
}