define(['build/common/footer'], function(tpl) {
    
	return function(id) {
		var footer = function(id){
			this.id = id ? id : '#footer-container';	// 默认ID
			this.html = tpl();
			$(this.id).html(this.html);
		}

		return new footer(id);
	}
});