const util = require("./util");

const bearychatPushStatus = [500, 3002, 2005, 1004];

/**
 * socket进出日志采集
 */
module.exports = (ctx, data, io, callback) => {
    let _io = io ? "Output" : "Input";
    let now = new Date().toISOString();
    let result = data.errno ? (typeof data.errno !== "number" || data.errno <= 500 ? "[Error]" : "[Fail]") : "[Success]";
    let log = `[${now}] [${_io}] ${result}`;

    // 始终使用log打印日志
    console.log(log, data);

    /**
     * 其他记录日志方式
     */

    callback && callback(null, true);
}
