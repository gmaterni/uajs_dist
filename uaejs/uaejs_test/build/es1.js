var fnEjs = function(pars) {
  var up = [];
  var titolo = pars['titolo'];
  var anag = pars['anag'];
  up.push("  <h1>");
  up.push(titolo);
  up.push("</h1><br/>  <table class='list'>  <tr>    <td class='head'>id</td>    <td class='head'>cognome.</td>    <td class='head'>nome</td>    <td class='head'>data nasc.</td>    <td class='head'>sesso</td>    <td class='head'>codfisc</td>  </tr> ");
  for (var i = 0; i < anag.length; i++) {
    up.push("    <tr id='anagid=\"");
    up.push(anag[i].id);
    up.push("\"'\ >    <td class=\"row\">");
    up.push(anag[i].anagid);
    up.push("</td>    <td class='row'>");
    up.push(anag[i].cognome);
    up.push("</td>    <td class='row'>");
    up.push(anag[i].nome);
    up.push("</td>    <td class='row'>");
    up.push(anag[i].datanasc);
    up.push("</td>    <td class='row'>");
    up.push(anag[i].sesso);
    up.push("</td>    <td class='row'>");
    up.push(anag[i].codfisc);
    up.push("</td>    </tr>");
  }
  up.push("</table>");;
  return up.join("");
};