'use strict';

function registerFunc() {
	if (checkRegisterFunc()) {
		//发送Ajax请求到服务器
		$.ajax({
			type: 'post',
			url: '/register.do',
			dataType: 'json',
			data: {
				userName: $('#userName').val(),
				passWord: $('#passwd').val(),
				email: $('#email').val()
			},

		}).done(function (data) {
			console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
			//var result = JSON.parse(data);
			var result=data;
			if(result.result === "true"){
			window.location.href = "setting.html?name=" + $('#userName').val();
			}else if(result.result === "netFalse"){
				$('#registerTip').text("网络连接失败");
				console.log("注册失败");
			}else if(result.result === "exist"){
				$('#registerTip').text("已经被注册");
				console.log("注册失败");
			}
			
		}).fail(function (xhr, status) {
			$('#registerTip').text("注册失败");
			console.log('失败: ' + xhr.status + ', 原因: ' + status);
		});
	}
}

/*
*  检查用户输入的规范
*/
function checkRegisterFunc() {
	if ($('#userName').val() === null || $('#userName').val() === '') {
		$('#registerTip').text("请输入用户名");
		return false;
	} else if ($('#passwd').val() === null || $('#passwd').val() === '') {
		$('#registerTip').text("请输入密码");
		return false;
	} else if ($('#passwd2').val() === null || $('#passwd2').val() === '') {
		$('#registerTip').text("请输入密码");
		return false;
	} else if(!($('#passwd').val().length>=9 && $('#passwd').val().length<=16)){
		$('#registerTip').text("密码不能少于9个字符或多于16个字符");
		return false;
	}else if ($('#email').val() === null || $('#email').val() === '') {
		$('#registerTip').text("请输入邮箱");
		return false;
	} else if (!checkIsEmail()) {
		$('#registerTip').text("请输入正确的邮箱");
		return false;
	} else if (!($('#passwd').val() === $('#passwd2').val())) {
		$('#registerTip').text("两次输入的密码不一致");
		return false;
	}

	return true;
}

function checkIsEmail() {
	var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/; 
	return reg.test($('#email').val());
}