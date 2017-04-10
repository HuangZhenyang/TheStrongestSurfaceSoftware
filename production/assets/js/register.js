function registerFunc() {
	if (checkRegisterFunc()) {
		$.ajax({
			type: 'post',
			url: '/user/register',
			dataType: 'json',
			data: {
				userName: $('#userName').val(),
				passwd: $('#passwd').val(),
				eamil: $('#email').val()
			},

		}).done(function (data) {
			console.log('成功, 收到的数据: ' + JSON.stringify(data));
		}).fail(function (xhr, status) {
			console.log('失败: ' + xhr.status + ', 原因: ' + status);
		});
	}
}

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
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
	console.log(reg.test($('#eamil').val()));
	return reg.test($('#eamil').val());
}