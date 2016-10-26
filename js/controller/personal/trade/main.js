requirejs(['jquery', 'domReady', 'core', 'laydate','filter', 'comView/header', 'comView/footer', 'comView/sider', './controller/personal/trade/page'],
    function($, domReady, core, laydate ,filter, header, footer, sider, page) {
    domReady(function() {
        core.checkAuth(function() {
        	header();
            sider('#sider', 'sm2');
        	page();
            footer();
        }, function() {
            core.location('../login.html');
        });
    });
})