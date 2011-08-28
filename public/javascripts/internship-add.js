$(function () {
	$("#box-add-internship .btn-close").click(function () { 
		$("#box-add-internship").wakHide();
		$("#btn-new-internship").removeClass("pressed")	
	})

	$("#btn-new-internship").toggle(function () {
		var self = $(this);		

		$(this).addClass("pressed")
		
		var title = $("#box-add-internship input.title");
		var area = $("#box-add-internship input.area");
		var desc = $("#box-add-internship textarea.description");
		
		title.val(title.attr("original"));
		area.val(area.attr("original"));
		desc.val(desc.attr("original"));
		
		
		self.attr("disabled", "disabled")
		$("#box-add-internship").wakShow(function () {self.attr("disabled", "");});
		$("#box-add-internship").find("input[type='submit']").attr("disabled", "")
	}, function () {
		var self = $(this);	
		self.removeClass("pressed")
		
		self.attr("disabled", "disabled")
		$("#box-add-internship").wakHide(function () {self.attr("disabled", "");});
	})

	$.each($("#box-add-internship .input"), function () {
		$(this).attr("original", $(this).val())
	})

	$("#box-add-internship .input").live("focus", function () {
		$(this).addClass("has_focus")
		$(this).css("background-color", "white")
	
		if ($(this).val() == $(this).attr("original"))
			$(this).val("")
	})

	$("#box-add-internship .input").live("blur", function () {
		$(this).removeClass("has_focus")
	
		if ($(this).val() == "")
			$(this).val($(this).attr("original"))
			
		if ($(this).val() == $(this).attr("original")) {
			$(this).removeClass("has_content")
			$(this).removeClass("black-txt")
			$(this).css("color", "")		// fixing animate
			$(this).css("background-color", "")
		} else {
			$(this).addClass("has_content")
			$(this).addClass("black-txt")
		}
	})

	$("#internship_create").live("submit", function () {
		if (valid()) {
			$.post($(this).attr("action"), 
				   $(this).serialize(), 
					function (data) { $(".right-content .content").html(data)			}
				   ,'script');
	
			$("#box-add-internship").wakHide();
			$("#btn-new-internship").removeClass("pressed")
			$("#box-add-internship").find("input[type='submit']").attr("disabled", "disabled")
		}
	    return false;
	})
	
	var $form_error = "";
	function valid() {
		var title = $("#box-add-internship input.title");
		var area = $("#box-add-internship input.area");
		var desc = $("#box-add-internship textarea.description");
		
		var v = true;
		
		if (title.val() == title.attr("original")) {
			title.animate({ backgroundColor: "#ffd5d5", color : "black"}, 1500);
			v = false;}
		if (area.val() == area.attr("original")) {
			area.animate({ backgroundColor: "#ffd5d5", color : "black"}, 1500);
			v = false; }
		if (desc.val() == desc.attr("original")) {
			desc.animate({ backgroundColor: "#ffd5d5", color : "black"}, 1500);
			v = false; }
		
		return v;
	}
})