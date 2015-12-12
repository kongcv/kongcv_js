var AV = require('leanengine');
var JPush = require("./lib_jpush/JPush.js");

var JPush_client = JPush.buildClient('9a21c9f40374a02d1936a9d1','204a1e5f498ba6fb4b743381');

var ERROR_MSG = {
    'ERR_USER_MOBILE_MUST_EXIST' : '{"state":"error", "code":0, "error":"手机号不能为空"}',
    'ERR_USERNAME_MUST_EXIST' : '{"state":"error", "code":1, "error":"用户名不能为空"}',
    'ERR_SMSCODE_MUST_EXIST' : '{"state":"error", "code":2, "error":"手机验证码不能为空"}',
    'ERR_CITY_MUST_EXIST' : '{"state":"error", "code":3, "error":"城市不能为空"}',
    'ERR_ADDRESS_MUST_EXIST' : '{"state":"error", "code":4, "error":"道路地址不能为空"}',
    'ERR_HIRE_START_MUST_EXIST' : '{"state":"error", "code":5, "error":"出租开始日期不能为空"}',
    'ERR_HIRE_END_MUST_EXIST' : '{"state":"error", "code":6, "error":"出租结束日期不能为空"}',
    'ERR_LOCATION_INFO_MUST_EXIST' : '{"state":"error", "code":7, "error":"地理位置信息不能为空"}',
    'ERR_HIRE_METHOD_MUST_EXIST' : '{"state":"error", "code":7, "error":"出租方式信息不能为空"}',
    'ERR_HIRE_PRICE_MUST_EXIST' : '{"state":"error", "code":8, "error":"出租价格信息不能为空"}',
    'ERR_INFO_FORMAT' : '{"state":"error", "code":9, "error":"请求信息格式错误"}',
    'ERR_HIRE_COMMUNITY_SAME_RECORD' : '{"state":"error", "code":10, "error":"出租信息-社区车位有相同记录"}',
    'ERR_HIRE_COMMUNITY_RECORD_LIMIT' : '{"state":"error", "code":11, "error":"出租信息-社区车位用户最多发3条记录"}',
    'ERR_MODE_MUST_EXIST' : '{"state":"error", "code":12, "error":"停车模式不存在"}',
    'ERR_MODE_NO_EXIST' : '{"state":"error", "code":13, "error":"停车模式数据格式存在错误"}',
    'ERR_MAX_DISTANCE_MUST_EXIST' : '{"state":"error", "code":14, "error":"最大距离不能为空"}',
    'ERR_SKIP_MUST_EXIST' : '{"state":"error", "code":15, "error":"跳过记录数设置必须设置"}',
    'ERR_LIMIT_MUST_EXIST' : '{"state":"error", "code":16, "error":"限定记录数设置必须设置"}',
    'ERR_PARK_TYPE_MUST_EXIST' : '{"state":"error", "code":17, "error":"出租类型不能为空"}',
    'ERR_PARK_ID_MUST_EXIST' : '{"state":"error", "code":18, "error":"出租ID不能为空"}',
    'ERR_PARK_PREORDER_EXIST' : '{"state":"error", "code":19, "error":"车位已被预订,请稍后再来查看"}',
    'ERR_USER_ID_MUST_EXIST' : '{"state":"error", "code":20, "error":"用户ID不能为空"}',
    'ERR_SYSTEM_TRADE' : '{"state":"error", "code":20, "error":"系统交易数据错误"}',
    'ERR_SYSTEM_PREORDER' : '{"state":"error", "code":21, "error":"系统预订数据错误"}',
    'ERR_COMMENT_MUST_EXIST' : '{"state":"error", "code":22, "error":"必须有评论数据"}',
    'ERR_PUSH_TYPE_MUST_EXIST' : '{"state":"error", "code":23, "error":"推送类型必须设定"}',
    'ERR_DEVICE_TYPE_MUST_EXIST' : '{"state":"error", "code":24, "error":"设备类型必须设定"}',
    'ERR_DEVICE_TOKEN_MUST_EXIST' : '{"state":"error", "code":25, "error":"设备TOKEN必须设定"}',
    'ERR_JPUSH_EXTRAS_MUST_EXIST' : '{"state":"error", "code":26, "error":"附加推送数据必须存在"}',
    'ERR_TRADE_ID_MUST_EXIST' : '{"state":"error", "code":27, "error":"交易单id必须存在"}',
    'ERR_PARK_ACCEPT_EXIST' : '{"state":"error", "code":28, "error":"你在规定的30分钟内已接受了一次租用请求,请稍后再决定是否接受此次请求"}',
    'ERR_PARK_DATE_EXIST' : '{"state":"error", "code":29, "error":"你选择的租用日期与其他用户有冲突,请重新选择时间段"}',
    'ERR_ACTION_MUST_EXIST' : '{"state":"error", "code":30, "error":"动作方式必须存在"}',
    'ERR_ROLE_MUST_EXIST' : '{"state":"error", "code":30, "error":"角色必须存在"}',
    'ERR_HIRER_MUST_EXIST' : '{"state":"error", "code":30, "error":"出租人必须存在"}',
};

var RESULT_MSG = {
    'RET_FAIL' : '{"state":"failed", "code":0, "msg":"失败"}',
    'RET_OK' : '{"state":"ok", "code":1, "msg":"成功"}'
};

var PUSH_INFO = {
    'VERIFY_ACCEPT' : '你好，你的请求已被确认，请立即支付，订单确定后10分钟有效，过期需要下一次验证，请经快操作！',
    'VERIFY_REJECT' : '你好，你的请求已被拒绝，可能别的用户已申请租用！',
    'VERIFY_REQUEST' : '你好，有一个新的租用请求，请及时回复！'
};

var debug_role_id = "561e1b9b60b227b7f4ab449e";
var release_role_id = "561f4128ddb24819b7e4bc52";
var debug_hire_method_timing = "56373f1100b0ee7f5ee8355c";
var release_hire_method_timing = "add objectid";

var role_cls = AV.Object.extend("_Role");
var user_cls = AV.Object.extend("_User");
var kongcv_hire_method_cls = AV.Object.extend("kongcv_hire_method");
var kongcv_advertise_cls = AV.Object.extend("kongcv_advertise");
var kongcv_park_type_cls = AV.Object.extend("kongcv_park_type");
var kongcv_park_community_cls = AV.Object.extend("kongcv_park_community");
var kongcv_park_curb_cls = AV.Object.extend("kongcv_park_curb");
var kongcv_trade_cls = AV.Object.extend("kongcv_trade");
var kongcv_trade_bill_cls = AV.Object.extend("kongcv_trade_bill");
var kongcv_preorder_cls = AV.Object.extend("kongcv_preorder");
var kongcv_accept_cls = AV.Object.extend("kongcv_accept");
var kongcv_comment_cls = AV.Object.extend("kongcv_comment");
var kongcv_push_message_cls = AV.Object.extend("kongcv_push_message");
var limit_minseconds = 30 * 60 * 1000;

var user_0 = "kongcv_admin";
var user_0_ps = "kongcv!23";

/**
 * brief   : get smscode
 * @param  : request - {"mobilePhoneNumber":"13xxxxxx"}
 *           response - RET_OK or ERROR
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功\"}
 * @return : RET_OK - success
 *           ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_smscode", function(request, response) {
    var mobilePhoneNumber = request.params.mobilePhoneNumber;
    
    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }

    AV.Cloud.requestSmsCode(mobilePhoneNumber).then(
        function(result) {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            response.error(error);
            return;
        }
    );
});

/**
 * brief   : user sign up
 * @param  : request - {"mobilePhoneNumber":"13xxxxxx", "smsCode":"yyyyy", "role":"park_manager", "mode":"debug"}
 *           response - RET_OK or RET_ERROR
 * @return : RET_OK - success, sessionToken - must storge
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功\",\"sessionToken\":\"xxxxxxxx\"}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_signup", function(request, response) {
    var request_json = request.params;
    //console.log("requset", request_json);

    var mobilePhoneNumber = request.params.mobilePhoneNumber;
    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }

    var smsCode = request.params.smsCode;
    if (typeof(smsCode) == "undefined" || smsCode.length === 0) {
        response.success(ERROR_MSG.ERR_SMSCODE_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;

    var role = request.params.role;
    var role_id;
    if (typeof(role) != "undefined" && role.length > 0) {
        if (typeof(mode) != "undefined" || mode.length > 0) {
            if ("debug" === mode) {
                if ("park_manager" === role) {
                    role_id = debug_role_id;
                }
                else if ("worker" === role) {
                    role_id = release_role_id;
                }
            }
            else if ("release" === mode) {
            }

            delete request_json["role"];
            delete request_json["mode"];
            JSON.stringify(request_json);
            console.log("role_id", role_id);
            console.log("requset_json", request_json);
        }
    }
 
    var user_obj = new AV.User();
    user_obj.signUpOrlogInWithMobilePhone(
        request_json,
        {
            success : function(user) {
                if (typeof(role_id) != "undefined" && role_id.length > 0) {
                    console.log("add role id");
                    var role_obj = new role_cls();
                    role_obj.id = role_id;

                    user.set("role", role_obj);
                    user.save();
                }

                var json_obj = eval("("+RESULT_MSG.RET_OK+")");
                json_obj["sessionToken"] = user._sessionToken;
                json_obj["user_id"] = user.id;
                response.success(JSON.stringify(json_obj));
                return;
            },
            error : function(error) {
                response.error(error);
                return;
            }
        }
    );
});

/**
* brief   : push sms info
* @param  : request -{"mobilePhoneNumber" : "xxxx","push_type":"verify_request"}
*           reponse - define error, result or system error
*           {"result":"{"state":"error", "code":20, "msg":"xxxx"}"}
* @return : success - RET_OK
*           error - define error or system error
*/
var _kongcv_sms_send = function(request, response) {
    var mobilePhoneNumber = request.params.mobilePhoneNumber;
    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }

    var push_type = request.params.push_type;
    if (typeof(push_type) == "undefined" || push_type.length === 0) {
        response.success(ERROR_MSG.ERR_PUSH_TYPE_MUST_EXIST);
        return;
    }

    AV.Cloud.requestSmsCode({
        mobilePhoneNumber:mobilePhoneNumber,
        template:push_type,
        limit_time:10
    }).then(
        function() {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            response.error(error);
            return;
        }
    );
};

AV.Cloud.define("kongcv_push_smsinfo", function(request, response) {
   return _kongcv_sms_send(request, reponse);
});

/**
* brief   : push message save
* @param  : request - {"mobilePhoneNumber":"1xxxxxxx", "push_type":"verify_accept", "device_token":"021a12c5dc4", "device_type":"ios", extras:{"park_id":"xxxxx","mode":"community","hire_method_id":"xxxxx","hire_start":"2015-10-17 08:00:00", "hire_end":"2015-10-17 18:00:00","own_device_token":"xxxxx","own_device_type":"android","own_mobile":"1xxxxx", "push_type":"verify_accept"}}
*           reponse - define error, result or system error
*           {"result":"{"state":"error", "code":20, "msg":"xxxx"}"}
* @return : success - RET_OK
*           error - define error or system error
*/
var _kongcv_push_message_save = function(request, response, push_info, no_resp) {
    var push_type = request.params.push_type;
    var extras = request.params.extras;
    var req_mobile = request.params.mobilePhoneNumber;
    var user_id = request.params.user_id;
    var own_mobile = extras.own_mobile;

    var user_obj = new user_cls();
    user_obj.id = user_id; 
    
    var kongcv_push_message_obj = new kongcv_push_message_cls();
    kongcv_push_message_obj.set("req_mobile", req_mobile);
    kongcv_push_message_obj.set("own_mobile", own_mobile);
    kongcv_push_message_obj.set("push_info", push_info);
    kongcv_push_message_obj.set("push_type", push_type);
    kongcv_push_message_obj.set("extras", extras);
    kongcv_push_message_obj.set("user", user_obj);
    
    kongcv_push_message_obj.save().then(
        function() {
            if (false == no_resp) {
                response.success(RESULT_MSG.RET_OK);
            }
        },
        function(error) {
            if (false == no_resp) {
                response.error(error);
            }
        }
    );   
};
 
/**
 * brief   : jpush push messge, point to point
 * @param  : request - {"mobilePhoneNumber":"1xxxxxxx", "push_type":"verify_accept", "device_token":"021a12c5dc4", "device_type":"ios", "user_id":"xxxx",extras:{"park_id":"xxxxx","mode":"community","hire_method_id":"xxxxx","hire_start":"2015-10-17 08:00:00", "hire_end":"2015-10-17 18:00:00","own_device_token":"xxxxx","own_device_type":"android","own_mobile":"1xxxxx", "push_type":"verify_accept"}}
 *           response - return map recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_jpush_message_p2p", function(request, response) { 
    var push_type = request.params.push_type;
    if (typeof(push_type) == "undefined" || push_type.length === 0) {
        response.success(ERROR_MSG.ERR_PUSH_TYPE_MUST_EXIST);
        return;
    }

    var device_token = request.params.device_token;
    if (typeof(device_token) == "undefined" || device_token.length === 0) {
        response.success(ERROR_MSG.ERR_DEVICE_TOKEN_MUST_EXIST);
        return;
    }

    var device_type = request.params.device_type;
    if (typeof(device_type) == "undefined" || device_type.length === 0) {
        response.success(ERROR_MSG.ERR_DEVICE_TYPE_MUST_EXIST);
        return;
    }

    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }
    
    var push_info;
    var has_extras = 0;
    if ("verify_accept" === push_type) {
        push_info = PUSH_INFO.VERIFY_ACCEPT;
        has_extras = 1;
    }
    else if ("verify_reject" === push_type) {
        push_info = PUSH_INFO.VERIFY_REJECT;
    }
    else if ("verify_request" === push_type) {
        push_info = PUSH_INFO.VERIFY_REQUEST;
        has_extras = 1;
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
    
    var extras;
    if (1 === has_extras) {
        extras = request.params.extras;
        if (typeof(extras) == "undefined" || extras.length === 0) {
            response.success(ERROR_MSG.ERR_JPUSH_EXTRAS_MUST_EXIST);
            return;
        }
        
        var extras_own_mobile = extras.own_mobile;
        if (typeof(extras_own_mobile) == "undefined" || extras_own_mobile.length === 0) {
            response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
            return;
        }

        var extras_park_id = extras.park_id;
        if (typeof(extras_park_id) == "undefined" || extras_park_id.length === 0) {
            response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
            return;
        }

        var extras_hire_method_id = extras.hire_method_id;
        if (typeof(extras_hire_method_id) == "undefined" || extras_hire_method_id.length === 0) {
            response.success(ERROR_MSG.ERR_HIRE_METHOD_MUST_EXIST);
            return;
        }

        var extras_hire_start = extras.hire_start;
        if (typeof(extras_hire_start) == "undefined" || extras_hire_start.length === 0) {
            response.success(ERROR_MSG.ERR_HIRE_START_MUST_EXIST);
            return;
        }

        var extras_hire_end = extras.hire_end;
        if (typeof(extras_hire_end) == "undefined" || extras_hire_end.length === 0) {
            response.success(ERROR_MSG.ERR_HIRE_END_MUST_EXIST);
            return;
        }

        var extras_push_type = extras.push_type;
        if (typeof(extras_push_type) == "undefined" || extras_push_type.length === 0) {
            response.success(ERROR_MSG.ERR_PUSH_TYPE_MUST_EXIST);
            return;
        }

        var extras_mode = extras.mode;
        if (typeof(extras_mode) == "undefined" || extras_mode.length === 0) {
            response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
            return;
        }

        if ("verify_request" === push_type) {
            var extras_device_token = extras.own_device_token;
            if (typeof(extras_device_token) == "undefined" || extras_device_token.length === 0) {
                response.success(ERROR_MSG.ERR_DEVICE_TOKEN_MUST_EXIST);
                return;
            }

            var extras_device_type = extras.own_device_type;
            if (typeof(extras_device_type) == "undefined" || extras_device_type.length === 0) {
                response.success(ERROR_MSG.ERR_DEVICE_TYPE_MUST_EXIST);
                return;
            }
        }

        console.log("parser extras", extras);
    }

    var device_notify;
    if ("ios" === device_type) {
        if ("verify_request" === push_type || "verify_accept" === push_type) {
            device_notify = JPush.ios(push_info, 'happy', 5, true, extras);
            console.log("add notify", extras);
        }
        else {
            device_notify = JPush.ios(push_info, 'happy', 5);
        }
    }
    else if ("android" === device_type) {
        if ("verify_request" === push_type || "verify_accept" === push_type) {
            device_notify = JPush.android(push_info, null, 1, extras);
        }
        else {
            device_notify = JPush.android(push_info, null, 1);
        }
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    JPush_client.push().setPlatform(device_type)
    .setAudience(JPush.registration_id(device_token))
    .setNotification('Hi, Kongcv', device_notify)
    .send(function(err, res) {
        if (err) {
            if (err instanceof JPush.APIConnectionError) {
                console.log(err.message);
                response.error(error);
            } else if (err instanceof  JPush.APIRequestError) {
                console.log(err.message);
                response.error(error);
            }
        } else {
            console.log('Sendno: ' + res.sendno);
            console.log('Msg_id: ' + res.msg_id);
            console.log("send sms message");
            if ("verify_request" === push_type) {
                _kongcv_push_message_save(request, response, push_info, true);
            }
            _kongcv_sms_send(request, response);
        }
    });
});

/**
 * brief   : get hire method
 * @param  : request - {"park_type_id":"xxxx"}
 *           response - return hire method recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_hire_method", function(request, response) {
    var park_type_id = request.params.park_type_id;
    if (typeof(park_type_id) == "undefined" || park_type_id.length === 0) {
        response.success(ERROR_MSG.ERR_PARK_TYPE_MUST_EXIST);
        return;
    }

    //var kongcv_park_type_cls = AV.Object.extend("kongcv_park_type");
    //var park_type_obj = new kongcv_park_type_cls();
    //park_type_obj.id = park_type_id;

    var query = new AV.Query(kongcv_hire_method_cls);
    //query.equalTo("park_type", park_type_obj);
    query.equalTo("park_type", park_type_id);
    query.descending("updatedAt");
    query.find({
        success : function(results) {
            response.success(results);
            return;
        },
        error : function(error) {
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : get advertise
 * @param  : request - {}
 *           response - return advertise recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_advertise", function(request, response) {
    var query = new AV.Query(kongcv_advertise_cls);
    query.find({
        success : function(results) {
            response.success(results);
            return;
        },
        error : function(error) {
            response.error(error);
            return;
        }
    });
});
 
/**
 * brief   : get park type
 * @param  : request - {}
 *           response - return park_type recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_park_type", function(request, response) {
    var query = new AV.Query(kongcv_park_type_cls);
    query.find({
        success : function(results) {
            response.success(results);
            return;
        },
        error : function(error) {
            response.error(error);
            return;
        }
    });
});
 
/**
 * brief   : insert accept data
 * @param  : request - {"req_mobile":"xxxxxxxxxx","user_mobile":"xxxxx","park_id":"xxxxxxxxxxx","mode":"community"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_insert_accept", function(request, response) {
    var req_mobile = request.params.req_mobile;
    if (typeof(req_mobile) == "undefined" || req_mobile.length === 0) {
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }
    
    var user_mobile = request.params.user_mobile;
    if (typeof(user_mobile) == "undefined" || user_mobile.length === 0) {
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }
    
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }
 
    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var kongcv_accept_obj = new kongcv_accept_cls();

    kongcv_accept_obj.set("req_mobile", req_mobile);
    kongcv_accept_obj.set("user_mobile", user_mobile);

    var kongcv_park_community_obj;
    if ("community" === mode) {
        kongcv_park_community_obj = new kongcv_park_community_cls();
        kongcv_park_community_obj.id = park_id;
        kongcv_accept_obj.set("park_community", kongcv_park_community_obj);
    }
    else if ("curb" === mode) {
        var kongcv_park_curb_obj = new kongcv_park_curb_cls();
        kongcv_park_obj.id = park_id;
        kongcv_park_obj.set("park_curb", kongcv_park_curb_obj);
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
 
    if ("community" === mode) { 
        kongcv_accept_obj.set("park_community", kongcv_park_community_obj);
    }
    else if ("curb" === mode) {
        kongcv_accept_obj.set("park_curb", kongcv_park_curb_obj); 
    }

    kongcv_accept_obj.save().then(
        function() {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            response.error(error);
            return;
        }
    );
});

/**
 * brief   : hook - beforesave, collect - kongcv_accept
 * @param  : request - {"user_mobile":"xxxxx","park_id":"xxxxxxxxxxx","mode":"community"}
 *           response - return success or error
 * @return : success
 *           {"save data"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_accept", function(request, response) {
    var user_mobile = request.params.user_mobile;
    if (typeof(user_mobile) == "undefined" || user_mobile.length === 0) {
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }
    
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }
 
    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var kongcv_park_community_obj;
    var kongcv_park_curb_obj;
    if ("community" === mode) {
        kongcv_park_community_obj = new kongcv_park_community_cls();
        kongcv_park_community_obj.id = park_id;
    }
    else if ("curb" === mode) {
        kongcv_park_curb_obj = new kongcv_park_curb_cls();
        kongcv_park_obj.id = park_id;
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
 
    /*var now_date = new Date();
    var now_minseconds = now_date.getTime();
    var accept_minseconds = now_minseconds - limit_minseconds;
    var accept_date = new Date(accept_minseconds);
    console.log("now_date", now_date);
    console.log("accept_date", accept_date);*/

    var accept_query = new AV.Query(kongcv_accept_cls);
    if ("community" === mode) {
        accept_query.equalTo("park_community", kongcv_park_community_obj);
    }
    else if ("curb" === mode) {
        accept_query.equalTo("park_curb", kongcv_park_curb_obj);
    }
    //accept_query.greaterThan("updatedAt", accept_date);
    accept_query.descending("createdAt");
    //accept_query.first({
    accept_query.find({
        success : function(results) {
            if (results.length > 0) {
                var kongcv_accept_obj = results[0];
                if (user_mobile === kongcv_accept_obj.get("user_mobile")) {
                    response.success(RESULT_MSG.RET_OK);
                }
                else {
                    response.success(RESULT_MSG.RET_FAIL);
                }
                return;
            }
            else if (0 === results.length) { 
                response.success(RESULT_MSG.RET_FAIL);
            }
        },
        error : function(error) {
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : insert park data
 * @param  : request - {"user_id":"xxxxxxxxxx","worker_id":"xxxxxxxxxxx","address":"xxxxx","park_detail":"xxxx","park_description":"xxxx","location_info":{"__type": "GeoPoint","latitude":11.1,"longitude":116.4}, "hire_start":"2015-10-17 08:00:00", "hire_end":"2015-10-17 18:00:00","no_hire":["1","2"], "tail_num":"5","city":"beijing", "normal":true, "park_area":10,"park_height":5,"gate_card":"xxxxx","hire_method_id":["5620a6dc60b27457e84bb21d"],"hire_price":["10"],"hire_time":["9:00 - 20:00"],"struct":0,"mode":"community"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_insert_parkdata", function(request, response) {
    console.log("request", request.params);
 
    var city = request.params.city;
    if (typeof(city) == "undefined" || city.length === 0) {
        response.success(ERROR_MSG.ERR_CITY_MUST_EXIST);
        return;
    }

    var address = request.params.address;
    if (typeof(address) == "undefined" || address.length === 0) {
        response.success(ERROR_MSG.ERR_ADDRESS_MUST_EXIST);
        return;
    }

    var park_detail = request.params.park_detail;
    address += '&'+ park_detail;
    console.log("address:",address);
     
    var park_description = request.params.park_description;
    
    var location_info = request.params.location_info;
    if (typeof(location_info) == "undefined" || location_info.length === 0) {
        response.success(ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        return;
    }
    
    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }
     
    var hire_method = [];
    var hire_price = [];
    var hire_time = [];
    var hire_method_array = request.params.hire_method_id
    var hire_price_array = request.params.hire_price;
    var hire_time_array = request.params.hire_time;
    if (typeof(hire_method_array) == "undefined" || hire_method_array.length === 0) {
        response.success(ERROR_MSG.ERR_HIRE_METHOD_MUST_EXIST);
        return;
    }
    if (typeof(hire_price_array) == "undefined" || hire_price_array.length === 0) {
        response.success(ERROR_MSG.ERR_HIRE_PRICE_MUST_EXIST);
        return;
    }

    var hire_method_num = hire_method_array.length;
    var hire_price_num = hire_price_array.length;
    var hire_time_num = hire_time_array.length; 
    if ("community" === mode) {
        if (hire_method_num != hire_price_num || hire_method_num != hire_time_num) {
            response.success(ERROR_MSG.ERR_INFO_FORMAT);
            return;
        }
    }
    else if ("curb" === mode) {
        if (hire_method_num != hire_price_num) {
            response.success(ERROR_MSG.ERR_INFO_FORMAT);
            return;
        }
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    for (var i = 0; i < hire_method_num; i++) {
        var hire_method_obj = new kongcv_hire_method_cls();
        hire_method_obj.id = hire_method_array[i];
        hire_method.push(hire_method_obj);
        hire_price.push(hire_price_array[i]);
        hire_time.push(hire_time_array[i]);
    } 

    console.log("location", location_info)
    if ("community" === mode) {
        var kongcv_park_community_obj = new kongcv_park_community_cls(); 
   
        var hire_start = request.params.hire_start;
        if (typeof(hire_start) == "undefined" || hire_start.length === 0) {
            response.success(ERROR_MSG.ERR_HIRE_START_MUST_EXIST);
            return;
        }

        var hire_end = request.params.hire_end;
        if (typeof(hire_end) == "undefined" || hire_end.length === 0) {
            response.success(ERROR_MSG.ERR_HIRE_END_MUST_EXIST);
            return;
        }
  
        var user_id = request.params.user_id;
        if (typeof(user_id) == "undefined" || user_id.length === 0) {
            response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
            return;
        }

        var user_obj = new user_cls();
        user_obj.id = user_id; 
        var community_query = new AV.Query(kongcv_park_community_cls);
        community_query.equalTo("user", user_obj);
        community_query.find({
            success : function(results) { 
                if (results.length < 4) {
                    console.log("check address")
                    community_query.equalTo("address", address);
                    community_query.find({
                        success : function(results) {
                            if (results.length > 0) {
                                response.success(ERROR_MSG.ERR_HIRE_COMMUNITY_SAME_RECORD);
                                return;
                            }
                            else {
                                console.log("save data start");
                                var no_hire = request.params.no_hire;

                                var normal = request.params.normal;
                                /*if (typeof(normal) == "undefined" || normal.length === 0) {
                                  response.success(ERROR_MSG.ERR_NORMAL_MUST_EXIST);
                                  return;
                                }*/

                                var park_area = request.params.area;
                                /*if (typeof(park_area) == "undefined" || park_area.length === 0) {
                                  response.success(ERROR_MSG.ERR);
                                  return;
                                  }*/

                                var park_height = request.params.height;
                                /*if (typeof(park_height) == "undefined" || park_height.length === 0) {
                                  response.success(ERROR_MSG.ERR);
                                  return;
                                  }*/

                                var gate_card = request.params.gate_card;
                                /*if (typeof(gate_card) == "undefined" || gate_card.length === 0) {
                                  response.success(ERROR_MSG.ERR);
                                  return;
                                  }*/

                                var struct = request.params.struct;
                                /*if (typeof(struct) == "undefined" || struct.length === 0) {
                                  response.success(ERROR_MSG.ERR);
                                  return;
                                  }*/
                                var tail_num = request.params.tail_num;

                                kongcv_park_community_obj.set("city", city);
                                kongcv_park_community_obj.set("address", address);
                                kongcv_park_community_obj.set("hire_start", new Date(hire_start));
                                kongcv_park_community_obj.set("hire_end", new Date(hire_end));
                                kongcv_park_community_obj.set("no_hire", no_hire);
                                kongcv_park_community_obj.set("tail_num", tail_num);
                                kongcv_park_community_obj.set("location", location_info); 
                                kongcv_park_community_obj.set("hire_method", hire_method);
                                kongcv_park_community_obj.set("hire_price", hire_price);
                                kongcv_park_community_obj.set("hire_time", hire_time);
                                kongcv_park_community_obj.set("normal", normal);
                                kongcv_park_community_obj.set("park_area", park_area);
                                kongcv_park_community_obj.set("park_height", park_height);
                                kongcv_park_community_obj.set("gate_card", gate_card);
                                kongcv_park_community_obj.set("struct", struct);
                                kongcv_park_community_obj.set("user", user_obj);
                                kongcv_park_community_obj.set("park_description", park_description);

                                kongcv_park_community_obj.save().then(
                                    function() {
                                        console.log("save data end")
                                        response.success(RESULT_MSG.RET_OK);
                                        return;
                                    },
                                    function(error) {
                                        response.error(error);
                                        return;
                                    }
                                );
                            }
                        },
                        error : function(error) {
                            response.error(error);
                            return;
                        }
                    });
                }
                else {
                    response.success(ERROR_MSG.ERR_HIRE_COMMUNITY_RECORD_LIMIT);
                    return;
                }
            },
            error : function(error) {
                response.error(error);
                return;
            }
        });
    }
    else if ("curb" === mode) {
        var kongcv_park_curb_obj = new kongcv_park_curb_cls();

        var curb_query = new AV.Query(kongcv_park_curb_cls);
        curb_query.equalTo("address", address);
        curb_query.find({
            success : function(results) {
                if (results.length > 0) {
                    response.success(ERROR_MSG.ERR_HIRE_COMMUNITY_SAME_RECORD);
                    return;
                }
                else {
                    kongcv_park_curb_obj.set("city", city);
                    kongcv_park_curb_obj.set("address", address);
                    kongcv_park_curb_obj.set("location", location_info);
                    kongcv_park_curb_obj.set("hire_method", hire_method);
                    kongcv_park_curb_obj.set("hire_price", hire_price);
                    kongcv_park_curb_obj.set("hire_time", hire_time);
                    kongcv_park_curb_obj.set("park_description", park_description);

                    var worker_id = request.params.worker_id;
                    var user_mobile = request.params.user_id;
                    var worker_obj = new user_cls();
                    worker_obj.id = worker_id;
                    kongcv_park_curb_obj.set("worker", worker_obj);

                    AV.User.logIn(user_0, user_0_ps, {
                        success :function(user_admin) { 
                            var user_query = new AV.Query(AV.User); 
                            user_query.equalTo("mobilePhoneNumber", user_mobile);
                            user_query.find({
                                success : function(results) {
                                    var user = results[0];
                                    var user_obj = new user_cls();
                                    user_obj.id = user.id;

                                    //var user_array = [];
                                    //user_array.push(user_obj);
                                    //kongcv_park_curb_obj.set("user_group", user_array);
                                    kongcv_park_curb_obj.set("user", user_obj);
                                    kongcv_park_curb_obj.save().then(
                                        function() {
                                            response.success(RESULT_MSG.RET_OK);
                                            return;
                                        },
                                        function(error) {
                                            response.error(error);
                                            return;
                                        }
                                    );
                                },
                                error : function(error) {
                                    response.error(error);
                                    return;
                                }
                            });
                        },
                        error : function(error) {
                            response.error(error);
                            return;
                        }
                    });
                }
            },
            error : function(error) {
                response.error(error);
                return;
            }
        });
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
}); 
 
/**
 * brief   : get park date
 * @param  : request - {"park_id":"xxxxx", "query_month":"2015-12-01 00:00:00"}, "mode":"community"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_park_date", function(request, response) {
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }
 
    var query_month = new Date(request.params.query_month);
    if (typeof(query_month) == "undefined" || query_month.length === 0) {
        //response.success(ERROR_MSG.ERR_HIRE_START_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var month = new Date(request.params.query_month);
    var next_month = new Date(month.setMonth(month.getMonth() + 1));
    console.log("queyr_month:%s, next_month:%s", query_month, next_month);

    var kongcv_park_obj;
    if ("community" === mode) {
        kongcv_park_obj = new kongcv_park_community_cls();
        kongcv_park_obj.id = park_id;
    }
    else if ("curb" === mode) {
        kongcv_park_obj = new kongcv_park_curb_cls();
        kongcv_park_obj.id = park_id;
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    var trade_query = new AV.Query(kongcv_trade_cls);
    if ("community" === mode) {
        trade_query.equalTo("park_community", kongcv_park_obj);
    }
    else if ("curb" === mode) {
        trade_query.equalTo("park_curb", kongcv_park_obj);
    }
    trade_query.equalTo("pay_state", 2);
    trade_query.greaterThanOrEqualTo("hire_end", query_month);
    trade_query.lessThan("hire_start", next_month);
    trade_query.find({
        success : function(results) {
            response.success(results);
        },
        error : function(error) {
            response.error(error);
            return;
        }
    });
});
 
/**
 * brief   : insert trade bill data
 * @param  : request - {"trade_id":"xxxxx"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_insert_trade_billdata", function(request, response) {
    var trade_id = request.params.trade_id;
    if (typeof(trade_id) == "undefined" || trade_id.length === 0) {
        response.success(ERROR_MSG.ERR_TRADE_ID_MUST_EXIST);
        return;
    }

    var kongcv_trade_obj = new kongcv_trade_cls();
    kongcv_trade_obj.id = trade_id;
    
    var kongcv_trade_bill_obj = new kongcv_trade_bill_cls();
    kongcv_trade_bill_obj.set("trade", kongcv_trade_obj);
    kongcv_trade_bill_obj.save().then(
        function(bill_obj) {
            var bill_id = bill_obj.id;
            console.log("bill_id:",bill_id);
            var trade_query = new AV.Query(kongcv_trade_cls);
            trade_query.get(trade_id, {
                success : function(trade_obj) {
                    trade_obj.add("trade_bill_id", bill_id);

                    trade_obj.save().then(
                        function(result) {
                            response.success(RESULT_MSG.RET_OK);
                            return;
                        },
                        function(error) {
                            response.error(error);
                            return;
                        }
                    );
                },
                error : function(error) {
                    response.error(error);
                    return;
                }
            });
        },
        function(error) {
            response.error(error);
            return;
        }
    );
});

/**                                                                              
 *brief   : 获取日期相差天数                                                     
 *@param  : start_date - "2015-06-01"                                                
 *          end_date - "2015-06-02"                                                
 *@return : num - days number                                                 
 */                                                                               
var get_space_days = function(start_date, end_date) {                           
    var start_minseconds = new Date(start_date);
    console.log("start_minsecodns", start_minseconds);
    var end_minseconds = new Date(end_date); 
    console.log("end_minsecodns", end_minseconds);
    num = parseInt(Math.abs(end_minseconds - start_minseconds) / 1000 / 60 / 60 / 24);            
    return num;                                                               
};

/**                                                                              
 *brief   : date to string                                                     
 *@param  : date - Date("2015-06-01")                                                
 *@return : string                                                
 */ 
var get_date_2_str = function(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    var str_date = year + "-" + month + "-" + day;
    return str_date;
};

/**
 * brief   : insert trade data
 * @param  : request - {"user_id":"xxxxxxxxxx","hirer_id":"xxx","park_id":"xxxxxxxxxxx", "price":100,"hire_start":"2015-10-17 00:00:00", "hire_end":"2015-10-18 00:00:00","hire_method_id":"5620a6dc60b27457e84bb21d","mode":"community", "extra_flag":"1"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_insert_tradedata", function(request, response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }
    
    var hirer_id = request.params.hirer_id;
    if (typeof(hirer_id) == "undefined" || hirer_id.length === 0) {
        response.success(ERROR_MSG.ERR_HIRER_MUST_EXIST);
        return;
    }

    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }
 
    var hire_method_id = request.params.hire_method_id;
    if (typeof(hire_method_id) == "undefined" || hire_method_id.length === 0) {
        response.success(ERROR_MSG.ERR_HIRE_METHOD_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var hire_start = request.params.hire_start;
    if (typeof(hire_start) == "undefined" || hire_start.length === 0) {
        response.success(ERROR_MSG.ERR_HIRE_START_MUST_EXIST);
        return;
    }
    
    var hire_end = request.params.hire_end;
 
    var price = request.params.price;
    if (typeof(price) == "undefined" || price.length === 0) {
        response.success(ERROR_MSG.ERR_HIRE_PRICE_MUST_EXIST);
        return;
    }
    
    var extra_flag = request.params.extra_flag;
 
    var kongcv_trade_obj = new kongcv_trade_cls();

    var user_obj = new user_cls();
    user_obj.id = user_id;
    kongcv_trade_obj.set("user", user_obj);
    
    var hirer_obj = new user_cls();
    hirer_obj.id = hirer_id; 
    kongcv_trade_obj.set("hirer", hirer_obj);

    var kongcv_hire_method_obj = new kongcv_hire_method_cls();
    kongcv_hire_method_obj.id = hire_method_id;
    kongcv_trade_obj.set("hire_method", kongcv_hire_method_obj);

    var kongcv_park_obj;
    if ("community" === mode) {
        kongcv_park_obj = new kongcv_park_community_cls();
        kongcv_park_obj.id = park_id;
        
        kongcv_trade_obj.set("park_community", kongcv_park_obj);
    }
    else if ("curb" === mode) {
        kongcv_park_obj = new kongcv_park_curb_cls();
        kongcv_park_obj.id = park_id;
        
        kongcv_trade_obj.set("park_curb", kongcv_park_obj);    
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
  
    var charge_date = [];
    kongcv_trade_obj.set("hire_start", new Date(hire_start));
    if (debug_hire_method_timing != hire_method_id && release_hire_method_timing != hire_method_id) {  
        if (typeof(hire_end) == "undefined" || hire_end.length === 0) {
            response.success(ERROR_MSG.ERR_HIRE_END_MUST_EXIST);
            return;
        }
        kongcv_trade_obj.set("hire_end", new Date(hire_end));

        //var days = get_space_days(hire_start,hire_end);
        //console.log("space days:", days);

        var start_date = new Date(hire_start); 
        var end_date = new Date(hire_end);
        while (true) {
            var next_month = new Date(start_date.setMonth(start_date.getMonth() + 1));
            var str_date = get_date_2_str(next_month);
            if (next_month > end_date) {
                charge_date.push(get_date_2_str(end_date));
                break;
            }
            else {
                charge_date.push(str_date);
            }
        }
        console.log("charge date:", charge_date);
        kongcv_trade_obj.set("charge_date", charge_date);
    }
        
    kongcv_trade_obj.set("price", price);
    kongcv_trade_obj.set("extra_flag", extra_flag);

    var trade_query = new AV.Query(kongcv_trade_cls);
    if ("community" === mode) {
        trade_query.equalTo("park_community", kongcv_park_obj);
    }
    else if ("curb" === mode) {
        trade_query.equalTo("park_curb", kongcv_park_obj);
    }

    trade_query.equalTo("pay_state", 2);
    trade_query.greaterThanOrEqualTo("hire_end", hire_start);
    trade_query.lessThanOrEqualTo("hire_start", hire_end);
    trade_query.find({
        success : function(results) {
            if (results.length === 0) {
                if ("community" === mode) { 
                    var kongcv_preorder_obj = new kongcv_preorder_cls();
                    kongcv_preorder_obj.set("park_community", kongcv_park_obj);
                    kongcv_preorder_obj.set("user", user_obj);
                    kongcv_preorder_obj.set("preorder", 1);
                    kongcv_preorder_obj.save().then(
                        function(results) { 
                            kongcv_trade_obj.save().then(
                                function(trade_obj) {
                                    var json_obj = eval("("+RESULT_MSG.RET_OK+")");
                                    json_obj["trade_id"] = trade_obj.id;
                                    response.success(JSON.stringify(json_obj));
                                    return;
                                },
                                function(error) {
                                    response.error(error);
                                    return;
                                }
                            );
                        },
                        function(error) {
                            response.error(error);
                            return;
                        }
                    ); 
                }
                else if ("curb" === mode) {
                    kongcv_trade_obj.save().then(
                        function(trade_obj) {
                            var json_obj = eval("("+RESULT_MSG.RET_OK+")");
                            json_obj["trade_id"] = trade_obj.id;
                            response.success(JSON.stringify(json_obj));
                            return;
                        },
                        function(error) {
                            response.error(error);
                            return;
                        }
                    );
                }
            }
            else if (results.length > 0) { 
                response.success(ERROR_MSG.ERR_PARK_DATE_EXIST);
            }
        },
        error : function(error) {
            response.error(error);
            return;
        }
    });
});

/**
* brief   : insert comment data
* @param  : request - 
*           {"user_id" : "xxxxxx", "comment" : "test comment", "park_id" : "xxxxxxxxxxx", "grade":5, "mode" : "community"} 
*           reponse - define error, result or system error
*           {"result":"{"state":"error", "code":20, "msg":"belong type必填}"}
* @return : success - RET_OK
*           error - define error or system error
*/ 
AV.Cloud.define('kongcv_insert_comment', function(request , response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }
    
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }
 
    var comment = request.params.comment;
    if (typeof(comment) == "undefined" || comment.length === 0) {
        response.success(ERROR_MSG.ERR_COMMENT_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var grade = request.params.grade; 
      
    var kongcv_comment_obj = new kongcv_comment_cls();
    var user_obj = new user_cls();
    user_obj.id = user_id;
    kongcv_comment_obj.set("user", user_obj);
    kongcv_comment_obj.set("comment", comment);
    kongcv_comment_obj.set("grade", grade);
    
    if ("community" === mode) {
        var kongcv_park_community_obj = new kongcv_park_community_cls();
        kongcv_park_community_obj.id = park_id;
        kongcv_comment_obj.set("park_community", kongcv_park_community_obj);
    }
    else if ("curb" === mode) {
        var kongcv_park_curb_obj = new kongcv_park_curb_cls();
        kongcv_park_curb_obj.id = park_id;
        kongcv_comment_obj.set("park_curb", kongcv_park_curb_obj);
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    kongcv_comment_obj.save().then(
        function(result) {
            response.success(RESULT_MSG.RET_OK);
            return;
        },
        function(error) {
            response.error(error);
            return;
        }
    );
});

/**
* brief   : get comment data
* @param  : request - 
*           {"user_id" : "xxxxxx", "park_id" : "xxxxxxxxxxx", "skip":0, "limit":10, "mode" : "community"} 
*           reponse - define error, result or system error
*           {"result":"{"state":"error", "code":20, "msg":"belong type必填}"}
* @return : success - RET_OK
*           error - define error or system error
*/ 
AV.Cloud.define('kongcv_get_comment', function(request , response) {
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }
    
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }
 
    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }
 
    var user_obj = new user_cls();
    user_obj.id = user_id;
    
    var query = new AV.Query(kongcv_comment_cls);
    query.skip(skip);
    query.limit(limit);
    query.equalTo('user', user_obj);
    if ("curb" === mode) {
        var kongcv_park_curb_obj = new kongcv_park_curb_cls();
        kongcv_park_curb_obj.id = park_id;
        query.equalTo('park_curb', kongcv_park_curb_obj);
    }
    else if ("community" === mode) {
        var kongcv_park_community_obj = new kongcv_park_community_cls();
        kongcv_park_community_obj.id = park_id;
        query.equalTo('park_community', kongcv_park_community_obj);
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    query.find({
        success :function(results) {
            response.success(results);
            return;
        },
        error : function(error) {
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : search park data
 * @param  : request - {"location_info":{"latitude":11.1,"longitude":116.4},"hire_method_id":"xxxx", "mode":"curb", "skip":0, "limit":10}
 *           response - return park recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_location_search", function(request, response) {
    var location_info = request.params.location_info;
    if (typeof(location_info) == "undefined" || location_info.length === 0) {
        response.success(ERROR_MSG.ERR_LOCATION_INFO_MUST_EXIST);
        return;
    }

    var max_distance = 1;
    //var max_distance = request.params.max_distance;
    //if (typeof(max_distance) == "undefined" || max_distance.length === 0) {
    //    response.success(ERROR_MSG.ERR_MAX_DISTANCE_MUST_EXIST);
    //    return;
    //}

    var hire_method_id = request.params.hire_method_id;

    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }
 
    var kong_cls;
    var point = new AV.GeoPoint(location_info);
    if ("curb" === mode) {
        kongcv_cls = kongcv_park_curb_cls;
    }
    else if ("community" === mode) {
        kongcv_cls = kongcv_park_community_cls;
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    //var query = new Av.Query(kongcv_park_curb_cls).withinKilometers("location", point, max_distance).equalTo('park_space', 1);
    var query = new AV.Query(kongcv_cls);
    query.withinKilometers("location", point, max_distance);
    query.skip(skip);
    query.limit(limit);
    query.equalTo('park_space', 1);
    query.include("user");
    query.include("hire_method");
    if (typeof(hire_method_id) != "undefined" && hire_method_id.length > 0) {
        var hire_method_obj = new kongcv_hire_method_cls();
        hire_method_obj.id = hire_method_id;
        query.equalTo("hire_method", hire_method_obj);
    }
    query.find({
        success :function(results) {
            for (var i = 0; i < results.length; i++) {
                results[i].set("hire_method", JSON.stringify(results[i].get("hire_method")));
                results[i].set("user", JSON.stringify(results[i].get("user")));
            }

            response.success(results);
            return;
        },
        error : function(error) {
            response.error(error);
            return;
        }
    });
}); 
 
/**
 * brief   : get park information
 * @param  : request - {"park_id":"xxxx", "mode":"community"}
 *           response - return park info
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_park_info", function(request, response) { 
    var park_id = request.params.park_id;
    if (typeof(park_id) == "undefined" || park_id.length === 0) {
        response.success(ERROR_MSG.ERR_PARK_ID_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var kongcv_park_cls;
    if ("curb" === mode) {
        kongcv_park_cls = kongcv_park_curb_cls;
    }
    else if ("community" === mode) {
        kongcv_park_cls = kongcv_park_community_cls;
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    var query = new AV.Query(kongcv_park_cls);
    query.equalTo("objectId", park_id);
    if ("curb" === mode) {
        query.include("user_group");
    }
    else if ("community" === mode) {
        query.include("user");
    }
    query.include("hire_method");
    query.find({
        success : function(results) {
            for (var i = 0; i < results.length; i++) {
                results[i].set("hire_method", JSON.stringify(results[i].get("hire_method")));
                if ("curb" === mode) {
                    results[i].set("user_group", JSON.stringify(results[i].get("user_group")));
                }
                else if ("community" === mode) {
                    results[i].set("user", JSON.stringify(results[i].get("user")));
                }

            }

            response.success(results);
            return;
        },
        error : function(error) {
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : get park list
 * @param  : request - {"user_id":"xxxxx", "mobile":"xxxx","skip":0, "limit":10,"mode":"community", "action":"userid"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_park_list", function(request, response) {
    var action = request.params.action;
    if (typeof(action) == "undefined" || action.length === 0) {
        response.success(ERROR_MSG.ERR_ACTION_MUST_EXIST);
        return;
    }
  
    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var mobile;
    if ("userid" === action) {
        user_id = request.params.user_id;
        if (typeof(user_id) == "undefined" || user_id.length === 0) {
            response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
            return;
        }
    }
    else if ("mobile" === action) {
        mobile = request.params.mobile;
        if (typeof(mobile) == "undefined" || mobile.length === 0) {
            response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
            return;
        }
        if ("curb" != mode) {
            response.success(ERROR_MSG.ERR_INFO_FORMAT);
            return;
        }
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    var kongcv_park_cls;
    if ("curb" === mode) {
        kongcv_park_cls = kongcv_park_curb_cls;
    }
    else if ("community" === mode) {
        kongcv_park_cls = kongcv_park_community_cls;
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    var park_query = new AV.Query(kongcv_park_cls);
    park_query.skip(skip);
    park_query.limit(limit);
    //park_query.include("user");
    //park_query.include("hire_method");

    if ("mobile" === action) { 
        AV.User.logIn(user_0, user_0_ps, {
            success :function(user_admin) { 
                var user_query = new AV.Query(AV.User);
                user_query.equalTo("mobilePhoneNumber", mobile);
                user_query.find({
                    success : function(results) {
                        var user = results[0];
                        var user_obj = new user_cls();
                        user_obj.id = user.id;

                        park_query.equalTo("user", user_obj);
                        park_query.find({
                            success : function(results) {
                                /*for (var i = 0; i < results.length; i++) {
                                  results[i].set("hire_method", JSON.stringify(results[i].get("hire_method")));
                                  results[i].set("user", JSON.stringify(results[i].get("user")));
                                  }*/

                                response.success(results);
                            },
                            error : function(error) {
                                response.error(error);
                                return;
                            }
                        });
                    },
                    error : function(error) {
                        response.error(error);
                        return;
                    }
                });
            },
            error : function(error) {
                response.error(error);
                return;
            }
        }); 
    }
    else if ("userid" === action) {
        var user_obj = new user_cls();
        user_obj.id = user_id;
        
        park_query.equalTo("user", user_obj);
        park_query.find({
            success : function(results) {
                for (var i = 0; i < results.length; i++) {
                    results[i].set("hire_method", JSON.stringify(results[i].get("hire_method")));
                    results[i].set("user", JSON.stringify(results[i].get("user")));
                }

                response.success(results);
            },
            error : function(error) {
                response.error(error);
                return;
            }
        });
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
});

/**
 * brief   : get trade information
 * @param  : request - {"trade_id":"xxxx","role":"hirer", "mode":"community"}
 *           response - return park info
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_trade_info", function(request, response) { 
    var trade_id = request.params.trade_id;
    if (typeof(trade_id) == "undefined" || trade_id.length === 0) {
        response.success(ERROR_MSG.ERR_TRADE_ID_MUST_EXIST);
        return;
    }

    var role = request.params.role;
    if (typeof(role) == "undefined" || role.length === 0) {
        response.success(ERROR_MSG.ERR_ROLE_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var query = new AV.Query(kongcv_trade_cls);
    query.equalTo("objectId", trade_id);
    query.include("hire_method");
    //query.select("hire_method.method");
    
    if ("community" === mode) {
        query.include("park_community");
    }
    else if ("curb" === mode) {
        query.include("park_curb");
    }

    if ("customer" === role) {
        query.include("hirer");
    }
    else if ("hirer" === role) {
        query.include("user");
    }
    else if ("hirer_second" === role) {
        query.include("user");
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    query.find({
        success : function(results) {
            for (var i = 0; i < results.length; i++) {
                results[i].set("hire_method", JSON.stringify(results[i].get("hire_method")));
                if ("community" === mode) {
                    results[i].set("park_community", JSON.stringify(results[i].get("park_community")));
                }
                else if ("curb" === mode) {
                    results[i].set("park_curb", JSON.stringify(results[i].get("park_curb")));
                }
            }

            response.success(results);
            return;
        },
        error : function(error) {
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : get trade list
 * @param  : request - {"user_id":"xxxxx", "role":"customer","skip":0, "limit":10,"mode":"community"}
 *           response - return result or error
 * @return : RET_OK - success
 *           {"result":"{\"state\":\"ok\",\"code\":1,\"msg\":\"成功}"}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_get_trade_list", function(request, response) { 
    var user_id = request.params.user_id;
    if (typeof(user_id) == "undefined" || user_id.length === 0) {
        response.success(ERROR_MSG.ERR_USER_ID_MUST_EXIST);
        return;
    }

    var role = request.params.role;
    if (typeof(role) == "undefined" || role.length === 0) {
        response.success(ERROR_MSG.ERR_ROLE_MUST_EXIST);
        return;
    }

    var skip = request.params.skip;
    if (typeof(skip) == "undefined" || skip.length === 0) {
        response.success(ERROR_MSG.ERR_SKIP_MUST_EXIST);
        return;
    }
    
    var limit = request.params.limit;
    if (typeof(limit) == "undefined" || limit.length === 0) {
        response.success(ERROR_MSG.ERR_LIMIT_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var kongcv_park_cls;
    if ("curb" === mode) {
        kongcv_park_cls = kongcv_park_curb_cls;
    }
    else if ("community" === mode) {
        kongcv_park_cls = kongcv_park_community_cls;
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }

    var user_obj = new user_cls();
    user_obj.id = user_id;

    var trade_query = new AV.Query(kongcv_trade_cls);
    trade_query.skip(skip);
    trade_query.limit(limit);
    //trade_query.include("hire_method");

    if ("customer" === role) {
        if ("curb" === mode) {
            trade_query.include("park_community");
        }
        else if ("community" === mode) {
            trade_query.include("park_curb");
        }
        trade_query.equalTo("user", user_obj);
    }
    else if ("hirer" === role) {
        trade_query.include("user");
        trade_query.equalTo("hirer", user_obj);
    }
    else if ("hirer_second" === role) {
        var park_query = new AV.Query(kongcv_park_cls); 
        park_query.equalTo("user_group", user_obj);
        trade_query.include("user");

        if ("community" === mode) {
            trade_query.matchesQuery("park_community", park_query);
        }
        else if ("curb" === mode) {
            trade_query.matchesQuery("park_curb", park_query);
        }  
    }
    else {
        response.success(ERROR_MSG.ERR_INFO_FORMAT);
        return;
    }
    
    trade_query.find({
        success : function(results) {
            for (var i = 0; i < results.length; i++) {
                //results[i].set("hire_method", JSON.stringify(results[i].get("hire_method")));
                if ("customer" === role) {
                    if ("curb" === mode) {
                        results[i].set("park_community", JSON.stringify(results[i].get("park_community")));
                    }
                    else if ("community" === mode) {
                        results[i].set("park_curb", JSON.stringify(results[i].get("park_curb")));
                    }
                }
                else if ("hirer" === role) {
                    results[i].set("user", JSON.stringify(results[i].get("user")));
                }
                else if ("hirer_second" === role) { 
                    results[i].set("user", JSON.stringify(results[i].get("user")));
                }
            }

            response.success(results);
        },
        error : function(error) {
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : hook - beforesave, collect - kongcv_accept
 * @param  : request - {"save data"}
 *           response - return success or error
 * @return : success
 *           {"save data"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.beforeSave("kongcv_accept", function(request, response) {
    var park_community = request.object.get('park_community'); 
    
    var now_date = new Date();
    var now_minseconds = now_date.getTime();
    var accept_minseconds = now_minseconds - limit_minseconds;
    var accept_date = new Date(accept_minseconds);
    console.log("now_date", now_date);
    console.log("accept_date", accept_date);

    var accept_query = new AV.Query(kongcv_accept_cls);
    accept_query.equalTo("park_community", park_community);
    accept_query.greaterThan("updatedAt", accept_date);
    accept_query.find({
        success : function(results) {
            var kongcv_accept_obj = new kongcv_accept_cls();
            if (results.length > 0) {
                response.error(ERROR_MSG.ERR_PARK_ACCEPT_EXIST);
                return;
            }
            else if (0 === results.length) { 
                console.log("start save");
                response.success();
            }
        },
        error : function(error) {
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : hook - beforesave, collect - kongcv_preorder
 * @param  : request - {"save data"}
 *           response - return success or error
 * @return : success
 *           {"save data"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
AV.Cloud.beforeSave("kongcv_preorder", function(request, response) {
    var preorder = request.object.get('preorder');
    var park_community = request.object.get('park_community'); 
    
    var now_date = new Date();
    var now_minseconds = now_date.getTime();
    var preorder_minseconds = now_minseconds - limit_minseconds;
    var preorder_date = new Date(preorder_minseconds);
    console.log("now_date", now_date);
    console.log("preorder_date", preorder_date);

    var preorder_query = new AV.Query(kongcv_preorder_cls);
    preorder_query.equalTo("park_community", park_community);
    preorder_query.equalTo("preorder", 1);
    preorder_query.greaterThan("updatedAt", preorder_date);
    preorder_query.find({
        success : function(results) {
            var kongcv_preorder_obj = new kongcv_preorder_cls();
            if (results.length > 0) {
                response.error(ERROR_MSG.ERR_PARK_PREORDER_EXIST);
                return;
            }
            else if (0 === results.length) { 
                console.log("start save");
                response.success();
            }
        },
        error : function(error) {
            response.error(error);
            return;
        }
    });
});

/**
 * brief   : hook - aftersave, collect - kongcv_preorder
 * @param  : request - {"save data"}
 *           response - return success or error
 * @return : success
 *           {"save data"}
 *           error
 *           {"code":142,"error":"xxxxxx"}
 */
/*AV.Cloud.afterSave("kongcv_preorder", function(request) {
    var kongcv_preorder_obj = request.object;
    var obj_id = request.object.get('objectId');
    var preorder = request.object.get('preorder');
    var park_community = request.object.get('park_community'); 
    
    var now_date = new Date();
    var now_minseconds = now_date.getTime();
    var preorder_minseconds = now_minseconds - limit_minseconds;
    var preorder_date = new Date(preorder_minseconds);
    console.log("now_date", now_date);
    console.log("preorder_date", preorder_date);

    var preorder_query = new AV.Query(kongcv_preorder_cls);
    preorder_query.equalTo("park_community", park_community);
    //preorder_query.equalTo("preorder", 1);
    preorder_query.greaterThan("updatedAt", preorder_date);
    preorder_query.find({
        success : function(results) {
            if (results.length > 1) {
                kongcv_preorder_obj.destroy({
                    success : function(kongcv_preorder_obj) {
                        console.log("park preorder exist, delete preorder data");
                        return;
                    },
                    error : function(kongcv_preorder_obj, error) {
                        console.log(error);
                        return;
                    }
                });
            }
            else if (0 === results.length) { 
                console.log(ERROR_MSG.ERR_SYSTEM_PREORDER);
                return;
            }
        },
        error : function(error) {
            console.log(error);
            return;
        }
    });
});*/
 
/****************************** test **********************************/
/**
 * brief   : gaode map search
 * @param  : request - {}
 *           response - return map recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_gaode_search", function(request, response) {
    AV.Cloud.httpRequest(
    {url:"http://restapi.amap.com/v3/place/text?&keywords=聚隆话园&city=beijing&output=json&offset=100&page=1&extensions=all&key=78c23dc6274d1bcfdca843553615f8be"}
    //{url:"http://restapi.amap.com/v3/direction/driving?origin=116.440887,39.930686&destination=116.435293,39.933177&output=json&key=78c23dc6274d1bcfdca843553615f8be"}
    //{url:"http://restapi.amap.com/v3/assistant/inputtips?output=json&city=010&keywords=聚龙花园&key=78c23dc6274d1bcfdca843553615f8be"}
    ).then(
        function(results) {
            response.success(results);
        }
    );
});

module.exports = AV.Cloud;
