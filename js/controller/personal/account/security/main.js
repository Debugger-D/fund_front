/**
 * Created by hzwsj on 2016/10/19 0019.
 */
requirejs(['jquery', 'domReady', 'core', 'filter', 'comView/header', 'comView/footer', 'comView/sider', './controller/personal/account/security/page'],
    function($, domReady, core, filter, header, footer, sider, page) {
        domReady(function() {
            core.checkAuth(function() {
                header();
                sider('#sider', 'sm4');
                page();
                footer();
            }, function() {
                core.location('../login.html');
            });
        });
    })
