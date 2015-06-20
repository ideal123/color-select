(function($) {
	$(document).ready(function() {	
		$('select.data-color').each(function (){
			var colorOptions = [];
			// 获取option的颜色16进制值
			$(this).find('option').each(function() {
				colorOptions.push($(this).data('hex'));
			});
			// 生成新的颜色下拉选项，隐藏<select>
			$(this).hide();

			var newSelect = new ColorSelect();
			newSelect.colors = colorOptions;
			$(this).after(newSelect.init());
		});

		// 下拉选项的类
		function ColorSelect() {
			this.colors = [];

			this.init = function() {
				return this.genHTML();
			};
			this.genHTML = function() {
				var divTag = '<div class="data-color-group">';
				divTag = this.genHead() + this.genOptions(); 
				divTag += '</div>';
				return divTag;
			};
			this.genHead = function() {
				var aTag = '<a class="data-color-head" href="#">...</a>';
				return aTag;
			};
			this.genOptions = function() {
				var ulTag = '<ul>';
				$.each(this.colors, function(index, item) {
					ulTag += '<li><div style="background-color: '+item+'">...</div></li>';
				});
				ulTag += '</ul>';
				return ulTag;
			};
		}

	});	
})(jQuery);