$(function(){
	function move(value){
		value
		.find("p")
		.css('display', 'inline')
		.end()
		.siblings()
		.find("p")
		.css('display', 'none');

		value.animate({
			"left":"0px",
			"width":"80px"},400)
		.siblings()
		.animate({
			"left":"60px",
			"width":"20px"
			},400);
		
	}
	$(".all,.online,.offline").hover(function(event) {
		move($(this));
	});
	$(".all").click(function(event) {
		$(".on,.off").css('display', 'inline-block');
		move($(this));
	});
	$(".online").click(function(event) {
		$(".on").css('display', 'inline-block');
		$(".off").css('display', 'none');
		move($(this));
	});
	$(".offline").click(function(event) {
		$(".on").css('display', 'none');
		$(".off").css('display', 'inline-block');
		move($(this));
	});
})