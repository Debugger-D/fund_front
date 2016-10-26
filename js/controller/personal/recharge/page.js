define(['modal', 'util/block', 'core',
	'build/personal/recharge/main', 'build/personal/recharge/lian', 'build/personal/recharge/bankCard',
	'build/personal/recharge/weixin'], 
    function(modal, B, core, 
    	main_tpl, lian_tpl, card_tpl,
    	weixin_tpl) {
    return function(){
    	modal.run('personal.balance')
	    	.then(function(data) {
	    		if(data.info && data.info[0]) {
	    			var amount = data.info[0].useableAmount;
	    			amount = amount ? amount : '0.00';
	    			$("#recharge-balance").html(amount);
	    		}
	    		
	    	});
	    var main_B = B.create('#page', main_tpl);
	    main_B.run();

	    // 判断该用户是否存在主账户
	    var accountHave = function(cbfn) {
	    	modal.run('funds.accountHave')
		   		.then(function(data) {
		   			cbfn(data);
		   		});
	    }

	    // 检查充值金额
	    var checkAmount = function(amount) {
	    	$("#recharge-page .amount-msg").html("");
	    	
	    	var validator = core.validator();

	    	if(!validator.check.required(amount)) {
	    		$("#recharge-page .amount-msg").append("必填项.<br/>");
	    		return false;
	    	}

	    	if(!validator.check.floatNum2(amount)) {
	    		$("#recharge-page .amount-msg").append("价格必须位数字，且小数点最多2位.<br/>");
	    		return false;
	    	}

	    	return true;
	    }


	    var shopParam = core.getStatic('shopParam');

	    accountHave(function(data) {
			if(data.result == true) {
   				// 如果主账户存在
   					modal.run('funds.accountHaveSub', shopParam)
   						.then(function(data) {
   							// 如果有子账户，则直接进入充值页面

   							// 如果没有子账户，则开户，不需要支付密码
   						});

   			} else {
   				// 不存在，需要开户, 需要支付密码
   				var param = $.extend({}, shopParam, {payPassword: '123456'});
   				modal.run('funds.accountOpen', $.param(param));
   			}
	    });


	    // 支付宝
	    $("#alipay").click(function() {
	    	var amount = $("#recharge-page .amount").val();
	    	if( checkAmount(amount) ) {
	    		$(".content").html("请稍后...");
	    		var param = $.extend({}, 
	    						shopParam, 
	    						{
						  			channel: 'ALIPAY',
						  			terminal: 'WEB',
						  			rechargeAmount: amount,
						  			retUrl: 'http://10.200.4.143/fund_front/personal/i.html'
						  		});
		    	modal.run('funds.payRecharge', $.param(param)).then(function(data) {
				    		var param = $.param(core.stringToJSON(data.info));
				    		window.location.href = 'https://mapi.alipay.com/gateway.do?' + param;
				  		});
	    	}
	    	
	    });

	    // 微信
	    $("#weixin").click(function() {
	    	var amount = $("#recharge-page .amount").val();
	    	if( checkAmount(amount) ) {
	    		$(".content").html("请稍后...");
		    	var param = $.extend({}, 
		    						shopParam, 
		    						{
							  			channel: 'WEIXIN',
							  			terminal: 'WEB',
							  			rechargeAmount: amount,
							  			retUrl: 'http://10.200.4.143/fund_front/personal/i.html'
							  		});
		    	modal.run('funds.payRecharge', $.param(param)).then(function(data) {
			  			var html = weixin_tpl({amount:amount, qrcode: core.qrCode(data.info.codeurl+"&w=300&h=300") });
			  			$("#recharge-page").html(html);
			  		});
	    	}
	    });

	    // 绑卡
	    $("#lian").click(function() {
	    	var amount = $("#recharge-page .amount").val();
	    	if( checkAmount(amount) ) {

		    	var lian_B = B.create('#recharge-page .msg', card_tpl, modal.run('funds.bankcard'));
		    	
		    	lian_B.bind = function() {
			    	$("#lianlian-div-2 .bank-card-list").click(function(e) {
			    		var $tar = $(e.target);
			    		var bankCardNo = $tar.data('cardno');

			    		console.log("No. "+bankCardNo);

			    		var param = $.extend(
					    					{}, 
				    						shopParam, 
				    						{
									  			channel: 'LIANLIAN',
									  			terminal: 'WEB',
									  			payType: 'QUICKPAY',
									  			bankCardNo: bankCardNo,
									  			rechargeAmount: amount,
									  			retUrl: 'http://10.200.4.143/fund_front/personal/i.html'
									  		});
		    			modal.run('funds.payRecharge', $.param(param))
		    				.then(function(data) {
					    		var param = $.param(data.info);
					    		window.location.href = 'https://yintong.com.cn/payment/bankgateway.htm?' + param
					  		});
			    	})
			    }
		    	lian_B.run();
		    }
	    });
    }
});
