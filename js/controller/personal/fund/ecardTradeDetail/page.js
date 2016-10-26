define(['modal', 'util/block', 'core',
    'build/personal/fund/ecardTradeDetail/main'], 
    function(modal, B, core,
        main_tpl) {
    return function(){
        // var main_B = B.create('#page', main_tpl);
        // main_B.run();
        modal.run('ecard.getCardListByOrder', {orderId: core.getUrlParam('orderId'), tradeType: 'CONSUME'})
            .then(function(data) {
                
                var html = main_tpl(data);
                $('#page').html(html);
                
            },function (err) {
                
            });
    }
});
