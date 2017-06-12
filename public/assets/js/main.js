'use strict';
var currDate = new Date();
var type = ""; //表示用户选择的报表类型，用于按钮事件时方便知道当前的控件有哪些

$(document).ready(function () {
	//显示$('#wm_edatetimepicker').show();

	/*日、周、月、年报*/
	//日
	$('#d_edatetimepicker').datetimepicker({
		format: "yyyy-mm-dd hh:ii", // hh:ii
		autoclose: true,
		todayBtn: true,
		language: 'zh-CN',
		pickerPosition: "bottom-left",
		locale: moment.locale('zh-cn')
	});
	$('#d_sdatetimepicker').datetimepicker({
		format: "yyyy-mm-dd hh:ii", // hh:ii
		autoclose: true,
		todayBtn: true,
		language: 'zh-CN',
		pickerPosition: "bottom-left",
		locale: moment.locale('zh-cn')
	});
	//周、 月
	$('#wm_edatetimepicker').datetimepicker({
		showWeekNumbers:true,
		minView: 2,
		format: "yyyy-mm-dd", // hh:ii
		autoclose: true,
		todayBtn: true,
		language: 'zh-CN',
		pickerPosition: "bottom-left",
		locale: moment.locale('zh-cn')
	});
	$('#wm_sdatetimepicker').datetimepicker({
		showWeekNumbers:true,
		minView: 2,
		format: "yyyy-mm-dd", // hh:ii
		autoclose: true,
		todayBtn: true,
		language: 'zh-CN',
		pickerPosition: "bottom-left",
		locale: moment.locale('zh-cn')
	});
	//年
	$('#y_edatetimepicker').datetimepicker({
		minView: 3,
		format: "yyyy-mm", // hh:ii
		autoclose: true,
		todayBtn: true,
		language: 'zh-CN',
		pickerPosition: "bottom-left",
		locale: moment.locale('zh-cn')
	});
	$('#y_sdatetimepicker').datetimepicker({
		minView: 3,
		format: "yyyy-mm", // hh:ii
		autoclose: true,
		todayBtn: true,
		language: 'zh-CN',
		pickerPosition: "bottom-left",
		locale: moment.locale('zh-cn')
	});

	//一开始时是日报，要有 日期+时间段  即可
	setDay();

	//报表类型改变事件
	$('#sel_type').change(function () {
		var sel_val = $(this).val();
		changeDateTimePicker(sel_val);
	})
});

/********************
 *    报表类型变化     *
 *********************/
function changeDateTimePicker(sel_val) {
	type = sel_val;
	if (sel_val === "D") {
		setDay();
	} else if (sel_val === "W") {
		setWeek();
	} else if (sel_val === "M") {
		setMonth();
	} else if (sel_val === "Y") {
		setYear();
	}
}


/********************
 *    设置日期格式     *
 *********************/
function setDay() {
	$('#show_time').hide();
	$('#wm_edatetimepicker').hide();
	$('#wm_sdatetimepicker').hide();
	$('#y_edatetimepicker').hide();
	$('#y_sdatetimepicker').hide();

	$('#d_edatetimepicker').show();
	$('#d_sdatetimepicker').show();

	$('#d_einput').attr('placeholder', "终止：" + currDate.toLocaleDateString().replace(/\//g, "-"));
	$('#d_sinput').attr('placeholder', "起始：" + currDate.toLocaleDateString().replace(/\//g, "-"));
}


function setWeek() {
	$('#d_edatetimepicker').hide();
	$('#d_sdatetimepicker').hide();
	$('#y_edatetimepicker').hide();
	$('#y_sdatetimepicker').hide();

	$('#wm_edatetimepicker').show();
	$('#wm_sdatetimepicker').show();

	$('#show_time').show();

	$('#wm_einput').attr('placeholder', "终止：" + currDate.toLocaleDateString().replace(/\//g, "-"));
	$('#wm_sinput').attr('placeholder', "起始：" + currDate.toLocaleDateString().replace(/\//g, "-"));

	addSelWeek();
}


//添加下拉框的week值
function addSelWeek() {
	var weekOpts = "<option value='1'>周一</option>" +
		"<option value='2'>周二</option>" +
		"<option value='3'>周三</option>" +
		"<option value='4'>周四</option>" +
		"<option value='5'>周五</option>" +
		"<option value='6'>周六</option>" +
		"<option value='7'>周七</option>";
	$('#sel_start').empty();
	$('#sel_end').empty();
	$('#sel_start').append(weekOpts);
	$('#sel_end').append(weekOpts);
}


function setMonth() {
	$('#d_edatetimepicker').hide();
	$('#d_sdatetimepicker').hide();
	$('#y_edatetimepicker').hide();
	$('#y_sdatetimepicker').hide();

	$('#wm_edatetimepicker').show();
	$('#wm_sdatetimepicker').show();

	$('#show_time').hide();

	$('#wm_einput').attr('placeholder', "终止：" + currDate.toLocaleDateString().replace(/\//g, "-"));
	$('#wm_sinput').attr('placeholder', "起始：" + currDate.toLocaleDateString().replace(/\//g, "-"));
}

function setYear() {
	$('#d_edatetimepicker').hide();
	$('#d_sdatetimepicker').hide();
	$('#wm_edatetimepicker').hide();
	$('#wm_sdatetimepicker').hide();

	$('#y_edatetimepicker').show();
	$('#y_sdatetimepicker').show();

	$('#show_time').hide();

	var currDateStr = currDate.toLocaleDateString().replace(/\//g, "-");
	$('#y_einput').attr('placeholder', "终止：" + currDateStr.split('-')[0] + "-" + currDateStr.split('-')[1]);
	$('#y_sinput').attr('placeholder', "起始：" + currDateStr.split('-')[0] + "-" + currDateStr.split('-')[1]);
}

/*
//添加下拉框的month值
function addSelWeek() {
	var monthOpts_30 =  "<option value='1'>1日</option>" +
					    "<option value='2'>2日</option>" +
					    "<option value='3'>3日</option>" +
					    "<option value='4'>4日</option>" +
					    "<option value='5'>5</option>" +
					    "<option value='6'>6</option>" +
						"<option value='7'>7</option>" +
						"<option value='8'>8</option>" +
						"<option value='9'>9</option>" +
						"<option value='10'>10</option>" +
						"<option value='11'>11</option>" +
						"<option value='12'>12</option>" +
						"<option value='13'>13</option>" +
						"<option value='14'>14</option>" +
						"<option value='15'>15</option>" +
						"<option value='16'>16</option>" +
						"<option value='6'>17</option>" +
						"<option value='6'>18</option>" +
						"<option value='6'>19</option>" +
						"<option value='6'>20</option>" +
						"<option value='6'>21</option>" +
						"<option value='6'>22</option>" +
						"<option value='6'>23</option>" +
						"<option value='6'>24</option>" +
						"<option value='6'>25</option>" +
						"<option value='6'>26</option>" +
						"<option value='6'>27</option>" +
						"<option value='6'>28</option>" +
						"<option value='6'>29</option>" +
						"<option value='6'>30</option>" +
		

		$('#sel_start').empty();
	$('#sel_end').empty();
	$('#sel_start').append(weekOpts);
	$('#sel_end').append(weekOpts);
}*/