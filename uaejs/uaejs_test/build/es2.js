var fnEjs = function(pars) {
  var up = [];
  var rows = pars['rows'];
  up.push("  <table class='list'>  <tr>    <td class='head'>id</td>    <td class='head'>cognome.</td>    <td class='head'>nome</td>    <td class='head'>data nasc.</td>    <td class='head'>sesso</td>    <td class='head'>codfisc</td>  </tr>  ");
  for (var i = 0; i < rows.length; i++) {
    up.push("  <tr id='row");
    up.push(rows[i][0]);
    up.push("'\ >    <td class='row'>");
    up.push(rows[i][0]);
    up.push("</td>    <td class='row'>");
    up.push(rows[i][1]);
    up.push("</td>    <td class='row'>");
    up.push(rows[i][2]);
    up.push("</td>    <td class='row'>");
    up.push(rows[i][3]);
    up.push("</td>    <td class='row'>");
    up.push(rows[i][4]);
    up.push("</td>    <td class='row'>");
    up.push(rows[i][5]);
    up.push("</td>  ");
  }
  up.push("  </table>  <br/>  ");;
  return up.join("");
};