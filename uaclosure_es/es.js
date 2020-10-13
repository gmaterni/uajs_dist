
function appendText(divId, txt) {
    var txtId = divId + "txt";
    var t = $('#' + txtId).val() + "\n" + txt;
    printText(divId, t);
};

function printText(divId, txt) {
    var txtId = divId + "txt";
    var rs = (" " + txt).split('\n');
    var cols = 0;
    var rows = rs.length;
    for (var i = 0; i < rows; i++)
        cols = (rs[i].length > cols) ? rs[i].length : cols;
    cols += 2;
    $('#' + divId).empty();
    $("<textarea></textarea>").attr({
        id: txtId,
        rows: rows,
        cols: cols
    }).appendTo($('#' + divId));
    $('#' + txtId).val(txt);
};

var ua = {
    cls: function() {
        printText("div2", "");
    },
    log: function(txt) {
        appendText('div2', txt);
    },
    load: function(url) {
        this.cls();
        var txt = UaRq.getText(url);
        printText('div1', txt)
    },
    exe: function() {
        try {
            var js = $('#div1txt').val();
            eval(js);
        } catch (err) {
            alert(err);
        }
    }
}
