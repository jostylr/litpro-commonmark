/*global require */

var tests = require('literate-programming-cli-test')("node ../../node_modules/literate-programming-cli/litpro.js");

tests( 
    ["simple", "-b ."],
    ["tex", "-b ."],
    ["lp", "-b ."]
);
