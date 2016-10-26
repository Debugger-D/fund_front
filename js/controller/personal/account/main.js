requirejs(['jquery', 'domReady', 'core', 'filter', 'comView/header', 'comView/footer', './controller/personal/account/page'],
    function($, domReady, core, filter, header, footer, page) {
    domReady(function() {
        core.checkAuth(function() {
        	header('#header', 'm3');
        	page();
            footer();
        }, function() {
            core.location('../login.html');
        });
    });
})
