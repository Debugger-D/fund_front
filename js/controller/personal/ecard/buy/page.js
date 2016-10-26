define(['modal', 'util/block', 'core', 'util/pageNav','layer',
	'build/personal/ecard/buy/main', 'build/personal/ecard/buy/table', 'build/personal/ecard/buy/filter'], 
    function(modal, B, core, pageNav,layer,
    	main_tpl, tbl_tpl, filter_tpl) {
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
            queryType: 'BUY',
            useStatus: ''
        }

        var checkNeedPswd = function(needDo, noDo, errDo) {
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

        var render = function(data) {

            var html = tbl_tpl(data);
            $("#ecardbuy-table").html(html);
            //刮开
            $(".guakai").on("click",function(e) {
                var $tar = $(e.target);
                var id = $tar.data("id");
                var cardCode = $tar.data("cardcode");
                console.log(cardCode);
                layer.confirm('确定要刮开卡号：' + cardCode + '？</br>刮开即开始计算有效期', {
                  title: ['刮开E卡', 'font-size:18px;'],
                  btn: ['确定','取消'],
                  area: ['500px', '200px'] 
                },function(index){
                    layer.close(index);
                    layer.open({
                      type: 1,
                      btn: ['确定','取消'] ,
                      area: ['500px', '200px'], //宽高
                      content: '<div id="inputPwd"><p>输入支付密码</p><input type="password" id="payPwd"><a href="#" class="forget">忘记支付密码？</a></div>',
                      yes: function(index){
                        //验证支付密码
                        var pwd = $("#payPwd").val();
                        var param = {payPassword: pwd};
                        modal.run('funds.payPwdCheck', $.param(param))
                          .then(function(data) {
                            if(data.result == true){
                              console.log(111);
                              var param = {cardId: id};
                              //调用刮开E卡接口
                              modal.run('ecard.open', param)
                              .then(function(data) {
                                  getList(1);
                                  layer.msg('刮卡成功');
                                  layer.close(index);
                              }, function(err) {
                              })
                            }else if(data.result == "false"){
                              layer.msg('支付密码错误');
                            }
                          }, function(err) {
                            layer.msg('验证密码出现出现错误');
                          })
                      }
                    });
                });
            });
            //赠送
            $(".zengsong").on("click",function(e) {
                var $tar = $(e.target);
                var id = $tar.data("id");
                var cardCode = $tar.data("cardcode");
                layer.open({
                  type: 1,
                  btn: ['确定','取消'] ,
                  area: ['550px', '200px'], //宽高
                  content: '<div id="zhzLayer"><label for="">被转赠者手机号：</label><input type="text" id="sendPhone"></div>',
                  yes: function(index){
                      var phone = $("#sendPhone").val();
                      layer.close(index);
                      layer.open({
                        type: 1,
                        btn: ['确定','取消'] ,
                        area: ['500px', '200px'], //宽高
                        content: '<div id="inputPwd"><p>输入支付密码</p><input type="password" id="payPwd"><a href="#" class="forget">忘记支付密码？</a></div>',
                        yes: function(index){
                          console.log(phone);
                          var param = {phone: phone,cardId: id,remark: '11'};
                          var pwd = $("#payPwd").val();
                          var param = {payPassword: pwd};
                          modal.run('funds.payPwdCheck', $.param(param))
                          .then(function(data) {
                            if(data.result == true){
                              console.log(111);
                              var param = {cardId: id};
                              //调用赠送E卡接口
                              modal.run('ecard.send', $.param(param))
                              .then(function(data) {
                                  getList(1);
                                  layer.msg('赠送成功');
                                  layer.close(index);
                              }, function(err) {  
                              })
                            }else if(data.result == "false"){
                              layer.msg('支付密码错误');
                            }
                          }, function(err) {
                            layer.msg('验证密码出现出现错误');
                          })
                        }
                      })
                    }

                })
            });
            //绑定
            $(".bangding").on("click",function(e) {
                var $tar = $(e.target);
                var cardCode = $tar.data("cardcode");
                layer.confirm('确定要将卡号：' + cardCode + '</br>绑定至当前账号？', {
                  btn: ['确定','取消'],
                  area: ['500px', '200px'],
                  yes: function(index){
                    var param = {cardCode: cardCode};
                    modal.run('ecard.recharge', $.param(param))
                      .then(function(data) {
                          getList(1);
                          layer.msg('绑定成功');
                      }, function(err) {  
                      })
                    layer.close(index);
                  }
                });
            });
        }


        var getList = function(index) {
            // filteroption 要在请求之前改变
            // ...
            var param = $.extend({}, {pageIndex: index, pageSize: 10}, filterOption);
            modal.run('ecard.list', param)
                .then(function(data) {
                    render(data);

                    // 这里要改变 option
                    option.totalData = data.totalData;
                    option.totalPage = data.totalData % option.pageSize == 0 ? data.totalData/option.pageSize : parseInt(data.totalData/option.pageSize) + 1;
                    option.pageIndex = data.curPage;

                    pageNav.create("#ecardbuy-pagenav", option);
                }, function(err) {  
                    console.log(err);
                })
        }

        $("#page").html(main_tpl());
	      $("#ecardbuy-filter").html(filter_tpl());


        getList(1);
        console.log(1);

        //tab选择
        $("#ecardbuy-filter .status").on("click","a",function(e) {
            var filterType = $(this).parent().attr("class");
            console.log(filterType);
            if(filterType == 'type'){
                filterOption.tradeType = e.target.getAttribute("value");
            }else if(filterType == 'status'){
                filterOption.useStatus = e.target.getAttribute("value");
            }
            $(this).siblings("a").removeClass("active")
            $(this).addClass("active");
            getList(1);
        });

    }
});
