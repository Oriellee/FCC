$(function() {
    function open() {
        $("#count div").eq(0).text('- -');
        $("#buttonGroup button").attr('disabled', "true");
        setInterval(function(){
       	$("#count div").css('color', 'blue');
       },1000);
    }

    function close() {
        $("#count div").eq(0).text('');
        $("#buttonGroup button").removeAttr("disabled");
    }
    $("#powerbutton").click(function(event) {
        if ($(this).children('span').css('float') == 'left') {
            $(this).children('span').css('float', 'right');
            close();
        } else {
            $(this).children('span').css('float', 'left');
            open();
        }
    });
})