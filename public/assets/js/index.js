// index.js 用于显示数据概览
'use strict';

var myChart1 = echarts.init(document.getElementById('chart1'));
var chart1Data = null;
var myChart2 = echarts.init(document.getElementById('chart2'));
var option2 = null;


//文档加载后触发该函数
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

	// 初始化客流日图
	initMyChart1();
	// 初始化新老顾客饼图
	initMyChart2();

});

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
			}
    }],
		yAxis: [{
			type: 'value',
			name: '人次',
			min: 0,
			max: 1500,
			interval: 300,
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
				formatter: '{value} %'
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

	$.get('/graph/passengerflow').done(function (data) {
		/*
		data:
		{
		 time: {"day":['5/1','5/2','5/3'……,'5/7'],
		 	    "week":[],
				"month":[]
			   },
		 value: {"passengerFlow":[[2.0, 4.9, 5.6, 5.4, 20.0, 6.4, 3.3](日),[](周),[](月)],
		 		 "enterFlow":[],
				 "enteringRate":[]
		 		}			   
		}
		
		
		//以下作废
		{
		
		passengerFlowData:{"day":{"time":['5/1','5/2','5/3'……,'5/7'],
					               "value":[2.0, 4.9, 20.0, 6.4, 3.3]},
			 				"week":{},
							"month":{}
							},
		enterFlowData:{"day":{"time":['5/1','5/2','5/3'……,'5/7'],
					               "value":[2.0, 4.9, 20.0, 6.4, 3.3]},
			 		   "week":{},
					   "month":{}
					  },
		enteringRate:{"day":{"time":['5/1','5/2','5/3'……,'5/7'],
					               "value":[2.0, 4.9, 20.0, 6.4, 3.3]},
			 		  "week":{},
					  "month":{}
					 }
		}
		*/
		console.log('成功, 收到的数据: ' + JSON.stringify(data, null, '  '));
		chart1Data = data;
		myChart1.hideLoading();

		myChart1.setOption({
			xAxis: [{
				data: chart1Data.time.day
			}],
			series: [{
				data: chart1Data.value.passengerFlow[0]
        	}, {
				data: chart1Data.value.enterFlow[0]
			}, {
				data: chart1Data.value.enteringRate[0]
			}]
		});

	}).fail(function (xhr, status) {
		console.log('失败: ' + xhr.status + ', 原因: ' + status);
	});

	//下拉框绑定事件
	$('#select').change(function () {
		var selectValue = $('#select').val();
		if (selectValue === "day") {
			myChart1.setOption({
				xAxis: [{
					data: chart1Data.time.day
			}],
				series: [{
					data: chart1Data.value.passengerFlow[0]
        	}, {
					data: chart1Data.value.enterFlow[0]
			}, {
					data: chart1Data.value.enteringRate[0]
			}]
			});
		} else if (selectValue === "week") {
			myChart1.setOption({
				xAxis: [{
					data: chart1Data.time.week
			}],
				series: [{
					data: chart1Data.value.passengerFlow[1]
        	}, {
					data: chart1Data.value.enterFlow[1]
			}, {
					data: chart1Data.value.enteringRate[1]
			}]
			});
		} else if (selectValue === "month") {
			myChart1.setOption({
				xAxis: [{
					data: chart1Data.time.week
			}],
				series: [{
					data: chart1Data.value.passengerFlow[2]
        	}, {
					data: chart1Data.value.enterFlow[2]
			}, {
					data: chart1Data.value.enteringRate[2]
			}]
			});
		}
	});
}



/*#######################################################################*/
/*########################初始化myChart2:新老顾客#################*/
/*#######################################################################*/
function initMyChart2() {
	myChart1.showLoading();
	// 指定图表的配置项和数据
	$.get('/graph/findNewOldCustomer.do').done(function (data) {
		myChart1.hideLoading();
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
		// 高亮当前图形
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









// 指定图表的配置项和数据
/*
var option1 = {
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
		
		data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
		axisPointer: {
			type: 'shadow'
		}
    }],
	yAxis: [{
		type: 'value',
		name: '人次',
		min: 0,
		max: 250,
		interval: 50,
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
			formatter: '{value} %'
		}
    }],
	series: [{
		name: '客流量',
		type: 'bar',
		
		data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
    }, {
		name: '入店量',
		type: 'bar',
		data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
    }, {
		name: '入店率',
		type: 'line',
		yAxisIndex: 1,
		data: [20.0, 22.2, 35.3, 40.5, 60.3, 10.2, 20.3, 23.4, 43.0, 36.5, 22.0, 36.2]
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart1.setOption(option1);*/