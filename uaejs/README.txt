
NON vi sono prerequisiti per uaejs2.js

Il template ejs per immergere  javascript usa la seguente notazione:

Per contenere gli script:
<%script%>

Per visualizzare i dati:
<%=var%>

es:

Dati:

 {
     "titolo": "Discipline",
     "anno": "2015",
     "loc": "Italia",
     "materie": ["lettere", "lingue", "filosofia", "matematica", "fisica", "informatica", "legge", "chimica"]
 }

Template ejs:

<h3><%=titolo%></h3>
  <ul>
      <% for(var i=0; i<materie.length; i++) { %>
          <li>
              <%= materie[i] %>
          </li>
      <% } %>
  </ul>
  <%=anno%>
  <br/>
  <%=loc%>


Le dir contengono vari tipi di esempi ed un ambiente di test.
Prerequisiti per gli esempi:
uarq.js per gestire le chiamate AJAX
jquery.js
jqueri-ui.js

./es
E' un esempio base particolarmente semplice.
E' usata la libreria uarq.js per gestire le chiamate AJAX.
Ma può essere tranquillamente sostituita.
Se si usa un'altra libreria o una propria implementazione
delle request in AJAX fare attenzione alla lettura del file JSON
in quanto il file testo che lo contiene deve essere trasformato in un
object JSON.

./uaejs_json
E' un esempio  di uaejs2.js con file dati nel formato json

./uaejs_csv
E' un esempio  di uaejs2.js con file dati nel formato csv

./uaejs_es
Contiene vari esempi

In tutti gli esempi sono visualizzati in diverse finestre i files:
ejs
json
Javascript
sorgente html
html

Dal menu è possibile gestirne la visualizzazione, modificarli e testarli
con il comando compile.
Naturalmente le eventuali modifiche non sono salvate automaticamente,
servono a fare delle prove sui dati e sui template.

./uaejs_test
Vi sono gli script per utilizzare localmente uaejs2.js e produrre esempi
di tutte le componenti, ejs,js e html, che servono ad illustrare il
funzionamento di uaejs2.
L'ambiente può essere utilizzato anche per fare dei test sulla correttezza
del template ejs e del formato dei dati.

Il semplice server.py non è necessario in quanto si possono aprire i files
index.html eterodiretta nel browser.
Questo è possibile con tutti i browser meno, naturalmente, IE in quanto
quest'ultimo quando una richiesta AJAX legge un file localr e ritorna
dice d'errore 200.
