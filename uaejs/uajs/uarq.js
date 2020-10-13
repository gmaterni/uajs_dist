/*
 * uarq.js release:18-07-2013
 */

UA = {};

$id = function (id) {
    return document.getElementById(id);
};

var UaRq = {
    error: '',

    rqsGet: function (url, params, fnErr, dataType) {
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
            success: function (rsp, arg2) {
                UaRq.error = "";
            },
            error: function (rsp, arg2) {
                ok = false;
                UaRq.error = "Error!\n UaRq.rqsGet\nurl:" + url;
                if (!fnErr) fnErr = function (rsp) {
                    var s = !rsp.responseText ? "text is null" : rsp.responseText;
                    alert(UaRq.error + "\nstatus: " + rsp.status + "\n" + s);
                };
            },
            complete: function (rsp, arg2) {
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

    rqsJsonp: function (url, params, callback, fnOk, fnErr) {
        return $.ajax({
            type: 'GET',
            cache: false,
            url: url,
            dataType: 'jsonp',
            contentType: "application/json",
            jsonpCallback: callback,
            data: params,
            success: fnOk,
            error: fnErr || function (rsp, arg2) {
                alert("rqsJsonp:\n" + url + "\n" + arg2)
            }
        });
    },

    rqsScript: function (url, params, fnOk, fnErr) {
        return $.ajax({
            type: 'GET',
            cache: true,
            url: url,
            dataType: 'script',
            async: false,
            data: params || {},
            success: fnOk || function () {},
            error: fnErr || function (rsp, arg2) {
                alert("rqsScript:\n" + url + "\n" + arg2)
            }
        });
    },

    rqsPost: function (url, params, fnOk, fnErr, dataType_) {
        var ok = true;
        jQuery.ajax({
            type: 'POST',
            url: url,
            dataType: !! dataType_ ? dataType_ : 'xml',
            data: params,
            processData: true,
            async: true,
            cache: false,
            success: function (rsp) {
                UaRq.error = "";
            },
            error: function (rsp) {
                ok = false;
                UaRq.error = "Error!\n UaRq.rqsPost\nurl:" + url;
                if (!fnErr) fnErr = function (rsp) {
                    alert(UaRq.error);
                };
            },
            complete: function (rsp, arg2) {
                if (ok) fnOk(rsp);
                else fnErr(rsp)
            }
        });
    },

    getText: function (url, params, fnErr) {
        var rsp = UaRq.rqsGet(url, params, fnErr, 'text');
        if (rsp == null) return null;
        return rsp.responseText;
    },

    getXml: function (url, params, fnErr) {
        var rsp = UaRq.rqsGet(url, params, fnErr, 'xml');
        if (rsp == null) return null;
        return rsp.responseXML;
    },

    /*
     * Legge un file json
     * url: nome del file json
     * funzione opzionale per gestire l'errore
     * ritorna un object json
     */
    getJson: function (url, params, fnErr) {
        var json = null;
        try {
            var rsp = UaRq.rqsGet(url, params, null, 'text');
            if (!rsp) return null;
            eval("var json=" + rsp.responseText);
        } catch (err) {
            if ( !! fnErr) fnErr(err)
            else alert("UaRq.getJson:\nerror: " + err + "\nurl:" + url);
        }
        return json;
    },

    getScript: function (url, params, fnErr) {
        var rsp = UaRq.rqsGet(url, params, fnErr, 'script');
        if (!rsp) return null;
        return rsp.responseText;
    },

    /*
     * Legge un file javascript
     * url : nome del file js
     * onLoad : funzione da invocare alla fine del caricamento. In formato stringa.
     * id: identificatore dello script.
     * es:  onLoad="alert('prova onLoad');";
     * la funzione e' asyncrona;
     */
    loadJs: function (url, onLoad) {
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
    loadFn: function (fnUrl, pars, fnErr) {
        var rsp = UaRq.rqsGet(fnUrl, pars, fnErr, 'text');
        if (rsp == null) return null;
        var js = rsp.responseText;
        try {
            var jsfn = eval(js);
        } catch (err) {
            alert("UaRq.loadFn:\n\n" + fnUrl + "\n\n" + err);
            return null;
        }
        return jsfn;
    },
    /*
     * Trasforma una query string del tipo ?par1=va1&par2=val2 in un hash
     */
    queryStringToHash: function (qstr) {
        var hs = {};
        var up = qstr.split('?');
        var qs = up.length == 1 ? up[0] : up[1];
        var ar = qs.split('&');
        for (var i = 0; i < ar.length; i++) {
            var kv = ar[i].split('=');
            hs[kv[0]] = kv[1];
        }
        return hs
    },

    JSON_parse: function (txt) {
        var json = null;
        try {
            eval("var json=" + txt);
        } catch (err) {
            alert("UaRq.JSON_parse:\nerror: " + err);
        }
        return json;
    },

    XMLToString: function (objXML) {
        if (window.ActiveXObject) {
            var strXML = objXML.xml;
            return strXML;
        } else {
            return (new XMLSerializer()).serializeToString(objXML);
        }
    },
    StringToXML: function (strXML) {
        if (window.ActiveXObject) {
            var objXML = new ActiveXObject("Microsoft.XMLDOM");
            objXML.loadXML(strXML);
            return objXML;
        } else {
            return (new DOMParser()).parseFromString(strXML, "text/xml");
        }
    }

};
