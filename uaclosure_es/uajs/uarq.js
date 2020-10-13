/*
 * uarq.js 21/02/2015
 */

UA = {};

$id = function(id) {
    return document.getElementById(id);
};

var UaRq = {
    error: '',

    rqsGet: function(url, params, fnErr, dataType) {
        var ok = true;
        var res = null;
        $.ajax({
            type: 'GET',
            url: url,
            dataType: dataType || 'xml',
            data: params,
            async: false,
            processData: true,
            cache: true,
            success: function(rsp, arg2) {
                UaRq.error = "";
            },
            error: function(rsp, arg2) {
                ok = false;
                UaRq.error = "Error!\n UaRq.rqsGet\nurl:" + url;
                if (!fnErr) fnErr = function(rsp) {
                    var s = !rsp.responseText ? "text is null" : rsp.responseText;
                    alert(UaRq.error + "\nstatus: " + rsp.status + "\n" + s);
                };
            },
            complete: function(rsp, arg2) {
                if (ok) {
                    if (dataType == 'xml' && !rsp.responseXML) rsp.responseXML = $.parseXML(rsp.responseText);
                    res = rsp;
                } else {
                    res = null;
                    fnErr(rsp);
                }
            }
        });
        return res;
    },

    rqsJsonp: function(url, params, callback, fnOk, fnErr) {
        return $.ajax({
            type: 'GET',
            cache: false,
            url: url,
            dataType: 'jsonp',
            contentType: "application/json",
            jsonpCallback: callback,
            data: params,
            success: fnOk,
            error: fnErr || function(rsp, arg2) {
                alert("rqsJsonp:\n" + url + "\n" + arg2);
            }
        });
    },
    rqsScript: function(url, params, fnOk, fnErr) {
        return $.ajax({
            type: 'GET',
            cache: true,
            url: url,
            dataType: 'script',
            async: false,
            data: params || {},
            success: fnOk || function() {},
            error: fnErr || function(rsp, arg2) {
                alert("rqsScript:\n" + url + "\n" + arg2);
            }
        });

    },
    rqsPost: function(url, params, fnOk, fnErr, dataType_) {
        var ok = true;
        jQuery.ajax({
            type: 'POST',
            url: url,
            dataType: !!dataType_ ? dataType_ : 'xml',
            data: params,
            processData: true,
            async: true,
            cache: false,
            success: function(rsp) {
                UaRq.error = "";
            },
            error: function(rsp) {
                ok = false;
                UaRq.error = "Error!\n UaRq.rqsPost\nurl:" + url;
                if (!fnErr) fnErr = function(rsp) {
                    alert(UaRq.error);
                };
            },
            complete: function(rsp, arg2) {
                if (ok) fnOk(rsp);
                else fnErr(rsp);
            }
        });
    },
    getText: function(url, params, fnErr) {
        var rsp = UaRq.rqsGet(url, params, fnErr, 'text');
        if (rsp === null) return null;
        return rsp.responseText;
    },
    getXml: function(url, params, fnErr) {
        var rsp = UaRq.rqsGet(url, params, fnErr, 'xml');
        if (rsp === null) return null;
        return rsp.responseXML;
    },
    /*
     * Legge un file json
     * url: nome del file json
     * funzione opzionale per gestire l'errore
     * ritorna un object json
     */

    getJson: function(url, params, fnErr) {
        var json = null;
        try {
            var rsp = UaRq.rqsGet(url, params, null, 'text');
            if (!rsp) return null;
            //eval("var json=" + rsp.responseText); XXX
            var js = "var j=" + rsp.responseText + "; return j;";
            json = new Function("", js)();
        } catch (err) {
            if (!!fnErr) fnErr(err);
            else alert("UaRq.getJson:\nerror: " + err + "\nurl:" + url);
        }
        return json;
    },
    /*
    getScript: function (url, params, fnErr) {
        var rsp = UaRq.rqsGet(url, params, fnErr, 'script');
        if (!rsp) return null;
        return rsp.responseText;
    },
*/
    /*
     * Legge un file javascript
     * url : nome del file js
     * onLoad : funzione da invocare alla fine del caricamento. In formato stringa.
     * es:  onLoad="alert('prova onLoad');";
     * la funzione e' asyncrona;
     */
    loadJs: function(url, onLoad) {
        onLoad = onLoad || "";
        var js = jQuery("<script></script>").attr({
            src: url,
            type: "text/javascript",
            onload: onLoad
        })[0];
        document.head.appendChild(js);
        document.head.removeChild(js);
    },
    /*
     *  (function () {
     *    var f=function (n) {
     *        var s = "";
     *        for (i = 0; i < n; i++) {
     *            s = s + i + "\n";
     *        }
     *        return s;
     *    };
     *     return f;
     *})();
     */
    loadFn: function(fnUrl, pars, fnErr) {
        var rsp = UaRq.rqsGet(fnUrl, pars, fnErr, 'text');
        if (rsp === null) return null;
        var jsfn = null;
        try {
            var js = "var x=" + rsp.responseText + "; return x;";
            jsfn = new Function("", js)();
        } catch (err) {
            alert("UaRq.loadFn:\n\n" + fnUrl + "\n\n" + err + "\n\n" + js);
            return null;
        }
        return jsfn;
    },
    /*
     * Trasforma una query string del tipo ?par1=va1&par2=val2 in un hash
     */
    queryStringToHash: function(qstr) {
        var hs = {};
        var up = qstr.split('?');
        var qs = up.length == 1 ? up[0] : up[1];
        var ar = qs.split('&');
        for (var i = 0; i < ar.length; i++) {
            var kv = ar[i].split('=');
            hs[kv[0]] = kv[1];
        }
        return hs;
    },
    JSON_parse: function(txt) {
        var json = null;
        try {
            eval("var json=" + txt);
        } catch (err) {
            alert("UaRq.JSON_parse:\nerror: " + err);
        }
        return json;
    },
    XMLToString: function(objXML) {
        if (window.ActiveXObject) {
            var strXML = objXML.xml;
            return strXML;
        } else {
            return (new XMLSerializer()).serializeToString(objXML);
        }
    },
    StringToXML: function(strXML) {
        if (window.ActiveXObject) {
            var objXML = new ActiveXObject("Microsoft.XMLDOM");
            objXML.loadXML(strXML);
            return objXML;
        } else {
            return (new DOMParser()).parseFromString(strXML, "text/xml");
        }
    }
};
var UaText = {
    replaceChar: function(s) {
        s = s.replace(/á/g, '&aacute;');
        s = s.replace(/à/g, '&agrave;');
        s = s.replace(/é/g, '&eacute;');
        s = s.replace(/í/g, '&iacute;');
        s = s.replace(/ó/g, '&oacute;');
        s = s.replace(/ú/g, '&uacute;');
        s = s.replace(/º/g, '&ordm;');
        return s;
    }
};

var UaNum = {
    round2: function(n) {
        var s = (Math.round(n * 100) / 100).toFixed(2);
        return parseFloat(s, 10);
    },
    //1234.3 => 1.234,30
    format2: function(n) {
        if (!n) return "";
        var x = parseFloat(n, 10);
        var sgn = (x < 0) ? '-' : '';
        var x2 = Math.abs(x).toFixed(2);
        var id = x2.split('.');
        return sgn + this.insSep(id[0]) + ',' + id[1];
    },
    insSep: function(s) {
        var l = s.length;
        var v = [];
        var j = 0;
        var i;
        for (i = 0; i < l; i++) {
            if (i > 0 && i % 3 === 0) v[j++] = '.';
            v[j++] = s.charAt(l - 1 - i);
        }
        v.reverse();
        return v.join('');
    },
    deceu: function(n) {
        return n.toString().replace(/\./g, ',');
    }

};

var UaDate = {
    //return  "yyyy-mm-dd"
    todayYMD: function() {
        var ar = this.today();
        return ar[0] + '/' + ar[1] + '/' + ar[2];
    },
    todayDMY: function() {
        var ar = this.today();
        return ar[2] + '/' + ar[1] + '/' + ar[0];
    },
    todayY: function() {
        return this.today()[0];
    },
    todayM: function() {
        return this.today()[1];
    },
    today: function() {
        var d = new Date();
        return this.ymd(d);
    },
    dmy: function(d) {
        var ar = this.ymd(d);
        return ar[2] + '/' + ar[1] + '/' + ar[0];
    },
    ymd: function(d) {
        var ar = [];
        var m = d.getMonth() + 1;
        ar[1] = (m < 10) ? ('0' + m) : ('' + m);
        ar[0] = d.getFullYear() + '';
        var g = d.getDate();
        ar[2] = (g < 10) ? ('0' + g) : ('' + g);
        return ar;
    },
    addYear: function(d, y) {
        var d1 = new Date(d.getTime());
        d1.setFullYear(d.getFullYear() + 1);
        return d1;
    },
    addDay: function(d, n) {
        return new Date(d.getTime() + n * 24 * 3600 * 1000);
    }

};
/*
 * objs array di object JSON
 * key campo sul quale ordinare
 * sn tipo campo s: => string;  n=> number
 * asc=1 => ascendente; asc -1 => discendente
 */
var UaSortObjs = {
    sort: function(objs, key, sn, asc) {
        if (sn == "s") this.byStr(objs, key, asc);
        else this.byNum(objs, key, asc);
    },
    byStr: function(objs, key, asc) {
        var n = asc;
        var cmpStr = function(a, b) {
            if (a[key] < b[key]) return -n;
            if (a[key] > b[key]) return n;
            return 0;
            //return ((a[key] < b[key]) ? -n : ((a[key] > b[key]) ? n : 0));
        };
        objs.sort(cmpStr);
    },
    byNum: function(objs, key, asc) {
        var n = asc;
        var cmpNum = function(a, b) {
            return (a[key] - b[key]) * n;
        };
        objs.sort(cmpNum);
    }
};

var UaDebug = {
    prnText: function(txt) {
        var w = window.open("", "_blank", "width=800,scrollbars=yes,resizable=yes,toolbar=no,location=no,status=no,menubar=no,titlebar=no ");
        w.document.write("<html><body><pre>" + txt + "</pre></body><html");
    }
};

//# sourceURL=uarq.js
