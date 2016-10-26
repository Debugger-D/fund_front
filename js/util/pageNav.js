define(['core', 'text!./tpl/pagenav.html'], function(core, tpl) {
    var pageNav = {
        maker: function(JQsel, option) {
            if(!JQsel || JQsel.length < 1) {
            　  throw new Error("form: 表单必须指定选择器!");
            }

            if(!option) {
                option = {}
            }

            var that = this;
            //code start

            that.init = function() {
                var template = _.template(tpl);
                var data = {
                    totalData: option.totalData,
                    totalPage: option.totalPage,
                    pageSize: option.pageSize,
                    pageIndex:  option.pageIndex
                }

                that.html = template({pageData: data });
                that.$obj = $(JQsel);
                that.$obj.html(that.html);

                that.bind();
            }

            that.bind = function() {
                $(JQsel+" .ljq-pagenav-link").unbind("click").click(function(e) {

                    var $tar = $(e.target);
                    var page = $tar.attr("data-page-num");
                    console.log(page);
                    $(JQsel+" .ljq-pagenav-link").removeClass("active");
                    $tar.addClass("active");

                    $(JQsel+" .ljq-pagenav-input").val(page);

                    option.perDo && option.perDo(page);
                });

                $(JQsel+" .ljq-pagenav-go").unbind("click").click(function(e) {
                    var page = $(JQsel+" .ljq-pagenav-input").val() - 0;
                    if(!page || page < 1) {
                        page = 1;
                    }

                    if(page > option.totalPage) {
                        page = option.totalPage;
                    }

                    option.perDo && option.perDo(page);
                })

                option.bind && option.bind();
            }

            that.init();

            //code end

            return this;
        },
        create: function() {
            return pageNav.maker.apply({}, arguments);
        }
    }

    return pageNav;
});
