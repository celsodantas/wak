$(function () {
	$("#box-add-internship .btn-close").click(function () { 
		$("#btn-new-internship").click();
	})
	
	function resetForm() {
		var title = $("#box-add-internship input.title");
		var area = $("#box-add-internship input.area");
		var desc = $("#box-add-internship textarea.description");
		
		title.val(title.attr("original"));
		area.val(area.attr("original"));
		desc.val(desc.attr("original"));

		title.removeClass("black-txt");
		area.removeClass("black-txt");
		desc.removeClass("black-txt");
		
		$("#errors").html("")
	}
	
	function setDisabled (e) { e.attr("disabled", "disabled") }
	function setEnabled (e)  { e.removeAttr("disabled") }
	
	function showNewInternshipBox(after) {
		var btn = $("#btn-new-internship");		
		var box = $("#box-add-internship");
		
		$(btn).addClass("pressed")
		resetForm();
		setDisabled(btn)
		
		box.wakShow(function () { 
			setEnabled(btn); 
			if (after) after() 
		});
		
		box.find("input[type='submit']").removeAttr("disabled")
	}
	
	function hideNewInternshipBox(after) {
		var btn = $("#btn-new-internship");
		var box = $("#box-add-internship");
		
		btn.removeClass("pressed");
		setDisabled(btn);
		
		box.wakHide(function () { 
			setEnabled(btn); 
			if (after) after();
		});
		
		box.find("input[type='submit']").attr("disabled", "disabled")
	}

	$("#btn-new-internship").click(function () {
		var box = $("#box-add-internship");

		if (box.is(":hidden"))
			showNewInternshipBox();
		else
			hideNewInternshipBox();
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
	
	var counter = "#box-add-internship .char-counter span"
	$("#box-add-internship textarea").simplyCountable({
			counter: counter,
			maxCount: 1500, strictMax: true})
	$(counter).html(1500)	// Fixing view, so it shows 800 
							// and not count with the example.

	$("#internship_create").live("submit", function () {
		var form = $(this);
		var ajax = form.find(".ajax-loader");
		var send_button = form.find("input[type=submit]");
		var success_msg	= form.find(".done");
		
		send_button.hide();
		ajax.show();
		
		if (valid()) {
			post($(this).attr("action"), 
		    	 $(this).serialize(), 
				 function (data) {
					addInternshipInView(data);
				
					ajax.hide();
					success_msg.show();
				
					hideNewInternshipBox(function() {
						success_msg.hide();
						send_button.show();
					});
				}, function (err) {
					var errors = $.parseJSON(err.responseText);
					for(var e in errors) {
						$("#errors").html(errors[e][0])
					}
					
					ajax.hide();
					send_button.show();
				});
			
		}
	    return false;
	})
	
	function post(url, data, onsucess, onerror) {
		$.ajax({type: 'POST', url: url, data: data, success: onsucess, error: onerror })
	}
	
	function addInternshipInView(internship) {
		var i = internship;
		scrollToTop(function() {
			internship = $(internship).css("display", "none");

			addOnTop(internship);
			$(internship).slideDown(1000);

			removeLast();
		});
	}
	
	function scrollToTop(exec_after) {
		$('html').animate({ scrollTop: 0 }, 1000, exec_after);
	}
	
	function addOnTop(internship) {
		$(".right-content .content article:first").before(internship);
	}
	
	function removeLast () {
		$(".right-content .content article:last").remove();
	}
	
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