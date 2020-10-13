var Add = function() {
    var n = 0;
    return {
        sum: function(x) {
            n += x;
        },
        get: function() {
            return n;
        }
    };
};

var add1 = Add();
add1.sum(10);
add1.sum(15);
add1.sum(50);
var x = add1.get();

ua.log("var add1=AddFactory();");
ua.log("add1.sum(10);");
ua.log("add1.sum(15);");
ua.log("add1.sum(50);");
ua.log("var x=add1.get();");
ua.log(">> x=" + x);

ua.log('----------')

var add2 = Add();
add2.sum(100);
add2.sum(1);
var x = add2.get();

ua.log("var add2=AddFactory();");
ua.log("add2.sum(100);");
ua.log("add2.sum(1);");
ua.log("var x=add2.get();");
ua.log(">> x=" + x);
