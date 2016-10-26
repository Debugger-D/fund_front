define(['modal', 'util/block',
    'build/personal/i/main', 'build/personal/i/banner', 
    'build/personal/i/balance', 'build/personal/i/count',
    'build/personal/i/layer_withdraw',
    'core', 'layer'], 
    function(modal, B, 
        tpl, banner_tpl, 
        balance_tpl, count_tpl,
        layer_widthdraw_tpl,
        core, layer) {

        // 用户信息
        var userInfo = core.getUsr();

        // 主体模板容器，需第一个被渲染
        var main_B = B.create('#page', tpl);
        main_B.run();

        // block1: 用户信息
        var banner_B = B.create('#i-banner', banner_tpl, {phone: userInfo.phone});
        banner_B.run();

        // block2: 用户余额
        var balance_modal = modal.run('personal.balance');
        var balance_B = B.create('#i-balance', balance_tpl, balance_modal);
        balance_B.cbfn = function(res) {
            var info = res.info;
            var amountShop = 0;
            var amountEcard = 0;
            if(info && info.length > 0) {
                for(var i in info) {

                    if(info[i].accountId.indexOf('_trc') > 0) {
                        amountShop = info[i].useableAmount;
                    }

                    if(info[i].accountId.indexOf('_ecard') > 0) {
                        amountEcard = info[i].useableAmount;
                    }
                }
            } 

            return {
                amountShop: amountShop,
                amountEcard: amountEcard,
                totalAmount: amountShop + amountEcard
            }
        }

        balance_B.bind = function() {

            $(".recharge2").click(function() {

                core.accountHave(function(res) {
                    if( res == true) {
                        layer.confirm(layer_widthdraw_tpl(), {
                          title: ['提现', 'font-size:18px; font-weight: bold;'],
                          btn: ['提现','取消'],
                          area: ['620px', '320px'] 
                        },function(index){
                            var withdrawAmount = $("input[name=withdrawAmount]").val();
                            var bankCardNo = $("input[name=bankCardNo]").val();
                            var payPassword = $("input[name=payPassword]").val();
                        });
                    } else {
                        core.location('./account_setpswd.html');
                    }
                })
            })
        }

        balance_B.run();

        // ====================================
        // 统计金额
        // 时间段选择函数
        var dateLenth = function(type,num){
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
            // filterOption.startDate = d2 + ' 00:00:00';
            // filterOption.endDate = d1 + ' 23:59:59';

            return {
                startDate: d2 + ' 00:00:00',
                endDate: d1 + ' 23:59:59'
            }
        }

        // 画家
        var render = function(data) {
            var dt = data ? data : {};
            var html = count_tpl(dt);
            $("#i-trade .table").html(html);
        }

        var bind = function() {
            // 监听筛选事件
            $(".i-filter").change(function(){ 
                var filter = $(this).val();
                switch (filter)
                {
                case '1':
                  getList(dateLenth('day', 6));
                  break;
                case '2':
                  getList(dateLenth('month', 1));
                  break;
                case '3':
                  getList(dateLenth('month', 3));
                  break;
                case '4':
                  getList(dateLenth('month', 6));
                  break;
                case '5':
                  getList(dateLenth('year', 1));
                  break;
                case '-1':
                  getList({
                    startDate: '',
                    endDate: ''
                  });
                  break;
                }
                
            });
        }

        // 搬砖
        var getList = function(filterOption) {
            var filter = filterOption ? filterOption : {};
            modal.run('personal.wealthCount',filterOption)
                .then(function(data) {
                    render({info: data});
                });
        }

        // 获取列表
        getList(dateLenth('day', 6));
        bind();
});
