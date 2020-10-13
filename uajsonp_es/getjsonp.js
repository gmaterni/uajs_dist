
var getJSONP=function (url, params, callback, fnOk, fnErr) {
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
    };
