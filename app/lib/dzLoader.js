(function($) {
	$.fn.dzLoader = function(options) {
		if (this.data('dzLoader') !== 'dzLoader') {
			this
				.html('<div class="dz-loader-inner"></div>')
				.data('dzLoader', 'dzLoader')
				.data('index', 0)
				.data('timer', false)
				.addClass('dz-loader');
		}

		if (typeof options == 'string') {
			switch (options) {
				case 'show':
					this.show();

					if (this.data('timer')) break;

					var that = this;
					var timer = setInterval(function() {
						var cur = that.data('index');
						var next = (parseInt(cur, 10) + 1) % 12;

						that.children().eq(0)
							.removeClass('dz-loader-frame-' + cur)
							.addClass('dz-loader-frame-' + next);

						that.data('index', next);
					}, 100);

					this.data('timer', timer);
					break;

				case 'hide':
					this.hide();
					clearInterval(this.data('timer'));
					this.data('timer', null);
					break;
			}
		}

		return this;
	};

})(jQuery);
