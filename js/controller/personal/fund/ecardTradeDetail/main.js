requirejs(['jquery', 'domReady', 'core', 'filter', 'comView/header', 'comView/footer', 'comView/sider', './controller/personal/fund/ecardTradeDetail/page'],
    function($, domReady, core, filter, header, footer,sider, page) {
    domReady(function() {
        core.checkAuth(function() {
            header();
            sider('#sider', 'sm3');
            page();
            footer();
        }, function() {
            core.location('../login.html');
        });
    });
})