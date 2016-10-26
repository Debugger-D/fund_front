/**
 * Created by hzwsj on 2016/10/13 0013.
 */
requirejs(['jquery', 'domReady', 'core', 'filter', 'comView/header', 'comView/footer', 'comView/sider', './controller/personal/ecard/effective/page'],
    function($, domReady, core, filter, header, footer, sider, page) {
        domReady(function() {
            core.checkAuth(function() {
                header();
                sider('#sider', 'sm6');
                page();
                footer();
            }, function() {
                core.location('../login.html');
            });
        });
    })