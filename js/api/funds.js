define([], function() {
    /*
    * 资金2.0
	* http://devtest.pocketwallet.cn/documentAuto/#/1629/2255/3397        
	*/
    var baseUrl = '/funds/';
    return {  
        // = 银行相关信息模块 =
        // == 账户模块 ==
        // 用户开户-
        accountOpen :{
            url: baseUrl + 'account/open',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 获取账户详情
        accountInfo :{
            url: baseUrl + 'account/info',
            type: 'GET',
            contentType: 'application/json'
        },
        // 获取所有帐户信息
        accountList :{
            url: baseUrl + 'account/list',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 获取账户状态 ON:正常，FREEZE:冻结, DELETE:注销，BLACK:拉黑
        accountStatus :{
            url: baseUrl + 'account/status/:accountId',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 修改账户名称
        accountName :{
            url: baseUrl + 'account/status/:accountId',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 判断该用户是否存在主账户
        accountHave :{
            url: baseUrl + 'account/have',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 判断该用户是否存在子账户
        accountHaveSub :{
            url: baseUrl + 'account/have/sub',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 用户已经存在主账户，开子账户;不需要支付密码
        accountOpenSub :{
            url: baseUrl + 'account/open/sub',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 验证支付密码
        payPwdCheck: {
            url: baseUrl + 'account/password/verify',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        },
        resetPsw:{
            url:baseUrl+'account/password/reset',
            type:'PUT',
            contentType: 'application/x-www-form-urlencoded'
        },
        // == 银行卡模块 ==
        // 用户发起绑卡
        bindCard :{
            url: baseUrl + 'bankcard',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 根据银行卡号查询银行详情
        cardInfo :{
            url: baseUrl + 'bankcard/bank',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // == 银行相关信息模块 == 
        // 获取绑卡金额
        bindCardAmount :{
            url: baseUrl + 'bank/bind/amount/:bankcardNo',
            type: 'GET',
            contentType: 'application/json'
        },
        // 获取实名信息
        realName: {
            url:  baseUrl+'authentication',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 修改未确认的实名信息
        modifyRealName: {
            url: baseUrl + 'authentication',
            type: 'PUT',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 获取绑定的所有银行卡信息
        bankcard: {
            url: baseUrl + 'bankcard',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // == 充值 ==
        // 普通充值
        payRecharge: {
            url: baseUrl + 'pay/recharge',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        }
    }
});
