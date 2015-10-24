function SceneSettings() {}

SceneSettings.prototype.initialize = function() {
	alert("SceneSettings.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called
};

SceneSettings.prototype.handleShow = function() {
	alert("SceneSettings.handleShow()");
	$('#keyhelpSettings').sfKeyHelp({
		'updown': 'Select',
		'enter': 'Change',
		'return': 'Return'
	});
};

SceneSettings.prototype.handleHide = function() {
	alert("SceneSettings.handleHide()");
	// this function will be called when the scene manager hide this scene  
};

SceneSettings.prototype.handleFocus = function() {
	alert("SceneSettings.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneSettings.prototype.handleBlur = function() {
	alert("SceneSettings.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneSettings.prototype.handleKeyDown = function(keyCode) {
	alert("SceneSettings.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case $.sfKey.UP:
			break;
		case $.sfKey.DOWN:
			break;
		case $.sfKey.ENTER:
			break;
		case $.sfKey.RETURN:
			$.sfKey.block();
			$.sfScene.hide('Settings');
			$.sfScene.show('Main');
			$.sfScene.focus('Main');
			break;
	}
};
