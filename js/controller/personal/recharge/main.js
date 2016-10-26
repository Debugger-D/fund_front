requirejs(['jquery', 'domReady', 'core', 'filter', 'comView/header', 'comView/footer', 'comView/sider', './controller/personal/recharge/page'],
    function($, domReady, core, filter, header, footer, sider, page) {
    domReady(function() {
        core.checkAuth(function() {
        	header();
            sider('#sider', 'sm1');
        	page();
            footer();
        }, function() {
            core.location('../login.html');
        });
    });
})