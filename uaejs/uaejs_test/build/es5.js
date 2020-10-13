var fnEjs = function(pars) {
  var up = [];
  var rows = pars['rows'];
  up.push("  <table class='list'>  <tr>    <td class='head'>id</td>    <td class='head'>cognome.</td>    <td class='head'>nome</td>    <td class='head'>data nasc.</td>    <td class='head'>sesso</td>    <td class='head'>codfisc</td>  </tr>  ");
  for (var i = 0; i < rows.length; i++) {
    up.push("  <tr id='row");
    up.push(rows[i].anagid);
    up.push("'\ >    <td class='row'>");
    up.push(rows[i].anagid);
    up.push("</td>    <td class='row'>");
    up.push(rows[i].cognome);
    up.push("</td>    <td class='row'>");
    up.push(rows[i].nome);
    up.push("</td>    <td class='row'>");
    up.push(rows[i].datanasc);
    up.push("</td>    <td class='row'>");
    up.push(rows[i].sesso);
    up.push("</td>    <td class='row'>");
    up.push(rows[i].codfisc);
    up.push("</td>  ");
  }
  up.push("  </table>  <br/>  ");;
  return up.join("");
};