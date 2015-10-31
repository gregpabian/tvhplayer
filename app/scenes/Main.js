function SceneMain() {}

SceneMain.prototype.initialize = function() {
	alert("SceneMain.initialize()");
	this.settings = Settings.settings;
	this.epg = EPG;
	this.url = 'http://' + this.settings.address + ':' + this.settings.port;
	this.list = new List('#list', this.epg);
	this.$info = $('#info');
	this.$infoBox = this.$info.find('.info-box');
	this.showingInfo = false;
};

SceneMain.prototype.play = function(item) {
	alert("SceneMain.play()");
	$.sfScene.hide('Main');
	$.sfScene.show('Player', item);
	$.sfScene.focus('Player');
};

SceneMain.prototype.showInfo = function(item) {
	alert("SceneMain.showInfo()");
	this.showingInfo = true;
	this.showInfoKeyhelp();
	this.list.blur();
	this.$info.show();

	var epg = this.epg.get(item.uuid) || {};
	var iconUrl = /https?/.test(epg.channelIcon) ? epg.channelIcon : this.url + '/' + epg.channelIcon;

	function pad(num) {
		return num < 10 ? '0' + num : num;
	}

	function formatDate(timestamp) {
		var date = new Date(timestamp * 1000);

		return date.getHours() + ':' + pad(date.getMinutes());
	}

	var html = [
		'<img class="logo" src="', iconUrl, '">',
		'<p class="channel-name">', (epg.channelName || item.name), '</p>',
		'<p class="program-title">', epg.title, '</p>',
		'<p class="duration">', formatDate(epg.start), ' - ', formatDate(epg.stop), '</p>',
		'<p class="summary">', epg.summary, '</p>'
	];

	this.$infoBox.css('visibility', 'hidden');
	this.$infoBox.html(html.join(''));
	this.$infoBox.css('margin-top', -this.$infoBox.height() / 2 + 'px');
	this.$infoBox.css('visibility', 'visible');
};

SceneMain.prototype.hideInfo = function() {
	alert("SceneMain.hideInfo()");
	this.showingInfo = false;
	this.showMainKeyhelp();
	this.list.focus();
	this.$info.hide();
};

SceneMain.prototype.showMainKeyhelp = function() {
	$('#keyhelpMain').sfKeyHelp({
		'enter': 'Play',
		'info': 'Info',
		'rew': 'Previous page',
		'ff': 'Next page',
		'red': 'Reload',
		'blue': 'Settings',
		'return': 'Return'
	});
};

SceneMain.prototype.showInfoKeyhelp = function() {
	$('#keyhelpMain').sfKeyHelp({
		'return': 'Return'
	});
};

SceneMain.prototype.reload = function() {
	var url = this.url + '/api/channel/grid';
	if (this.settings.login) {
		this.list.load(url, this.settings.user, this.settings.password);
	} else {
		this.list.load(url);
	}
};

SceneMain.prototype.handleShow = function() {
	alert("SceneMain.handleShow()");
	this.showMainKeyhelp();
	this.reload();
};

SceneMain.prototype.handleHide = function() {
	alert("SceneMain.handleHide()");
};

SceneMain.prototype.handleFocus = function() {
	alert("SceneMain.handleFocus()");
	this.list.focus();
};

SceneMain.prototype.handleBlur = function() {
	alert("SceneMain.handleBlur()");
	this.list.blur();
};

SceneMain.prototype.handleKeyDown = function(keyCode) {
	alert("SceneMain.handleKeyDown(" + keyCode + ")");

	if (this.showingInfo) {
		switch (keyCode) {
			case $.sfKey.RETURN:
				$.sfKey.block();
				this.hideInfo();
				break;
		}
	} else {
		switch (keyCode) {
			case $.sfKey.UP:
				this.list.up();
				break;
			case $.sfKey.DOWN:
				this.list.down();
				break;
			case $.sfKey.LEFT:
				this.list.left();
				break;
			case $.sfKey.RIGHT:
				this.list.right();
				break;
			case $.sfKey.ENTER:
				this.play(this.list.getCurrent());
				break;
			case $.sfKey.INFO:
				this.showInfo(this.list.getCurrent());
				break;
			case $.sfKey.RED:
				this.reload();
				break;
			case $.sfKey.FF:
				this.list.nextPage();
				break;
			case $.sfKey.RW:
				this.list.previousPage();
				break;
			case $.sfKey.BLUE:
				$.sfScene.hide('Main');
				$.sfScene.show('Settings');
				$.sfScene.focus('Settings');
				break;
		}
	}
};
