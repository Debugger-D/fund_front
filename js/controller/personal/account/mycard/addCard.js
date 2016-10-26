define(['modal', 'util/block', 'core',
	'build/personal/account/mycard/addCard'], 
    function(modal, B, core, 
    	tpl) {
    return function(id){
    	var main_B = B.create(id, tpl);
    	main_B.bind = function() {
    		$("#mycard-add-btn").click(function() {

				// content-type： application/x-www-form-urlencoded
				// POST bankcard
				// 传入参数

				// 字段	类型	是否必须	示例值	默认值	描述
				// appId	String	是		无	
				// bankcardNo	String	是		无	
				// realName	String	是		无	
				// idCardNo	String	是		无	
				// from	String	是		无	
				// 返回结果
				var shopParam = core.getStatic('shopParam');
				delete shopParam.appKey;
	    		var param = $.extend(
			    					{}, 
		    						{	
		    							appId:'F75378884E4048C7AF8890DB9A38C541',
										from:'shop',
							  			bankcardNo: '4367421543700081226',
							  			realName: '程辰',
							  			idCardNo: '421023198601290059'
							  		});
				modal.run('funds.bindCard', $.param(param)).then(function(data) {
		    		var param = $.param(core.stringToJSON(data.info));
		    		window.location.href = 'https://mapi.alipay.com/gateway.do?' + param;
		  		});


    		})
    	}
    	main_B.run();
    }
});
