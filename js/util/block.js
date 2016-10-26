define(['jquery'], function($) {

    var block = {
        maker: function(JQsel, tpl, dATa, option) {
            // JQsel
            if(!JQsel || JQsel.length < 1) {
            // 　  throw new Error("block: ["+JQsel+"] 区块必须指定选择器!");
                console.log("内核出错: block 必须指定选择器!");
                return {};
            }

            // if(!$(JQsel) || $(JQsel).length < 1) {
            //     console.log("内核出错: block["+JQsel+"] 选择器的DOM对象不存在!");
            //     return {};
            // }

            // tpl
            if( typeof tpl == 'string' ) {
                var str = tpl;
                tpl = function() {
                    return str;
                }
            } if(!tpl || typeof tpl != 'function') {
                tpl = function() {
                    return '<div></div>';
                }
            } 

            // option
            if(!option) {
                option = {}
            }

            var that = this;

            // init variable
            // 初始化变量
            that.modal = {};
            that.tpl = tpl;
            that.JQsel = JQsel;
            that.jqOBJ = undefined;
            that.html = '';

            that.run = function() {
                that.render(dATa);
                return that;
            }

            // ============================
            // core function
            // ============================
            // factory data to make it right
            that._dataFactory = function(data) {
                var dd = data;
                if( typeof data == 'undefined' ) {
                    dd = {};
                } else if (typeof data == 'function') {
                    dd = data();
                    dd = dd ? dd : {};
                } else if (typeof data == 'object' && typeof data.then == 'function') {
                    dd = data;
                    dd.isAjax = 999;
                } else {
                    dd = data ? data : {};
                }

                return dd;
            }

            // 根据用户传来的数据渲染模板
            that.render = function(data) {
                var that = this;
                // remove DOM and bind event;
                $(that.JQsel).html('');
                // get modal way
                that.modal = that._dataFactory(data);

                if(that.modal.isAjax == 999) {
                    // 异步需要等到数据，再执行渲染和绑定
                    that.modal.then(function(res) {
                        // 回调函数修改返回的数据为指定格式
                        var data = that.cbfn(res);
                        // 如果返回格式有误，则返回原来的数据
                        data = data ? data : res;
                        // 获取渲染后的 HTML
                        that.html = that.tpl(data);
                        that.jqOBJ = $(that.JQsel).html(that.html);
                        // 绑定自定义事件
                        typeof that.bind == 'function' && that.bind();
                    }, function(err) {
                        that.cberr(err);
                    });
                } else {
                    that.html = that.tpl(that.modal);
                        if(typeof that.html == 'string') {
                        that.jqOBJ = $(that.JQsel).html(that.html);
                        // 绑定自定义事件
                        typeof that.bind == 'function' && that.bind();
                    }
                }
            }

            // callback function run after sync modal
            // request success.
            // 回调函数, 只有当 modal 是一个异步请求的时候调用
            // 可以通过覆盖的方法手动设置
            that.cbfn = function(res) {
                return res;
            }

            // callback function run after sync modal
            // request Failed.
            that.cberr = function(err) {
                console.log(err);
            }

            // DOM 渲染结束后绑定的函数
            // 可覆盖
            // ! 必须在 run() 对象之前，覆盖才能生效
            that.bind = function() {
                // ... 
            }

            return this;
        },
        create: function(JQsel, tpl, data, option) {
            return new block.maker(JQsel, tpl, data, option);
        }
    }

    

    return block;
});
