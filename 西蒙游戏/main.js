$(function() {
    var game = {
        level: 0,
        colorArr: ["#green", "#red", "#yellow", "#blue"],
        currentGame: [],
        player: [],
    }
    var moves,
        stops;
    var buttonClick = false;

    function newGame() {
        clearGame();
    }

    function clearGame() {
        game.currentGame = [];
        game.level = 0;
        addCount();
    }

    function addCount() {
        buttonClick = false;

        $("#green,#red,#yellow,#blue").attr('disabled', 'true');
        game.level++;
        $("#count>div").text(game.level);
        generateMove();
    }

    function generateMove() {
        game.currentGame.push(game.colorArr[random(0, 4)]);
        showMoves();
    }

    function showMoves() {
        game.player = [];
        var i = 0;
        moves = setInterval(function() {
            stops = setTimeout(function() {
                $("#green,#red,#yellow,#blue").removeAttr("disabled");
            }, 800 * game.level);
            $(game.currentGame[i]).fadeOut(150).fadeIn(150);
            i++;
            if (i >= game.currentGame.length) {
                clearInterval(moves);
            }
        }, 800);
        console.log(buttonClick);
        setTimeout(wait, 800 * game.level);
    }

    function wait() {
        var z = 0;
        var timer = setInterval(function() {
            z++;
            console.log(z);
            if (z > 3) {
                check();
                clearInterval(timer);
            }
        }, 1000);
    }
    $("#green,#red,#yellow,#blue").click(function(event) {
        buttonClick = true;
        $(this).fadeOut(50).fadeIn(50);
        addToPlayer($(this).attr("id"));

    });

    function addToPlayer(id) {
        game.player.push("#" + id);
        check();
        console.log(game.player.length);

    }

    function check() {
        if (game.player.length < 1) {
            setTimeout(function() {
                $("#count>div").text("! !");
            }, 200);
            setTimeout(flash, 600);
            setTimeout(function() {
                $("#count>div").text(game.level);
            }, 1600);
            setTimeout(showMoves, 1700);
        }
        if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {
            alert("走错啦！请重头再来吧！");
            newGame();
        } else {
            if (game.player.length === game.currentGame.length) {
                if (game.level === 20) {
                    alert("通关啦！");
                } else {
                    addCount();
                }
            }
        }
    }
    $("#powerbutton").click(function(event) {
        if ($(this).children('span').css('float') == 'left') {
            $(this).children('span').css('float', 'right');
            open();
        } else {
            $(this).children('span').css('float', 'left');
            close();
        }
    });
    $("#start>button,#strict>button:nth-child(2)")
        .mousedown(function(event) {
            $(this).css('box-shadow', 'none');
        }).mouseup(function(event) {
            $(this).css('box-shadow', '0px 1px 2px 1px #32050C');
        });
    $("#start>button").click(function(event) {
        setTimeout(flash, 50);
        setTimeout(newGame, 1000);
    });

    function random(min, max) {
        var randomNum = Math.floor(Math.random() * (max - min)) + min;
        return randomNum;
    }

    function flash() {
        setTimeout(function() {
            $("#count>div").css('color', '#32050C');
        }, 200);
        setTimeout(function() {
            $("#count>div").css('color', 'red');
        }, 400);
        setTimeout(function() {
            $("#count>div").css('color', '#32050C');
        }, 600);
        setTimeout(function() {
            $("#count>div").css('color', 'red');
        }, 800);
    }

    function open() {
        $("#count div").eq(0).text('- -');
        $("#buttonGroup button").removeAttr("disabled");
    }

    function close() {
        $("#count div").eq(0).text('');
        $("#buttonGroup button").attr('disabled', "true");
        clearInterval(moves);
        clearTimeout(stops);
        $("#green,#red,#yellow,#blue").attr('disabled', 'true');
    }
})