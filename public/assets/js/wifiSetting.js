'use strict';

$(document).ready(function () {
	$.get('/config/wifiprobeinfo.do').done(function (data) {
		console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
		//操纵dom,插入数据到表格里
		/*
		{
		result:[
			{
				id: 024,
				address: "贝克街221号",
				status: "on"
			},
			{
				id: 026,
				address: "贝克街211号",
				status: "off"
			}
	    ]
	} 
		*/

		/*
		<tr>
			<td>021</td>
			<td class="hidden-phone">厦门市中山路353号</td>
			<td><button class="label label-info label-mini">On</button></td>
			<td>
				<button class="btn btn-primary btn-xs"><i class="fa fa-pencil"></i></button>
				<button class="btn btn-danger btn-xs"><i class="fa fa-trash-o "></i></button>
			</td>
		</tr>		
		*/
		
		/*
		var newRow = "<tr style=\"background:red;\"><td>新行第一列</td><td>新行第二列</td><td>新行第三列</td><td>新行第四列</td><td>新行第五列</td></tr>";
		
		$("#table3 tr:last").after(newRow);
		*/
		/*********测试********/
		if(typeof(data) === "string"){
			data = JSON.parse(data);
		}
		
		var tableDom = "";
		var eachTableDom = "";
		var result = data.result;
		for(let i=0;i<result.length;i++){
			eachTableDom = "<tr>" + 
							"<td>" + result[i].id + "</td>" +
							"<td class='hidden-phone'>" + result[i].address + "</td>" + 
							"<td><button onclick='statusBtn(this)'" + "id='" + result[i].id +　"' class='label label-info label-mini'>" + result[i].status + "</button></td>" +
							"<td>" + "<button data-toggle='modal' data-target='#myModal' class='btn btn-primary btn-xs'><i class='fa fa-pencil'></i></button>" + "<button onclick='delBtn(this)' class='btn btn-danger btn-xs'><i class='fa fa-trash-o '></i></button>" + 
			                "</td>" + 
							"</tr>";
			tableDom += eachTableDom;
		}
		$('#infotable tr:last').after(tableDom);
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
			url: '/config/wifisetting.do',
			dataType: 'json',
			data: {
				wifiProbeID: $('#wifiProbeID').val(),
				wifiProbePassword: $('#wifiProbePassword').val(),
				wifiProbeAddress: $('#wifiProbeAddress').val()
			}
		}).done(function(data) {
			console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
			if (data.result === "true") {
				$('#bindingTip').text("绑定成功");
				var newTableDom = "<tr>" + 
								  "<td>" + $('#wifiProbeID').val() + "</td>" + 
					              "<td>" + $('#wifiProbeAddress').val() + "</td>" + 
								  "<td><button onclick='statusBtn(this)'" + "id='" + $('#wifiProbeID').val() +　"' class='label label-info label-mini'>" + "off" + "</button></td>" + 
								  "<td>" + "<button data-toggle='modal' data-target='#myModal' class='btn btn-primary btn-xs'><i class='fa fa-pencil'></i></button>" + "<button onclick='delBtn(this)' class='btn btn-danger btn-xs'><i class='fa fa-trash-o '></i></button>" + "</td>" + 
								  "</tr>";
				
				$('#infotable tr:last').after(newTableDom);
				
				
				//清空输入框信息
				$('#wifiProbeID').val("");
				$('#wifiProbePassword').val("");
				$('#wifiProbeAddress').val("");
			} else if(data.result === "noId"){
				$('#bindingTip').text("探针ID不存在");
			}else if(data.result === "hasLocked"){
				$('#bindingTip').text("探针已被绑定");
			}else if(data.result === "wrongpassword"){
				$('#bindingTip').text("探针密码错误");
			}
		}).fail((xhr, status) => {
			$('#bindingTip').text("绑定失败");
			//console.log('失败: ' + xhr.status + ', 原因: ' + status);
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

/*
探针状态按钮函数
*/
function statusBtn(evt){
	if(evt.innerHTML === "on"){
		/*Button Id设置为探针的id*/
		$.ajax({
			type: 'post',
			url: '/config/setwifistatus.do',
			dataType: 'json',
			data: {
				id: evt.getAttribute("id"),
				status: 'off' 
			}
		}).done(function(data){
			if(data.result === "true"){
				evt.innerHTML = "off";
			}
		}).fail(function(xhr, status){
			alert("修改失败");
		});
	}else if(evt.innerHTML === "off"){
		$.ajax({
			type: 'post',
			url: '/config/setwifistatus.do',
			dataType: 'json',
			data: {
				id: evt.getAttribute("id"),
				status: 'on' 
			}
		}).done(function(data){
			if(data.result === "true"){
				evt.innerHTML = "on";
			}
		}).fail(function(xhr, status){
			alert("修改失败");
		});
	}
}

/*
* 探针修改信息函数
*/
/*
function modifyBtn(evt){
	alert("");
	window.location.href = "wifiSetting.html#myModal";
	alert("1");
}*/