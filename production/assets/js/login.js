function loginFunc() {
	if (checkLoginInput()) {
		$.ajax({
			type: 'post',
			url: '/user/login',
			dataType: 'json',
			data: {
				userName: $('#userName').val(),
				passwd: $('#passwd').val()
			},

		}).done(function (data) {
			console.log('成功, 收到的数据: ' + JSON.stringify(data));
		}).fail(function (xhr, status) {
			console.log('失败: ' + xhr.status + ', 原因: ' + status);
		});
	}

}


function checkLoginInput() {
	if ($('#userName').val() === null || $('#userName').val() === '') {
		$('#loginTip').text("请输入用户名");
		return false;
	} else if ($('#passwd').val() === null || $('#passwd').val() === '') {
		$('#loginTip').text("请输入密码");
		return false;
	} 
	return true;
}