var Settings = {
	fs: null,

	defaultSettings: {
		address: '192.168.0.10',
		port: 9981,
		login: false,
		user: 'user',
		password: 'password'
	},

	settings: {},

	init: function() {
		alert('Settings init.');

		try {
			this.fs = new FileSystem();
		} catch (e) {
			alert('Settings init error.');
		}

		if (this.fs) {
			this.load();
		}
	},

	load: function() {
		var file = this.fs.openCommonFile('settings', 'r');
		var content = '';
		var line, settings;

		if (file) {
			while ((line = file.readLine())) {
				content += line;
			}

			this.fs.closeCommonFile(file);
		} else {
			alert('Settings error - can\'t load file!');
		}

		if (content.length) {
			try {
				settings = JSON.parse(content);
				alert('Settings loaded.');
			} catch (e) {
				alert('Settings couldn\'t be parsed.');
				alert(e);
			}
		}

		if (!settings) {
			alert('Settings - use default.');
			settings = this.defaultSettings;
			this.save(settings);
		}

		this.settings = settings;
	},

	save: function(content) {
		var file = this.fs.openCommonFile('settings', 'w');

		content = JSON.stringify(this.settings);

		if (file) {
			file.writeLine(content);
			this.fs.closeCommonFile(file);
		} else {
			alert('Settings error - can\'t write file!');
			return false;
		}

		alert('Settings saved.');

		return true;
	}
};
