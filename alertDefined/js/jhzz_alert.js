/**
 * FunL: 表示左侧按钮的触发事件      
 * FunR: 代表右侧的触发事件
 * Author: LyNnJeR
 * Time: 2017-02-25
 * 默认事件  关闭弹出层
 * **/
;
(function($, window, document, undefined) {
	//默认参数
	var PARAMS;
	var DEFAULTPARAMS = { Title: '标题', Msg: '', yesBtn: '确定', noBtn: '取消', FunL: new Object, FunR: new Object,hideTime: 3000 };
	$.JUI = {
		//弹出提示框
		Alert: function(params) {
			Show(params, 'Alert');
		},
		//弹出确认框
		Confirm: function(params) { Show(params, 'Confirm'); },
		//自动显示弹框
		Autofade: function(params) { Show(params, 'Autofade') },
		//关闭弹出框
		Close: function() {
			$('.zbox-popup,.zbox-popup-backdrop').remove();
		},
		//加载图形
		Loading: function(Url) {
			loadBox(Url)
		}
	};
	//初始化参数
	function Init(params) {
		if(params != undefined && params != null) {
			PARAMS = $.extend({}, DEFAULTPARAMS, params);
		}
	};

	function loadBox(Url) {
		var url = Url;
		var dislogContainer = $('<div class="zbox-popup" style="display: block;"><img  id="zchange" src="' + url + '"></div>');
		var blackFilter = $('<div class="zbox-popup-backdrop" style="display: block;"></div>');
		setTimeout(function() {
			$('.zbox-popup').addClass('zbox-popup-in');
			$('.zbox-popup-backdrop').addClass('zbox-active');
		}, 30)
		$('body').append(dislogContainer);
	}

	function Show(params, caller) {
		Init(params);
		var dislogContainer;
		var dialogInner;
		var dialogBtn;
		var blackFilter = $('<div class="zbox-popup-backdrop" style="display: block;"></div>');
		if(caller == 'Autofade') {
			dislogContainer = $('<div class="zbox-toast-container"><div class="zbox-toast-message">' +
				PARAMS.Msg + '</div></div>');
			$('body').append(dislogContainer);
			setTimeout(function() {
				$('.zbox-toast-container').addClass('zbox-active');
			}, 30)
			setTimeout(function() {
				$('.zbox-toast-container').remove();
			}, PARAMS.hideTime)
		} else {
			dislogContainer = $('<div class="zbox-popup" style="display: block;"></div>');
			dialogInner = $('<div class="zbox-popup-inner"><div class="zbox-popup-title">' + PARAMS.Title + '</div><div class="zbox-popup-text">' + PARAMS.Msg + '</div></div>');
			dialogBtn = $('<div class="zbox-popup-buttons"><span class="zbox-popup-button" index="0">' + PARAMS.yesBtn + '</span></div>');
			if(caller == 'Confirm') {
				dialogBtn.append($('<span class="zbox-popup-button R" index="1">' + PARAMS.noBtn + '</span>'));
			}
			dislogContainer.append(dialogInner);
			dislogContainer.append(dialogBtn);
			setTimeout(function() {
				$('.zbox-popup').addClass('zbox-popup-in');
				$('.zbox-popup-backdrop').addClass('zbox-active');
			}, 10)
			$('body').append(blackFilter);
			$('body').append(dislogContainer);

			$('.zbox-popup-button').click(function() {
				var indexs = $(this).attr('index');
				if(indexs == 0) {
					//左侧按钮
					if($.isFunction(PARAMS.FunL)) {
						PARAMS.FunL();
					} else {
						$.JUI.Close();
					}
				} else {
					//右侧按钮 
					if($.isFunction(PARAMS.FunR)) {
						PARAMS.FunR();
					} else {
						$.JUI.Close();
					}
				}
				return false;
			})
		}
	}
})(jQuery, window, document);