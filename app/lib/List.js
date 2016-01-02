function List(el, epg) {
	this.$el = $(el);
	this.$list = this.$el.find('.list');
	this.$scrollbar = this.$el.find('.bar');
	this.$error = this.$el.find('.error');
	this.items = [];
	this.page = 0;
	this.pageCount = 0;
	this.index = 0;
	this.focused = false;
	this.loading = false;
	this.epg = epg;
}

List.prototype = {
	pageSize: 10,

	load: function(url, username, password) {
		var that = this;

		this._setLoading(true);
		this._hideError();
		this.$list.empty();
		this.items = [];
		this.page = 0;
		this.index = 0;
		this.pageCount = 0;

		var config = {
			url: url,
			success: function(data) {
				alert('List loaded.');
				that.items = data.entries;
				that.items.sort(function (a, b) {
					return a.number > b.number ? 1 : a.number < b.number ? -1 : 0;
				});
				that.pageCount = Math.ceil(that.items.length / that.pageSize);
				that._updateScrollbar();

				that.epg.load(that.items.length, function() {
					that._setLoading(false);
					that.show();
					that.focus();
				});
			},

			error: function(xhr) {
				alert('List load error: ' + xhr.statusText);
				that._setLoading(false);
				that._showError('Error loading channel list: ' + xhr.statusText);
			}
		};

		if (username && password) {
			config.username = username;
			config.password = password;
		}

		$.ajax(config);
	},

	show: function() {
		var offset = this.page * this.pageSize;
		var len = Math.min(offset + this.pageSize, this.items.length);

		this.$list.empty();

		var html = [];

		for (var i = offset; i < len; i++) {
			var item = this.items[i];
			var program = this.epg.get(item.uuid);
			var progress = program ? this.epg.getProgress(program) : 0;
			html.push('<li><p class="name">', item.name, '</p><p class="program">', (program ? program.title : ''), '</p>',
				'<div class="progress" style="width: ', progress, '"></div>', '</li>');
		}

		alert(html.join(''));

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
		this.$el.toggleClass('loading', loading).find('.loader').dzLoader(loading ? 'show' : 'hide');
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
			if (index < pageMin) {
				this.previousPage();
			}

			if (index > pageMax) {
				this.nextPage();
			}

			this.index = index;
			this._focusCurrent();
		}
	},

	_showError: function(text) {
		this.$error.text(text).show();
	},

	_hideError: function() {
		this.$error.empty().hide();
	}
};
