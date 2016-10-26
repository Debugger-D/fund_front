define([], function() {
    // 泰然短信服务
    var baseUrl = '/trcsms/';

    return {
        /*
        * 泰然短信服务
        * http://devtest.pocketwallet.cn/documentAuto/#/2232/2312/2313
        */
        // = 短信服务 =
        // 发送验证码
        send :{
            url: baseUrl + 'sms/:platformCode',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 验证验证码
        verify :{
            url: baseUrl + 'sms/verify/:platformCode',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        },
        // = 图形验证码 =
        // 生成图形验证码
        captcha :{
            url: baseUrl + 'captcha/:platformCode',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 验证图形验证码
        captchaVerify:{
            url: baseUrl + 'captcha/verify',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        }
    }
});
