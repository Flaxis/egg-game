var controller;

var GameUtil = {
    gameStartX: 0,
    gameEndX: 0,
    gameSize: 640,
    floatingLayers: [],
    soundVolume: 0,
    musicVolume: 0.0,
    spritesheets: 1,
	fontsLoaded: false
};

var WebFontConfig = {
    active: function() { game.time.events.add(0, function() {
		GameUtil.fontsLoaded = true;
	}, this); },
    google: {
        families: ['Montserrat']
    }

};

function handleIncorrect(){
    if(!game.device.desktop) {
        document.getElementById("turn").style.display="block";
    }
}

function handleCorrect(){
    if(!game.device.desktop) {
        document.getElementById("turn").style.display="none";
    }
}

function preload() {
    if(!game.device.desktop) {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.forceOrientation(false, true);
        game.scale.enterIncorrectOrientation.add(handleIncorrect);
        game.scale.leaveIncorrectOrientation.add(handleCorrect);
    }
    else {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }
    controller = new GameController();
    controller.preload();
}

function create() {
    GameUtil.gameEndX = game.width;
    GameUtil.floatingLayers.push(game.add.group());
    controller.create();
    onUpdate(function() {
        controller.update();
    });
    game.time.advancedTiming = true;
    game.time.desiredFps = 60;
}

var updateCallbacks = [];

function onUpdate(callback) {
    updateCallbacks.push(callback);
}

function update() {
    var i;
    for(i in updateCallbacks) {
        updateCallbacks[i]();
    }
    for(i in GameUtil.floatingLayers) {
        game.world.bringToTop(GameUtil.floatingLayers[GameUtil.floatingLayers.length - i - 1]);
    }
}

function render() {
    //game.debug.text('render FPS: ' + (game.time.fps || '--') , 2, 14, "#ff0000");
}