define(['modal', 'util/block', 'core',
	'build/personal/account/main', 'build/personal/account/tab', 'build/personal/account/info'], 
    function(modal, B, core,
    	main_tpl, tab_tpl, info_tpl) {
    return function(){        
    	// main 主题html
    	$("#page").html(main_tpl());
    	// tab
    	// 保证运行在 main 之后, 否则找不到 id
	    $("#account-tab").html(tab_tpl({active: 1}));
    	// 内容
	    var main_B = B.create('#account-page .content', info_tpl, modal.run('funds.realName'));
	    main_B.run();

    }
});
