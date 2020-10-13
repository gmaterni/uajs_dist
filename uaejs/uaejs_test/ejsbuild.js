#!/usr/bin/env node

var fs = require('fs');
var bfh = require('beautify-html.js');
var bfj = require('beautify.js');
var ue=require('./uaejs2.js');

var fejs = process.argv[2]
var fdata = process.argv[3]
var fou = process.argv[4]

var readFile = function (fileName) {
    return fs.readFileSync(fileName, 'utf8');
};

var writeFile = function (name, data) {
    fs.writeFileSync(name, data, encoding = 'utf8');
};

var formatHtml = function (src) {
    return bfh.html_beautify(src, {
        'indent_size': 2,
        'indent_char': ' ',
        'wrap_line_length': 180,
        'brace_style': 'expand',
        'unformatted': ['a', 'sub', 'sup', 'b', 'i', 'u'],
        'preserve_newlines': true,
        'max_preserve_newlines': 1
    });
};

var formatJs = function (src) {
    return bfj.js_beautify(src, {
        'indent_size': 2,
        'indent_char': ' ',
        'preserve_newlines': true,
    });
};

var ejs = readFile(fejs);
var data = readFile(fdata);
var args;
eval("args=" + data);
var source = ejs.replace(/_FORM_/g, 'area').replace(/_ROWID_/g, 'id');
var rs = ue.UaEjs.compile(source, args);
var fnEjs=formatJs("var fnEjs=function(pars){"+rs.js+"};");
var html = formatHtml(rs.html);
data=formatJs(data);
var testjs = formatJs("var args=" + data + "\n\n "+fnEjs+"\nvar html=fnEjs(args);");
var testhtml = readFile('ejstest.html').replace(/__EJS__/g, testjs);
writeFile(fou + ".js", fnEjs);
writeFile(fou + ".html", html);
writeFile(fou + "test.html", testhtml);

