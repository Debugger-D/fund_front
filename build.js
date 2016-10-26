({
    appDir: './',
    baseUrl: "./",
    mainConfigFile: '../../main.js',
    dir: "www-build",
    modules: [
        {
            name: 'main'
        },
        {
            name: 'controller/personal/i/main',
            exclude: ['main']
        },
        {
            name: 'controller/personal/trade/main',
            exclude: ['main']
        }
    ],
    optimize: "none",
    fileExclusionRegExp: /^(r|build|jquery)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    paths: {
        /* requirejs 插件 */
        'text': 'framework/text',
        'domReady': 'framework/domready',
        /* 没jQuery, 玩什么 */
        'jquery': 'framework/jquery-1.11.0.min',
        'jq.cookie': 'framework/jquery.cookie',
        /* jQuery 基友 */
        'underscore': 'framework/underscore.min',
        /* jquery 提示插件 */
        'toastr': 'framework/toastr.min',
        /* 日历插件 */
        'datepicker': 'framework/datepicker/datepicker',
        /* 弹出层插件 */
        'layer': 'framework/layer',
        /* 异步-同步控制 */
        'q': 'framework/q',
        /* 订阅模式 */
        'pubsub': 'framework/pubsub',
        /* 公用视图组件 */
        'comView': 'controller/common',
        /* 公共功能组件 */
        'core': 'util/core',     // 核心服用模块
        'modal': 'util/modal',    // ajax 数据请求封装
        'filter': 'util/filter'     // arttemplate 过滤器
    }
})
