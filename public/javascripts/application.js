// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(function() {
	
	function fixRightSizeDiv() { 
		$(".right-content .content").css("width", $(window).width()-$(".left-content").width() + "px") 
		$(".right-content .internship textarea").css("width",$(".internship").width()-37)
		$(".right-content .internship input").css("width", $(".internship").width()-180);
	}
	$(window).resize(fixRightSizeDiv);
	fixRightSizeDiv();
	
	var search_erase_btn = $("#txt-search .erase-btn");
	
	$("#query").keyup(function() {
		var v = $.trim($(this).val());
		if (v.length > 0)
			search_erase_btn.show();
		else
			search_erase_btn.hide();
	})
	
	if ($("#query").val() != "")
		search_erase_btn.show();
	
	search_erase_btn.click(function () {
		$("#query").val("");
		$(this).parents("form").submit();
		$(this).hide();
	})
	
	$("#remove-filter").click(function() {
		$("#txt-search .erase-btn").click();
	})
	
	$(".internship .edit").live("click", function(){
		var internship = $(this).parents(".internship");
		
		if ($(".internship[editing='true']").size() > 0) {
			var editing = $(".internship[editing='true']")
			removeInputs(editing);
		} 
		
		$(this).html("salvar")
		$(this).addClass("save")
		$(this).removeClass("edit")
		displayInputs(internship)
	})
	
	$(".internship .save").live("click", function() {
		$(this).html("editar")
		$(this).addClass("edit")
		$(this).removeClass("save")
		
		var internship = $(this).parents(".internship");

		updateOnServer(internship)		
		removeInputs(internship);
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
	
		$.each(desc.find("p"), function (e) {
			if (e > 0)
				desc_content += "\n"
			desc_content += $(this).html()
		})
		desc_input = $("<textarea name='internship[description]' class='description'/>")
		desc_input.html(desc_content)
		desc_input.css("width", internship.width()-37);
		desc_input.insertAfter(desc);
	}
	
	function removeInputs(internship) {
		internship.attr("editing", "false")

		// Update view
		internship.find("h1").html(internship.find("input.title").val())
		internship.find("input.title").remove();
		internship.find("h1").show();
		
		internship.find("div.description").html("");
		$.each(internship.find("textarea.description").val().split("\n"), function() {
			internship.find(".description").append("<p>"+this+"</p>");
		})
		
		internship.find("textarea.description").remove();
		internship.find(".description").show();
	}
	
	function updateOnServer(internship) {
		var params = "";
		
		var form = internship.find("form");
		$.post(form.attr("action"), form.serialize(), null)
		
		// $.ajax({
		// 			url: "internships/" + internship.find("input[name='id']").val(),
		// 			data: params,
		// 			type: "PUT",
		// 			success: function (d) {
		// 				
		// 			}})
	}
	
});
