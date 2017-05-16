'use strict';

$(document).ready(function () {
	$.get('/wifiprobeinfo.do').done(function (data) {
		//操纵dom,插入数据到表格里
	}).fail(function (xhr, status) {
		console.log('失败: ' + xhr.status + ', 原因: ' + status);
	});
});

/*
 * 绑定探针
 * 修改探针位置信息
 */

$('#bindingButton').click(function () {
	if (checkBindingInput()) {
		$.ajax({
			type: 'post',
			url: '/wifiSetting.do',
			dataType: 'json',
			data: {
				wifiProbeID: $('#wifiProbeID').val(),
				wifiProbePassword: $('#wifiProbePassword').val(),
				wifiProbeAddress: $('#wifiProbeAddress').val()
			},

		}).done((data) => {
			console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
			//var result = JSON.parse(data);
			var result = data;
			if (result.result === "true") {
				$('#bindingTip').text("绑定成功");
				$('#wifiProbeID').val("");
				$('#wifiProbePassword').val("");
				$('#wifiProbeAddress').val("");
			} else {
				$('#bindingTip').text("绑定失败");
			}

		}).fail((xhr, status) => {
			$('#bindingTip').text("绑定失败");/
			console.log('失败: ' + xhr.status + ', 原因: ' + status);
		});
	}
});

/*
 * 检查输入规范.
 */
function checkBindingInput() {
	var numberReg = /^(\d+){1,}$/;
	var isNumber = numberReg.test($('#wifiProbeID').val());
	var isEmpty = null;
	if ($('#wifiProbeID').val() === "" || $('#wifiProbePassword').val() === "" || $('#wifiProbeAddress').val() === "") {
		isEmpty = true;
	} else {
		isEmpty = false;
	}

	if ((!isNumber) || isEmpty) {
		$('#bindingTip').text("输入有误！");
		return false;
	}
	return true;
}