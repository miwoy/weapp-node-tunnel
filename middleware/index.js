const fs = require("fs");
const path = require("path");


const basename = path.basename(module.filename);
let middleware;

if (!middleware) {
    middleware = {};
    fs
        .readdirSync(__dirname)
        .filter(function(file) {
            return (file.indexOf('.') !== 0) && (file !== basename);
        })
        .forEach(function(file) {
            middleware[file.split(".js")[0]] = require(path.join(__dirname, file));
        });
}

module.exports = middleware;