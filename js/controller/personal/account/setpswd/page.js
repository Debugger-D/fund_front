define(['modal', 'util/block', 'core', 'q', 'jq.validator',
	'build/personal/account/setpswd/main'], 
    function(modal, B, core, Q, validator,
    	main_tpl) {
    return function(){
		var profileM=modal.run('user.profile');
		var questionM=modal.run('personal.allQuestion');
		Q.all([profileM,questionM])
			.then(function(data) {
				var data={
					phone : data[0].phone,
					questionList : data[1].infos
				};
				$("#page").html(main_tpl(data));

				//
				$('.form-group-3').hide();
				// 隐藏提示信息
				$(".err-msg").hide();
				$(".info-msg").hide();

				//发送验证码
				$("#sendSmsCode").click(function() {
					modal.run('sms.send', {platformCode: 'funds_sms', type: 'funds_rp', phone:'15158012110'})
						.then(function(data) {
							console.log(data);
						});
				});

				//验证两次输入密码是否一致
				var isPswSame=function (psw1,psw2) {
					if(psw1==psw2){
						return true;
					}else {
						return false;
					}
				};
				//设置密码
				var resetPsw=function () {
					var $smscode = $(".smscode");
					var $answer = $(".answer");
					var postData={
						appId:'F75378884E4048C7AF8890DB9A38C541   ',
						from: 'shop',
						phone:'15158012110',
						//smsCode:$smscode.val(),
						question:$('.question').val(),
						questionId:$('.question option:selected').attr('id'),
						answer:$answer.val(),
						payPassword:$('.password-new').val()

					}
					modal.run('funds.accountOpen',postData)
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
			});

    }
});
