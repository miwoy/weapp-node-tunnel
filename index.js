#!/usr/bin/env node

/**
 * interface
 * getTunnel(postUrl) -> tunnelId & tunnelUrl
 * connect(tunnel) -> websocket
 * 
 * websocket.on
 *  error   错误
 *  close   关闭
 *  connected 已连接
 *  message   消息
 */

const web = require("./web");
const wss = require("./wss");
const http = require("http");
const debugFactory = require("debug");

const debug = debugFactory("weapp-node-tunnel:server");
const server = http.createServer(web);

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '8080';
const domain = process.env.DOMAIN || 'localhost:' + port;

global.CONFIG = { // 全局配置对象
  domain: domain,
  port: port,
  protocol: "ws://"
}

wss.createWSS(server);



/**
 * Event listener for HTTP server "error" event.
 */

let onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

let onListening = () => {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
