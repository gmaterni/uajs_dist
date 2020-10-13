
/*
utilizza la funzione globale fn5()
 file json:

fn05({
  "description" : "Tutte le persone o le organizzazioni con cui desideri creare una relazione ",
  "displayName" : "Clienti",
  "id" : "380535a28cc0e136",
  "kind" : "plus#circle",
  "people" : {
    "totalItems" : 0
});

script:

si definisce una funione locale fnCall(<json>) che ha come
argomento quello della funzione globale fn5()

var fnCall=function(json){
    ........
    .......
};

UaJSONP.load('http://127.0.0.1:8081/es05.json', 'fn05', fnCall);
*/
var UaJSONP = {
    load: function (url, fnJson, fnCall) {
        this.fnCall = fnCall;
        var js = fnJson + '=function(data){UaJSONP.fnCall(data);' + fnJson + '=null;}';
        new Function("pars", js)();
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", url);
        document.head.appendChild(script);
        document.head.removeChild(script);
    }
}
