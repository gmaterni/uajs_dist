var fnEjs = function(pars) {
  var up = [];
  var row0 = pars['row0'];
  up.push(" <form id='form1' class='frm'><table class='frm'> ");
  for (var col in row0) {
    var value = row0[col].value;
    var limit = row0[col].limit;
    var label = row0[col].label;
    up.push("  <tr>    <td><label>");
    up.push(label);
    up.push(":</label></td>    <td><input type='text' name='");
    up.push(col);
    up.push("' id='");
    up.push(col);
    up.push("' value='");
    up.push(value);
    up.push("' size='");
    up.push(limit);
    up.push("' maxlength='");
    up.push(limit);
    up.push("' /></td>  </tr>  ");
  }
  up.push("</table></form>  ");;
  return up.join("");
};