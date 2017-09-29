$(function() {
    function random(min, max) {
        var num = Math.floor(Math.random() * (max - min)) + min;
        return num;
    }

    var pieceA;
    var pieceB;
    var randomNum = random(0, $("#box tr td").length);

    $(".btn").click(function(event) {
        pieceA = $(this).text();
        pieceB = $(this).siblings('button').text();
        $("#popUps").css('display', 'none');
        $("#box tr td").eq(randomNum).text(pieceA);
    });

    $("#box tr td").click(function(event) {
    	if($(this).text() == ""){
    		$(this).text(pieceB);
    	}
    });

})