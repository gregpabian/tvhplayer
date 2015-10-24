var Player = {
	STOPPED: 0,
	PLAYING: 1,
	PAUSED: 2,

	plugin: null,
	state: -1,

	init: function() {
		alert('Player init.');

		this.state = this.STOPPED;
		this.plugin = document.getElementById('pluginPlayer');

		if (!this.plugin) return alert('Player init error!');

		// this.plugin.OnCurrentPlayTime = 'Player.setCurrentTime';
		this.plugin.OnStreamInfoReady = 'Player.onStreamInfoReady';
		this.plugin.OnBufferingStart = 'Player.onBufferingStart';
		this.plugin.OnBufferingComplete = 'Player.onBufferingComplete';
		this.plugin.OnRenderingComplete = 'Player.onRenderingComplete';
		this.plugin.OnNetworkDisconnected = 'Player.onNetworkDisconnected';
		this.plugin.OnRenderError = 'Player.onRenderError';
		this.plugin.OnStreamNotFound = 'Player.onStreamNotFound';

		this.plugin.SetDisplayArea(0, 0, 960, 540);
	},

	destroy: function() {
		if (this.state === this.PLAYING || this.state === this.PAUSED) {
			this.plugin.Stop();
		}
	},

	play: function(url) {
		if (this.state === this.STOPPED) {
			this.plugin.Play(url);
			this.state = this.PLAYING;
		}
	},

	stop: function() {
		if (this.state === this.PLAYING) {
			this.plugin.Stop();
			this.state = this.STOPPED;
		}
	},

	setCurrentTime: function(time) {
		alert('setCurrentTime ' + time);
	},

	onStreamInfoReady: function() {
		alert('onStreamInfoReady');
	},

	onBufferingStart: function() {
		alert('onBufferingStart');
	},

	onBufferingComplete: function() {
		alert('onBufferingComplete');
	},

	onRenderingComplete: function() {
		alert('onRenderingComplete');
	},

	onNetworkDisconnected: function() {
		alert('onNetworkDisconnected');
		this.state = this.STOPPED;
	},

	onRenderError: function() {
		alert('onRenderError');
		this.state = this.STOPPED;
	},

	onStreamNotFound: function() {
		alert('onStreamNotFound');
		this.state = this.STOPPED;
	}
};

alert('Player loaded.');
