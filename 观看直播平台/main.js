$(function(){
	function move(value){
		value
		.find("p")
		.css('display', 'inline')
		.end()
		.siblings('.noActive')
		.find("p")
		.css('display', 'none');

		value.animate({
			"left":"0px",
			"width":"80px"},400)
		.siblings('.noActive')
		.animate({
			"left":"60px",
			"width":"20px"
			},400);
		
	}

	$(".all,.online,.offline").click(function(event) {
		move($(this));
		$(this)
		.addClass('active')
		.removeClass('noActive')
		.siblings()
		.removeClass('active')
		.addClass('noActive');

	});
		$(".noActive").hover(function(event) {
		move($(this));
	});
	$(".all").click(function(event) {
		$(".on,.off").css('display', 'inline-block');
	});
	$(".online").click(function(event) {
		$(".on").css('display', 'inline-block');
		$(".off").css('display', 'none');
	});
	$(".offline").click(function(event) {
		$(".on").css('display', 'none');
		$(".off").css('display', 'inline-block');
	});
})