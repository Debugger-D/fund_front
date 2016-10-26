define(['modal', 'build/template',
    'jquery', 'underscore', 'layer','jq.cookie'],
    function(modal, template,
        $, _, layer) {

        //*****************************************************
        // 一些特殊的全局方法
        // 
        // ========================================
        // 时间格式化
        // 对Date的扩展，将 Date 转化为指定格式的String
        // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
        // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
        // 例子：
        // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
        // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
        Date.prototype.Format = function(fmt)
        { //author: meizz
          var o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
          };
          if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
          for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
          return fmt;
        }



        // animate.css jquery 扩展
        $.fn.extend({
            animateCss: function (animationName, reply) {
                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                $(this).removeClass('animated ' + animationName);
                this.addClass('animated ' + animationName).one(animationEnd, function() {
                    $(this).removeClass('animated ' + animationName);
                });

                return this;
            }
        });
        //*****************************************************
        // 公共模块对象
        var core = function() {
            this._version = '0.01';
            this.history = -1;

            // 全局静态变量
            this.globalVar = {
                'test': '# test #',
                'shopParam': {
                    'appId': 'F75378884E4048C7AF8890DB9A38C541',
                    'appKey': '2ABF0772C2B6F5688389060609FAB1AC',
                    'from': 'shop' 
                }
            }
        };

        // 获取全局静态变量
        core.prototype.getStatic = function(str) {
            if(!!this.globalVar[str]) {
                return this.globalVar[str];
            }
        }

        //=====================================
        // 业务相关

        /*
        *   登录，登出
        */
        core.prototype.login = function(phone, password, cbfn) {
            var that = this;
            modal.run('user.login', "phone=" + phone + "&password=" + password)
                .then(function (res) {
                    that.setUsrInfo(res);
                    typeof cbfn == 'function' && cbfn();
                }, function (err) {
                    console.log(err);
                    that.showErr(err.error.description);
                });
        }

        // logout
        core.prototype.logout = function(url) {
            modal.run('user.logout');
            this.clearUsrInfo();
            if(!url) {
                this.location('../index.html');
            } else {
                this.location(url);
            }
            
        }

        // set user info in cookie
        core.prototype.setUsrInfo = function(info) {
            var phone = info.phone ? info.phone : '';
            var userId = info.userId ? info.userId : '';
            $.cookie('FUND_USR_PHONE', phone);
            $.cookie('FUND_USR_ID', userId);
        }

        // clear cookie of user info and something dirty.
        core.prototype.clearUsrInfo = function() {
           $.removeCookie('FUND_USR_PHONE');
           $.removeCookie('FUND_USR_ID');
        }

        // 当前用户
        core.prototype.getUsr = function() { 
                var phone = $.cookie('FUND_USR_PHONE');
                var userId = $.cookie('FUND_USR_ID');

                if(!!phone && !!userId) {
                    return {
                        phone: phone,
                        userId: userId
                    }
                } else {
                    return {
                        phone: '',
                        userId: ''
                    }
                }
        }

        // 用户本地是否登录
        core.prototype.isLogined = function() {
            var info = this.getUsr();
            if( !info.phone || !info.userId ) {
                return false;
            } else {
                return true;
            }
        }

        // 用户是否登录，取服务器上的数据
        core.prototype.checkAuth = function(fnsuc, fnfai) {
            var that = this;
            modal.run('user.isLogined')
                .then(function(res) {
                    if( res.isLogined == "true" ) {
                        fnsuc && fnsuc(res.phone);
                    } else {
                        fnfai && fnfai(res.phone);
                    }
                }, function(err) {
                    core.clearUsrInfo();
                    that.showErr(err.error.description);
                });
        }

        //========= 资金相关 =========
        // 判断是否有主账户
        core.prototype.accountHave = function(cbfn) {
            modal.run('funds.accountHave')
                .then(function(data) {
                    cbfn(data.result);
                });
        }

        // 判断是否需要支付密码
        // 判断方式: 如果存在主账户则需要支付密码
        // needDo: 需要支付密码的时候回调函数
        // noDo: 不需要支付密码的时候回调函数
        // errDo: 请求服务器报错的时候回调函数
        core.prototype.checkNeedPswd = function(needDo, noDo, errDo) {
            modal.run('funds.accountHave')
                .then(function(data) {
                    if(data.result == true) {
                        // 需要
                        needDo && needDo()
                    } else {
                        // 不需要
                        noDo && noDo();
                    }
                }, function(err) {
                    // 出错
                    errDo && errDo(err);
                });         
        }

        // 弹出框设置支付密码
        core.prototype.checkNeedPswd = function() {
            var shopParam = this.getStatic('shopParam');
            requirejs(['text!./util/tpl/layer_setpaswd.html'], function(tpl) {
                layer.confirm(tpl, {
                  title: ['设置支付密码', 'font-size:18px; font-weight: bold;'],
                  btn: ['设置', '取消'],
                  area: ['520px', '220px'] 
                },function(index){
                    var payPassword = $.trim($("input[name=payPassword]").val());

                    if(payPassword.length <6 || payPassword.length >20) {
                        $(".set-pswd-msg").html('支付密码至少6位，最多20位');
                    } else {
                        // var param = $.extend({}, shopParam, {payPassword: payPassword});
                        // modal.run('funds.accountOpen', $.param(param));
                        //....
                    }
                });  
            })
        }

        // 网页跳转
        core.prototype.location = function(url) {
            window.location.href = url;
        };

        // 获取URL 参数
        core.prototype.getUrlParam = function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }

        // 字符串转JSON
        core.prototype.stringToJSON = function(str) {
            return eval("(" + str + ")");
        }

        // 资金相关
        // 资金支付方式
        // 支付宝
        core.prototype.alipay = function(param) {
            document.location.href = 'https://mapi.alipay.com/gateway.do?' + param
        }
        // 微信, 二维码图片地址
        core.prototype.qrCode = function(url) {
            return 'http://pan.baidu.com/share/qrcode?w=150&h=150&url='+url;
        }

        // err 统一报错
        core.prototype.showErr = function (content, option) {
            toastr.clear();
            toastr.error(content);
        };

        // 统一成功提示
        core.prototype.showSuccess = function (content, option) {
            toastr.clear();
            toastr.success(content);
        };

        //=================
        // 验证相关
        core.prototype.validator = function(str, pattern) {

            if(pattern && typeof str == 'string') {
                return pattern.test(str);
            }
            
            return {
                check: {
                    required : function(val) {
                        if(!val || !$.trim(val).length) {
                            return  false;
                        }

                        return true;
                    },
                    maxlength: function(val, max) {
                         return core.DataLength(val) <= max;
                    },
                    minlength: function(val, min) {
                        return core.DataLength(val) >= min;
                    },
                    urltype: function(val) {
                        if($.trim(val).length == 0) return true;

                        var reg = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/;

                        return reg.test(val);
                    },
                    number: function(val) {
                        if($.trim(val).length == 0) return true;

                        var reg = /^[0-9]\d*$/;
                        return reg.test(val);
                    },
                    // 浮点数保留2位
                    floatNum2: function(val) {
                        if($.trim(val).length == 0) return true;

                        var reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
                        return reg.test(val);
                    },
                    idcard: function(val) {
                        if($.trim(val).length == 0) return true;

                        var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
                        return reg.test(val);
                    },
                    phone: function(val) {
                        if($.trim(val).length == 0) return true;

                        var reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
                        return reg.test(val);
                    },
                    tel: function(val) {
                        if($.trim(val).length == 0) return true;

                        var reg = /^1(3|4|5|7|8)\d{9}$/;
                        return reg.test(val);
                    },
                    email: function(val) {
                        if($.trim(val).length == 0) return true;

                        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
                        return reg.test(val);
                    },
                    bankcard: function(val) {
                        if($.trim(val).length == 0) return true;
                        var reg = /^(\d{15}|\d{16}|\d{18}|\d{19})$/;
                        return reg.test(val);
                    }
                }
            }
        }

        core.prototype.dateLenth = function(type,num){
            var d1 = new Date();
            var d2 = new Date(d1);
            if(type == 'day'){
                d2.setDate(d1.getDate()-num);
            }else if(type == 'month'){
                d2.setMonth(d1.getMonth()-num);
            }else if(type == 'year'){
                d2.setMonth(d1.getMonth()-num*12);
            }
            d1 = d1.Format("yyyy-MM-dd");d2 = d2.Format("yyyy-MM-dd");
            $("#startDate").val(d2);
            $("#endDate").val(d1);
            filterOption.startDate = d2 + ' 00:00:00';
            filterOption.endDate = d1 + ' 23:59:59';
        }

        return new core();
});
