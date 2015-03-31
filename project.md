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

This is the module entry point. It adds the commands jshint and the directive
jshint which loads options and globals.


    var commonmark = require('commonmark');

    var reader = new commonmark.Parser();
    var writer = new commonmark.HtmlRenderer();

    module.exports = function (Folder) {
        
        Folder.sync("md", function (text) {
            var parsed = reader.parse(text); // parsed is a 'Node' tree 
            return writer.render(parsed); 
        });
    };

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




