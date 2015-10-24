function ScenePlayer() {}

ScenePlayer.prototype.initialize = function() {
	alert("ScenePlayer.initialize()");
	this.$name = $('#channelName');
	this.$loader = $('#loaderPlayer');
	this.$keyhelp = $('#keyhelpPlayer');
	this.$el = $('#ScenePlayer');

	var that = this;

	Player.onBufferingStart = function() {
		alert('Player.onBufferingStart');
		that.show();
		that.showLoading();
		that.updateKeyhelp('Buffering');
		that.showKeyhelp();
	};

	Player.onBufferingComplete = function() {
		alert('Player.onBufferingComplete');
		that.hide();
		that.hideLoading();
		that.updateKeyhelp();
		that.hideKeyhelp();
	};

	Player.onNetworkDisconnected = function() {
		alert('Player.onBufferingComplete');
		Player.state = Player.STOPPED;
		that.show();
		that.hideLoading();
		that.updateKeyhelp('Network Disconnected');
		that.showKeyhelp();
	};

	Player.onRenderError = function() {
		alert('Player.onRenderError');
		Player.state = Player.STOPPED;
		that.show();
		that.hideLoading();
		that.updateKeyhelp('Render Error');
		that.showKeyhelp();
	};

	Player.onStreamNotFound = function() {
		alert('Player.onStreamNotFound');
		Player.state = Player.STOPPED;
		that.show();
		that.hideLoading();
		that.updateKeyhelp('Stream Not Found');
		that.showKeyhelp();
	};
};

ScenePlayer.prototype.show = function() {
	this.$el.show();
};

ScenePlayer.prototype.hide = function() {
	this.$el.hide();
};

ScenePlayer.prototype.showLoading = function() {
	this.$loader.dzLoader('show');
};

ScenePlayer.prototype.hideLoading = function() {
	this.$loader.dzLoader('hide');
};

ScenePlayer.prototype.showKeyhelp = function() {
	this.$keyhelp.show();
};

ScenePlayer.prototype.hideKeyhelp = function() {
	this.$keyhelp.hide();
};

ScenePlayer.prototype.updateKeyhelp = function(status) {
	this.$keyhelp.sfKeyHelp({
		user: this.name + (status ? ' - ' + status : ''),
		'return': 'Return'
	}).show();
};

ScenePlayer.prototype.handleShow = function(item) {
	alert("ScenePlayer.handleShow()");

	this.name = item.svcname || 'Unknown';

	var settings = Settings.settings;

	this.updateKeyhelp();

	var url = 'http://' + settings.address + ':' + settings.port + '/stream/service/' + item.uuid;

	Player.play(url);
};

ScenePlayer.prototype.handleHide = function() {
	alert("ScenePlayer.handleHide()");
	Player.stop();
};

ScenePlayer.prototype.handleFocus = function() {
	alert("ScenePlayer.handleFocus()");
};

ScenePlayer.prototype.handleBlur = function() {
	alert("ScenePlayer.handleBlur()");
};

ScenePlayer.prototype.handleKeyDown = function(keyCode) {
	alert("ScenePlayer.handleKeyDown(" + keyCode + ")");
	switch (keyCode) {
		case $.sfKey.VOL_UP:
		case $.sfKey.PANEL_VOL_UP:
			break;

		case $.sfKey.VOL_DOWN:
		case $.sfKey.PANEL_VOL_DOWN:
			break;

		case $.sfKey.RETURN:
			$.sfKey.block();
			$.sfScene.hide('Player');
			$.sfScene.show('Main');
			$.sfScene.focus('Main');
			break;
	}
};
