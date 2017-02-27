/**
 * description:各类正则验证；
 * author：kimmerchen
 */
var checkObj = {
	/*密码至少包含数字、字母、符号中的2种*/
	isFormat: function(v) {
		var reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,8}$/;
		return reg.test(v);
	},

	/*允许中文 英文  数字  小数点 不允许特殊字符*/
	isCecpoint: function(a) {
		var reg = /^[\u4E00-\u9FA5A-Za-z0-9\.]+$/;
		return reg.test(a);
	},

	/*允许中文英文 数字 符号 不允许特殊符号*/
	notSpecial: function(a) {
		var reg = /^[\u4e00-\u9fa5\w\d\@\#\+\-\^\(\)\*\&\%\$]{2,125}$/;
		return reg.test(a);
	},

	/*允许 中 英文 小数点  不允许特殊字符  数字*/
	notCountSymbol: function(a) {
		var reg = /^[\u4E00-\u9FA5A-Za-z\.]+$/;
		return reg.test(a);
	},

	/*允许 整数、小数（小数后保留两位）*/
	countAndLittle: function(a) {
		var reg = /^\d+$|^\d{1,10}(\.\d{1,2})?$/;
		return reg.test(a);
	},

	/*正整数除0*/
	integer: function(a) {
		var reg = /^[0-9]*[1-9][0-9]*$/;
		return reg.test(a);
	},
	/*传入参数num，0,1,2,3,4,5,6,7分别对应邮箱，手机号，固定电话，密码，用户名，姓名，微信号，银行卡号*/
	isCheck: function(v, num) {
		var reg,reg2;
		var opt = {
			"0": "邮箱",
			"1": "手机号",
			"2": "固定电话",
			"3": "密码",
			"4": "用户名",
			"5": "姓名",
			"6": "微信号",
			"7": "银行卡号"
		};
		switch(num) {
			/*--邮箱验证--*/
			case 0:
				reg = /^[a-zA-Z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
				break;
				/*--手机号验证--*/
			case 1:
				reg = /^1\d{10}$/;
				break;
				/*--固定电话--*/
			case 2:
				reg = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
				break;
				/*--密码验证--*/
			case 3:
				reg = /^[\w\d\@\#\+\-\^\(\)\*\&\%\$\_\'\"\,\.\>\<\:\;]{6,8}$/, //验证密码的英文  数字 符号 6-8位
				reg2 = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,8}$/; //密码至少包含数字、字母、符号中的2种
				break;
				/*--用户名验证--*/
			case 4:
				reg = /^\w{6,16}$/;
				break;
				/*--中文名验证--*/
			case 5:
				reg = /^[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*$/;
				break;
				/*--微信账号  字母、数字、_的组合至少5位--*/
			case 6:
				reg = /^\w{5,}$/;
				break;
		};
		if(v.val() == "" || v.val() == null) {
			v.validTip({
				title: opt[num] + "不能为空"
			});
			$("html,body").animate({
				scrollTop: $(".jump1").offset().top
			}, 20);
			return false;
		};
		if(num == 3) { /*密码验证单独处理*/
			if(v.val() == "" || v.val() == null) {
				v.validTip({
					title: opt[num] + "不能为空！"
				});
				$("html,body").animate({
					scrollTop: $(".jump1").offset().top
				}, 20);
				return false;
			}
			if(v.val().length < 6) {
				v.validTip({
					title: opt[num] + "最少要求输入6位！"
				});
				return false;
			}
			if(!reg.test(v.val())) {
				v.validTip({
					title: opt[num] +"请使用英文 、数字 、符号 6-8位！"
				});
				$("html,body").animate({
					scrollTop: $(".jump1").offset().top
				}, 20);
				return false;
			}
			if(!reg2.test(v.val())) {
				v.validTip({
					title: "有被盗风险,建议使用字母、数字和符号两种及以上组合！"
				});
				$("html,body").animate({
					scrollTop: $(".jump1").offset().top
				}, 20);
				return false;
			}
		} else {
			if(v.val() == "" || v.val() == null) {
				v.validTip({
					title: opt[num] + "不能为空！"
				});
				$("html,body").animate({
					scrollTop: $(".jump1").offset().top
				}, 20);
				return false;
			};
			if(!reg.test(v.val())) {
				v.validTip({
					title: opt[num] + "输入格式不正确！"
				});
				$("html,body").animate({
					scrollTop: $(".jump1").offset().top
				}, 20);
				return false;
			}

		}

	}

};