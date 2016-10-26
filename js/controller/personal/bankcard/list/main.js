/**
 * Created by hzwsj on 2016/10/18 0018.
 */
requirejs(['jquery', 'domReady', 'core', 'filter', 'comView/header', 'comView/footer', 'comView/sider', './controller/personal/bankcard/list/page','build/personal/ecard/list/filter'],
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