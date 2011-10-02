$(".internship .edit").live("click", function(){
	var internship = $(this).parents(".internship");
	
	if ($(".internship[editing='true']").size() > 0) {
		var editing = $(".internship[editing='true']")
		removeInputs(editing);
	} 
	
	$(this).hide();
	displayInputs(internship)
})

$(".internship .save").live("click", function(){
	$(this).parents("form").submit();
})

function displayInputs(internship) {
	internship.attr("editing", "true")

	// h1
	var h1 = internship.find("h1");
	h1.hide();

	var h1_input = $("<input name='internship[title]' class='title'/>").insertAfter(h1);
	h1_input.css("width", internship.width()-180)
	h1_input.val(h1.html())
	
	// description
	var desc = internship.find(".description")
	desc.hide();
	
	desc_content = "";
	$.each(desc.find("p"), function (index) {
		//if (index > 0)
			
		desc_content += $(this).html()
		desc_content += "\n\n"
	})
	desc_content = $.trim(desc_content)
	desc_content = desc_content.replace(/<br>/g, "");
	
	desc_input = $("<textarea name='internship[description]' class='description'/>")
	desc_input.html(desc_content)
	desc_input.css("width", internship.width()-37);
	desc_input.insertAfter(desc);
	
	internship.find(".save").show();
}