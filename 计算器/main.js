$(function(){
	$("#box table tr td").click(function(event) {
		var num = $(this).text();
		if($.isNumeric(num)){
			$("#show").text(num);
		}else{}
		
	});
})