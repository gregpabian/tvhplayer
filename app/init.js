alert('init.js loaded');

function onStart() {
	alert('onStart before');
	Settings.init();
	Audio.init();
	Player.init();

	$.sfScene.show('Main');
	$.sfScene.focus('Main');
	alert('onStart after');
}

function onDestroy() {
	Player.destroy();
}
