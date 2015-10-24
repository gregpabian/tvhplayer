var Audio = {
	plugin: null,

	muted: false,

	init: function() {
		alert('Audio init.');

		this.plugin = document.getElementById('pluginAudio');

		if (!this.plugin) {
			alert('Audio init error!');
		}
	},

	volumeUp: function() {
		if (this.muted) return;
		this.plugin.SetVolumeWithKey(1);
	},

	volumeDown: function() {
		if (this.muted) return;
		this.plugin.SetVolumeWithKey(0);
	},

	setMute: function(isMuted) {
		this.muted = isMuted;
		Audio.plugin.SetSystemMute(isMuted);
	}
};

alert('Audio loaded.');
