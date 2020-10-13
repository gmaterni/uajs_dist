var Add = (function() {
    var n = 0;
    return  function(x) {
        n += x;
        return n;
    };
})();

/*
var  fnAdd = function() {
    var n = 0;
    return function(x) {
        n+=x;
        return n;
    };
};

var Add= fnAdd()
*/

var add_es1=Add;
add_es1(10);
add_es1(20);
add_es1(30);
add_es1(100);
var x=add_es1(1);

ua.log("var add_es1=Add;");
ua.log("add_es1(10);");
ua.log("add_es1(20);");
ua.log("add_es1(30);");
ua.log("add_es1(100);");
ua.log("var x=add_es1(1);");
ua.log(">> x="+x);

ua.log('------');

var add_es2=Add;
add_es2(100);
x=add_es2(100);

ua.log("var add_es2=Add;");
ua.log("add_es2(100);");
ua.log("x=add_es2(100);");
ua.log(">> x="+x);
