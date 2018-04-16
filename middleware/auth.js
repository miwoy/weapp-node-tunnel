const uuid = require("node-uuid");
const debugFactory = require("debug");
const tunnelStore = require("../tunnelStore");

const debug = debugFactory("weapp-node-tunnel:middleware:auth");


module.exports = async(ws, next) => {
    let tunnelId = ws.headers.cookie.tunnelId;
    let version = ws.headers.cookie.version;


    if (!tunnelId) {
        ws.send({ errno: 401, errmsg: "缺少tunnelId" });
        return ws.close();
    }

    let tunnel = tunnelStore.get(tunnelId);

    if (!tunnel) {
        ws.send({
            errno: 401,
            errmsg: "无效的tunnelId"
        });
        return ws.close();
    }

    if (tunnel.status) {
        ws.send({
            errno: 401,
            errmsg: "信道被占用"
        });
        return ws.close();
    }

    tunnel.status = 1; // 启动信道，说明有用户连入

    // tunnel.ws = ws;
    ws.tunnel = tunnel;
    Object.defineProperty(tunnel, "ws", {
        writable: true,
        value: ws
    });
    

    next();
}
