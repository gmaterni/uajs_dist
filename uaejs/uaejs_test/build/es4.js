var fnEjs = function(pars) {
  var up = [];
  var row0 = pars['row0'];
  var rows = pars['rows'];
  up.push(" <table id='rows1' class='list'>  <tr>   ");
  for (var col in row0) {
    var label = row0[col].label;
    up.push("    <td class='head'>");
    up.push(label);
    up.push("</td> ");
  }
  up.push("  </tr>  ");
  for (var i = 0; i < rows.length; i++) {
    row = rows[i];
    var num = 'row' + i;
    up.push("  <tr id='");
    up.push(num);
    up.push("'>   ");
    for (var col in row) {
      var value = row[col];
      var limit = row0[col].limit;
      up.push("    <td><input type='text' name='");
      up.push(col);
      up.push("' value='");
      up.push(value);
      up.push("' size='");
      up.push(limit);
      up.push("' maxlength='");
      up.push(limit);
      up.push("' /></td>  ");
    }
    up.push("  </tr>  ");
  }
  up.push("</table>");;
  return up.join("");
};