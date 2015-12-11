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
    'ERR_HIRE_INFO_FORMAT' : '{"state":"error", "code":9, "error":"出租信息格式错误"}',
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
    'ERR_SMS_PUSH_TYPE_MUST_EXIT' : '{"state":"error", "code":23, "error":"短信推送类型必须设定"}'
};

var RESULT_MSG = {
    'RET_FAIL' : '{"state":"failed", "code":0, "msg":"失败"}',
    'RET_OK' : '{"state":"ok", "code":1, "msg":"成功"}'
};

var role_cls = AV.Object.extend("_Role");
var user_cls = AV.Object.extend("_User");
var kongcv_hire_method_cls = AV.Object.extend("kongcv_hire_method");
var kongcv_advertise_cls = AV.Object.extend("kongcv_advertise");
var kongcv_park_type_cls = AV.Object.extend("kongcv_park_type");
var kongcv_park_community_cls = AV.Object.extend("kongcv_park_community");
var kongcv_park_curb_cls = AV.Object.extend("kongcv_park_curb");
var kongcv_trade_cls = AV.Object.extend("kongcv_trade");
var kongcv_preorder_cls = AV.Object.extend("kongcv_preorder");
var kongcv_comment_cls = AV.Object.extend("kongcv_comment");
var limit_minseconds = 2 * 3600 * 1000;

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
                    role_id = "561e1b9b60b227b7f4ab449e";
                }
                else if ("worker" === role) {
                    role_id = "561f4128ddb24819b7e4bc52";
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
AV.Cloud.define("kongcv_push_smsinfo", function(request, response) {
    var mobilePhoneNumber = request.params.mobilePhoneNumber;
    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }

    var push_type = request.params.push_type;
    if (typeof(push_type) == "undefined" || push_type.length === 0) {
        response.success(ERROR_MSG.ERR_SMS_PUSH_TYPE_MUST_EXIT);
        return;
    }

    AV.Cloud.requestSmsCode({
        mobilePhoneNumber:mobilePhoneNumber,
        template:push_type
    }).then(
        function() {
            response.success(RESULT_MSG.RET_OK);
        },
        function(error) {
            response.error(error);
        }
    );
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
 * brief   : insert park data
 * @param  : request - {"user_id":"xxxxxxxxxx","worker_id":"xxxxxxxxxxx", "address":"xxxxx","park_description":"xxxx","location_info":{"__type": "GeoPoint","latitude":11.1,"longitude":116.4}, "hire_start":"2015-10-17 08:00:00", "hire_end":"2015-10-17 18:00:00","no_hire":["1","2"], "tail_num":"5","city":"beijing", "normal":true, "park_area":10,"park_height":5,"gate_card":"xxxxx","hire_method_id":["5620a6dc60b27457e84bb21d"],"hire_price":["10"],"hire_time":["9:00 - 20:00"],"struct":0,"mode":"community"}
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
    var park_description = request.params.park_description;
    address += '&'+ park_description;
    console.log("address:",address);
     
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
            response.success(ERROR_MSG.ERR_HIRE_INFO_FORMAT);
            return;
        }
    }
    else if ("crub" === mode) {
        if (hire_method_num != hire_price_num) {
            response.success(ERROR_MSG.ERR_HIRE_INFO_FORMAT);
            return;
        }
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
   
        var hire_start = new Date(request.params.hire_start);
        if (typeof(hire_start) == "undefined" || hire_start.length === 0) {
            response.success(ERROR_MSG.ERR_HIRE_START_MUST_EXIST);
            return;
        }

        var hire_end = new Date(request.params.hire_end);
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
                                kongcv_park_community_obj.set("hire_start", hire_start);
                                kongcv_park_community_obj.set("hire_end", hire_end);
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

                    var worker_id = request.params.worker_id;
                    var user_mobile = request.params.user_id;
                    var worker_obj = new user_cls();
                    worker_obj.id = worker_id;
                    kongcv_park_curb_obj.set("worker", worker_obj);

                    var user_query = new AV.Query(user_cls);
                    user_query.equalTo("mobilePhoneNumber", user_mobile);
                    user_query.find({
                        success : function(results) {
                            var user = results[0];
                            var user_obj = new user_cls();
                            user_obj.id = user.id;

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
                }
            },
            error : function(error) {
                response.error(error);
                return;
            }
        });
    }
    else {
        response.success(ERROR_MSG.ERR_MODE_NO_EXIST);
        return;
    }
}); 

/**
 * brief   : insert trade data
 * @param  : request - {"user_id":"xxxxxxxxxx","park_id":"xxxxxxxxxxx", "price":100,"hire_start":"2015-10-17 08:00:00", "hire_end":"2015-10-17 18:00:00","hire_method_id":"5620a6dc60b27457e84bb21d","mode":"community"}
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

    var hire_start = new Date(request.params.hire_start);
    if (typeof(hire_start) == "undefined" || hire_start.length === 0) {
        response.success(ERROR_MSG.ERR_HIRE_START_MUST_EXIST);
        return;
    }

    var hire_end = new Date(request.params.hire_end);
    if (typeof(hire_end) == "undefined" || hire_end.length === 0) {
        response.success(ERROR_MSG.ERR_HIRE_END_MUST_EXIST);
        return;
    }
 
    var price = request.params.price;
    if (typeof(price) == "undefined" || price.length === 0) {
        response.success(ERROR_MSG.ERR_HIRE_PRICE_MUST_EXIST);
        return;
    }

    var mode = request.params.mode;
    if (typeof(mode) == "undefined" || mode.length === 0) {
        response.success(ERROR_MSG.ERR_MODE_MUST_EXIST);
        return;
    }

    var kongcv_trade_obj = new kongcv_trade_cls();

    var user_obj = new user_cls();
    user_obj.id = user_id;
    kongcv_trade_obj.set("user", user_obj);

    var kongcv_hire_method_obj = new kongcv_hire_method_cls();
    kongcv_hire_method_obj.id = hire_method_id;
    kongcv_trade_obj.set("hire_method", kongcv_hire_method_obj);

    var kongcv_park_community_obj;
    if ("community" === mode) {
        kongcv_park_community_obj = new kongcv_park_community_cls();
        kongcv_park_community_obj.id = park_id;
        kongcv_trade_obj.set("park_community", kongcv_park_community_obj);
    }
    else if ("curb" === mode) {
        var kongcv_park_curb_obj = new kongcv_park_curb_cls();
        kongcv_park_obj.id = park_id;
        kongcv_trade_obj.set("park_curb", kongcv_park_curb_obj);
    }
    else {
        response.success(ERROR_MSG.ERR_MODE_NO_EXIST);
        return;
    }
 
    kongcv_trade_obj.set("price", price);

    if ("community" === mode) {
        /*var now_date = new Date();
        var now_minseconds = now_date.getTime();
        var preorder_minseconds = now_minseconds - limit_minseconds;
        var preorder_date = new Date(preorder_minseconds);
        console.log("now_date", now_date);
        console.log("preorder_date", preorder_date);

        var preorder_query = new AV.Query(kongcv_preorder_cls);
        preorder_query.equalTo("park_community", kongcv_park_community_obj);
        preorder_query.equalTo("preorder", 1);
        preorder_query.greaterThan("updatedAt", preorder_date);
        preorder_query.find({
            success : function(results) {
                var kongcv_preorder_obj = new kongcv_preorder_cls();
                if (results.length > 0) {
                    if (1 === results.length) {
                        response.success(ERROR_MSG.ERR_PARK_PREORDER_EXIST);
                        return;
                    }
                    else {
                        response.success(ERROR_MSG.ERR_SYSTEM_TRADE);
                        return;
                    }
                }
                else if (0 === results.length) { 
                    kongcv_preorder_obj.set("park_community", kongcv_park_community_obj);
                    kongcv_preorder_obj.set("user", user_obj);
                    kongcv_preorder_obj.set("preorder", 1);
                    kongcv_preorder_obj.save().then(
                        function() {
                            kongcv_trade_obj.save().then(
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
        });*/
        
        var kongcv_preorder_obj = new kongcv_preorder_cls();
        kongcv_preorder_obj.set("park_community", kongcv_park_community_obj);
        kongcv_preorder_obj.set("user", user_obj);
        kongcv_preorder_obj.set("preorder", 1);
        kongcv_preorder_obj.save().then(
            function(results) {
                var kongcv_preorder_obj = results[0]; 
                var now_date = new Date();
                var now_minseconds = now_date.getTime();
                var preorder_minseconds = now_minseconds - limit_minseconds;
                var preorder_date = new Date(preorder_minseconds);
                console.log("now_date", now_date);
                console.log("preorder_date", preorder_date);

                var preorder_query = new AV.Query(kongcv_preorder_cls);
                preorder_query.equalTo("park_community", kongcv_park_community_obj);
                preorder_query.greaterThan("updatedAt", preorder_date);
                preorder_query.find({
                    success : function(results) {
                        if (results.length > 1) {
                            kongcv_preorder_obj.destroy({
                                success : function(kongcv_preorder_obj) {
                                    console.log("park preorder exist, delete preorder data");
                                    response.success(ERROR_MSG.ERR_PARK_PREORDER_EXIST)
                                    return;
                                },
                                error : function(kongcv_preorder_obj, error) {
                                    console.log("delete preorder data");
                                    response.error(error);
                                    return;
                                }
                            });
                        }
                        else if (1 === results.length) {
                            kongcv_trade_obj.save().then(
                                function(result) {
                                    response.success(RESULT_MSG.RET_OK);
                                    return;
                                },
                                function(error) {
                                    response.error(error);
                                    return;
                                }
                            );
                        }
                        else if (0 === results.length) { 
                            response.success(ERROR_MSG.ERR_SYSTEM_PREORDER);
                            return;
                        }
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
    }
    else if ("curb" === mode) {
        kongcv_trade_obj.save().then(
            function() {
                response.success(RESULT_MSG.RET_OK);
                return;
            },
            function(error) {
                response.error(error);
                return;
            }
        );
    }
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
        response.success(ERROR_MSG.ERR_MODE_NO_EXIST);
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
        response.success(ERROR_MSG.ERR_MODE_NO_EXIST);
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

    var query = new AV.Query(kongcv_park_cls);
    query.equalTo("objectId", park_id);
    query.include("user");
    query.include("hire_method");
    query.find({
        success : function(results) {
            for (var i = 0; i < results.length; i++) {
                results[i].set("hire_method", JSON.stringify(results[i].get("hire_method")));
                results[i].set("user", JSON.stringify(results[i].get("user")));
                //var user_cls = AV.Object.extend("_User")
                //var user_obj = new user_cls();
                //user_obj = results[i].get("user");
                //results[i].set("user", JSON.stringify(user_obj));
                //console.log("user",user_obj._serverData.username);
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

/**
 * brief   : jpush push messge
 * @param  : request - {}
 *           response - return map recordset or error
 * @return : RET_OK - success
 *           {recordset json array}
 *           RET_ERROR - system error
 *           {"code":601,"error":"xxxxxx"}
 */
AV.Cloud.define("kongcv_jpush_message", function(request, response) {
    /*var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("post", "https://api.jpush.cn/v3/push",false, "66a451feb7e898cab2d6c804","fbf2aad3a19ab805cb520b1a");
    xmlhttp.setRequestHeader("Content-Type","application/json");
    xmlhttp.send('{"platform":"all","audience":"all","notification":{"alert":"Hi,JPush!"}}');*/

    AV.Cloud.httpRequest({
        method: 'post',
        url: 'https://api.jpush.cn/v3/push',
        auth: {
        'user': '66a451feb7e898cab2d6c804',
        'password': 'fbf2aad3a19ab805cb520b1a'},
        headers: {'Content-Type': 'application/json'},
        body:{"platform":"all","audience":"all","notification":            {"alert":"Hi,JPush!"}},
        success: function(httpResponse) {
            console.log(httpResponse.text);
        },
        error: function(httpResponse) {
            console.error('Request failed with response code ' + httpResponse.status);
        }
    });
});
 
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
 
