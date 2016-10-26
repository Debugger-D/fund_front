define(['modal', 'util/block', 'core', 'controller/personal/account/mycard/addCard',
	'build/personal/account/mycard/main', 'build/personal/account/mycard/list'], 
    function(modal, B, core, addCard_ctrl,
    	main_tpl, list_tpl) {
    return function(){
    	var main_B = B.create('#page', main_tpl);
    	main_B.run();

    	var list_B = B.create('#account-page .content', list_tpl, modal.run('funds.bankcard') );
	    
        list_B.bind = function() {
            $("#mycard-bind").click(function(){
                addCard_ctrl('#account-page .content');
            });
        }
        list_B.run();

	    
    }
});
