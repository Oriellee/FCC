$(function() {
    var pieceA;
    var pieceB;
    var checkNum = [0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ]

    $(".btn").click(function(event) {
        var randomNum = random(0, $("#box tr td").length);
        pieceA = $(this).text();
        pieceB = $(this).siblings('button').text();
        $("#popUps").css('display', 'none');
        robot(pieceB);
    });

    $("#box tr td").click(function(event) {
        palyer($(this));
    });

    function random(min, max) {
        var num = Math.floor(Math.random() * (max - min)) + min;
        return num;
    }

    function palyer(value) {
        if (value.text() == "") {
            value.text(pieceA);
            var playerNum = $("#box tr td").index(value);
            checkNum[playerNum] = 1;
            check("player");
        }
    }

    function robot(pieceB) {
        var list = [];
        for (var i = 0; i < $("#box tr td").length; i++) {
            if ($("#box tr td").eq(i).text() == "") {
                list.push($("#box tr td").eq(i));
            }
        }
        var num = random(0, list.length);
        list[num].text(pieceB);
        var robotNum = $("#box tr td").index(list[num]);
        checkNum[robotNum] = -1;
        check("robot");
    }

    function check(value) {
        if (checkNum[0] + checkNum[1] + checkNum[2] == 3 ||
            checkNum[3] + checkNum[4] + checkNum[5] == 3 ||
            checkNum[6] + checkNum[7] + checkNum[8] == 3 ||
            checkNum[0] + checkNum[3] + checkNum[6] == 3 ||
            checkNum[1] + checkNum[4] + checkNum[7] == 3 ||
            checkNum[2] + checkNum[5] + checkNum[8] == 3 ||
            checkNum[0] + checkNum[4] + checkNum[8] == 3 ||
            checkNum[2] + checkNum[4] + checkNum[6] == 3) {
            last("你赢了！");
        } else if (
            checkNum[0] + checkNum[1] + checkNum[2] == -3 ||
            checkNum[3] + checkNum[4] + checkNum[5] == -3 ||
            checkNum[6] + checkNum[7] + checkNum[8] == -3 ||
            checkNum[0] + checkNum[3] + checkNum[6] == -3 ||
            checkNum[1] + checkNum[4] + checkNum[7] == -3 ||
            checkNum[2] + checkNum[5] + checkNum[8] == -3 ||
            checkNum[0] + checkNum[4] + checkNum[8] == -3 ||
            checkNum[2] + checkNum[4] + checkNum[6] == -3) {
            last("你输了!");
        } else if (checkNum.indexOf(0) < 0) {
            last("平局！");
        } else {
            last(value);
        }
    }

    function last(value) {
        if (value == "你赢了！") {
            alert("你赢了！");
            clear();
        } else if (value == "你输了!") {
            alert("你输了!");
            clear();
        } else if (value == "平局！") {
            alert("平局！");
            clear();
        } else if (value == "player") {
            robot(pieceB);
        } else if (value == "robot") {

        }
    }

    function clear() {
        for (var j = 0; j < checkNum.length; j++) {
            checkNum[j] = 0;
        }
        for (var z = 0; z < $("#box tr td").length; z++) {
            $("#box tr td").eq(z).text("");
        }
        $("#popUps").css('display', 'inline-block');
    }

})