function SceneMain() {}

SceneMain.prototype.initialize = function() {
	alert("SceneMain.initialize()");
	var settings = Settings.settings;
	this.url = 'http://' + settings.address + ':' + settings.port + '/api/mpegts/service/grid';
	this.list = new List('#list');
};

SceneMain.prototype.play = function(item) {
	alert("SceneMain.play()");
	$.sfScene.hide('Main');
	$.sfScene.show('Player', item);
	$.sfScene.focus('Player');
};

SceneMain.prototype.showInfo = function(item) {
	alert("SceneMain.showInfo()");
};

SceneMain.prototype.reload = function() {
	var settings = Settings.settings;

	if (settings.login) {
		this.list.load(this.url, settings.user, settings.password);
	} else {
		this.list.load(this.url);
	}
};

SceneMain.prototype.handleShow = function() {
	alert("SceneMain.handleShow()");
	$('#keyhelpMain').sfKeyHelp({
		'enter': 'Play',
		'info': 'Info',
		'rew': 'Previous page',
		'ff': 'Next page',
		'red': 'Reload',
		'blue': 'Settings',
		'return': 'Return'
	});

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
};
