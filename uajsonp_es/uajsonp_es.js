/* jshint esversion: 8 */


var get = function(url) {
    var rqs = new Request(url);
    fetch(rqs)
        .then(res => {
            if (res.ok) {
                return res.text();
            } else {
                alert('Errror');
            }
        })
        .then(text => {
           // document.getElementById("div2").innerHTML=text;
            $('#div2').html('');
            var txt = "<pre>" + text + "</pre>";
            $('#div2').html(txt);
        })
        .catch(err => {
            alert('Errore di connessione\n' + err);
        });
};

var cls = function (rsp) {
    $('#div1').html('');
};

var showRsp = function (rsp) {
    $('#div1').html('');
    var json = JSON.stringify(rsp);
    var jsonStr = js_beautify(json, {
        'indent_size': 2,
        'indent_char': ' '
    });
    var txt = "<pre>" + jsonStr + "</pre>";
    $('#div1').html(txt);
};

var jsonp_es = {
    es01: function () {
/*
FnEsempiop :Funzione di CallBack che ha come argomento i dati in formato JSON
es01.json :

 FnEsempio({
"cognome": "Martini",
"nome": "Roberto",
"datanasc": "24-02-1980",
"sesso": "m",
"luogonasc": "Firenze"
});

*/
        FnEsempio = function (data) {
            showRsp(data);
        };

        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", 'http://127.0.0.1:8081/es01.json');
        document.head.appendChild(script);
        document.head.removeChild(script);

        get('es01.json');
    },

//getJSONP
/*
es02.json:

fn02({
    "Es.": "es02",
    "campo1": "valore1",
    "campo2": "valore2",
    "campo3": "valore3"
});
*/

    es02: function () {
        var url = 'http://127.0.0.1:8081/es02.json';
        getJSONP(url, {}, 'fn02', showRsp);
        get('es02.json');

    },
    es03: function () {
        var url = 'http://127.0.0.1:8081/es03.json';
        getJSONP(url, {}, 'fn03', showRsp);
        get('es03.json');
    },

/*
link esterni con nome funzione di Callback scelta dal client
e passata come argomento
*/
    es04: function () {
        var url = 'http://api.flickr.com/services/feeds/photos_public.gne?tags=obama&tagmode=any&format=json&jsoncallback=fnEsempio';
        getJSONP(url, {}, 'fnEsempio', showRsp);
        // get('es04.json');
    },
    es05: function () {
        var url = 'http://127.0.0.1:8081/es05.json';
        UaJSONP.load(url, 'fn05', showRsp);
        get('es05.json');
    },
    es06: function () {
        var url = 'http://127.0.0.1:8081/es06.json';
        UaJSONP.load(url, 'fn06', showRsp);
        get('es06.json');
    },
    es07: function () {
        var url = 'http://127.0.0.1:8081/es07.json';
        UaJSONP.load(url, 'fn07', showRsp);
        get('es07.json');
    },

/*
 <script>
 ......
</script>

 utilizza nei dati una variabile NON globale al posto della funzione
 la variabile deve essere definita nel file json

es10.json:

var jsondata={
    "esempio":"es10",
    "cognome": "Martini",
    "nome": "Roberto",
    "datanasc": "24-02-1980",
    "sesso": "m",
    "luogonasc": "Firenze"
};

*/
    es10: function () {
        var url = 'http://127.0.0.1:8081/es10.json';
        var script = document.createElement("script");
        script.setAttribute("id", "uajson");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", url);
        document.head.appendChild(script);
        $("#uajson").load(function () {
            showRsp(jsondata);
        });
        document.head.removeChild(script);
        get('es10.json');
    },
    es11: function () {
        var url = 'http://127.0.0.1:8081/es11.json';
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("onload", "showRsp(jsondata);");
        script.setAttribute("src", url);
        document.head.appendChild(script);
        document.head.removeChild(script);
        get('es11.json');
    },

/*
UaJSONP2

es12.json:

var jsondata = {
    "esempio": "es12",
    "cognome": "Martini",
    "nome": "Roberto",
    "datanasc": "24-02-1980",
    "sesso": "m",
    "luogonasc": "Firenze"
};

*/
    es12: function () {
        var url = 'http://127.0.0.1:8081/es12.json';
        var callback = function (data) {
            showRsp(data);
        };
        UaJSONP2.load(url, 'jsondata', callback);
        get('es12.json');
    },

/*
Il file json contiene una chiamata alla funzione
jsonfn definita localmente dal lato del chiamante.

es15.json:

var jsondata = {
    "esempio": "es20",
    "cognome": "Martini",
    "nome": "Roberto",
    "datanasc": "24-02-1980",
    "sesso": "m",
    "luogonasc": "Firenze"
};

jsonfn(jsondata);

*/
    es15: function () {
        var url = 'http://127.0.0.1:8081/es15.json';
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", url);
        document.head.appendChild(script);
        document.head.removeChild(script);
        get('es15.json');
    }
};

var jsonfn=showRsp;
