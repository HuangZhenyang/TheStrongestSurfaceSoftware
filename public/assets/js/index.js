// index.js 用于显示数据概览

//文档加载后触发该函数
$(document).ready(function() {
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

	//向服务器请求概览的数据
	$.get('/user/overviewData', {
		name: $("#userName").text()
	}).done((data) => {
		/*
		 * 到时候把数据嵌进Echarts里的数据
		 */
		console.log("接收到数据" + data);
	}).fail((xhr, status) => {
		console.log('失败: ' + xhr.status + ', 原因: ' + status);
	})

});



// 显示第一个图表：客流量、入店量、入店率概览
// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('chart1'));

// 指定图表的配置项和数据
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
		/*这里记得更改时间轴*/
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
		/*
		 *这里嵌进服务器传来的数据
		 */
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
myChart1.setOption(option1);



// 基于准备好的dom，初始化echarts实例
var myChart2 = echarts.init(document.getElementById('chart2'));

// 指定图表的配置项和数据
var option2 = {
	title: {
		text: '新老顾客比例',
		subtext: '',
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
		/*
		 *这里嵌进服务器传来的新老顾客数据
		 */
		data: [{
			value: 105,
			name: '新顾客'
		}, {
			value: 610,
			name: '老顾客'
		}],
		itemStyle: {
			normal: {
				color: function(params) {
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



// 使用刚指定的配置项和数据显示图表。
myChart2.setOption(option2);