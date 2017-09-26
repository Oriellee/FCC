var ans = "",
    calc = "",
    clear = false;

$(function() {
    $("#box table tr td").click(function(event) {
        var text = $(this).text();
        var show = $("#show");
        if (parseInt(text, 10) == text ||
            text === "%" ||
            text === "/" ||
            text === "*" ||
            text === "-" ||
            text === "+" ||
            text === ".") {
        	if(clear === false){
        		calc+=text;
        		show.text(calc);
        	}else{
        		calc = text;
        		show.text(calc);
        		clear = false;
        	}
        }else if(text === "AC"){
        	calc = "";
        	show.text("");
        }else if(text === "CE"){
        	calc = calc.slice(0, -1);
        	show.text(calc);
        }else if(text === "="){
        	ans = eval(calc);
        	show.text(ans);
        	clear = true;
        }
    });
})