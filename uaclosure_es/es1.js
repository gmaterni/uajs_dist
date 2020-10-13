var Add = function() {
    var n = 0;
    return function() {
        n+=1;
        return n;
    };
};

var add_es1=Add();
add_es1();
add_es1();
add_es1();
add_es1();
var x=add_es1();

ua.log("var add_es1=Add();");
ua.log("add_es1();");
ua.log("add_es1();");
ua.log("add_es1();");
ua.log("add_es1();");
ua.log("var x=add_es1();");
ua.log(">> x="+x);

ua.log('------');

var add_es2=Add();
x=add_es2();
x=add_es2();

ua.log("var add_es2=Add();");
ua.log("add_es2();");
ua.log("x=add_es2();");
ua.log(">> x="+x);
