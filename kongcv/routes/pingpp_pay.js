'use strict';
var router = require('express').Router();
var PINGPP_API_KEY = "sk_test_zrDKuD1Oqnb9aLu1iLWbnbT8";
var PINGPP_APP_ID = "app_T80WzLmTyXDSfrv5";
var pingpp = require('../lib_pingpp/pingpp')(PINGPP_API_KEY);

var createPayment = function(order_no, channel, amount, client_ip, open_id, pay_type, cb){
    console.log("create payment 1");
    var extra = {};
    switch (channel) {
        case 'alipay_wap':
            extra = {
                'success_url': 'http://www.yourdomain.com/success',
                'cancel_url': 'http://www.yourdomain.com/cancel'
            };
            break;
        case 'upacp_wap':
            extra = {
                'result_url': 'http://www.yourdomain.com/result'
            };
            break;
        case 'upmp_wap':
            extra = {
                'result_url': 'http://www.yourdomain.com/result?code='
            };
            break;
        case 'bfb_wap':
            extra = {
                'bfb_login': true,
                'result_url': 'http://www.yourdomain.com/success'
            };
            break;
        case 'wx_pub':
            extra = {
                'open_id': open_id
            };
            break;
    }
    // 商户系统自己生成的订单号。如果是【壹收款】，则使用客户端传上来的 'order_no'。
    pingpp.charges.create({
        order_no:  order_no,
        app:       {id: PINGPP_APP_ID},
        channel:   channel,
        amount:    amount,
        client_ip: client_ip,
        currency:  "cny",
        subject:   "kongcv",
        body:      "Charge Body",
        extra:     extra,
        description: pay_type   //new add
    }, cb);
    console.log("create payment 2");
};

router.post('/', function(req, resp, next) {
    //pingpp.parseHeaders(req.headers);
    // 创建 charge
    console.log("recv ping++ pay");
    var client_ip = req.connection.remoteAddress;
    console.log("client_ip:", client_ip);
    //console.log("request:", req.body);
    var params;
    params = req.body;
    //try {
    //    params = JSON.parse(req.body);
    //    params = req.body;
    //    console.log("requset params", params);
    //} catch (err) {
    //    return resp({error:"json_parse_error"});
    //}
    var order_no = params["order_no"];
    console.log("order_no", order_no);
    var channel = params["channel"].toLocaleLowerCase();
    console.log("channel", channel);
    var amount = params["amount"];
    console.log("amount", amount);
    var open_id = params["open_id"];
    console.log("open_id", open_id);
    var open_id = params["pay_type"];
    console.log("pay_type", pay_type);

    createPayment(order_no, channel, amount, client_ip, open_id, pay_type, function(err, charge) {
        if (charge != null) {
            console.log("pay ok");
            return resp.send(charge);
        }
        console.log("pay fail");
        return resp({error:err.raw});
    });
});

router.post('/notify', function(req, resp, next) {
    // 异步通知
    console.log("recv ping++ pay notify");
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
