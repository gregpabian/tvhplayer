var EPG = {
	data: null,
	settings: null,

	init: function() {
		this.settings = Settings.settings;
	},

	load: function(count, callback) {
		alert('EPG.load(' + count + ')');
		var url = 'http://' + this.settings.address + ':' + this.settings.port + '/api/epg/events/grid';
		var that = this;

		this.data = [];

		var config = {
			url: url,
			data: {
				start: 0,
				limit: count
			},

			success: function(data) {
				alert('EPG data loaded.');
				that.data = data ? data.entries : [];
				callback();
			},

			error: function(xhr, error, status) {
				alert('EPG data load error: ' + xhr.statusText);
				callback(xhr.statusText);
			}
		};

		if (this.settings.login) {
			config.username = this.settings.user;
			config.password = this.settings.password;
		}

		$.ajax(config);
	},

	get: function(uuid) {
		for (var i = 0, len = this.data.length; i < len; i++) {
			if (this.data[i].channelUuid === uuid) return this.data[i];
		}

		return null;
	},

	getProgress: function(program) {
		var now = +new Date();
		var start = program.start * 1000;
		var stop = program.stop * 1000;

		var progress = (now - start) / (stop - start) * 100;
		progress = progress < 0 ? 0 : progress > 100 ? 100 : Math.round(progress);

		return progress + '%';
	}
};
