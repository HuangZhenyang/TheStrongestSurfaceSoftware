"use strict";

var myChart1 = echarts.init(document.getElementById('realTimePassengerFlow'));
var passengerFlowData = [];
/*
 * 实时向服务器请求数据
 * passengerFlowData : [] --> 用于存取数据 [['1997/07/06', 626],['1992/01/06',677]]
 */

$(document).ready(function () {

	initMyChart1();
});


function initMyChart1() {
	myChart1.setOption({
		title: {
			text: '实时客流量动态折线图'
		},
		tooltip: {
			trigger: 'axis',
			formatter: function (params) {
				param = params[0];
				//var date = new Date(params.name);
				//return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
				console.log(param);
				return param.value[0] + ':' + param.value[1];
			},
			axisPointer: {
				animation: true
			}
		},
		xAxis: {
			type: 'time',
			splitLine: {
				show: false
			}
		},
		yAxis: {
			type: 'value',
			boundaryGap: [0, '100%'],
			splitLine: {
				show: false
			}
		},
		series: [{
			name: '',
			type: 'line',
			showSymbol: false,
			hoverAnimation: false,
			data: passengerFlowData,
			lineStyle: {
				normal: {
					color: '#F0805A'
				}
			},
    	}]
	});

	/*
	var getPassengerFlowData = function () {
		myChart1.showLoading();
		$.ajax({
			type: "get",
			url: "/graph/realTimePassengerflow.do",
			dataType: "json",
		}).done(function (data) {
			//data: {time:'1997/05/07',value:753}
			myChart1.hideLoading();
			console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
			var result = data;
			var tempJsonData = {
				name: result.time,
				value: result.value
			};
			passengerFlowData.push(tempJsonData);
		}).fail(function(xhr, status) {
			console.log('失败: ' + xhr.status + ', 原因: ' + status);
		});
	}*/

	setInterval(function () {
		(function(){
			myChart1.showLoading();
		$.ajax({
			type: "get",
			url: "/graph/realTimePassengerflow.do",
			dataType: "json",
		}).done(function (data) {
			//data: {time:'1997/05/07',value:753}
			myChart1.hideLoading();
			console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
			var result = data;
			var tempJsonData = {
				name: result.time,
				value: result.value
			};
			passengerFlowData.push(tempJsonData);
		}).fail(function(xhr, status) {
			console.log('失败: ' + xhr.status + ', 原因: ' + status);
		});
		})();
		
		myChart1.setOption({
			series: [{
				data: passengerFlowData
			}]
		});
	}, 1000);
}






/*
 * 图表1
 */
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('realTimePassengerFlow'));

setInterval(function () {
	getPassengerFlowData();
}, 3000);

var option = {
	title: {
		text: '实时客流量动态折线图'
	},
	tooltip: {
		trigger: 'axis',
		formatter: function (params) {
			param = params[0];
			//var date = new Date(params.name);
			//return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
			console.log(param);
			return param.value[0] + ':' + param.value[1];
		},
		axisPointer: {
			animation: true
		}
	},
	xAxis: {
		type: 'time',
		splitLine: {
			show: false
		}
	},
	yAxis: {
		type: 'value',
		boundaryGap: [0, '100%'],
		splitLine: {
			show: false
		}
	},
	series: [{
		name: '模拟数据',
		type: 'line',
		showSymbol: false,
		hoverAnimation: false,
		data: passengerFlowData,
		lineStyle: {
			normal: {
				color: '#F0805A'
			}
		},
    }]
};

setInterval(function () {

	for (var i = 0; i < 5; i++) {
		passengerFlowData.shift();
		//data.push(randomData1());
	}

	myChart1.setOption({
		series: [{
			data: passengerFlowData
											}]
	});
}, 1000);

//console.log(data[0]);
// 使用刚指定的配置项和数据显示图表。
myChart1.setOption(option);







/****************************************
 *
 *
 *
 *****************************************/
/*
 * 图表2
 */
// 基于准备好的dom，初始化echarts实例
var myChart2 = echarts.init(document.getElementById('realTimeEnteringFlow'));

// 指定图表的配置项和数据
function randomData2() {
	now = new Date(+now + oneDay);
	value = value + Math.random() * 21 - 10;
	var result = {
		name: now.toString(),
		value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
            Math.round(value)
        ]
	};
	//console.log(result);
	return result;
}

var data = [];
var now = +new Date(1997, 9, 3);
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 1000;
for (var i = 0; i < 100; i++) {
	data.push(randomData2());
}

var option = {
	title: {
		text: '实时入店量动态折线图'
	},
	tooltip: {
		trigger: 'axis',
		formatter: function (params) {
			//params = params[0];
			var date = new Date(params[0].name);
			return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params[0].value[1];
		},
		axisPointer: {
			animation: false
		}
	},
	xAxis: {
		type: 'time',
		splitLine: {
			show: false
		}
	},
	yAxis: {
		type: 'value',
		boundaryGap: [0, '100%'],
		splitLine: {
			show: true
		}
	},
	series: [{
		name: '实时入店量数据',
		type: 'line',
		showSymbol: false,
		hoverAnimation: false,
		data: data,
		lineStyle: {
			normal: {
				color: '#ED801C'
			}
		},
    }]
};

setInterval(function () {
	for (var i = 0; i < 5; i++) {
		data.shift();
		data.push(randomData2());
	}

	myChart2.setOption({
		series: [{
			data: data
		}]
	});
}, 1000);

// 使用刚指定的配置项和数据显示图表。
myChart2.setOption(option);