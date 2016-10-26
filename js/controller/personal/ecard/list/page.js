/**
 * Created by hzwsj on 2016/10/13 0013.
 */
define(['modal', 'util/block', 'core','util/pageNav',
        'build/personal/ecard/list/main','build/personal/ecard/list/table', 'build/personal/ecard/list/filter','layer'],
    function(modal, B, core,pageNav,
             main_tpl, tbl_tpl, filter_tpl,layer) {
        return function(){
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
                cardCode:'',
                queryType:'USED'
            }
            var render = function(data) {
                var html = tbl_tpl(data);
                $("#ecardList-table").html(html);
            };
            var getList = function(index) {
                var param = $.extend({}, {pageIndex: index, pageSize: 10}, filterOption);
                modal.run('ecard.listByIndex', param)
                    .then(function(data) {
                        render(data);
                        // 这里要改变 option
                         option.totalData = data.totalData;
                         option.totalPage = data.totalData % option.pageSize == 0 ? data.totalData/option.pageSize : parseInt(data.totalData/option.pageSize) + 1;
                         option.pageIndex = data.curPage;
                         pageNav.create("#ecardList-pagenav", option);

                    }, function(err) {
                        console.log(err);
                    })
            };
            getList(1);
            $("#page").html(main_tpl());
            $("#ecardList-filter").html(filter_tpl());

            /*查询*/
            $('.search-btn').click(function () {
                filterOption.cardCode=$('.search-input').val();
                getList(1);
            });
            
            
            /*tab选择*/
            
            $('#ecardList-filter .type a').click(function (e) {
                filterOption.useStatus=e.target.getAttribute('value');
                $(this).siblings("a").removeClass("active")
                $(this).addClass("active");
                getList(1);
            })

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
