$(function() {
    var game = {
            level: 0,
            colorArr: ["#green", "#red", "#yellow", "#blue"],
            currentGame: [],
            player: [],
        },
        moves,
        stops,
        timer,
        strict = false;
        // 定义初始值
    $("#powerbutton").click(function(event) {
        if ($(this).children('span').css('float') == 'left') {
            $(this).children('span').css('float', 'right');
            open();
        } else {
            $(this).children('span').css('float', 'left');
            close();
        }
    });
    // 开关键
    $("#start>button,#strict>button:nth-child(2)")
        .mousedown(function(event) {
            $(this).css('box-shadow', 'none');
        }).mouseup(function(event) {
            $(this).css('box-shadow', '0px 1px 2px 1px #32050C');
        });
        // 按钮点击阴影效果
    $("#start>button").click(function(event) {
        setTimeout(flash, 50);
        setTimeout(newGame, 1000);
        $("#buttonGroup button").attr('disabled', "true");
    });
    // 开始键
    $("#strict>button:nth-child(2)").click(function(event) {
        if (strict == false) {
            $("#strict>span").css('background-color', 'red');
            strict = true;
        } else {
            $("#strict>span").css('background-color', '#32050C');
            strict = false;
        }
    });
    // 开始严格模式
    function newGame() {
        clearGame();
    }
    // 开始程序
    function clearGame() {
        game.currentGame = [];
        game.level = 0;
        addCount();
    }
    // 首先清空原有的操作。
    function addCount() {
        $("#green,#red,#yellow,#blue").attr('disabled', 'true');
        game.level++;
        $("#count>div").text(game.level);
        generateMove();
    }
    // 关数+1，且显示出来。
    function generateMove() {
        game.currentGame.push(game.colorArr[random(0, 4)]);
        showMoves();
    }
    // 选择一个随机的颜色添加到队列中，并继续运行。
    function showMoves() {
        $("#green,#red,#yellow,#blue").attr('disabled', 'true');
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
        setTimeout(wait, 800 * game.level);
    }
    // 使队列中的色块按照顺序闪烁一次。
    function wait() {
        var z = 0;
        timer = setInterval(function() {
            z++;
            if (z > 6) {
                check();
                clearInterval(timer);
            }
        }, 1000);
    }
    // 延时等待6秒后调用check函数。
    $("#green,#red,#yellow,#blue").click(function(event) {
        clearInterval(timer);
        $(this).fadeOut(50).fadeIn(50);
        addToPlayer($(this).attr("id"));
    });
    // 点击色块效果。
    function addToPlayer(id) {
        game.player.push("#" + id);
        check();
    }
    // 将所点击的色块加入到玩家队列中。
    function check() {
        if (game.player.length < 1) {
            if (strict == false) {
                setTimeout(function() {
                    $("#count>div").text("! !");
                }, 200);
                setTimeout(flash, 600);
                setTimeout(function() {
                    $("#count>div").text(game.level);
                }, 1600);
                setTimeout(showMoves, 1700);
            } else {
                newGame();
            }

        }
        // 如果6秒内无操作，且非严格模式下，程序闪烁重新一次。
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

    function random(min, max) {
        var randomNum = Math.floor(Math.random() * (max - min)) + min;
        return randomNum;
    }
    // 生成一个随机数。
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
    // 闪烁效果。
    function open() {
        $("#count div").eq(0).text('- -');
        $("#buttonGroup button").removeAttr("disabled");
    }
    // 开启效果。
    function close() {
        strict = false;
        $("#strict>span").css('background-color', '#32050C');
        clearInterval(moves, timer);
        var biggestTimeoutId = window.setTimeout(function() {}, 1),
            i;
        for (i = 1; i <= biggestTimeoutId; i++) {
            clearTimeout(i);
        }
        $("#count div").eq(0).text('');
        $("#buttonGroup button").attr('disabled', "true");
        $("#green,#red,#yellow,#blue").attr('disabled', 'true');
    }
    // 关闭程序效果。
})