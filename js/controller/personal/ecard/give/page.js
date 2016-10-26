/**
 * Created by hzwsj on 2016/10/18 0018.
 */
define(['modal', 'util/block', 'core','util/pageNav',
        'build/personal/ecard/give/main','build/personal/ecard/give/table', 'build/personal/ecard/give/filter'],
    function(modal, B, core,pageNav,
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
                channelId: '',
                status: '',
                cardCode:'',
                queryType:''
            };
            var render = function(data) {
                var html = tbl_tpl(data);
                $("#ecardgive-table").html(html);
            };
            var getList = function(index) {
                var param = $.extend({}, {pageIndex: index, pageSize: 10}, filterOption);
                modal.run('ecard.sendEcardList', param)
                    .then(function(data) {
                        var list={
                            list:data
                        };
                        render(list);
                        option.totalData = data.totalData;
                        option.totalPage = data.totalData % option.pageSize == 0 ? data.totalData/option.pageSize : parseInt(data.totalData/option.pageSize) + 1;
                        option.pageIndex = data.curPage;
                        pageNav.create("#ecardgive-pagenav", option);
                    }, function(err) {
                        console.log(err);
                    })
            };
            getList(1);
            $("#page").html(main_tpl());
            $("#ecardgive-filter").html(filter_tpl());

        }
    });
