$(function () {
	$("#box-add-internship .btn-close").click(function () { 
		$("#btn-new-internship").click();
	})
	
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
});

//
// Global functions
//
function hideNewInternshipBox (after) {
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
