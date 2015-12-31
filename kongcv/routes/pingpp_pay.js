//'use strict';
var router = require('express').Router();
var PINGPP_API_KEY = "sk_test_zrDKuD1Oqnb9aLu1iLWbnbT8";
var PINGPP_APP_ID = "app_T80WzLmTyXDSfrv5";
var pingpp = require('../lib_pingpp/pingpp')(PINGPP_API_KEY);
var pay_charge = require('../pay_trade');

var createPayment = function(order_no, channel, amount, client_ip, open_id, subject, pay_info, cb){
    console.log("create payment strart");
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
        subject:   subject,
        body:      pay_info,
        extra:     extra
        //description: pay_type   //new add
    }, cb);
    console.log("create payment end");
};

router.post('/', function(req, resp, next) {
    //pingpp.parseHeaders(req.headers);
    // 创建 charge
    console.log("recv ping++ pay");
    var client_ip = req.connection.remoteAddress;
    console.log("client_ip:", client_ip);
    var params = req.body;
    //try {
    //    params = JSON.parse(req.body);
    //    params = req.body;
    //    console.log("requset params", params);
    //} catch (err) {
    //    return resp({error:"json_parse_error"});
    //}
    var order_no = params["order_no"];
    if (order_no === undefined || order_no.length === 0) {
        return resp('error:charge order_no undefined', 400);
    }
    console.log("order_no", order_no);
    
    var channel = params["channel"].toLocaleLowerCase();
    if (channel === undefined || channel.length === 0) {
        return resp('error:charge channel undefined', 400);
    }
    console.log("channel", channel);
    
    var amount = params["amount"];
    if (amount === undefined || amount.length === 0) {
        return resp('error:charge amount undefined', 400);
    }
    console.log("amount", amount);
    
    var open_id = params["open_id"];
    if (open_id === undefined || open_id.length === 0) {
        return resp('error:charge open_id undefined', 400);
    }
    console.log("open_id", open_id);

    var subject = params["subject"];
    if (subject === undefined || subject.length === 0) {
        return resp('error:charge subject undefined', 400);
    }
    console.log("subject", subject);
    
    var pay_info = params["pay_info"];
    if (pay_info === undefined || pay_info.length === 0) {
        return resp('error:charge pay_info undefined', 400);
    }
    console.log("pay_info", pay_info);
    
    var json_obj = eval("(" + pay_info + ")");
    var trade_id = json_obj["coupon"];
    if (coupon === undefined || coupon.length === 0) {
        return resp('notify pay_info.coupon undefined', 400);
    }

    var pay_type = json_obj["pay_type"];
    if (pay_type === undefined || pay_type.length === 0) {
        return resp('notify pay_info.pay_type undefined', 400);
    }
    
    var mode = json_obj["mode"];
    if (mode === undefined || mode.length === 0) {
        return resp('notify pay_info.mode undefined', 400);
    }
    console.log("coupon:%d, pay_type:%s, mode:%s", coupon, pay_type, mode);

    createPayment(order_no, channel, amount, client_ip, open_id, subject, pay_info, function(err, charge) {
        if (charge != null) {
            console.log("pay ok charge:", charge);
            return resp.send(charge);
        }
        console.log("pay fail");
        return resp.send({error:err.raw});
    });
});

router.post('/notify', function(req, resp, next) {
    // 异步通知
    console.log("recv ping++ pay notify");
    var notify = req.body;
    console.log("notify req", notify);
    /*try {
        notify = JSON.parse(req.params);
    } catch (err) {
        return resp('fail');
    }*/
    if (notify.type === undefined) {
        return resp('error:notify type undefined', 400);
    }

    var notify_id = notify.id;
    if (notify_id === undefined || notify_id.length === 0) {
        return resp('error:notify id undefined', 400);
    }
    console.log("notify_id", notify_id);

    var charge = notify.data.object;
    if (charge === undefined || charge.length === 0) {
        return resp('error:notify charge undefined', 400);
    }

    var pay_id = charge.id;
    if (pay_id === undefined || pay_id.length === 0) {
        return resp('error:notify charge.id undefined', 400);
    }
    console.log("pay_id", pay_id);


    var bill_id = charge.order_no;
    if (bill_id === undefined || bill_id.length === 0) {
        return resp('error:notify charge.order_no undefined', 400);
    }
    console.log("bill_id", bill_id);

    var pay_tool = charge.channel;
    if (pay_tool === undefined || pay_tool.length === 0) {
        return resp('error:notify charge.channel undefined', 400);
    }
    console.log("pay_tool", pay_tool);

    var money = charge.amount / 100;
    if (money === undefined || money.length === 0) {
        return resp('error:notify charge.amount undefined', 400);
    }
    console.log("money", money);
 
    var body = notify.data.object.body;
    if (body === undefined || body.length === 0) {
        return resp('error:notify body undefined', 400);
    }
    console.log("body", body);
 
    var json_obj = eval("(" + body + ")");
    var coupon = json_obj["coupon"];
    if (coupon === undefined || coupon.length === 0) {
        return resp('error:notify body.trade_id undefined', 400);
    }

    var pay_type = json_obj["pay_type"];
    if (pay_type === undefined || pay_type.length === 0) {
        return resp('error:notify body.pay_type undefined', 400);
    }

    var mode = json_obj["mode"];
    if (mode === undefined || mode.length === 0) {
        return resp('error:notify body.mode undefined', 400);
    }
    console.log("coupon:%d, pay_type:%s, mode:%s", coupon, pay_type, mode);

    switch (notify.type) {
        case "charge.succeeded":
            console.log("notify charge.succeeded");
            var param = {
                bill_id : bill_id,
                money : money,
                pay_tool : pay_tool,
                pay_id : pay_id,
                notify_id : notify_id,
                coupon : coupon,
                pay_type : pay_type,
                mode : mode
            };
            console.log("notify param:", param);
            
            var ret = pay_charge.kongcv_put_trade_billdata(param);
            console.log("notify ret:", ret);
            // 开发者在此处加入对支付异步通知的处理代码
            return resp("ok", 200);
            break;
        case "refund.succeeded":
            // 开发者在此处加入对退款异步通知的处理代码
            return resp("ok", 200);
            break;
        default:
            return resp("don't know notify type", 400);
            break;
    }
});

module.exports = router;
