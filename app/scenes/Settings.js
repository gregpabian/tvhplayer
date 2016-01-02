function SceneSettings() {}

SceneSettings.prototype.initialize = function() {
	alert("SceneSettings.initialize()");
	this.$form = $('#form');
	this.settings = [];
	this.buildUI();

	var pluginAPI = new Common.API.Plugin();
	pluginAPI.registIMEKey();
};

SceneSettings.prototype.buildUI = function() {
	var html = [];

	for (var name in Settings.defaultSettings) {
		this.settings.push(name);
		var value = name in Settings.settings ? Settings.settings[name] : Settings.defaultSettings[name];
		html.push('<label for="settings-' + name + '"><span>' + name + '</span>');
		if (typeof value == 'boolean') {
			html.push('<input type="checkbox" ' + (value ? 'checked="checked"' : '') + ' id="settings-' + name + '" /><span class="box"></span>');
		} else {
			html.push('<input type="text" value="' + value + '" id="settings-' + name + '" size="35" />');
		}
		html.push('</label>');
	}

	this.$form.html(html.join(''));
};

SceneSettings.prototype._loadSettings = function() {
	for (var i = 0; i < this.settings.length; i++) {
		var name = this.settings[i];
		var input = $('#settings-' + name);
		var type = input.attr('type');
		var value = Settings.settings[name];

		if (type === 'checkbox') {
			input.next().sfCheckBox(value ? 'check' : 'uncheck');
		} else {
			input.val(value);
		}
	}
};

SceneSettings.prototype.next = function() {
	var index = this.index + 1;

	if (index > this.settings.length - 1) {
		index = this.settings.length - 1;
	}

	if (index !== this.index) {
		this.index = index;
		this.focusCurrent();
	}
};

SceneSettings.prototype.previous = function() {
	var index = this.index - 1;

	if (index < 0) {
		index = 0;
	}

	if (index !== this.index) {
		this.index = index;
		this.focusCurrent();
	}
};

SceneSettings.prototype.edit = function() {
	var that = this;

	var name = this.settings[this.index];
	var input = $('#settings-' + name);
	var type = input.attr('type');

	if (type === 'checkbox') {
		var value = !input.attr('checked');
		alert('value' + value);
		input.attr('checked', value);
		input.next().sfCheckBox(value ? 'check' : 'uncheck');
		Settings.settings[name] = value;
		Settings.save(Settings.settings);
		alert('### ' + input.parent().html());
	} else if (type === 'text') {
		var ime = new IMEShell('settings-' + name, function(imeObj) {
			imeObj.setKeypadPos(500, 40);
			imeObj.setBlockSpace(true);
			imeObj.setKeyFunc($.sfKey.EXIT, function() {
				$.sf.exit(true);
			});
			imeObj.setKeyFunc($.sfKey.RETURN, function() {
				var value = input.val();
				Settings.settings[name] = value;
				Settings.save(Settings.settings);
				ime.hide();
				$.sf.returnFocus();
			});

			input.focus();
		}, 'en');
	}
};

SceneSettings.prototype.focusCurrent = function() {
	this.$form.find('.focused').removeClass('focused');
	var current = '#settings-' + this.settings[this.index];
	this.$form.find(current).parent().addClass('focused');
};

SceneSettings.prototype.handleShow = function() {
	alert("SceneSettings.handleShow()");
	$('#keyhelpSettings').sfKeyHelp({
		'updown': 'Select',
		'enter': 'Change',
		'return': 'Return'
	});

	this._loadSettings();
	this.index = 0;
	this.focusCurrent();
};

SceneSettings.prototype.handleHide = function() {
	alert("SceneSettings.handleHide()");
	// this function will be called when the scene manager hide this scene  
};

SceneSettings.prototype.handleFocus = function() {
	alert("SceneSettings.handleFocus()");
	this.$form.addClass('focused');
	// this function will be called when the scene manager focus this scene
};

SceneSettings.prototype.handleBlur = function() {
	alert("SceneSettings.handleBlur()");
	this.$form.removeClass('focused');
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneSettings.prototype.handleKeyDown = function(keyCode) {
	alert("SceneSettings.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focused
	switch (keyCode) {
		case $.sfKey.UP:
			this.previous();
			break;
		case $.sfKey.DOWN:
			this.next();
			break;
		case $.sfKey.ENTER:
			this.edit();
			break;
		case $.sfKey.RETURN:
			$.sfKey.block();
			$.sfScene.hide('Settings');
			$.sfScene.show('Main');
			$.sfScene.focus('Main');
			break;
	}
};
