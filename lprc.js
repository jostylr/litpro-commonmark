module.exports = function(Folder, args) {

    require('litpro-jshint')(Folder);

    if (args.file.length === 0) {
        args.file = ["project.md"];
    }
    args.build = ".";
    args.src = ".";


};
