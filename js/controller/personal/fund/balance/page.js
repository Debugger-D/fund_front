define(['modal', 'util/block', 'core', 'util/pageNav',
	'build/personal/fund/balance/main', 'build/personal/fund/balance/table', 'build/personal/fund/balance/filter', 'build/personal/fund/balance/tab'], 
    function(modal, B, core, pageNav,
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
            startDate: '',
            endDate: '',
            tradeType: '',
            channelId: 'BALANCE',
            status: ''
        }


        var render = function(data) {
            
            var html = tbl_tpl(data);
            $("#balance-table").html(html);

        }


        var getList = function(index) {
            // filteroption 要在请求之前改变
            // ...
            var param = $.extend({}, {pageIndex: index, pageSize: 10}, filterOption);
            modal.run('personal.balanceInfo', param)
                .then(function(data) {
                    render(data);
                    // 这里要改变 option
                    option.totalData = data.total;
                    option.totalPage = data.total % option.pageSize == 0 ? data.total/option.pageSize : parseInt(data.total/option.pageSize) + 1;
                    option.pageIndex = data.pageIndex;

                    pageNav.create("#balance-pagenav", option);
                }, function(err) {  
                    console.log(err);
                })
        }

        $("#page").html(main_tpl());
	    $("#balance-filter").html(filter_tpl());
        

        getList(1);

        var start = {
            elem: '#startDate',
            max: laydate.now(),
            choose: function(datas){
                filterOption.startDate = datas + ' 00:00:00';  getList(1) ;end.min = datas;end.start = datas;$("#balance-filter .time a").removeClass("active");
            }
        }
        var end = {
            elem: '#endDate',
            max: laydate.now(),
            choose: function(datas){
                filterOption.endDate = datas + ' 23:59:59'; getList(1) ;$("#balance-filter .time").removeClass("active");
            }
        }
        laydate(start);
        laydate(end);
        


        
        //tab选择
        $("#balance-filter .type,#balance-filter .status,#balance-filter .time").on("click","a",function(e) {
            var filterType = $(this).parent().attr("class");
            console.log(filterType);
            if(filterType == 'type'){
                filterOption.tradeType = e.target.getAttribute("value");
            }else if(filterType == 'status'){
                filterOption.status = e.target.getAttribute("value");
            }
            $(this).siblings("a").removeClass("active")
            $(this).addClass("active");
            getList(1);
        });

        //时间段选择
        $("#allday").on("click",function(e) {
            $("#startDate").val('');
            filterOption.startDate = '';
            $("#endDate").val('');
            filterOption.endDate = '';
        });
        $("#today").on("click",function(e) {
            dateLenth('day',0);
        });
        $("#day7").on("click",function(e) {
            dateLenth('day',7);
        });
        $("#month1").on("click",function(e) {
            dateLenth('month',1);
        });
        $("#month3").on("click",function(e) {
            dateLenth('month',3);
        });
        $("#month6").on("click",function(e) {
            dateLenth('month',6);
        });
        $("#year1").on("click",function(e) {
            dateLenth('year',1);
        });

        

        //时间段选择函数
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
            filterOption.startDate = d2 + ' 00:00:00';
            filterOption.endDate = d1 + ' 23:59:59';
        }

        
    }
});
