define(['modal', 'util/block', 'core',
	'build/personal/detail/main'], 
    function(modal, B, core,
    	main_tpl) {
    return function(){
	    // var main_B = B.create('#page', main_tpl);
	    // main_B.run();
	    modal.run('personal.billInfo', {id: core.getUrlParam('id'), tradeType: core.getUrlParam('tradeType')})
	    	.then(function(data) {
				var trans = {
					typeName: {
						'RECHARGE' :'充值',
						'WITHDRAW' : '提现',
						'TRANSFER' : '转账',
						'CONSUME': '支付',
						'REFUND':'退款'
					},
					statusName: {
						'SUCCESS': '成功',
						'DOING':'处理中',
						'FAILURE':'失败',
						'CLOSE':'已关闭'
					}
				}
				var channal={
					channalType:{
						'ALIPAY':'../img/personal/detail/alipay.png',
						'WEIXIN':'../img/personal/detail/weixin.png',
					}
				}

				var param = $.extend({}, trans, channal, data);
				var html = main_tpl(param);
				$('#page').html(html);
			},function (err) {
				
			});
    }
});
