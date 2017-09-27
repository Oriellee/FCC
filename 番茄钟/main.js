$(function() {
    var greenTimer = null;
    var status = "wait";
    var runColor = true;

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
            sum--;
            topNum -= speed;
            var minute = Math.floor(sum / 60);
            var second = (sum % 60);
            if (second < 10) {
                second = "0" + second;
            }
            $("#timeNum").text(minute + ":" + second);
            $("#timeBack").css('top', Math.round(topNum) + "px");
            console.log(runColor);
            if (minute == 0 && second == 00) {
                clearInterval(greenTimer);
                if (runColor == true) {
                    halt();
                } else if (runColor == false) {
                    initial();
                }
            }
        }, 50);
    }

    $(".add").click(function(event) {
        add($(this).siblings("span"));
    });
    $(".less").click(function(event) {
        less($(this).siblings("span"));
    });


    function pause() {
        $("#time").click(function(event) {
            if (status == "wait") {
                $(".add,.less").attr('disabled', "true");
                run();
                status = "working";
            } else if (status == "working") {
                clearInterval(greenTimer);
                changeSwitch();
                status = "wait";
            }
        });
    }

    function halt() {
        runColor = false;
        $("#timeBack").css('top', '300px');
        $("#timeBack").css('background-color', 'rgb(255, 68, 68)');
        $("#timeText").text('Break!');
        $("#timeNum").text($("#breakText").text());

        run();
    }

    function initial() {
        $("#timeBack").css({
            "top": '300px',
            "background-color": "#99CC00"
        }, "1");
        $("#timeText").text('Session');
        $("#timeNum").text($("#sessionText").text());
        runColor = true;
        status = "wait";
        $(".add,.less").removeAttr("disabled");

    }

    function powerSwitch() {
        if (runColor == true) {
            $("#sessionAdd,#sessionLess").click(function(event) {
                $("#timeNum").text($("#sessionText").text());
                $("#timeBack").css('top', '300px');
            });
        } else if (runColor == false){
            $("#breakAdd,#breakLess").click(function(event) {
                // $("#timeNum").text($("#breakText").text());
                // $("#timeBack").css('top', '300px');
                alert("22");

            });
        }
    }

    function changeSwitch() {
        if (runColor == true) {
            $("#sessionAdd,#sessionLess").removeAttr("disabled");
        } else if (runColor == false) {
            $("#breakAdd,#breakLess").removeAttr("disabled");
        }
    }
    pause();
    powerSwitch();

})