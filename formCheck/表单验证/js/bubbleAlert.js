/**
 * 表单元素验证气泡提示插件
 * 
 * @description <input type="text" id="input-id" /> 设置显示验证提示
 *              $(inputSelecter).validTip({title:"提示文案"}); or
 *              $(inputSelecter).validTip("提示文案"); $(inputSelecter).validTip();
 * 
 * 设置隐藏验证提示 $($inputSelecter).validTip("method","hide");
 * 
 */
(function($) {
	$.fn.validTip = function(option) {
		if(arguments.length) {
			if(arguments.length == 1) {
				if(typeof option == "string") {
					option = {
						title: option
					};
				}
			} else if(arguments.length == 2) {
				var arg1 = arguments[0];
				var arg2 = arguments[1];
				option = {};
				option[arg1] = arg2;/*key,value赋值*/
			}
		} else {
			option = option || {};
		}
		option = option || {};
		var op = {
			title: "提示文案",
			postop: 33,
			posright: 50,
			hideEven: "click",
			trigger: "tipshow"
		};
		for(var key in op) {
			option[key] = option[key] || op[key];
		}
		if(option.method) {
			option.trigger = option.method;
		}
		var vtipidcode = $(this).data("vtipidcode");
		var tipDom;
		if(vtipidcode) {
			tipDom = $("#" + vtipidcode);
		}
		if(tipDom == null || $(tipDom).length == 0) {
			vtipidcode = "vtipidcode" + new Date().getTime();
			vtipidcode += parseInt(Math.random() * 1000000);
			var tipHtml = '<div class="yktipWAI" id="' + vtipidcode + '"><div class="yktip"></div></div>';
			tipDom = $(tipHtml);
			$("body").append(tipDom);
			$(tipDom).bind({
				tipshow: function() {
					$(this).show();
					$(this).trigger("timeoutClose");
				},
				tiphide: function() {
					$(this).hide();
					$(this).trigger("tipdestroy");
				},
				hide: function() {
					$(this).trigger("tiphide");
				},
				tipdestroy: function() {
					$(this).remove();
				},
				click: function() {

				},
				timeoutClose: function() {
					var $this = this;
					var id = $(this).attr("timeid");
					clearTimeout(id);
					id = setTimeout(function() {
						$($this).trigger("tiphide");
					}, 4000);
					$(this).attr("timeid", id);
				}
			});
			$(this).data("vtipidcode", vtipidcode);
			$(this).focus(function(e) {
				var t = $(this).data("vtipidcode");
				t = $("#" + t);
				if(t && $(t).length > 0) {
					try {
						$(t).hide();
					} catch(e) {

					}
				}
			});
		}
		$(tipDom).find(".yktip").html(option.title);
		var iwidth = $(this).width();
		var iheight = $(this).height();
		var ioffset = $(this).offset();
		var top = ioffset.top - option.postop;
		var left = ioffset.left + iwidth - option.posright - 52;
		$(tipDom).css({ "left": left, "top": top });
		if(option.trigger) {
			$(tipDom).trigger(option.trigger);
		}
	}
})(jQuery);