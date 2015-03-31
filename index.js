var commonmark = require('commonmark');

var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();

module.exports = function (Folder) {
    
    Folder.sync("md", function (text) {
        var parsed = reader.parse(text); // parsed is a 'Node' tree 
        return writer.render(parsed); 
    });
};
