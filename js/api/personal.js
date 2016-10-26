define([], function() {
    // 个人中心
    var baseUrl = '/personalAdmin/';

    return {
        /*
        * 个人中心
        * http://devtest.pocketwallet.cn/documentAuto/#/3229/intro
        */
        // = 个人中心 =
        // 账户余额
        balance :{
            url: baseUrl + 'account/balance',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        //添加支付密码
        addPSWD: {
            url:  baseUrl+'account/password',
            type: 'PUT',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 修改支付密码
        modifyPSWD: {
            url: baseUrl + 'account/password/modify',
            type: 'PUT',
            contentType: 'application/x-www-form-urlencoded'
        },
        // = 交易记录 =
        // 所有交易记录列表
        allBill: {
            url: baseUrl + 'bill/all/:pageIndex',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 订单详情
        billInfo: {
            url: baseUrl + 'bill/detail/:id',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // = 资金明细 =
        // 余额、渠道和渠道明细
        balanceInfo: {
            url: baseUrl + 'balance/all/:pageIndex',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // E卡明细
        
        // = 我的对账单 =
        // 用户三个月收支表或近一年的收支表
        analyseR: {
            url: baseUrl + 'analyse/range',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 我的财富—数量与金额
        wealthCount: {
            url: baseUrl + 'analyse/statistics',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // = 密保 =
        // 设置密保
        setQuestion: {
            url: baseUrl + '/question',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 获取用户密保问题
        getQuestion: {
            url: baseUrl + '/question',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 检验用户密保答案是否正确
        checkQuestion: {
            url: baseUrl + '/question/check',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 获取所有的密保问题
        allQuestion: {
            url: baseUrl + '/question/all',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 修改密保用户问题
        modifyQuestion: {
            url: baseUrl + '/question/modify/:id',
            type: 'PUT',
            contentType: 'application/x-www-form-urlencoded'
        }
    }
});
