define(['core', 'build/common/header'], function(core, tpl) {
    
	return function(id, activeClass, title) {
		var header = function(id, activeClass, title){
			this.id = id ? id : '#header';	// 默认头部ID

			this.html = tpl({
				isLogined: core.isLogined(),
				userInfo: core.getUsr(),
				title: title
			});

			$(this.id).html(this.html);

			if( typeof activeClass == 'string') {
				$(this.id+' .m').removeClass('active');
				$(this.id+' .'+activeClass).addClass('active');
			}

			$(this.id+' .logout').click(function() {
				core.logout();
			});

		}

		return new header(id, activeClass, title);
	}
});