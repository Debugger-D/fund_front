requirejs(['jquery', 'domReady', 'core', 'filter','laydate', 'comView/header', 'comView/footer', 'comView/sider', './controller/personal/fund/ecardTrade/page'],
    function($, domReady, core,laydate, filter, header, footer,sider, page) {
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