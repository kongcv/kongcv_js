'use strict';
var router = require('express').Router();
//var PINGPP_API_KEY = "";
//var PINGPP_APP_ID = "";
//var pingpp = require('pingpp')(PINGPP_API_KEY);

router.post('/', function(req, res, next) {
    // 异步通知
    var notify;
    try {
        notify = JSON.parse(req.params);
    } catch (err) {
        return resp('fail');
    }
    if (notify.object === undefined) {
        return resp('fail');
    }
    switch (notify.object) {
        case "charge":
            // 开发者在此处加入对支付异步通知的处理代码
            return resp("success");
        case "refund":
            // 开发者在此处加入对退款异步通知的处理代码
            return resp("success");
        default:
            return resp("fail");
    }
});

module.exports = router;
