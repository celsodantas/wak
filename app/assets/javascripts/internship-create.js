$(function () {
	$("#box-add-internship .btn-close").click(function () { 
		$("#btn-new-internship").click();
	})
	
	$("#btn-new-internship").click(function () {
		var box = $("#box-add-internship");

		if (box.is(":hidden"))	showNewInternshipBox();
		else					hideNewInternshipBox();
	})
	
	$("#box-add-internship form").submit(function () {
		$(this).find(".btn-add").hide();
		$(this).find(".ajax-loader").show();
	})
	
	var counter = "#box-add-internship .char-counter span"
	$("#box-add-internship textarea").simplyCountable({	counter: counter, maxCount: 1500, strictMax: true})
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
	var box = $("#box-add-internship")
	var area = box.find("input.area");
	var desc = box.find("textarea.description");
	
	title.val("");
	area.val("");
	desc.val("");

	var counter = "#box-add-internship .char-counter span"
	$(counter).html(1500)

	$("#errors").html("");
	box.find(".done").hide();
	box.find(".ajax-loader").hide();
	box.find("input[type=submit]").show();
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
