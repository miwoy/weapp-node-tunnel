let crypto = require("crypto");

// 加密
const encrypt = (str, secret) => {
    let cipher = crypto.createCipher('aes192', secret);
    let enc = cipher.update(str, 'utf8', 'hex'); //编码 式从utf-8转为hex;
    enc += cipher.final('hex'); //编码 式从转为hex;
    return enc;
};

// 解密
const decrypt = (enc, secret) => {
    let decipher = crypto.createDecipher('aes192', secret);
    let str = decipher.update(enc, 'hex', 'utf8'); //编码 式从hex转为utf-8;
    str += decipher.final('utf8'); //编码 式从utf-8;
    return str;
}

/**
 * md5加密
 * @param password
 * @param salt
 * @returns {*}
 */
function md5(password, salt) {
    let secret = password + (salt || "");

    return crypto.createHash('md5')
        .update(secret)
        .digest('hex');
}

/**
 * sha1
 */
function sha1(message) {
    return crypto.createHash('sha1').update(message, 'utf8').digest('hex')
}

/**
 * 计算签名
 */
function compute (input, tunnelSignatureKey) {
    return sha1(input + tunnelSignatureKey)
}

/**
 * 校验签名
 */
function check (input, signature) {
    return compute(input) === signature
}


module.exports = {
    encrypt: encrypt,
    decrypt: decrypt,
    md5: md5,
    sha1: sha1,
    compute: compute,
    check: check
}
