const express = require("express");
const fs = require("fs");
const path = require("path");

const basename = path.basename(module.filename);






module.exports = (app) => {
    fs
        .readdirSync(__dirname)
        .filter(function(file) {
            return (file.indexOf('.') !== 0) && (file !== basename);
        })
        .forEach(function(file) {
            let router = express.Router();
            require(path.join(__dirname, file))(router);
            let prefix = file.split(".js")[0] === "system" ? "/" : `/${file.split(".js")[0]}`
            app.use(prefix, router);
        });
}
