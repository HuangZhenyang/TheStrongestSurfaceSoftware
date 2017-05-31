// index.js 用于显示数据概览
'use strict';

var myChart1 = echarts.init(document.getElementById('chart1'));
var chart1Data = null;
var myChart2 = echarts.init(document.getElementById('chart2'));
var option2 = null; // 设置自动高亮需要option2
var myChart3 = echarts.init(document.getElementById('chart3'));
var chart3Data = null;
var myChart4 = echarts.init(document.getElementById('chart4'));
var chart4Data = null;


/*#######################################################################*/
/*########################初始化myChart1:日周月 客流量#################*/
/*#######################################################################*/
function initMyChart1() {
	// 显示标题，图例和空的坐标轴
	myChart1.setOption({
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				crossStyle: {
					color: '#999'
				}
			}
		},
		toolbox: {
			feature: {
				dataView: {
					show: true,
					readOnly: false
				},
				magicType: {
					show: true,
					type: ['line', 'bar']
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		legend: {
			data: ['客流量', '入店量', '入店率']
		},
		xAxis: [{
			type: 'category',
			/*x轴数据*/
			data: [],
			axisPointer: {
				type: 'shadow'
			},

			axisLabel: {
				interval: 0,
				rotate: 45, //倾斜度 -90 至 90 默认为0  
				margin: 2,
				textStyle: {
					fontWeight: "bolder",
					color: "#000000"
				}
			},
    }],
		yAxis: [{
			type: 'value',
			name: '人次',
			min: 0,

			//interval: 10,
			axisLabel: {
				formatter: '{value} '
			}
    }, {
			type: 'value',
			name: '百分比',
			min: 0,
			max: 100,
			interval: 20,
			axisLabel: {
				formatter: '{value} %' //'{value} %'
			}
    }],
		series: [{
			name: '客流量',
			type: 'bar',

			data: []
    }, {
			name: '入店量',
			type: 'bar',
			data: []
    }, {
			name: '入店率',
			type: 'line',
			yAxisIndex: 1,
			data: []
    }]
	});

	myChart1.showLoading();
	$.get('/graph/passengerflow.do').done(function (data) {
		setMyChart1(data);
	}).fail(function (xhr, status) {
		//var data = '{"day": {"date":["5/7","5/6","5/5","5/4","5/3","5/2","5/1"],"passengerFlow":[2222.0, 4222.9, 2222.6, 1111.4, 2220.0, 560.4, 1111.3],"enterFlow":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],"enteringRate":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3]},"week": {"date":["5/8","5/1"],"passengerFlow":[2.0, 4.9],"enterFlow":[2.0, 4.9],"enteringRate":[2.0, 4.9]},"month": {"date":[1,2,3,4,5,6,7,8,9,10,11,12],"passengerFlow":[2.0, 4.9,3.2,3.2,3.1,2.0, 4.9,3.2,3.2,3.1,3.2,3.1],"enterFlow":[2.0, 4.9,3.2,2.0, 4.9,3.2,2.0, 4.9,3.2,2.0, 4.9,3.2],"enteringRate":[2.0, 4.9,3.2,2.0, 4.9,3.2,2.0, 4.9,3.2,2.0, 4.9,3.2]}}';
		//setMyChart1(JSON.parse(data));
		console.log('失败: ' + xhr.status + ', 原因: ' + status);
	});

	//下拉框绑定事件
	$('#selectPassengerFlow').change(function () {
		var selectValue = $('#selectPassengerFlow').val();
		if (selectValue === "day") {
			myChart1.setOption({
				xAxis: [{
					data: chart1Data.day.date
			}],
				series: [{
					data: chart1Data.day.passengerFlow
        	}, {
					data: chart1Data.day.enterFlow
			}, {
					data: chart1Data.day.enteringRate
			}]
			});
		} else if (selectValue === "week") {
			chart1Data.week.date.reverse();
			myChart1.setOption({
				xAxis: [{
					data: chart1Data.week.date
			}],
				series: [{
					data: chart1Data.week.passengerFlow
        	}, {
					data: chart1Data.week.enterFlow
			}, {
					data: chart1Data.week.enteringRate
			}]
			});
		} else if (selectValue === "month") {
			myChart1.setOption({
				xAxis: [{
					data: chart1Data.month.date
			}],
				series: [{
					data: chart1Data.month.passengerFlow
        	}, {
					data: chart1Data.month.enterFlow
			}, {
					data: chart1Data.month.enteringRate
			}]
			});
		}
	});
}

/*把收到数据与将数据嵌入图表 拆分开，减少耦合*/
function setMyChart1(data) {
	//console.log('Chart1 成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
	if(typeof(data) === "string"){
		chart1Data = JSON.parse(data);
	}else{
		chart1Data = data;
	}
	//chart1Data = data;
	//处理收到的部分数据（需要的时候再处理）
	chart1Data.day.date.reverse();
	chart1Data.day.passengerFlow.reverse();
	chart1Data.day.enterFlow.reverse();
	chart1Data.day.enteringRate.reverse();
	
	chart1Data.week.date.reverse();
	chart1Data.week.passengerFlow.reverse();
	chart1Data.week.enterFlow.reverse();
	chart1Data.week.enteringRate.reverse();
	
	chart1Data.month.date.reverse();
	chart1Data.month.passengerFlow.reverse();
	chart1Data.month.enterFlow.reverse();
	chart1Data.month.enteringRate.reverse();

	myChart1.hideLoading();
	myChart1.setOption({
		xAxis: [{
			data: chart1Data.day.date
			}],
		series: [{
			data: chart1Data.day.passengerFlow
        	}, {
			data: chart1Data.day.enterFlow
			}, {
			data: chart1Data.day.enteringRate
			}]
	});

}


/*#######################################################################*/
/*########################初始化myChart2:新老顾客#################*/
/*#######################################################################*/
function initMyChart2() {
	myChart2.showLoading();
	
	
	$.get('/graph/findNewOldCustomer.do').done(function (data) {
		setMyChart2(data);
	}).fail(function (xhr, status) {
		console.log('失败: ' + xhr.status + ', 原因: ' + status);
	});

	var app = {
		currentIndex: -1
	};

	setInterval(function () {
		var dataLen = option2.series[0].data.length;
		// 取消之前高亮的图形
		myChart2.dispatchAction({
			type: 'downplay',
			seriesIndex: 0,
			dataIndex: app.currentIndex
		});
		app.currentIndex = (app.currentIndex + 1) % dataLen;
		// 高.亮当前图形
		myChart2.dispatchAction({
			type: 'highlight',
			seriesIndex: 0,
			dataIndex: app.currentIndex
		});
		// 显示 tooltip
		myChart2.dispatchAction({
			type: 'showTip',
			seriesIndex: 0,
			dataIndex: app.currentIndex
		});
	}, 3000);
}

function setMyChart2(data) {
	console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
	
	myChart2.hideLoading();
	option2 = {
		title: {
			text: '',
			subtext: '过去七天新老顾客比例',
			x: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			left: 'left',
			data: ['新顾客', '老顾客']
		},
		toolbox: {
			show: true,
			feature: {
				mark: {
					show: true
				},
				dataView: {
					show: true,
					readOnly: true
				},
				magicType: {
					show: true,
					type: ['pie', 'funnel'],
					option: {
						funnel: {
							x: '25%',
							width: '50%',
							funnelAlign: 'left',
							max: 1548
						}
					}
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		calculable: true,
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: [{
				value: parseInt(data.newCustomer),
				name: '新顾客'
                }, {
				value: parseInt(data.oldCustomer),
				name: '老顾客'
                }],
			itemStyle: {
				normal: {
					color: function (params) {
						// build a color map as your need.
						var colorList = ['#22DDDD', '#F0805A'];
						return colorList[params.dataIndex]
					},
				},
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
            }]
	};
	myChart2.setOption(option2);
}

/*#######################################################################*/
/*########################初始化Mychart3:顾客活跃度图(堆叠柱状图)#################*/
/*#######################################################################*/
function initMyChart3() {
	myChart3.setOption({
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		toolbox: {
			feature: {
				magicType: {
					show: true,
					type: ['line', 'bar']
				}
			}
		},
		legend: {
			data: ['高活跃度', '中活跃度', '低活跃度', '沉睡活跃度']
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				data: []
        }
    ],
		yAxis: [
			{
				type: 'value',
				name: '人次',
        }
    ],
		series: [
			{
				name: '高活跃度',
				type: 'bar',
				stack: '广告',
				data: []
        },
			{
				name: '中活跃度',
				type: 'bar',
				stack: '广告',
				data: []
        },
			{
				name: '低活跃度',
				type: 'bar',
				stack: '广告',
				data: []
        },
			{
				name: '沉睡活跃度',
				type: 'bar',
				stack: '广告',
				data: []
        }
    ]
	});

	myChart3.showLoading();
	$.get('/graph/activitydegree.do').done(function (data) {
		setMyChart3(data);
	}).fail(function (xhr, status) {
		//var data = '{"week": {"date":["5/8","5/1"],"highDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],"middleDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],"lowDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],"sleepDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3]},"month": {"date":[12,11,10,9,8,7,6,5,4,3,2,1],"highDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],"middleDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],"lowDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3],"sleepDegree":[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3]}}';
		//setMyChart3(JSON.parse(data));
		console.log('失败: ' + xhr.status + ', 原因: ' + status);
	});

	//下拉框绑定事件
	$('#selectActivityDegree').change(function () {
		var selectValue = $('#selectActivityDegree').val();
		if (selectValue === "week") {
			myChart3.setOption({
				xAxis: [{
					data: chart3Data.week.date
			}],
				series: [{
					data: chart3Data.week.highDegree
        	}, {
					data: chart3Data.week.middleDegree
			}, {
					data: chart3Data.week.lowDegree
			}, {
					data: chart3Data.week.sleepDegree
			}]
			});
		} else if (selectValue === "month") {
			myChart3.setOption({
				xAxis: [{
					data: chart3Data.month.date
			}],
				series: [{
					data: chart3Data.month.highDegree
        	}, {
					data: chart3Data.month.middleDegree
			}, {
					data: chart3Data.month.lowDegree
			}, {
					data: chart3Data.month.sleepDegree
			}]
			});
		}
	});
}

function setMyChart3(data) {
	myChart3.hideLoading();
	console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
	chart3Data = data;
	chart3Data.week.date.reverse();
	chart3Data.week.highDegree.reverse();
	chart3Data.week.middleDegree.reverse();
	chart3Data.week.lowDegree.reverse();
	chart3Data.week.sleepDegree.reverse();
	
	chart3Data.month.date.reverse();
	chart3Data.month.highDegree.reverse();
	chart3Data.month.middleDegree.reverse();
	chart3Data.month.lowDegree.reverse();
	chart3Data.month.sleepDegree.reverse();
	
	myChart3.setOption({
		xAxis: [{
			data: chart3Data.week.date
			}],
		series: [{
			data: chart3Data.week.highDegree
        	}, {
			data: chart3Data.week.middleDegree
			}, {
			data: chart3Data.week.lowDegree
			}, {
			data: chart3Data.week.sleepDegree
			}]
	});
}

/*#######################################################################*/
/*########################初始化Mychart4:深访率、跳出率#################*/
/*#######################################################################*/
function initMyChart4() {
	myChart4.setOption({
		title: {
			text: '',
			subtext: ''
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : ({c}%)"
		},
		legend: {
			data: ['深访率', '跳出率']
		},
		toolbox: {
			show: true,
			feature: {
				mark: {
					show: true
				},
				dataView: {
					show: true,
					readOnly: false
				},
				magicType: {
					show: true,
					type: ['line', 'bar', 'stack', 'tiled']
				},
				restore: {
					show: false
				},
				saveAsImage: {
					show: true
				}
			}
		},
		calculable: true,
		xAxis: [
			{
				type: 'category',
				boundaryGap: false,
				data: []
        }
    ],
		yAxis: [
			{
				type: 'value',
				name: '百分比',
				min: 0,
				max: 100,
				interval: 20,
				axisLabel: {
					formatter: '{value} %' //'{value} %'
				}
            }
    ],
		series: [
			{
				name: '深访率',
				type: 'line',
				data: [],
				markPoint: {
					data: [
						{
							type: 'max',
							name: '最大值'
						},
						{
							type: 'min',
							name: '最小值'
						}
                ]
				},
				markLine: {
					data: [
						{
							type: 'average',
							name: '平均值'
						}
                ]
				}
        },
			{
				name: '跳出率',
				type: 'line',
				data: [],
				markPoint: {
					data: [
						{
							type: 'max',
							name: '最大值'
						},
						{
							type: 'min',
							name: '最小值'
						}
                ]
				},
				markLine: {
					data: [
						{
							type: 'average',
							name: '平均值'
						}
                ]
				}
        }
    ]
	});

	myChart4.showLoading();
	$.get('/graph/deepoutdegree.do').done(function (data) {
		setMyChart4(data);
	}).fail(function (xhr, status) {
		console.log('失败: ' + xhr.status + ', 原因: ' + status);
	});

	//下拉框绑定事件
	$('#selectDeepOutDegree').change(function () {
		var selectValue = $('#selectDeepOutDegree').val();
		if (selectValue === "day") {
			myChart4.setOption({
				xAxis: [{
					data: chart4Data.day.date
			}],
				series: [{
					data: chart4Data.day.deepDegree
			}, {
					data: chart4Data.day.outDegree
			}]
			});
		} else if (selectValue === "week") {
			myChart4.setOption({
				xAxis: [{
					data: chart4Data.week.date
			}],
				series: [{
					data: chart4Data.week.deepDegree
			}, {
					data: chart4Data.week.outDegree
			}]
			});
		} else if (selectValue === "month") {
			myChart4.setOption({
				xAxis: [{
					data: chart4Data.month.date
			}],
				series: [{
					data: chart4Data.month.deepDegree
			}, {
					data: chart4Data.month.outDegree
			}]
			});
		}
	});
}

function setMyChart4(data) {
	myChart4.hideLoading();
	console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
	chart4Data = data;
	
	chart4Data.day.date.reverse();
	chart4Data.day.deepDegree.reverse();
	chart4Data.day.outDegree.reverse();
	
	chart4Data.week.date.reverse();
	chart4Data.week.deepDegree.reverse();
	chart4Data.week.outDegree.reverse();
	
	chart4Data.month.date.reverse();
	chart4Data.month.deepDegree.reverse();
	chart4Data.month.outDegree.reverse();
	
	myChart4.setOption({
		xAxis: [{
			data: chart4Data.day.date
			}],
		series: [{
			data: chart4Data.day.deepDegree
			}, {
			data: chart4Data.day.outDegree
			}]
	});
}



/*$(document).ready()*/

$(document).ready(function () {
	// 欢迎的提示牌
	var unique_id = $.gritter.add({
		// (string | mandatory) the heading of the notification
		title: '欢迎来到商业数据分析决策平台!',
		// (string | mandatory) the text inside the notification
		//text: 'Hover me to enable the Close Button. You can hide the left sidebar clicking on the button next to the logo. Free version for <a href="http://blacktie.co" target="_blank" style="color:#ffd777">BlackTie.co</a>.',
		text: ' ',
		// (string | optional) the image to display on the left
		image: 'assets/img/ui-sam.jpg',
		// (bool | optional) if you want it to fade out on its own or just sit there
		sticky: false,
		// (int | optional) the time you want it to be alive for before fading out
		time: '1500',
		// (string | optional) the class name you want to apply to that specific message
		class_name: 'my-sticky-class'
	});

	// 初始化客流、入店量、入店率图
	initMyChart1();
	// 初始化新老顾客饼图
	initMyChart2();
	// 初始化顾客活跃度图
	initMyChart3();
	// 初始化深访率、跳出率
	initMyChart4();
});