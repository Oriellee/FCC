$(function(){
	$(".btn").click(function(event) {
		var piece = $(this).text();
		console.log(piece);
		$("#popUps").css('display', 'none');
	});
})