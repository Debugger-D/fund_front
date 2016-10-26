define(['core', 'modal', 'build/common/sider'], function(core, modal, tpl) {
	return function(id, active) {
		var sider = function(id, active){
			this.id = id ? id : '#sider';

			this.html = tpl(core.getUsr());

			$(this.id).html(this.html);

			if( typeof active == 'string') {
				$(this.id+' .sm').removeClass('on');
				$(this.id+' .'+active).addClass('on');
			}

			modal.run('user.profile')
				.then(function(data) {

					if(data.avatar) {
						$(".i-myinfo-head-img img").attr('src', data.avatar);
					}

					if(data.nickName) {
						$(".i-myinfo-relaname").text(data.nickName);
					}
				});

			$(this.id+" .smp").click(function(e) {
				var $target = $(e.target);
				console.log($target);
				$(this.id+' .sm').removeClass('on');
				$target.addClass('on');
			});
		}

		return new sider(id, active);
	}
});