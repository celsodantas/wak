$(function () {
	$("#box-add-internship .btn-close").click(function () { 
		$("#box-add-internship").wakHide();
		$("#btn-new-internship").removeClass("pressed")	
	})

	$("#btn-new-internship").click(function () {		
		if (!$(this).hasClass("pressed")) {
			$(this).addClass("pressed")
			
			var title = $("#box-add-internship input.title");
			var area = $("#box-add-internship input.area");
			var desc = $("#box-add-internship textarea.description");
			
			title.val(title.attr("original"));
			area.val(area.attr("original"));
			desc.val(desc.attr("original"));
			
			$("#box-add-internship").wakShow();
			$("#box-add-internship").find("input[type='submit']").attr("disabled", "")
		} else {
			$(this).removeClass("pressed")
			$("#box-add-internship").wakHide();
		}
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
			
		if ($(this).val() != $(this).attr("original"))
			$(this).addClass("has_content")
		else
			$(this).removeClass("has_content")
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
		
		if (title.val() == title.attr("original")) {
			title.animate({ backgroundColor: "#ffd5d5", color : "black"}, 1500);
			return false; }
		if (area.val() == area.attr("original")) {
			return false; }
		if (desc.val() == desc.attr("original")) {
			return false; }
		
		return true;
	}
})