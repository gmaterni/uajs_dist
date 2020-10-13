var fnEjs = function(pars) {
  var up = [];
  var titolo = pars['titolo'];
  var anno = pars['anno'];
  var loc = pars['loc'];
  var materie = pars['materie'];
  up.push("<h2>");
  up.push(titolo);
  up.push("</h2><br/ >  <ul>      ");
  for (var i = 0; i < materie.length; i++) {
    up.push("          <li> <a href=\"art/");
    up.push(materie[i]);
    up.push("\">");
    up.push(materie[i]);
    up.push(" </a> </li>    ");
  }
  up.push("  </ul>  <br/>  ");
  up.push(anno);
  up.push("  <br/>  ");
  up.push(loc.val);
  up.push("");;
  return up.join("");
};