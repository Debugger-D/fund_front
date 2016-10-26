define(['modal', 'util/block', 'core', 'q',
	'build/personal/account/question/main', 'build/personal/account/question/info'], 
    function(modal, B, core, Q,
    	main_tpl, info_tpl) {
    return function(){        
    	// main 主题html
    	$("#page").html(main_tpl());
    	// 内容
	    var main_B = B.create('#account-page .content', info_tpl, Q.all([modal.run('funds.realName'), modal.run('funds.accountHave')]) );
        main_B.cbfn = function(res) {
            console.log($.extend({}, res[0], {haveAccount: res[1].result}, core.getUsr()) );
            return $.extend({}, res[0], {haveAccount: res[1].result}, core.getUsr());
        }
	    main_B.run();

    }
});
