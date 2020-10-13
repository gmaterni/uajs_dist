/*
 *uaejs2.js  10-11-2013
 */
var UaEjs = {
    ejstags: {
        rex: /(<%=)|(<%)|(%>)/g,
        r: '%>',
        l: '<%',
        le: '<%=',
        lg: /<%/g,
        rg: /%>/g
    },
    //ejstags:{rex: /(<\?=)|(<\?)|(\?>)/g, r: '?>', l: '<?', le: '<?=', lg: /<\?/g, rg: /\?>/g },
    //ejstags:{rex: /(<!=)|(<!)|(!>)/g, r: '!>', l: '<!', le: '<!=', lg: /<!/g, rg: /!>/g }
    build: function (src, args) {
        return UaEjs.compile(src, args).html;
    },
    compile: function (src, args) {
        var srcEjs = UaEjs.parse(src);
        var data = '';
        var k;
        for (k in args)
            data += ("var " + k + "=pars['" + k + "'];");
        var js = "var up=[];" + data + srcEjs + ";return up.join(\"\");";
        try {
            var fnEjs=new Function("pars",js);
            var html = fnEjs(args);
        } catch (err) {
            var s = js.replace(/\;/g, ";\n");
            alert("UaEjs.compile\n" + err + "\n\n\n\n" + s + "\n\n\n");
            return {
                js: s,
                html: "",
                fn:null
            };
        }
        return {
            js: js,
            html: html,
            fn:fnEjs
        };
    },
    parse: function (src) {
        var tags = this.ejstags;
        var txt = src.replace(/[\r\t\n]/g, "");
        var arr = [];
        var r;
        var x0 = 0;
        var x1;
        var tgx = tags.r;
        for (;;) {
            r = tags.rex.exec(txt);
            if (!r) break;
            x1 = r.index;
            if (tgx == tags.le) { // valore js
                arr.push("up.push(" + txt.substring(x0 + 3, x1).replace(/^\s+|\s+$/g, "") + ");");
            } else if (tgx == tags.l) { //js
                arr.push(txt.substring(x0, x1).replace(/\"/g, '"'));
            } else { // html
                arr.push("up.push(\"" + txt.substring(x0, x1).replace(/\"/g, '\\"')+ "\");");
            }
            tgx = r[0];
            x0 = x1;
        }
        arr.push("up.push(\"" + txt.substring(x0).replace(/\"/g, '\\"') + "\");");
        var js = arr.join("");
        return js.replace(tags.lg, '').replace(tags.rg, '');
    }
}
exports.UaEjs=UaEjs;

// @ sourceURL=uaejs2
