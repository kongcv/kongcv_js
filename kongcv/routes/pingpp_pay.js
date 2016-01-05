'use strict';
var router = require('express').Router();
var PINGPP_API_KEY = "sk_test_zrDKuD1Oqnb9aLu1iLWbnbT8";
var PINGPP_APP_ID = "app_T80WzLmTyXDSfrv5";
var pingpp = require('../lib_pingpp/pingpp')(PINGPP_API_KEY);
var pay_charge = require('../pay_trade');
var crypto = require("crypto");
var fs  = require("fs");

var verify_signature = function(raw_data, signature, pub_key_path) {
    var verifier = crypto.createVerify('RSA-SHA256').update(raw_data, "utf8");
    var pub_key = fs.readFileSync(pub_key_path, "utf8");
    return verifier.verify(pub_key, signature, 'base64');
}

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
    if (client_ip[0] === ':') {
        client_ip = client_ip.substring(7);
    }
    console.log("ping++ client_ip:", client_ip);
    var params = req.body;
    console.log("params:", params);
    //try {
    //    params = JSON.parse(req.body);
    //    params = req.body;
    //    console.log("requset params", params);
    //} catch (err) {
    //    return resp({error:"json_parse_error"});
    //}
        
    var order_no = params["order_no"];
    if (order_no === undefined || order_no.length === 0) {
        return resp.status(400).send('error:charge order_no undefined');
    }
    console.log("order_no", order_no);
    
    var channel = params["channel"].toLocaleLowerCase();
    if (channel === undefined || channel.length === 0) {
        return resp.status(400).send('error:charge channel undefined');
    }
    console.log("channel", channel);
    
    var amount = params["amount"];
    if (amount === undefined || amount.length === 0) {
        return resp.status(400).send('error:charge amount undefined');
    }
    console.log("amount", amount);
    
    var open_id = params["open_id"];
    if (open_id === undefined || open_id.length === 0) {
        return resp.status(400).send('error:charge open_id undefined');
    }
    console.log("open_id", open_id);

    var subject = params["subject"];
    if (subject === undefined || subject.length === 0) {
        return resp.status(400).send('error:charge subject undefined');
    }
    console.log("subject", subject);
    
    var pay_info = params["pay_info"];
    if (pay_info === undefined || pay_info.length === 0) {
        return resp.status(400).send('error:charge pay_info undefined');
    }
    //console.log("pay_info", pay_info);
    
    var json_obj = eval("(" + pay_info + ")");
    var coupon = json_obj["coupon"];
    if (coupon === undefined || coupon.length === 0) {
        return resp.status(400).send('notify pay_info.coupon undefined');
    }

    var pay_type = json_obj["pay_type"];
    if (pay_type === undefined || pay_type.length === 0) {
        return resp.status.send('notify pay_info.pay_type undefined');
    }
    
    var mode = json_obj["mode"];
    if (mode === undefined || mode.length === 0) {
        return resp.status(400).send('notify pay_info.mode undefined');
    }
    //var coupon = pay_info.coupon;
    //var pay_type = pay_info.pay_type;
    //var mode = pay_info.mode;
    //var par_info_str = JSON.stringify(pay_info);
    console.log("pay_info", pay_info);
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
    //console.log("notify req", notify);
    
    var pub_key_path = __dirname + "/rsa_public_key.pem";
    console.log("ping++ rsa_public_key dir:", pub_key_path);
    var signature = req.headers['x-pingplusplus-signature'];
    console.log("ping++ signature:", signature);
 
    /*try {
        notify = JSON.parse(req.params);
    } catch (err) {
        return resp('fail');
    }*/
    if (notify.type === undefined) {
        return resp.status(400).send('error:notify type undefined');
    }

    var notify_id = notify.id;
    if (notify_id === undefined || notify_id.length === 0) {
        return resp.status(400).send('error:notify id undefined');
    }
    console.log("notify_id", notify_id);

    var charge = notify.data.object;
    if (charge === undefined || charge.length === 0) {
        return resp.status(400).send('error:notify charge undefined');
    }

    var pay_id = charge.id;
    if (pay_id === undefined || pay_id.length === 0) {
        return resp.status(400).send('error:notify charge.id undefined');
    }
    console.log("pay_id", pay_id);

    var bill_id = charge.order_no;
    if (bill_id === undefined || bill_id.length === 0) {
        return resp.status(400).send('error:notify charge.order_no undefined');
    }
    console.log("bill_id", bill_id);

    var pay_tool = charge.channel;
    if (pay_tool === undefined || pay_tool.length === 0) {
        return resp.status(400).send('error:notify charge.channel undefined');
    }
    console.log("pay_tool", pay_tool);

    //var money = charge.amount / 100;
    var money = charge.amount;
    if (money === undefined || money.length === 0) {
        return resp.status(400).send('error:notify charge.amount undefined');
    }
    console.log("money", money);
 
    var paid = charge.paid;
    if (paid != true) {
        return resp.status(400).send('error:notify charge.paid false');
    }
    console.log("paid", paid); 

    var body = notify.data.object.body;
    if (body === undefined || body.length === 0) {
        return resp.status(400).send('error:notify body undefined');
    }
    console.log("body", body);
 
    var json_obj = eval("(" + body + ")");
    var coupon = json_obj["coupon"];
    if (coupon === undefined || coupon.length === 0) {
        return resp.status(400).send('error:notify body.coupon undefined');
    }

    var pay_type = json_obj["pay_type"];
    if (pay_type === undefined || pay_type.length === 0) {
        return resp.status(400).send('error:notify body.pay_type undefined');
    }

    var mode = json_obj["mode"];
    if (mode === undefined || mode.length === 0) {
        return resp.status(400).send('error:notify body.mode undefined');
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
            
            if (verify_signature(JSON.stringify(notify), signature, pub_key_path)) {
                console.log('ping++ verification succeeded');
            } 
            else { 
                pay_charge.kongcv_insert_trade_log(bill_id, param, "{'error':'ping++ verification failed'}");
                return resp.status(400).send('error:ping++ verification failed');
            }

            pay_charge.kongcv_put_trade_billdata(param);
            return resp.status(200).send("success");
            break;
        case "refund.succeeded":
            return resp.status(200).send("success");
            break;
        default:
            return resp.status(400).send("don't know notify type");
            break;
    }
});

module.exports = router;
