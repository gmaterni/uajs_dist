var WndsMgr = function (divid) {
    var ws = {
        initialize: function (divid_) {
            this.wnd = UaWindowAdm.create(divid_);
            this.txtid = divid_ + "_txt";
            this.divid = divid_;
        },
        getUaWnd: function () {
            return this.wnd;
        },
        getText: function () {
            var txt = $("#" + this.txtid).val();
            return txt;
        },
        show: function () {
            this.wnd.show();
            return this;
        },
        edit: function (tf) {
            if (tf) $("#" + this.divid).draggable({
                cancel: 'textarea'
            });
            else $("#" + this.divid).draggable({
                cancel: false
            });
            return this;
        },
        print: function (txt) {
            var rs = txt.split('\n');
            var cols = 0;
            var rows = rs.length;
            for (var i = 0; i < rows; i++)
                cols = (rs[i].length > cols) ? rs[i].length : cols;
            cols += 2;
            $('#' + this.divid).empty();
            $("<textarea></textarea>").attr({
                id: this.txtid,
                rows: rows,
                cols: cols
            }).appendTo($('#' + this.divid));
            $('#' + this.txtid).val(txt);
            var hd = this.wnd.getWindow().height();
            this.wnd.setStyle({
                width: 'auto'
            });
            this.wnd.setStyle({
                height: 'auto'
            });
            this.wnd.setStyle({
                overflow: 'auto'
            });
            return this;
        }
    };
    ws.initialize(divid);
    return ws;
};

var ua = {
    init: function () {
        this.wmenu = UaWindowAdm.create('menu').setXY(2, 10, -1).show();
        this.wejs = WndsMgr('ejs');
        this.wejs.getUaWnd().setXY(165, 5, -1);
        this.wdata = WndsMgr('data');
        this.wdata.getUaWnd().setXY(200, 30, -1);
        this.wjs = WndsMgr('js');
        this.wjs.getUaWnd().setXY(250, 60, -1);
        this.wsrchtml = WndsMgr('srchtml');
        this.wsrchtml.getUaWnd().setXY(300, 90, -1);
        this.whtml = UaWindowAdm.create('html').setXY(165, 120, -1);

    },
    hide: function () {
        this.whtml.hide();
        this.wsrchtml.getUaWnd().hide();
        this.wdata.getUaWnd().hide();
        this.wjs.getUaWnd().hide();
        this.wejs.getUaWnd().hide();
        this.shdata = false;
        this.shjs = false;
        this.shejs = false;
        this.shsrchtml = false;
        this.shhtml = false;
        $('a.tg').addClass('sh');
    },
    show: function () {
        this.shdata = true;
        this.shjs = true;
        this.shejs = true;
        this.shhtml = true;
        this.shsrchtml = true;
        this.wdata.getUaWnd().show();
        this.wjs.getUaWnd().show();
        this.wejs.getUaWnd().show();
        this.wsrchtml.getUaWnd().show();
        this.whtml.show();
        $('a.tg').removeClass('sh');
    },
    cls: function () {
        this.hide();
        this.wdata.edit(false);
        this.wejs.edit(false);
        this.set_edit_false('#data');
        this.set_edit_false('#ejs');
        this.whtml.setHtml("");
        this.wsrchtml.print("");
        this.wdata.print("");
        this.wejs.print("");
        this.wjs.print("");
    },
    set_link: function () {
        $('a.tg').removeClass('sh');
        if (this.shejs == false) $(".ejs.tg").addClass("sh");
        if (!this.shdata) $("a.data").addClass("sh");
        if (!this.shjs) $("a.js").addClass("sh");
        if (!this.shhtml) $("a.html").addClass("sh");
        if (!this.shsrchtml) $("a.srchtml").addClass("sh");
    },
    set_edit_true: function (id) {
        $(id).css({
            borderStyle: 'dotted',
            borderWidth: '2px',
            background: '#f0f0f0',
            padding: '5px'
        });
        $(id + " textarea").css({
            margin: "2px",
            fontWeight: "bold",
            color: "#072EA2"
        });
    },
    set_edit_false: function (id) {
        $(id).css({
            borderStyle: 'solid',
            borderWidth: '2px',
            background: '#ffffff',
            padding: '2px'
        });
        $(id + ' textarea').css({
            fontWeight: 'normal',
            color: '#555555'
        });
    },
    edit_data: function () {
        if (!this.shdata) this.toggle_data();
        this.editdata = !this.editdata;
        if (this.editdata) {
            this.wdata.edit(true);
            this.wdata.getUaWnd().show();
            this.set_edit_true('#data');
        } else {
            this.wdata.edit(false);
            this.wdata.getUaWnd().show();
            this.set_edit_false('#data');
        }
    },
    edit_ejs: function () {
        if (!this.shejs) this.toggle_ejs();
        this.editejs = !this.editejs;
        if (this.editejs) {
            this.wejs.edit(true);
            this.wejs.getUaWnd().show();
            this.set_edit_true('#ejs');
        } else {
            this.wejs.edit(false);
            this.wejs.getUaWnd().show();
            this.set_edit_false('#ejs');
        }
    },
    toggle_html: function () {
        if (this.shhtml)
            this.whtml.hide();
        else
            this.whtml.show();
        this.shhtml = !this.shhtml;
        this.set_link();
    },
    toggle_srchtml: function () {
        this.wsrchtml.getUaWnd().toggle();
        this.shsrchtml = !this.shsrchtml;
        this.set_link();
    },
    toggle_data: function () {
        this.wdata.getUaWnd().toggle();
        this.shdata = !this.shdata;
        this.set_link();
    },
    toggle_js: function () {
        this.wjs.getUaWnd().toggle();
        this.shjs = !this.shjs;
        this.set_link();
    },
    toggle_ejs: function () {
        this.wejs.getUaWnd().toggle();
        this.shejs = !this.shejs;
        this.set_link();
    },
    compile: function () {
        var data = this.wdata.getText();
        var ejs = this.wejs.getText();
        this.build(ejs, data);
    },
    build: function (ejs, data) {
        var args = {};
        try {
            eval("var args=" + data);
        } catch (err) {
            alert("eval data: " + err);
        }
        var rs = UaEjs.compile(ejs, args);
        var js = js_beautify(rs.js, {
            'indent_size': 2,
            'indent_char': ' '
        });
        this.wjs.print(js);
        var htmlsrc = this.format_html(rs.html);
        this.wsrchtml.print(htmlsrc);
        this.whtml.setHtml(rs.html);
    },
    format_html: function (html_source) {
        var html = html_beautify(html_source, {
            'indent_size': 2,
            'indent_char': ' ',
            'wrap_line_length': 80,
            'brace_style': 'expand',
            'unformatted': ['a', 'sub', 'sup', 'b', 'i', 'u'],
            'preserve_newlines': true,
            'max_preserve_newlines': 0
        });
        return html;
    }
};

var  load=function () {
        var dataurl = $('#dataurl').val();
        var ejsurl = $('#ejsurl').val();
        var ejs = UaRq.rqsGet(ejsurl, null, null, 'text').responseText;
        ua.wejs.print(ejs);
        var csv = UaRq.rqsGet(dataurl, null, null, 'text').responseText;
        var json=csv2json(csv);
        data="{rows:"+JSON.stringify(json)+"};";
        var js = js_beautify(data,{
            'indent_size': 2,
            'indent_char': ' '
        });
        ua.wdata.print(js);
        ua.build(ejs, data);
        ua.show();
    }
