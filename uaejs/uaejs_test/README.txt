Ambiente di Test per uaejs.js

Prerequesiti
  node.js

per effettuare i test digitare

es0.sh
es1.sh
....
es5.sh

Es.
Lo script es0.sh

ejsbuild.sh ./es/es0.ejs ./es/es0.json build/es0

invoca von i tre argomenti esjsbuild.sh

node ejsbuild.js $1 $2 $3

che a sua volta invoca esjsbuil.js

es0.js è il template html che sarà utilizzato da uaejs2.js

es0.json sono i dati utilizzati per popolare il template.

nella dir build sono prodotti tre file:

es0.html
il file html prodotto dalla compilazione di es0.ejs con es0.json

es0.js
Lo script proddoto da uaejs2.js per la compilazione

es0test.html
Un file html contenente i dati nel formato json,lo script es0.js e
uno script di una sola riga:

var html = fnEjs(args);

per produrre l'html.

infine

<script type="text/javascript" >

 var e=document.getElementById('ua');
 e.innerHTML=html;

</script>

Inserisce nel DOM il file html compilato e lo visualizza.

Il file esjstest.html è un template genrico vhe serve da modello
per i vari esNtest.html che vengono scritti nella dir build.

Nell'uso corrente lo script Javascript viene prodotto dinamicamente ed
utilizzato all'interno di uaejs2.js. Ma può essere estratto sia per scopi
didattici sia per fare un debug.

L'ambiente di test può essere utilizzato per provare direttamente in locale
la corrttezza dello script ejs e del formato dei dati.

Per veder come utilizzarlo in produzione fare riferimento agli esempi
contenuti in uaejs_csv e uaejs_json
