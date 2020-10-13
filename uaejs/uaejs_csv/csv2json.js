/*
 nome|cognome|datanasc
 marco|rossi|22-11-2000
 rosa|perla|10-01-1990

 [{"nome":"marco","cognome":"rossi","datanasc":"22-11-2000"} {"nome":"rosa","cognome":"perla","datanasc":"10-01-1990"} ]
 */

var csv2json = function(csv) {
    var rows = csv.split('\n');
    var row0 = rows.slice(0, 1)[0];
    var cols = row0.split('|');
    rows.splice(0, 1);
    var nr = rows.length;
    var nc = cols.length;
    var r;
    var c;
    var rsjson = [];
    for (r = 0; r < nr; r++) {
        row = rows[r].split('|');
        var rjson = {};
        for (c = 0; c < nc; c++) {
            rjson[cols[c]] = row[c];
        }
        rsjson.push(rjson);
    }
    return rsjson;
};

