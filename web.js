const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser"); // express body parse
const routes = require("./routes"); // express routes;
const debugFactory = require("debug");

const debug = debugFactory("weapp-node-tunnel:web");
const app = express();




/**
 * express http 部分
 */
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined')); // 日志打印
routes(app)

module.exports = app;
