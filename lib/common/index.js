let fs = require("fs");
let path = require("path");

const basename = path.basename(module.filename);
let common;

if (!common) {
    common = {};
    fs
        .readdirSync(__dirname)
        .filter(function(file) {
            return (file.indexOf('.') !== 0) && (file !== basename);
        })
        .forEach(function(file) {
            common[file.split(".js")[0]] = require(path.join(__dirname, file));
        });
}

module.exports = common;