module.exports = async(ws, next) => {
    if (!ws.headers.cookie) {
        let query = {};
        let querystring = ws._ws.upgradeReq.url.split("?")[1];
        let queryArray = querystring.split("&");
        queryArray.forEach(v => {
            query[v.split("=")[0]] = v.split("=")[1]
        });
        ws.headers.cookie = query;
    } else {
        let spltCookies = ws.headers.cookie && ws.headers.cookie.split(";");
        let cookies = {};
        spltCookies.forEach(prop => {
            let spltProp = prop.split("=");
            cookies[spltProp[0]] = spltProp[1];
        });
        ws.headers.cookie = cookies;

        // if (!cookies.authorization) ws.send({ errno: 401 }); // 401
    }

    next();
}
