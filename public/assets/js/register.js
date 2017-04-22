'use strict';

function registerFunc() {
	if (checkRegisterFunc()) {
		$.ajax({
			type: 'post',
			url: '/register.do',
			dataType: 'json',
			data: {
				userName: $('#userName').val(),
				passWord: $('#passwd').val(),
				eamil: $('#email').val()
			},

		}).done(function (data) {
			console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
			var result = JSON.parse();
			if(result.result === "true"){
			window.location.href("index.html?name=" + result.name);
			}else{
				$('#registerTip').text("注册失败");
				console.log("注册失败");
			}
			
		}).fail(function (xhr, status) {
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
	} else if ($('#passwd').val() === null || $('#passwd2').val() === '') {
		$('#registerTip').text("请输入密码");
		return false;
	} else if ($('#email').val() === null || $('#email').val() === '') {
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