$(function() {
    var greenTimer = null;
    var status = "wait";
    var runColor = true;
    //定义初始变量。
    var timeHeight = $("#time").css("height");
    // 获取当前div色块的高度。
    function add(num) {
        var numText = num.text();
        if (numText > 24) {
            numText = 25;
            alert("超过最大时长！");
        } else {
            numText++;
        }
        num.text(numText);
    }
    // +号按钮函数
    function less(num) {
        var numText = num.text();
        if (numText < 2) {
            numText = 1;
            alert("超过最小时长！");
        } else {
            numText--;
        }
        num.text(numText);
    }
    // -号按钮的函数
    function powerSwitch() {
        if (runColor == true) {
            $("#sessionAdd,#sessionLess").click(function(event) {
                $("#timeNum").text($("#sessionText").text());
            });
        } else {
            $("#breakAdd,#breakLess").click(function(event) {
                $("#timeNum").text($("#breakText").text());
            });

        }
    }
    // 根据颜色判断当前状态后，使时间文字根据所判断的状态按钮改变。
    function changeSwitch() {
        if (runColor == true) {
            $("#sessionAdd,#sessionLess").removeAttr("disabled");
        } else if (runColor == false) {
            $("#breakAdd,#breakLess").removeAttr("disabled");
        }
    }
    // 取消按钮禁用
    function run() {
        if ($("#timeNum").text().length < 3) {
            var sum = (($("#timeNum").text()) * 60) - 1;
        } else {
            var oldsum = $("#timeNum").text();
            var a = Number((oldsum[0]) * 60);
            var b = Number((oldsum[2]) * 10);
            var c = Number(oldsum[3]);
            var sum = parseInt(a + b + c, 10);
        }
        $("#timeNum").text(Math.floor(sum / 60) + ":" + (sum % 60));
        var topNum = $("#timeBack").css('top').replace("px", "");
        var speed = topNum / sum;
        greenTimer = setInterval(function() {
            console.log($("#timeBack").css('top'));
            sum--;
            topNum -= speed;
            var minute = Math.floor(sum / 60);
            var second = (sum % 60);
            if (second < 10) {
                second = "0" + second;
            }
            $("#timeNum").text(minute + ":" + second);
            $("#timeBack").css('top', Math.round(topNum-speed) + "px");
            if (minute == 0 && second == 00) {
                clearInterval(greenTimer);
                if (runColor == true) {
                    halt();
                } else if (runColor == false) {
                    initial();
                }
            }
        }, 1000);
    }
    // 运行函数
    $(".add").click(function(event) {
        add($(this).siblings("span"));
    });
    $(".less").click(function(event) {
        less($(this).siblings("span"));
    });
    // 点击-、+号按钮更改休息或者工作时长。
    function pause() {
        $("#time").click(function(event) {
            if (status == "wait") {
                $(".add,.less").attr('disabled', "true");
                run();
                status = "working";
            } else if (status == "working") {
                clearInterval(greenTimer);
                changeSwitch();
                powerSwitch();
                status = "wait";
            }
        });
    }
    // 判断程序是否在运行中。且随着程序的运行更改状态。
    function halt() {
        runColor = false;
        $("#timeBack").css('top', timeHeight);
        $("#timeBack").css('background-color', 'rgb(255, 68, 68)');
        $("#timeText").text('Break!');
        $("#timeNum").text($("#breakText").text());

        run();
    }
    // 休息时间的函数。
    function initial() {
        $("#timeBack").css({
            "top":timeHeight,
            "background-color": "#99CC00"
        }, "1");
        $("#timeText").text('Session');
        $("#timeNum").text($("#sessionText").text());
        runColor = true;
        status = "wait";
        $(".add,.less").removeAttr("disabled");
    }
    // 暂停运行。
    pause();
    powerSwitch();

})