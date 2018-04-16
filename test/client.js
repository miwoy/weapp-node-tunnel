#!/usr/bin/env node

var WebSocket = require('ws');
var reuqest = require("../lib/request");
const host = "127.0.0.1:8080";
(async() => {
    let res = await reuqest.post("http://" + host + "/get/wsurl", {
        "data": {
            "receiveUrl": "http://127.0.0.1:5757"
        },
        "tcId": "12345",
        "tcKey": "abcdefg",
        "signature": "signature"
    });


    res.data = JSON.parse(res.data);
    console.log("WS服务器地址", res.data.connectUrl);
    let ws = new WebSocket(res.data.connectUrl, {
        origin: 'https://websocket.org',
        headers: {
            other: "test"
        }
    });
    ws.on('open', function open() {
        console.log('connected');
        // ws.send(JSON.stringify({
        //     directive: "test",
        //     data: {}
        // }));
        // ws.close()
        console.log(ws.readyState)

    });
    ws.on('close', function close() {
        console.log('disconnected');
    });

    ws.on("ping", function(data) {
        console.log("ping:" + data);
        ws.ping("ping", true, true);
        ws.pong("pong")
    })



    ws.on("pong", function(data) {
        console.log("pong:" + data)
        // ws.pong("pong", true, true);
        // ws.ping("ping", true, true);
    });

    ws.on("error", function(err) {
        console.log(err);
    })

    ws.on('message', function incoming(data) {
        console.log("message: ", data)
    })

})();
