define([], function() {
    var base = '/ecard/';
    return {
        // == E卡信息 ==
        // 开卡
        open :{
            url: base + 'card/open/:cardId',
            type: 'PUT',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 充值
        recharge: {
            url: base + 'card/recharge',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 删除E卡
        delet: {
            url: base + 'card/:cardCode',
            type: 'DELETE',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 转赠
        send: {
            url: base + 'card/send/:cardId',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        },    
        // 查询E卡列表
        list: {
        	url: base + 'card/list/:pageIndex',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 分页查询E卡列表
        listByIndex: {
            url: base + 'card/list/:pageIndex',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // 根据卡ID和卡操作类型查询交易信息
        tradeList: {
        	url: base + 'card/trade/list/',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        //分页查询交易信息
        pageTradeList:{
            url: base + 'trade/list/:pageIndex',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        // == E卡后台管理 ==
        //根据订单id查询卡列表
        getCardListByOrder:{
            url: base + 'admin/card/list',
            type: 'GET',
            contentType: 'application/x-www-form-urlencoded'
        },
        //赠送和收到的E卡列表
        /*赠送*/
        sendEcardList:{
            url:base+'card/send/record/send',
            type:'GET',
            contentType:'application/x-www-form-urlencoded'
        },
        /*收到*/
        receiveEcardList:{
            url:base+'card/send/receive',
            type:'GET',
            contentType:'application/x-www-form-urlencoded'
        }
    }
});
