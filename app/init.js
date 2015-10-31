alert('init.js loaded');

function onStart() {
	Settings.init();
	Audio.init();
	EPG.init();
	Player.init();

	$.sfScene.show('Main');
	$.sfScene.focus('Main');
}

function onDestroy() {
	Player.destroy();
}
