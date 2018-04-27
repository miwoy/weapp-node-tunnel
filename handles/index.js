const _ = require("lodash");
const x = require("../lib/common/x");
const uuid = require("node-uuid");
const debugFactory = require("debug");

const debug = debugFactory("peapad:handle");


module.exports = (ws) => {
    ws.on("message", async(message) => { // message事件处理器

        if (typeof message !== "string") return; // 忽略非字符串类型的消息

        let type = message.split(":")[0];
        if (type === "ping") { // 处理PingPong
            ws.tunnel.send({
                type: "pong"
            });
        } else {
            ws.tunnel.post(message);
        }

    });
    ws.on("close", async() => { // 处理socket断开连接事件
        ws.tunnel.close();
    });
    ws.on("error", async(err) => {
        ws.tunnel.post("error:" + err.message || err);
        ws.tunnel.close(); // 清理信道
    });
}
