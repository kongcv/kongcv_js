var AV = require('leanengine');
var JPush = require("./lib_jpush/JPush.js");

//jpush AppKey,MasterSecret
//release
//var JPush_client = JPush.buildClient('fa4a60e2a3926c041d9fada8','4dde597eb77d1f3219e793e2');
//debug
var JPush_client = JPush.buildClient('ca9af5e8766e94552a733c1e','9d1c242d31e803e77dbfa8f2');

var ERROR_MSG = {
    'ERR_MODE_MUST_EXIST' : '{"state":"error", "code":12, "error":"停车模式不存在"}',
    'ERR_SYSTEM_TRADE' : '{"state":"error", "code":20, "error":"系统交易数据错误"}',
    'ERR_MONEY_MUST_EXIST' : '{"state":"error", "code":38, "error":"体现数不能为空"}',
    'ERR_BILL_ID_MUST_EXIST' : '{"state":"error", "code":42, "error":"支付帐单id必须存在"}',
    'ERR_PAY_TOOL_MUST_EXIST' : '{"state":"error", "code":43, "error":"支付工具必须存在"}',
    'ERR_PAY_ID_MUST_EXIST' : '{"state":"error", "code":44, "error":"支付ID必须存在"}',
    'ERR_NOTIFY_ID_MUST_EXIST' : '{"state":"error", "code":45, "error":"通知ID必须存在"}',
    'ERR_PAY_TYPE_MUST_EXIST' : '{"state":"error", "code":46, "error":"支付类型必须存在"}',
    'ERR_COUPON_ONLY_ONE' : '{"state":"error", "code":47, "error":"一单交易优惠卷只能使用一次"}',
    'ERR_PAY_TOOL_MUST_SAME' : '{"state":"error", "code":48, "error":"支付工具必须一致"}',
    'ERR_PAY_TYPE_FORMAT' : '{"state":"error", "code":49, "error":"支付类型格式错误"}',
};

var RESULT_MSG = {
    'RET_FAIL' : '{"state":"failed", "code":0, "msg":"失败"}',
    'RET_OK' : '{"state":"ok", "code":1, "msg":"成功"}'
};

var kongcv_trade_bill_cls = AV.Object.extend("kongcv_trade_bill");
var kongcv_purse_cls = AV.Object.extend("kongcv_purse");
var kongcv_log_trade_cls = AV.Object.extend("kongcv_log_trade");
var kongcv_rate = 0.9;

/**
 * brief   : insert trade log
 * @param  : request - {"bill_id":"xxxxx","trade_id":"xxxx","pay_tool":"alipy","request":"xxx","log":"xxxx"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
exports._kongcv_insert_trade_log = function(bill_id, request, log) {
    var kongcv_log_trade_obj = new kongcv_log_trade_cls();

    if (typeof(bill_id) != "undefined" && bill_id.length > 0) {
        var kongcv_trade_bill_obj = new kongcv_trade_bill_cls();
        kongcv_trade_bill_obj.id = bill_id;
        kongcv_log_trade_obj.set("bill", kongcv_trade_bill_obj);
    }

    console.log("log insert - request:", request);
    var request_str = JSON.stringify(request);
    if (typeof(request_str) != "undefined" && request_str.length > 0) {
        console.log("start insert request log");
        kongcv_log_trade_obj.add("request", request_str);
    }
    
    if (typeof(log) != "undefined" && log.length > 0) {
        kongcv_log_trade_obj.add("log", log);
    }
    
    kongcv_log_trade_obj.save();
};

/**
 * brief   : insert trade log
 * @param  : request - {"bill_id":"xxxxx","trade_id":"xxxx","pay_tool":"alipy","request":"xxx","log":"xxxx"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
var _kongcv_insert_trade_log = function(bill_id, request, log) {
    var kongcv_log_trade_obj = new kongcv_log_trade_cls();

    if (typeof(bill_id) != "undefined" && bill_id.length > 0) {
        var kongcv_trade_bill_obj = new kongcv_trade_bill_cls();
        kongcv_trade_bill_obj.id = bill_id;
        kongcv_log_trade_obj.set("bill", kongcv_trade_bill_obj);
    }

    console.log("log insert - request:", request);
    var request_str = JSON.stringify(request);
    if (typeof(request_str) != "undefined" && request_str.length > 0) {
        console.log("start insert request log");
        kongcv_log_trade_obj.add("request", request_str);
    }
    
    if (typeof(log) != "undefined" && log.length > 0) {
        kongcv_log_trade_obj.add("log", log);
    }
    
    kongcv_log_trade_obj.save();
};

/**
 * brief   : put trade bill
 * @param  : request - {"bill_id":"xxxxx","money":100,"pay_tool":"alipy","pay_id":"xxxx","notify_id":"xxxx","coupon":0,"pay_type":"xxxx","mode":"community"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
exports.kongcv_put_trade_billdata = function(request) {
    var bill_id = request.bill_id;
    if (typeof(bill_id) == "undefined" || bill_id.length === 0) {
        _kongcv_insert_trade_log(bill_id, request, ERROR_MSG.ERR_BILL_ID_MUST_EXIST);
        return {"result":"error_msg","msg":ERROR_MSG.ERR_BILL_ID_MUST_EXIST}
    }
    console.log("pay_charge bill_id", bill_id);

    var money = request.money;
    if (typeof(money) == "undefined" || money.length === 0) {
        _kongcv_insert_trade_log(bill_id, request, ERROR_MSG.ERR_MONEY_MUST_EXIST);
        return {"result":"error_msg","msg":ERROR_MSG.ERR_MONEY_MUST_EXIST}
    }
    console.log("pay_charge money", money);

    var pay_tool = request.pay_tool;
    if (typeof(pay_tool) == "undefined" || pay_tool.length === 0) {
        _kongcv_insert_trade_log(bill_id, request, ERROR_MSG.ERR_PAY_TOOL_MUST_EXIST);
        return {"result":"error_msg","msg":ERROR_MSG.ERR_PAY_TOOL_MUST_EXIST}
    }
    console.log("pay_charge pay_tool", pay_tool);

    var pay_id = request.pay_id;
    if (typeof(pay_id) == "undefined" || pay_id.length === 0) {
        _kongcv_insert_trade_log(bill_id, request, ERROR_MSG.ERR_PAY_ID_MUST_EXIST);
        return {"result":"error_msg","msg":ERROR_MSG.ERR_PAY_ID_MUST_EXIST}
    }
    console.log("pay_charge pay_id", pay_id);

    var notify_id = request.notify_id;
    if (typeof(notify_id) == "undefined" || notify_id.length === 0) {
        _kongcv_insert_trade_log(bill_id, request, ERROR_MSG.ERR_NOTIFY_ID_MUST_EXIST);
        return {"result":"error_msg","msg":ERROR_MSG.ERR_NOTIFY_ID_MUST_EXIST}
    }
    console.log("pay_charge notify_id", notify_id);

    var pay_type = request.pay_type;
    if (typeof(pay_type) == "undefined" || pay_type.length === 0) {
        _kongcv_insert_trade_log(bill_id, request, ERROR_MSG.ERR_PAY_TYPE_MUST_EXIST);
        return {"result":"error_msg","msg":ERROR_MSG.ERR_PAY_TYPE_MUST_EXIST}
    }
    console.log("pay_charge pay_type", pay_type);
    
    var mode = request.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        _kongcv_insert_trade_log(bill_id, request, ERROR_MSG.ERR_MODE_MUST_EXIST);
        return {"result":"error_msg","msg":ERROR_MSG.ERR_MODE_MUST_EXIST}
    }

    var coupon = request.coupon;

    var kongcv_trade_bill_obj = new kongcv_trade_bill_cls();
    kongcv_trade_bill_obj.id = bill_id;
    console.log("kongcv_trade_bill_obj:", kongcv_trade_bill_obj);
    
    var bill_query = new AV.Query(kongcv_trade_bill_cls);
    bill_query.include("trade.property");
    bill_query.get(bill_id, {
        success : function(bill_obj) {
            var trade_obj = bill_obj.get("trade");
            var trade_property_obj = trade_obj.get("property");
            var trade_coupon = trade_obj.get("coupon");
            var trade_pay_tool = trade_obj.get("pay_tool");
            var trade_handsel_state = trade_obj.get("handsel_state");
            console.log("trade_coupon", trade_coupon);
            console.log("trade_pay_tool", trade_pay_tool);
            console.log("trade_handsel_state", trade_handsel_state);

            if (typeof(trade_handsel_state) != "undefined") {
                if (1 === trade_handsel_state) {
                    if ("handsel" === pay_type) {
                        //test code
                        _kongcv_insert_trade_log(bill_id, request, ERROR_MSG.ERR_PAY_TYPE_FORMAT);
                        //return {"result":"error_msg","msg":ERROR_MSG.ERR_PAY_TYPE_FORMAT}
                    }
                }
            }
            else {
                console.log(ERROR_MSG.ERR_SYSTEM_TRADE);
            }

            if (typeof(coupon) != "undefined") {
                if (coupon > 0) {
                    if (trade_coupon > 0) {
                        //test code
                        _kongcv_insert_trade_log(bill_id, request, ERROR_MSG.ERR_COUPON_ONLY_ONE);
                        //return {"result":"error_msg","msg":ERROR_MSG.ERR_COUPON_ONLY_ONE}
                    }
                    else if (0 === trade_coupon){
                        trade_obj.set("coupon", coupon);
                        money += coupon;
                    }
                }
            }
            else {
                console.log(ERROR_MSG.ERR_SYSTEM_TRADE);
            }

            //test code
            if (typeof(trade_pay_tool) != "undefined" && trade_pay_tool.length > 0) {
                var pay_tool_perfix = pay_tool.split("_");
                var trade_pay_tool_perfix = trade_pay_tool.split("_");
                if (pay_tool_perfix[0] != trade_pay_tool_perfix[0]) {
                    _kongcv_insert_trade_log(bill_id, request, ERROR_MSG.ERR_PAY_TOOL_MUST_SAME);
                    //return {"result":"error_msg","msg":ERROR_MSG.ERR_PAY_TOOL_MUST_SAME}
                }
            }
            //else {
            //    console.log(ERROR_MSG.ERR_SYSTEM_TRADE);
            //}

            bill_obj.set("money", money);
            bill_obj.set("pay_tool", pay_tool);
            bill_obj.set("pay_id", pay_id);
            bill_obj.set("notify_id", notify_id);
            bill_obj.set("pay_type", pay_type);
            bill_obj.set("pay_state", 1);
            if (typeof(coupon) != "undefined" && coupon > 0) {
                bill_obj.set("coupon", coupon);
            }

            bill_obj.save().then(
                function(result) { 
                    console.log("bill save");
                    if ("money" === pay_type) { 
                        trade_obj.set("pay_tool", pay_tool);
                        trade_obj.set("money", money);
                        trade_obj.set("pay_state", 2);
                        trade_obj.set("trade_state", 1);
                    }
                    else if ("handsel" === pay_type) {
                        trade_obj.set("pay_tool", pay_tool);
                        trade_obj.set("money", money);
                        trade_obj.set("handsel", money);
                        trade_obj.set("pay_state", 1);
                        trade_obj.set("handsel_state", 1);
                    }
                    else if ("balance" === pay_type) {
                        trade_obj.increment("money", money);
                        trade_obj.set("balance", money);
                        trade_obj.set("pay_state", 2);
                        trade_obj.set("trade_state", 1);
                    }

                    trade_obj.save().then(
                        function(trade_obj) {
                            console.log("trade save");
                            var verify_trade_money = trade_obj.get("money");
                            var verify_trade_price = trade_obj.get("price");
                            if ("money" === pay_type || "balance" === pay_type) { 
                                if (verify_trade_money != verify_trade_price) {
                                    _kongcv_insert_trade_log(bill_id, request, "verify_charge");
                                }
                            }
                        
                            if ("money" === pay_type && "community" === mode) {
                                var park_obj = trade_obj.get("park_community");
                                if (typeof(park_obj) != "undefined") {
                                    park_obj.set("park_space", 0);
                                }

                                park_obj.save().then(
                                    function(park_obj) { 
                                        //return {"result":"result_msg","msg":RESULT_MSG.RET_OK}
                                    },
                                    function(error) {
                                        _kongcv_insert_trade_log(bill_id, request, "park_save" + error);
                                        //return {"result":"error","msg":error}
                                    }
                                );
                            }
                            else if ("balance" === pay_type && "curb" === mode) {
                                var trade_money = trade_obj.get("money");
                                console.log("trade_money", trade_money);
                                var hirer_obj = trade_obj.get("hirer");
                                console.log("trade_hirer", hirer_obj);

                                var purse_query = new AV.Query(kongcv_purse_cls);
                                purse_query.equalTo("user", hirer_obj);
                                purse_query.limit(1);
                                purse_query.find({
                                    success : function(results) {
                                        var purse_obj;
                                
                                        if (1 === results.length) {
                                            purse_obj = results[0];
                                        }
                                        else if (0 === results.length) {
                                            purse_obj = new kongcv_purse_cls();
                                            purse_obj.set("user", hirer_obj);
                                        }

                                        var own_trade_money;
                                        var property_rate;
                                        var own_rate;

                                        if (trade_property_obj != undefined) {
                                            property_rate = trade_property_obj.get("rate");
                                            own_rate = kongcv_rate - property_rate;
                                            
                                            var property_user_obj = trade_property_obj.get("user");
                                            var property_purse_query = new AV.Query(kongcv_purse_cls);
                                            property_purse_query.equalTo("user", property_user_obj);
                                            property_purse_query.limit(1);
                                            property_purse_query.find({
                                                success : function(results) {
                                                    var property_purse_obj;
                                
                                                    if (1 === results.length) {
                                                        property_purse_obj = results[0];
                                                    }
                                                    else if (0 === results.length) {
                                                        property_purse_obj = new kongcv_purse_cls();
                                                        property_purse_obj.set("user", property_user_obj);
                                                    }

                                                    property_trade_money = parseInt(trade_money * property_rate);
                                                    property_purse_obj.increment("amount", property_trade_money);
                                                    property_purse_obj.increment("money", property_trade_money);
                                                    
                                                    property_purse_obj.save().then(
                                                        function(purse_obj) {
                                                        },
                                                        function(error) {
                                                            _kongcv_insert_trade_log(bill_id, request, "property_purse_save" + error);
                                                        }
                                                    );
                                                },
                                                error : function(error) {
                                                    _kongcv_insert_trade_log(bill_id, request, "property_purse_query" + error);
                                                }
                                            });
                                        }
                                        else {
                                            own_rate = kongcv_rate;
                                        }
                                        own_trade_money = parseInt(trade_money * own_rate); 
                                        purse_obj.increment("amount", own_trade_money);
                                        purse_obj.increment("money", own_trade_money);

                                        purse_obj.save().then(
                                            function(purse_obj) {
                                                //return {"result":"result_msg","msg":RESULT_MSG.RET_OK}
                                            },
                                            function(error) {
                                                _kongcv_insert_trade_log(bill_id, request, "purse_save" + error);
                                                //return {"result":"error","msg":error}
                                            }
                                        );
                                    },
                                    error : function(error) {
                                        _kongcv_insert_trade_log(bill_id, request, "purse_query" + error);
                                        //return {"result":"error","msg":error}
                                    }
                                }); 
                            }
                            else {
                                //return {"result":"result_msg","msg":RESULT_MSG.RET_OK}
                            }
                        },
                        function(error) {
                            _kongcv_insert_trade_log(bill_id, request, "trade_save" + error);
                            //return {"result":"error","msg":error}
                        }
                    );
                },
                function(error) {
                    _kongcv_insert_trade_log(bill_id, request, "bill_save" + error);
                    //return {"result":"error","msg":error}
                }
            );
        },
        error : function(error) {
            _kongcv_insert_trade_log(bill_id, request, "bill_query" + error);
            //return {"result":"error","msg":error}
        }
    });
};

/**
* brief   : push sms info
* @param  : request -{"mobilePhoneNumber" : "xxxx","push_type":"verify_request"}
*           reponse - define error, result or system error
*           {"result":"{"state":"error", "code":20, "msg":"xxxx"}"}
* @return : success - RET_OK
*           error - define error or system error
*/
var _kongcv_sms_send = function(mobilePhoneNumber, push_type, pay_price) {
    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        console.log("_kongcv_sms_send:",ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        //response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }

    if (typeof(push_type) == "undefined" || push_type.length === 0) {
        console.log("_kongcv_sms_send:",ERROR_MSG.ERR_PUSH_TYPE_MUST_EXIST);
        //response.success(ERROR_MSG.ERR_PUSH_TYPE_MUST_EXIST);
        return;
    }

    AV.Cloud.requestSmsCode({
        mobilePhoneNumber:mobilePhoneNumber,
        template:push_type,
        price:pay_price
    }).then(
        function() {
            //response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            console.log("_kongcv_sms_send:",error);
            //response.error(error);
            return;
        }
    );
};

/**
 * brief   : jpush push messge, point to point
 * @param  : request - {"mobilePhoneNumber":"1xxxxxxx", "push_type":"verify_accept", "device_token":"021a12c5dc4", "device_type":"ios", "user_id":"xxxx",extras:{"park_id":"xxxxx","mode":"community","address":"xxxxx","hire_method_id":"xxxxx","hire_method_field":"hore_meter","hire_start":"2015-10-17 08:00:00", "hire_end":"2015-10-17 18:00:00","own_device_token":"xxxxx","own_device_type":"android","own_mobile":"1xxxxx", "push_type":"verify_accept","trade_id":"xxx","pay_type":"xxx","pay_tool":"alipy","price":0},"use_token":1}
 *           response - return map recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
exports.kongcv_trade_jpush_message_p2p = function(mobile, device_token, device_type, price, mode) {
    var device_notify;
    var push_info = "你好,你已收到支付费用,收费金额是";
    var price_info = price + "元";
    push_info += price_info;
    
    var extras = {'push_type':'charge_info'};
    if ("ios" === device_type) {
        device_notify = JPush.ios(push_info, 'happy', 1, true, extras);
    }
    else if ("android" === device_type) {
        device_notify = JPush.android(push_info, null, 1, extras);
    }
    else {
        console.log("kongcv_trade_jpush_push_message_p2p:",ERROR_MSG.ERR_INFO_FORMAT);
        return {"result":"error_msg","msg":ERROR_MSG.ERR_INFO_FORMAT}
    }

    console.log("start send trade jpush");
    JPush_client.push().setPlatform(device_type)
    .setAudience(JPush.registration_id(device_token))
    .setNotification('Hi, Kongcv', device_notify)
    .send(function(err, res) {
        if (err) {
            if (err instanceof JPush.APIConnectionError) {
                console.log("kongcv_trade_jpush_push_message_p2p:",err);
                //return {"result":"error_msg","msg":err}
            } 
            else if (err instanceof  JPush.APIRequestError) {
                console.log("kongcv_trade_jpush_push_message_p2p:",err);
                //return {"result":"error_msg","msg":err}
            }
        } 
        else {
            console.log("jpush send ok");
            
            if (typeof(mode) != "undefined" && mode.length > 0) {
                if ("curb" === mode) {
                    return;
                }
            }

            _kongcv_sms_send(mobile, "charge_info", price);
        }
    });
};

