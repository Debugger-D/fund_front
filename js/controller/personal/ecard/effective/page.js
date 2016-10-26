/**
 * Created by hzwsj on 2016/10/13 0013.
 */
define(['modal', 'util/block', 'core',
        'build/personal/ecard/effective/main','build/personal/ecard/effective/list','layer'],
    function(modal, B, core,
             main_tpl,card_tpl,layer) {
        return function(){
            $('#page').html(main_tpl());
            var option = {
                totalData: 10,
                totalPage: 1,
                pageSize: 10,
                pageIndex: 1,
                perDo: function(index) {
                    getList(index);
                }
            };
            var filterOption = {
                startDate: '',
                endDate: '',
                tradeType: '',
                channelId: '',
                status: '',
                queryType:'USED'
            }
            var render = function(data) {
                var html = card_tpl(data);
                $("#cardBox").html(html);
            }
            var getList = function(index) {
                var param = $.extend({}, {pageIndex: index, pageSize: 10},filterOption);
                modal.run('ecard.list', param)
                    .then(function(data) {
                        render(data);
                    }, function(err) {
                        console.log(err);
                    })
            };

            $("#page").html(main_tpl());
            getList(1);

            /*绑定E卡*/
            $('.bind-ecard-btn').click(function () {
                //判断是否绑卡（开户）
                modal.run('funds.accountHave').then(function (data) {
                    if(data.result){
                        layer.confirm('绑定E卡：', {
                            btn: ['确定','取消'],
                            area: ['820px', '200px'],
                            content: '<div id="bind-ecard-input" class="clearfix">' +
                            '<div class="label">请输入卡密</div>' +
                            '<div class="input"><input type="text" value="" maxlength="5" minlength="5" class="bind-ecard-input1"/></div>' +
                            '<div class="line">—</div>' +
                            '<div class="input"><input type="text" value="" maxlength="5" minlength="5" class="bind-ecard-input2"/></div>' +
                            '<div class="line">—</div>' +
                            '<div class="input"><input type="text" value="" maxlength="5" minlength="5" class="bind-ecard-input3"/></div>' +
                            '<div class="line">—</div>' +
                            '<div class="input"><input type="text" value="" maxlength="5" minlength="5" class="bind-ecard-input4"/></div>' +
                            '</div>' +
                            '<div class="bind-ecard-error"> </div>',
                            yes: function(index){
                                var ecardCode=$('.input input').val();
                                modal.run('ecard.recharge',$.param({cardCode:ecardCode})).then(function () {
                                    layer.close(index);
                                    layer.msg('绑定成功');
                                },function (err) {
                                    console.log(err);
                                    $('.bind-ecard-error').html(err.error.description);
                                })
                            }
                        });
                        layer.ready(function () {
                            $('.bind-ecard-input1').keyup(function () {
                                if($('.bind-ecard-input1').val().length==5){
                                    $('.bind-ecard-input2').focus();
                                }
                            });
                            $('.bind-ecard-input2').keyup(function () {
                                if($('.bind-ecard-input2').val().length==5){
                                    $('.bind-ecard-input3').focus();
                                }
                            });
                            $('.bind-ecard-input3').keyup(function () {
                                if($('.bind-ecard-input3').val().length==5){
                                    $('.bind-ecard-input4').focus();
                                }
                            })
                        });
                    }else {
                        layer.confirm('绑定E卡：', {
                            btn: ['确定','取消'],
                            area: ['820px', '150px'],
                            content: '<div>您的账户尚未设置支付密码，请先设置支付密码。</div>',
                            yes: function(){
                                window.location.href='account_setpswd.html';
                            }/*,
                             no:function () {
                             console.log(2);
                             }*/
                        });
                    }
                },function (err) {
                    console.log(err);
                    $('.bind-ecard-error').html(err.error.description);
                })

            })
        }
    });
