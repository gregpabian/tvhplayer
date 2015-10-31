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
		this.plugin.SetVolumeWithKey(0);
	},

	volumeDown: function() {
		this.plugin.SetVolumeWithKey(1);
	},

	toggleMute: function() {
		this.muted = !this.muted;
		this.plugin.SetSystemMute(this.muted);
	},

	getVolume: function() {
		return this.plugin.GetVolume();
	}
};

alert('Audio loaded.');
