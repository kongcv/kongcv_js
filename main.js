var ERROR_MSG = {
    'ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST' : '{"state":"error", "code":0, "error":"手机号不能为空"}',
    'ERROR_MSG.ERR_USERNAME_MUST_EXIST' : '{"state":"error", "code":1, "error":"用户名不能为空"}',
    'ERROR_MSG.ERR_SMSCODE_MUST_EXIST' : '{"state":"error", "code":2, "error":"手机验证码不能为空"}'
};

var RESULT_MSG = {
    'RET_FAIL' : '{"state":"failed", "code":0, "msg":"失败"}',
    'RET_OK' : '{"state":"ok", "code":1, "msg":"成功"}'
};

/**
 * brief   : get smscode
 * @param  : request - {"mobilePhoneNumber":"13xxxxxx"}
 *           response - RET_OK or ERROR
 * @return : RET_OK - success
 *           ERROR - system error
 */
AV.Cloud.define("kongcv_get_smscode", function(request, response) {
    var mobilePhoneNumber = request.params.mobilePhoneNumber;
    
    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }

    AV.Cloud.requestSmsCode(mobilePhoneNumber).then(
        function() {
            response.success(RESULT_MSG.RET_OK);
        },
        function(error) {
            response.error(error)
        }
    );
});

/**
 * brief   : user sign up
 * @param  : request - {"mobilePhoneNumber":"13xxxxxx", "smsCode":"yyyyy"}
 *           response - RET_OK or RET_ERROR
 * @return : RET_OK - success, sessionToken - must storge
 *           RET_ERROR - system error
 */
AV.Cloud.define("kongcv_signup", function(request, response) {
    var mobilePhoneNumber = request.params.mobilePhoneNumber;
    var smsCode = request.params.smsCode;

    if (typeof(mobilePhoneNumber) == "undefined" || mobilePhoneNumber.length === 0) {
        response.success(ERROR_MSG.ERR_USER_MOBILE_MUST_EXIST);
        return;
    }

    if (typeof(smsCode) == "undefined" || smsCode.length === 0) {
        response.success(ERROR_MSG.ERR_SMSCODE_MUST_EXIST);
        return;
    }

    var json_obj = eval("("+RESULT_MSG.RET_OK+")");
    json_obj["sessionToken"] = smsCode;
    response.success(JSON.stringify(json_obj));
    return;

    var user = new AV.User();
    user.signUpOrlogInWithMobilePhone(
        request.params,
        {
            success : function(user) {
                console.log("*****************token", user._sessionToken);
                var json_obj = eval("("+RESULT_MSG.RET_OK+")");
                json_obj["sessionToken"] = user._sessionToken;
                response.success(JSON.stringify(json_obj));
            },
            error : function(error) {
                response.error(error)
            }
        }
    );
});
