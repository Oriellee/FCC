$(function() {
    var pieceA;
    var pieceB;
    var randomNum = random(0, $("#box tr td").length);

    function random(min, max) {
        var num = Math.floor(Math.random() * (max - min)) + min;
        return num;
    }

    function robot(value) {
        value.siblings().text(pieceB);

    }
    $(".btn").click(function(event) {
        pieceA = $(this).text();
        pieceB = $(this).siblings('button').text();
        $("#popUps").css('display', 'none');
        $("#box tr td").eq(randomNum).text(pieceB);
    });

    $("#box tr td").click(function(event) {
        if ($(this).text() == "") {
            $(this).text(pieceA);
            robot($(this));
        }
    });

})