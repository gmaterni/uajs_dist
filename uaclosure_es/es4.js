var Operator = function() {
    var num = 0;
    var op = {
        set: function(n) {
            num = n;
            return this;
        },
        get: function() {
            return num;
        },
        add: function(n) {
            num = num + n;
            return this;
        },
        mult: function(n) {
            num = num * n;
            return this;
        },
        sub: function(n) {
            num = num - n;
            return this;
        },
        div: function(n) {
            num = num / n;
            return this;
        }
    };
    return op;
};

var op_es1 = Operator();
op_es1.set(1);
op_es1.add(10).mult(20);
var x = op_es1.get();

ua.log("op_es1.set(1);");
ua.log("op_es1.add(10).mult(20);");
ua.log("x=op_es1.get();");
ua.log(">> x=" + x);

ua.log('----');

var op_es2 = Operator();
op_es2.set(1000);
op_es2.sub(300);
op_es2.div(10);
x = op_es2.get();
ua.log("op_es2.set(1000);");
ua.log("op_es2.sub(300);");
ua.log("op_es2.div(10);");
ua.log("x=op_es2.get();");
ua.log(">> x=" + x);
