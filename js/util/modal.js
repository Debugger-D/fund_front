define(['jquery', 'q', 'underscore',
    '../js/api/user', '../js/api/personal',
    '../js/api/funds', '../js/api/ecard', '../js/api/sms'],
function($, Q, _,
    userM, personalM,
    fundsM, ecardM, smsM) {
    return {
        requestCount: 0,
        requestQue: [],     // 保存当前所有的请求
        run: function(apiKey, data, option) {
            if(!apiKey) {
                console.log("modal: apikey 必须提供!");
                return;
            }

            var _keys = apiKey.split('.');
            if(!_keys || !_keys[0] || !_keys[1]) {
                console.log("modal: "+apiKey+" 不合法!");
                return;
            }
            var obj = this[_keys[0]][_keys[1]];

            if(!obj) {
                console.log(apiKey+" 不存在!");
                return false;
            }

            var that = this;
            var deferred = Q.defer();
            var newData = {};
            var url = obj['url'];

            option = option ? option : {};

            // 数据空的情况
            if(!data) {
                if(obj['type'] == 'GET'){
                    newData = '';
                } else {
                    newData = {}
                }
            } else if (_.isObject(data)) {
                // 如果数据是对象

                // /:a/:b/c/:d  的情况，把对应的数据替换掉
                url = url.replace(/:(?:[^\/]*)/g, function(str) {
                    str = str.split(":")[1];
                    var res = data[str];
                    data = _.omit(data, str);
                    return res;
                });

                if( obj['contentType'] == 'application/x-www-form-urlencoded' ) {
                    data.__proto__ == {};
                    newData = $.param(data);
                } else if(obj['type'] == 'GET' || (obj['type'] == 'PUT' && obj['contentType'] != 'application/json') ){
                    newData = data;
                } else {
                    newData = JSON.stringify(data);
                }

            } else {
                newData = data;
            }

            // 给每个请求添加时间戳字段保证每次请求新的http
            if(!url) url = '/';
            if(url.split("?").length > 1 && url.split("?")[1].length > 0) {
                url = url + '&time=' + new Date().getTime();
            } else {
                url = url + "?time=" + new Date().getTime();
            }

            // Ajax 请求
            var cur_xhr = $.ajax({
                type: obj['type'] ? obj.type : 'GET',
                url: url,
                contentType: obj['contentType'] ? obj.contentType : "application/x-www-form-urlencoded",
                data: newData,
                // dataType: "json",
                beforeSend: function() {
                    // 简单的拦截器实现
                    ++that.requestCount;
                    // $("#ajax-loading-hint").show();
                    option.before && option.before({
                        url: url,
                        data: newData
                    });
                },
                success: function(data, status, jqXHR) {
                    deferred.resolve(data);
                },
                error: function(jqXHR, status) {
                    --that.requestCount;

                    if(jqXHR.status == 401) {
                        PubSub.publishSync('AUTH_NOT', 'AUTH_NOT');
                    }

                    if(jqXHR.status == 403 && jqXHR.responseJSON && jqXHR.responseJSON.error && jqXHR.responseJSON.error.description == 'NOT_REGISTERED') {
                        PubSub.publishSync('AUTH_403', 'AUTH_403');
                        deferred.reject(false);
                        return false;
                    }

                    if(jqXHR.responseText) {
                        deferred.reject(jQuery.parseJSON(jqXHR.responseText));
                    } else {
                        deferred.reject(false);
                    }

                },
                complete: function() {
                    --that.requestCount;
                    if(that.requestCount > 0) {
                        // console.log("有"+that.requestCount+"请求正在执行中");
                    } else {
                        $("#ajax-loading-hint").hide();
                        this.requestQue = [];
                    }
                }
            });

            that.requestQue.push(cur_xhr);

            return deferred.promise;
        },
        stopAll: function() {
            var reqQ = this.requestQue;
            for(var i = 0; i < reqQ.length; i++) {
                reqQ[i].abort();
            }

            reqQ = [];
        },
        /* 用户 */
        user: userM,
        /* 个人中心 */
        personal: personalM,
        funds: fundsM,
        ecard: ecardM,
        sms: smsM
    }

});
