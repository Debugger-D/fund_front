requirejs(['jquery', 'domReady', 'core', 'filter', 'comView/header', 'comView/footer', 'comView/sider', './controller/personal/account/mycard/page'],
    function($, domReady, core, filter, header, footer, sider, page) {
    domReady(function() {
        core.checkAuth(function() {
        	header();
            sider('#sider', 'sm5');
        	page();
            footer();
        }, function() {
            core.location('../login.html');
        });
    });
})