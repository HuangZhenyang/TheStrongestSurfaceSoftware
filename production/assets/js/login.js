'use strict';


function loginFunc() {
	if (checkLoginInput()) {
		$.ajax({
			type: 'post',
			url: '/user/login.do',
			dataType: 'json',
			data: {
				userName: $('#userName').val(),
				passwd: $('#passwd').val()
			},

		}).done( (data) => {
			console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
			var result = JSON.parse();
			if(result.result === "true"){
				window.location.href("index.html?name=" + result.name);
			}else{
				$('#loginTip').text("登录失败");
				console.log("登录失败");
			}
			
		}).fail( (xhr, status) =>{
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
	} else if ($('#passwd').val() === null || $('#passwd').val() === '') {
		$('#loginTip').text("请输入密码");
		return false;
	} 
	return true;
}