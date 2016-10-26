define([], function() {
    var accountBaseUrl = '/account/';
    return {
        // 登录
        login :{
            url: accountBaseUrl + 'user/login',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 登出
        logout: {
            url: accountBaseUrl + 'user/logout',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 获取登录的用户电话
        get: {
            url:  accountBaseUrl+'/developer',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 是否登录
        isLogined: {
            url: accountBaseUrl + 'user/islogined',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 用户资料
        profile: {
            url: accountBaseUrl + 'user/profile',
            type: 'GET',
            contentType: 'application/json'
        }
        
    }
});
