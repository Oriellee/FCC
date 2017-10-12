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
            robot(pieceB);

        }
    }

    function robot(pieceB) {
        check();
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
        setTimeout(check, 10);

    }

    function check() {
        if (checkNum[0] + checkNum[1] + checkNum[2] == 3 ||
            checkNum[3] + checkNum[4] + checkNum[5] == 3 ||
            checkNum[6] + checkNum[7] + checkNum[8] == 3 ||
            checkNum[0] + checkNum[3] + checkNum[6] == 3 ||
            checkNum[1] + checkNum[4] + checkNum[7] == 3 ||
            checkNum[2] + checkNum[5] + checkNum[8] == 3 ||
            checkNum[0] + checkNum[4] + checkNum[8] == 3 ||
            checkNum[2] + checkNum[4] + checkNum[6] == 3) {
            alert("赢咯~");
            clear();
        } else if (
            checkNum[0] + checkNum[1] + checkNum[2] == -3 ||
            checkNum[3] + checkNum[4] + checkNum[5] == -3 ||
            checkNum[6] + checkNum[7] + checkNum[8] == -3 ||
            checkNum[0] + checkNum[3] + checkNum[6] == -3 ||
            checkNum[1] + checkNum[4] + checkNum[7] == -3 ||
            checkNum[2] + checkNum[5] + checkNum[8] == -3 ||
            checkNum[0] + checkNum[4] + checkNum[8] == -3 ||
            checkNum[2] + checkNum[4] + checkNum[6] == -3) {
            alert("你输啦！");
            clear();
        } else if (checkNum.indexOf(0) < 0) {
            alert("平局！");
            clear();
        } else {}
    }

    function clear() {

        for (var j = 0; j < checkNum.length; j++) {
            checkNum[j] = 0;
        }
        for (var z = 0; z < $("#box tr td").length; z++) {
            $("#box tr td").eq(z).text("");
        }
        $("#popUps").css('display', 'inline-block');
        console.log(checkNum);


    }

})