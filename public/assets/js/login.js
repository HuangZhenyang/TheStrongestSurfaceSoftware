'use strict';

function loginFunc() {
	if (checkLoginInput()) {
		$.ajax({
			type: 'post',
			url: '/login.do',
			dataType: 'json',
			data: {
				userName: $('#userName').val(),
				passWord: $('#passWord').val()
			}
		}).done( function(data) {
			console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
			//var result = JSON.parse(data);
			
			var result = data;
			if(result.result === "true"){
				window.location.href = "index.html";
			}else{
				$('#loginTip').text("登录失败");
				console.log("登录失败");
			}
			
		}).fail(function(xhr, status){
			console.log('失败: ' + xhr.status + ', 原因: ' + status);
		});
	}

}


/*
*  检查用户输入的规范
*/
function checkLoginInput() {
	if ($('#userName').val() === null || $('#userName').val() === '') {
		$('#loginTip').text("请输入用户名");
		return false;
	} else if ($('#passWord').val() === null || $('#passWord').val() === '') {
		$('#loginTip').text("请输入密码");
		return false;
	} else if(!($('#passWord').val().length>=9 && $('#passWord').val().length<=16)){
		$('#loginTip').text("密码不能少于9个字符或多于16个字符");
		return false;
	}
	return true;
}