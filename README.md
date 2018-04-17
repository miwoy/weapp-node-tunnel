# WEAPP nodejs信道服务
## 简介

  使用wafer2解决方案时，信道服务始终依赖于腾讯内部提供的信道服务系统，对腾讯过于依赖，可控性差，于是使用nodejs按照[wafer2-node-sdk]与[wafer2-client-sdk]的接口封装独立的信道服务系统。

  * [tunnel wiki]
  * [wafer2-node-sdk] v1.3.2
  * [wafer2-client-sdk] v1.0.0

[wafer2-node-sdk]:  https://github.com/tencentyun/wafer2-node-sdk        
[wafer2-client-sdk]:  https://github.com/tencentyun/wafer2-client-sdk
[tunnel wiki]: https://github.com/tencentyun/wafer/wiki/%E4%BF%A1%E9%81%93%E6%9C%8D%E5%8A%A1

## 使用

1.  克隆项目
<pre>git clone https://github.com/miwoy/weapp-node-tunnel</pre>
2.  配置
<pre>
// index.js
global.CONFIG = {
    serverHost: "127.0.0.1", // 信道服务器地址
    port: 80, // 信道服务端口
    protocol: "ws://" // 信道服务协议
} 
</pre>
3.  安装依赖
<pre>
    npm install
</pre>
4.  启动
<pre>
    npm start
</pre>
5.  配合wafer2使用
<pre>
    // 修改sdk.config.js
    serverHost: 'localhost:5757',
    tunnelServerUrl: 'http://127.0.0.1:8080',
    tunnelSignatureKey: 'abcdefghijkl',
</pre>
6.  补充说明  
    *   注意配置tunnelServerUrl应当是一个不带端口号的服务地址，否则会出错。原因是wafer2没有处理port，示例中使用端口号是因为作者修改了wafer2源码
    *   配置serverHost应当是一个主机地址，该地址用来接受信道服务发送的消息，注意协议使用tunnelServerUrl中的协议，所以确保tunnelServerUrl的协议是当前server服务使用的协议

## API

待补充...


## 说明
*   index.js    启动项
*   web.js      web配置
*   wss.js      wss配置
*   routes      web路由
*   handles     wss处理器
*   middleware  wss中间件

接口协议
````
/**
 * interface
 * getTunnel(postUrl) -> tunnelId & tunnelUrl
 * connect(tunnelUrl) -> websocket
 * emit message -> on message
 * post message -> post message
 * 
 * websocket.on
 *  error       错误
 *  close       关闭
 *  connect     已连接
 *  ping        ping/pong
 *  message     消息
 */
````

## 未完成
*   日志输出
*   API文档
*   接口测试
*   集群方案

## Contributions
*   [Miwoes](https://github.com/miwoy)

## LICENSE
MIT License

Copyright (c) 2018 miwoy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.