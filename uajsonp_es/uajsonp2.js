/*
Si utilizza una variabile per il json da leggere.
La funzione callback(<data>) ha come argomento <data>
il valore della variabile utilizzata per il json.

Es.
file json:

var jsondata = {
    "esempio": "es12",
    "cognome": "Martini",
    "nome": "Roberto",
    "datanasc": "24-02-1980",
    "sesso": "m",
    "luogonasc": "Firenze"
};

script:

var callback = function (data) {
 ....
 ......
};

UaJSONP2.load( 'http://127.0.0.1:8081/es12.json','jsondata', callback);
*/

var UaJSONP2 = {
    load: function (url, jsonName, fnCall) {
        this.fnCall = fnCall;
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("onload", "UaJSONP2.fnCall(" + jsonName + ")");
        script.setAttribute("src", url);
        document.head.appendChild(script);
        document.head.removeChild(script);
    }
};

