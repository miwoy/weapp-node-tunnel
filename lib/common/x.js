module.exports = {
    each: async(arry, asyncFunc) => {
        let promiseAll = [];

        arry.forEach(key => {
            promiseAll.push(asyncFunc(key));
        });

        let r = await Promise.all(promiseAll);

        return r;
    }
}
