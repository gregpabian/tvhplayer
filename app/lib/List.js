function List(el) {
	this.$el = $(el);
	this.$list = this.$el.find('.list');
	this.$scrollbar = this.$el.find('.bar');
	this.page = 0;
	this.pageCount = 0;
	this.pageSize = 10;
	this.index = 0;
	this.items = [];
	this.focused = false;
	this.loading = false;
}

List.prototype = {
	load: function(url) {
		var that = this;

		this._setLoading(true);
		this.$list.empty();

		$.ajax({
			url: url,
			success: function(data) {
				alert('List loaded.');
				that.items = data.entries;
				that.page = 0;
				that.index = 0;
				that.pageCount = Math.ceil(that.items.length / that.pageSize);
				that._updateScrollbar();
				that._setLoading(false);
				that.show();
				that.focus();
			},

			error: function() {
				alert('List load error!');
				that._setLoading(false);
			}
		});
	},

	show: function() {
		var offset = this.page * this.pageSize;
		var len = Math.min(offset + this.pageSize, this.items.length);

		this.$list.empty();

		var html = [];

		for (var i = offset; i < len; i++) {
			var item = this.items[i];
			html.push('<li><p class="name">', item.svcname, '</p></li>');
		}

		this.$list.html(html.join(''));

		this._focusCurrent();
	},

	focus: function() {
		this.focused = true;
		this.$el.toggleClass('focused', true);
	},

	blur: function() {
		this.$el.toggleClass('focused', false);
		this.focused = false;
	},

	previousPage: function() {
		if (!this.focused || this.loading) return;

		var page = this.page - 1 < 0 ? 0 : this.page - 1;

		if (page !== this.page) {
			this.page = page;
			this._changeIndexBy(-this.pageSize);
			this.show();
			this._updateScrollbar();
		}
	},

	nextPage: function() {
		if (!this.focused || this.loading) return;

		var page = this.page + 1 > this.pageCount - 1 ? this.pageCount - 1 : this.page + 1;

		if (page !== this.page) {
			this.page = page;
			this._changeIndexBy(this.pageSize);
			this.show();
			this._updateScrollbar();
		}
	},

	up: function() {
		this._changeIndexBy(-2);
	},

	down: function() {
		this._changeIndexBy(2);
	},

	left: function() {
		if (this.index % 2) {
			this._changeIndexBy(-1);
		} else {
			this.previousPage();
		}
	},

	right: function() {
		if (this.index % 2) {
			this.nextPage();
		} else {
			this._changeIndexBy(1);
		}
	},

	getCurrent: function() {
		alert('get current ' + this.index);
		return this.items[this.index] || null;
	},

	_setLoading: function(loading) {
		this.$el.toggleClass('loading', loading).find('.loader').sfLoading(loading ? 'show' : 'hide');
		this.loading = loading;
	},

	_updateScrollbar: function() {
		var size = 100 / this.pageCount;

		this.$scrollbar.css({
			left: this.page * size + '%',
			width: size + '%'
		});
	},

	_focusCurrent: function() {
		var current = this.index - this.page * this.pageSize;

		this.$list.find('.focused').removeClass('focused');
		this.$list.find('li').eq(current).addClass('focused');
	},

	_changeIndexBy: function(delta) {
		if (!this.focused || this.loading) return;

		var pageMin = this.page * this.pageSize;
		var pageMax = Math.min((this.page + 1) * this.pageSize, this.items.length) - 1;
		var index = this.index + delta;

		index = index < 0 ? 0 : index > this.items.length - 1 ? this.items.length - 1 : index;

		if (index !== this.index) {
			this.index = index;

			if (index < pageMin) {
				this.previousPage();
			} else if (index > pageMax) {
				this.nextPage();
			} else {
				this._focusCurrent();
			}
		}
	}
};
