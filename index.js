(function($) {
	$(document).ready(function() {
		'use strict';
		genDOM();
		addEvent();

		// 新的下拉选项替代<select>显示
		function genDOM() {
			$('select.data-color').each(function (){
				var colorOptions = [], selector;
				// 获取option的颜色16进制值
				$(this).find('option').each(function() {
					colorOptions.push(this.value);
				});
				// 生成新的颜色下拉选项，隐藏<select>
				$(this).hide();

				selector = new ColorSelect();
				selector.init(colorOptions, $(this).val(), this);	
			});
		}

		function addEvent() {		
			// 添加按钮事件
			var $doc = $(document), $currentGroup;
			var _buttonEvent = function() {
				$doc.on('click', '.data-color-head', function(e) {
					$currentGroup = $(e.currentTarget).parent();

					$('.open').not($currentGroup).removeClass('open');
					$currentGroup.toggleClass('open');
					e.stopPropagation();
				});
				$doc.click(function(e) {
					$('.open').removeClass('open');
				});
			};
			// 添加选择事件
			var _optionEvent = function() {
				$('.data-color-menu').on('click', 'li', function(e) {
					var hex, $btn = $(e.delegateTarget).prev();
					hex = $(e.currentTarget).data('hex');
					$btn.css('background-color', hex);

					$btn.parent().prev().val(hex);
				});
			};

			_buttonEvent();
			_optionEvent();
		}
		
		// 下拉选项的类
		function ColorSelect() {
			this.colors = [];
			this.oldSelect = null;
			var $newSelect = null;
			var btnHex;
			// 颜色选项，默认颜色，原来的<select>的DOM对象
			this.init = function(options, hex, oldDom) {
				btnHex = hex || '#fff';
				this.colors = options;
				this.oldSelect = oldDom;
				
				this.genHTML();
			};
			this.genHTML = function() {
				var divTag = '<div class="data-color-group">';
				divTag += this.genHead() + this.genOptions();
				divTag += '</div>';
				$newSelect = $(divTag).insertAfter(this.oldSelect);
			};
			this.genHead = function() {
				var aTag = '<a class="data-color-head" href="#" '
							+ 'style="background-color:'+btnHex+'">&nbsp;'
							+ '<span class="color-caret"></span></a>';
				return aTag;
			};
			this.genOptions = function() {
				if(!this.colors.length) {
					return '';
				}
				var ulTag = '<ul class="data-color-menu">';
				$.each(this.colors, function(index, item) {
					ulTag += '<li data-hex="'+item
							+ '"><div style="background-color: '+item
							+ ';">&nbsp;</div></li>';
				});
				ulTag += '</ul>';
				return ulTag;
			};
		}
	});	
})(jQuery);