const wss = require("./lib/socket"); // wss封装
const middleware = require("./middleware"); // socket中间件
const handle = require("./handles"); // game handle
const debugFactory = require("debug");
const common = require("./lib/common");
const debug = debugFactory("weapp-node-tunnel:wss");

/**
 * wss
 */

wss.on('connection', function(ws) {
    handle(ws);

    // connect success.
    ws.tunnel.send({
    	type: "connect"
    });
    ws.tunnel.post("connect");
});

wss.on('error', function(err) {
    console.log(err)
    debug(`wss error ${err.message}`);
});

wss.logger = common.logger;

wss.use(middleware.cookies);;

wss.use(middleware.auth);

/**
 * weoscket与http绑定，同时监听端口，方便日后与express集成
 * 封装wss服务器端，暴露简单api提供给项目
 * Function>use 连接事件消息处理中间件 func(cb(wss, next))
 * Function>on 提供wss内置事件监听接口 func(eventName, cb())
 * Function logger>日志记录器 func(ws, data, inputOrOutput<0,1>)
 * 封装ws客户端websocket对象
 * Function send 发送消息 func(data)
 * 
 */

module.exports = wss;
