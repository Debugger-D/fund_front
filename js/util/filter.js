/*
 *  arttemplate 公用过滤器注册
 */
define(['jquery', 'build/template'], function($, template) {
    template.helper('dateFormat', function (date, format) {
        date = new Date(date);

        var map = {
            "M": date.getMonth() + 1, //月份 
            "d": date.getDate(), //日 
            "h": date.getHours(), //小时 
            "m": date.getMinutes(), //分 
            "s": date.getSeconds(), //秒 
            "q": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        format = format.replace(/([yMdhmsqS])+/g, function(all, t){
            var v = map[t];
            if(v !== undefined){
                if(all.length > 1){
                    v = '0' + v;
                    v = v.substr(v.length-2);
                }
                return v;
            }
            else if(t === 'y'){
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    });

    // 支付渠道
    template.helper('channelID', function (channel) {
        var channelName = {
            'ALIPAY': '支付宝',
            'BALANCE': '余额支付',
            'WEIXIN': '微信支付',
            'LIANLIAN': '连连支付',
            'ECARD': 'E卡支付',
            'CREDIT': '赊账',
            'JDPAY': '京东支付',
            'OTHER': '--'
        }
        var name = channelName[channel];
        return  name ? name : '--';
    });

    // 银行卡号
    template.helper('bankCardNo', function (cardNo) {
        var no = $.trim(cardNo);

        if(typeof no == 'undefined' || no.length == 0) {
            return '';
        }

        return '****'+no.substr(-4);
    });

    // 订单状态
    template.helper('billStatus', function (status) {
        var stuatsName = {
            'DOING': '待支付',
            'GUARANTEE': '失败',
            'SUCCESS': '成功',
            'FUNDSFAILURE': '失败',
            'CLOSE': '失败',
            'REFUND': '失败',
            'BADGATEWAY': '失败',
            'OHTER': '--'
        }

        var name = stuatsName[status];

        return  name ? name : '--';
    });

    // 交易类型 icon
    // REFUND|CONSUME|RECHARGE|TRANSFER
    // 退款|消费|充值|转账
    template.helper('tradeTypeIcon', function (type) {
        var className = {
            'REFUND': 'myicon-refund',
            'CONSUME': 'myicon-consume',
            'RECHARGE': 'myicon-recharge',
            'TRANSFER': 'myicon-transfer'
        }

        var name = className[type];

        return  name ? name : '';
    });  


    //订单详情支付状态
    template.helper('consumeStatus', function (status) {
        var stuatsName = {
            'DOING': '处理中',
            'GUARANTEE': '交易担保中',
            'SUCCESS': '支付成功',
            'FUNDSFAILURE': '资金计费处理失败',
            'CLOSE': '订单关闭',
            'REFUND': '订单已退款',
            'BADGATEWAY': '网关处理失败',
            'OHTER': '--'
        }

        var name = stuatsName[status];

        return  name ? name : '--';
    });
    //订单详情充值状态
    template.helper('rechargeStatus', function (status) {
        var stuatsName = {
            'DOING': '处理中',
            'GUARANTEE': '交易担保中',
            'SUCCESS': '充值成功',
            'FUNDSFAILURE': '资金计费处理失败',
            'CLOSE': '订单关闭',
            'REFUND': '订单已退款',
            'BADGATEWAY': '网关处理失败',
            'OHTER': '--'
        }

        var name = stuatsName[status];

        return  name ? name : '--';
    });
    //订单详情提现状态
    template.helper('withdrawStatus', function (status) {
        var stuatsName = {
            'DOING': '处理中',
            'GUARANTEE': '交易担保中',
            'SUCCESS': '提现成功',
            'FUNDSFAILURE': '资金计费处理失败',
            'CLOSE': '订单关闭',
            'REFUND': '订单已退款',
            'BADGATEWAY': '网关处理失败',
            'OHTER': '--'
        }

        var name = stuatsName[status];

        return  name ? name : '--';
    });

    //订单详情转账状态
    template.helper('transferStatus', function (status) {
        var stuatsName = {
            'DOING': '处理中',
            'GUARANTEE': '交易担保中',
            'SUCCESS': '转账成功',
            'FUNDSFAILURE': '资金计费处理失败',
            'CLOSE': '订单关闭',
            'REFUND': '订单已退款',
            'BADGATEWAY': '网关处理失败',
            'OHTER': '--'
        }

        var name = stuatsName[status];

        return  name ? name : '--';
    });
    //订单详情退款状态
    template.helper('refundStatus', function (status) {
        var stuatsName = {
            'DOING': '处理中',
            'GUARANTEE': '交易担保中',
            'SUCCESS': '退款成功',
            'FUNDSFAILURE': '资金计费处理失败',
            'CLOSE': '订单关闭',
            'REFUND': '订单已退款',
            'BADGATEWAY': '网关处理失败',
            'OHTER': '--'
        }

        var name = stuatsName[status];

        return  name ? name : '--';
    });
});