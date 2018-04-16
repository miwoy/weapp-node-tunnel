const _ = require("lodash");
const tunnelStore = require("../tunnelStore");
const uuid = require("node-uuid");
const { crypto } = require("../lib/common");

/**
 * 校验签名
 *   -data  数据字符串
 *   -tcId  md5(serverHost)
 *   -tcKey 签名key
 *   -signature  签名
 */
let checkSignature = async(req, res, next) => {
    let result = crypto.compute(req.body.data, req.body.tcKey) === req.body.signature;
    if (result) {
        req.body.data = JSON.parse(req.body.data);
        next();
    } else {
        res.json({
            code: -1,
            error: "check signature failed"
        });
    }
}

module.exports = (route) => {

    route.post("/get/wsurl", checkSignature, async(req, res) => {
        // 创建一个tunnel
        let tunnelId = uuid.v4();
        let { tcId, tcKey, data: { receiveUrl } } = req.body;
        let connectUrl = CONFIG.protocol + CONFIG.serverHost + ":" + CONFIG.port + "?tunnelId=" + tunnelId + "&tcId=" + tcId;
        let tunnel = new tunnelStore.Tunnel({ tunnelId, tcId, connectUrl, receiveUrl, tcKey });
        tunnelStore.add(tunnel);
        res.json({
            code: 0,
            data: JSON.stringify({
                tunnelId: tunnelId,
                connectUrl: connectUrl,
                tcId: tcId
            })
        });
    });


    /**
     * 
     *  {
     *     data: [{ 
     *         tunnelIds:[], 
     *         type: "message", // or close
     *         content: JSON.stringify({
     *             'type': messageType,
     *             'content': messageContent
     *         })  
     *     }],
     *     tcId: md5(config.serverHost),
     *     tcKey: config.tunnelSignatureKey,
     *     signature: signature.compute(data)
     *  }
     */
    route.post("/ws/push", checkSignature, async(req, res) => {
        req.body.data.forEach(data => {
            if (data.type === "message") {
                data.tunnelIds.forEach(tunnelId => {
                    let tunnel = tunnelStore.get(tunnelId)
                    tunnel && tunnel.send(data);
                });
            } else if (data.type === "close") {
                data.tunnelIds.forEach(tunnelId => {
                    let tunnel = tunnelStore.get(tunnelId)
                    tunnel && tunnel.send({ type: "close" });
                    tunnelStore.remove(tunnelId);
                });
            }
        });

        res.json({
            code: 0,
            data: "ok"
        })
    });


    route.get("/system", async(req, res) => {
        res.send(tunnelStore._tunnels)
    });
}
