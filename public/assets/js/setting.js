'use strict';

/*
* Biding wifiProbe with user.
* Control wifiProbe remotely.
*/

$('#bindingButton').click(function(){
	if(checkBindingInput()){
		$.ajax({
			type: 'post',
			url: 'setting.do',
			dataType: 'json',
			data: {
				wifiProbeID: $('#wifiProbeID').val(),
				wifiProbePassword: $('#wifiProbePassword').val(),
				wifiProbeAddress: $('#wifiProbeAddress').val()
			},

		}).done( (data) => {
			console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
			//var result = JSON.parse(data);
			var result = data;
			if(result.result === "true"){
				$('#bindingTip').text("绑定成功");
				$('#wifiProbeID').val("");
				$('#wifiProbePassword').val("");
				$('#wifiProbeAddress').val("");
			}else{
				$('#loginTip').text("登录失败");
				$('#bindingTip').text("绑定失败");
			}
			
		}).fail( (xhr, status) =>{
			console.log('失败: ' + xhr.status + ', 原因: ' + status);
		});
	}
});

/*
* To check if user's input is valid.
*/
function checkBindingInput(){
	var numberReg = /^(\d+){1,}$/;
	var isNumber = numberReg.test($('#wifiProbeID').val());
	var isEmpty = null;
	if($('#wifiProbeID').val()==="" || $('#wifiProbePassword').val()==="" || $('#wifiProbeAddress').val()===""){
		isEmpty = true;
	}else{
		isEmpty = false;
	}
	
	if((!isNumber)||isEmpty){
		console.log("enter!");
		$('#bindingTip').text("输入有误！");
		return false;
	}
	return true;
}