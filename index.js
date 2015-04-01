var commonmark = require('commonmark');
var noop = function () {};

var actors = {
    _commonmark : commonmark,
    standard : {
        init: function (data, crew) {
            crew.reader = new commonmark.Parser();
            crew.writer = new commonmark.HtmlRenderer();
        },
        during : function (data, crew) {
            data.parsed = crew.reader.parse(data.text); // parsed is a 'Node' tree 
        },
        post : function (data, crew) { 
            data.html = crew.writer.render(data.parsed); 
        }
    }, 
    tex : {
        init : function (data, crew) {
            data.tex = [];
            crew.texsnip = function (match) {
                var tex = data.tex;
                tex.push(match);
                return "TEXSNIP"+(tex.length-1);
            };
            crew.texunsnip = function (match, number) {
                return data.tex[parseInt(number, 10)];
            };
            crew.texreg = /\$\$[^$]+\$\$|\$[^$\n]+\$|\\\(((?:[^\\]|\\(?!\)))+)\\\)|\\\[((?:[^\\]|\\(?!\]))+)\\\]/g;
        
        },
        pre:  function (data, crew) {
            data.text = data.text.replace(crew.texreg, crew.texsnip);
        },
        post : function (data, crew) {
            data.html = data.html.replace(/TEXSNIP(\d+)/g, crew.texunsnip);
        }
    }
};
   

module.exports = function (Folder) {

    Folder.sync("md", function (text, args) {
        var doc = this;
        var data = {text: text};
        var crew = {};

        var actors = Object.create(doc.plugins.commonmark);
        
        args.forEach( function (el, i) {
            var ind, key, val;
            if ( (ind = el.indexOf("=") ) !== -1 ) {
                key = el.slice(0, ind).trim();
                try {
                    val = JSON.parse(el.slice(ind+1).trim());
                } catch (e) {
                    console.error("Error in args", e, el);
                    val = {};
                }
                args[i] = key;
                actors[key] = val;
            }
        });
        
        if (args.indexOf("standard") === -1 ) {
            args.unshift("standard");
        }


        args.forEach( function (el) {
            (actors[el].init || noop)(data, crew, actors );
        }); 
        args.forEach( function (el) {
            (actors[el].pre || noop)(data, crew, actors );
        }); 
        args.forEach( function (el) {
            (actors[el].during || noop)(data, crew, actors );
        }); 
        args.forEach( function (el) {
            (actors[el].post || noop)(data, crew, actors );
        }); 
        args.forEach( function (el) {
            (actors[el].exit || noop)(data, crew, actors );
        }); 

        return data.html;
    });

    Folder.plugins.commonmark = actors;


};
