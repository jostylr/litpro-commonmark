# [litpro-commonmark](# "version: 0.1.0 ; markdown rendering to html in litpro using commonmark")

This implements the md command using commonmark. 

If litpro is installed, run `litpro -b . project.md` initially. After that, one can
just run `litpro` and the lprc.js file will do what needs to be
done. 

This is designed to work with the 1.0 version of literate-programming.


## Directory structure

* [index.js](#index "save: |jshint") This is the file that is the module.
* [README.md](#readme "save: ") The standard README.
* [lprc.js](#lprc "save:| jshint") This contains the options of how to compile
  this using the new version.
* [package.json](#npm-package "save: | jshint") The requisite package file for a npm project. 
* [TODO.md](#todo "save: | raw ## Todo, ---") A list of growing and shrinking items todo.
* [LICENSE](#license "save:") The MIT license as I think that is the standard in the node community. 
* [.npmignore](#npmignore "save: ")
* [.gitignore](#gitignore "save: ")
* [.travis.yml](#travis "save: ")
* [test.js](#test "save:") 



## Index

This is the module entry point. It adds the command md.

The setup is that in `Folder/folder/doc.plugins.commonmark`, we have the
actors that can have the keys init, pre, during, post, exit. The init should
initialize things (such as the reader and writer), the pre deals with the text
before the main parsing, during initiates the parsing and is then available,
and post starts with the rendering to html and then allows further
modifications. Exit is a cleanup or log routine if needed. 

Each argument calls in an actor. One can define an actor inline using `key =
{...}` and the object should have at least one of the keys above. The
arguments will be acted in the order given; the standard one comes first. 

The only predefined actor other than standard is the tex actor which will
escape out tex delimited stuff (dollar signs, etc). 


    var commonmark = require('commonmark');
    var noop = function () {};

    var actors = {
        _commonmark : commonmark,
        standard : _"standard", 
        tex : _"tex"
    };
       

    module.exports = function (Folder) {

        Folder.sync("md", function (text, args) {
            var doc = this;
            var data = {text: text};
            var crew = {};

            var actors = Object.create(doc.plugins.commonmark);
            
            _":see if args has key = object"
            
            if (args.indexOf("standard") === -1 ) {
                args.unshift("standard");
            }


            _":args | sub PLACE, init" 
            _":args | sub PLACE, pre" 
            _":args | sub PLACE, during" 
            _":args | sub PLACE, post" 
            _":args | sub PLACE, exit" 

            return data.html;
        });

        Folder.plugins.commonmark = actors;


    };

[see if args has key = object]()

If the argument is `key = { ...}`, then the object gets added to the processor
with the key given. 

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


[args]()

This runs over the arguments and tries to use any that modify any part of the
process. 

    args.forEach( function (el) {
        (actors[el].PLACE || noop)(data, crew, actors );
    });

### Standard

This does the main processing. 

    {
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
    }


### Litpro

To have substitutions that can occur after the markdown processing, be sure to
use `\1_"whatever"` Using commonmark, this works out fine. 



### Tex

Here we want to escape tex sequences so that the stuff does not get seen by
the marked processor. In particular, any sequence that has double dollar
signs, single dollar signs, backslash paren and backslash square bracket as
delimiters. Note that if these are in backticks, they still get escaped. Which
should be fine (we replace it as is).


    {
        init : _":init",
        pre:  _":pre",
        post : _":post"
    }

[init]()

    function (data, crew) {
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

    }

[pre]() 

    function (data, crew) {
        data.text = data.text.replace(crew.texreg, crew.texsnip);
    }


[post]()

    function (data, crew) {
        data.html = data.html.replace(/TEXSNIP(\d+)/g, crew.texunsnip);
    }



## lprc

This creates the lprc file for the plugin. Basically, it just says to run
project.md as the file of choice and to build it in the top directory.


    module.exports = function(Folder, args) {
    
        require('litpro-jshint')(Folder);

        if (args.file.length === 0) {
            args.file = ["project.md"];
        }
        args.build = ".";
        args.src = ".";


    };

## Test 

    /*global require */

    var tests = require('literate-programming-cli-test')("node ../../node_modules/literate-programming-cli/litpro.js");

    tests( 
        ["simple", "-b ."]
    );

## Readme

This is the readme for the plugin.  

    # Commonmark

    This is a plugin for [literate-programming](https://github.com/jostylr/literate-programming). 
    
    Install `npm install litpro-commonmark` and then you can use this by requiring it in the lprc.js file.


    ## Example lprc.js


## npm package

This should setup the npm file 


    {
      "name": "_`g::docname`",
      "description": "_`g::tagline`",
      "version": "_`g::docversion`",
      "homepage": "https://github.com/_`g::gituser`/_`g::docname`",
      "author": {
        "name": "_`g::authorname`",
        "email": "_`g::authoremail`"
      },
      "repository": {
        "type": "git",
        "url": "git://github.com/_`g::gituser`/_`g::docname`.git"
      },
      "bugs": {
        "url": "https://github.com/_`g::gituser`/_`g::docname`/issues"
      },
      "licenses": [
        {
          "type": "MIT",
          "url": "https://github.com/_`g::gituser`/_`g::docname`/blob/master/LICENSE-MIT"
        }
      ],
      "main": "index.js",
      "engines": {
        "node": ">=0.10"
      },
      "dependencies":{
        _"g::npm dependencies"
      },
      "devDependencies" : {
        _"g::npm dev dependencies"
      },
      "scripts" : { 
        "test" : "node ./test.js"
      },
      "keywords": ["literate programming plugin"]
    }

## gitignore

Stuff not to include in git. Don't check in your modules.

    node_modules
    .checksum

    

## npmignore

npm does not need to see your tests or your litpro code. Submit the js stuff!
Despite the `*.md`, your readme file will be seen. 

    tests
    test.js
    travis.yml
    ghpages
    node_modules
    *.md
    

## Travis

You write tests, right? 


    language: node_js
    node_js:
      - "0.10"
      - "iojs"
      - "0.12"
    

[off](# "block:")

## Todo

Everything

---
[on](# "block:")

## License

    The MIT License (MIT)
    Copyright (c) _"g::year" _"g::authorname"

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.



[James Taylor](https://github.com/jostylr "npminfo: jostylr@gmail.com ; 
    deps: commonmark 0.18.1, merge 1.2.0  ; 
    dev: literate-programming-cli 0.8.4, litpro-jshint 0.1.0,
    literate-programming-cli-test 0.3.0 ")




