const request = require("axios");
const { crypto } = require("./lib/common");

// store manager
let pool = {
	_tunnels: {}
};

pool.get = function(tunnelId) {
	return this._tunnels[tunnelId];
}

pool.add = function(tunnel) {
	this._tunnels[tunnel.tunnelId] = tunnel;
	return true;
}

pool.remove = function(tunnelId) {
	this._tunnels[tunnelId] && this._tunnels[tunnelId].ws.close(); // 关闭信道
	delete this._tunnels[tunnelId];
}

/**
 * Tunnel class 
 */
function Tunnel(data) {
	this.tunnelId = data.tunnelId;
	this.connectUrl = data.connectUrl;
	this.receiveUrl = data.receiveUrl;
	this.tcId = data.tcId;
	this.tcKey = data.tcKey;
	this.status = 0; // 0 未连接 1 已连接
	Object.defineProperty(this, "timer", {
		writable: true,
		value: setTimeout(() => {
			if (this.status === 0)
				delete pool._tunnels[this.tunnelId];
		}, 10000)
	});
}

Tunnel.prototype.connect = function() {
	this.status = 1;
	clearTimeout(this.timer);
}

/**
 * 向客户端呢发送消息
 * @param {String} type 	 	message | close | pong
 * @param {String} content		content
 */
Tunnel.prototype.send = function(data) {

	// 格式化obj->str
	let message = data.type + (data.content ? ":" + data.content : "");
	this.ws && this.ws.send(message);
}

/**
 * 向服务端发送消息
 * @param  {String} message 	type:content
 */
Tunnel.prototype.post = function(message) {

	// 格式化str->obj
	let data = {};
	data.type = message.split(":")[0];
	let content = message.indexOf(":") >= 0 ? message.slice(message.indexOf(":") + 1) : undefined;
	data.content = content;
	data.tunnelId = this.tunnelId;
	data = JSON.stringify(data);

	request.post(this.receiveUrl, {
		code: 0,
		data: data,
		signature: crypto.compute(data, this.tcKey)
	}).catch(err => console.log("post error:", err.message));
}

Tunnel.prototype.close = function() {
	pool.remove(this.tunnelId);
}

pool.Tunnel = Tunnel;

module.exports = pool;
