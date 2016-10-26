define(['modal', 'util/block', 'core', 'q',
	'build/personal/account/password/main', 'build/personal/account/password/info'], 
    function(modal, B, core, Q,
    	main_tpl, info_tpl) {
    return function(){
		var profileM = modal.run('user.profile');
		var questionM = modal.run('personal.getQuestion');
		Q.all([profileM, questionM])
			.then(function(data) {
				var data={
					phone:data[0].phone,
					question:data[1].question
				};
				$("#page").html(main_tpl(data));
				// 隐藏提示信息
				$(".err-msg").hide();
				$(".info-msg").hide();
				$('.err-smscode').hide();
				//发送验证码
				$("#sendSmsCode").click(function() {
					modal.run('sms.send',{platformCode: 'funds_sms', type: 'funds_rp', phone:'13840918032'})
						.then(function(data) {
							$('.info-msg').show();
					});
				});
				//验证

				//短信
				/*var checkMsg=function () {
					var $smscode = $(".smscode");
					if($.trim($smscode.val()).length < 1) {
						$smscode.nextAll(".err-msg").show();
						return false;
					}else {
						modal.run('sms.verify',{platformCode: 'funds_sms', type: 'funds_rp', phone:'13840918032',smsCode:$smscode.val()})
							.then(function(data) {
								$('.info-msg').show();
								if(data.verifyResult){
									return true;
								}else {
									$('.err-smscode').text('验证码错误。');
									$('.info-msg').hide();
									$(".err-smscode").show();
									return false;
								}
						});
					}

				}*/
				//密保
				/*var checkPswHelp=function () {
					var $answer = $(".answer");
					if($.trim($answer.val()).length < 1){
						$smscode.nextAll(".err-msg").show();
						return false;
					}else {
						modal.run('personal.checkQuestion',{answer:$(".answer").val()})
							.then(function(data) {
								$('.form-group-1').hide();
								$('.form-group-2').show();
								return true;
							},function (err) {
								$('.err-answer').text(err.error.description);
								$('.err-answer').show();
								return false;
						});
					}
				}*/

				//验证两次输入密码是否一致
				var isPswSame=function (psw1,psw2) {
					if(psw1==psw2){
						return true;
					}else {
						return false;
					}
				};
				//修改密码
				var resetPsw=function () {
					var $smscode = $(".smscode");
					var $answer = $(".answer");
					var postData={
						from: 'shop',
						platformCode:'funds_sms',
						templateCode: 'funds_rp',
						phone:'13840918032',
						smsCode:$smscode.val(),
						answer:$answer.val(),
						payPassword:$('.password-new').val()

					}
					modal.run('funds.resetPsw',postData)
						.then(function(data) {
						},function (err) {
							console.log(err)
						});
				}

				//确认修改密码
				$('#form-next-2').click(function (e) {
					var psw1=$('.password-new').val();
					var psw2=$('.password-confirm').val();
					if(isPswSame(psw1,psw2)==true){
						resetPsw()
					}else {
						$('.err-psw').text('两次输入密码不一致！');
						$('.err-psw').show();
					}
				});
			})

    }
});
