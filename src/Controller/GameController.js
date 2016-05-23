var GameController = function () {
};

GameController.prototype.setBackground = function () {
    game.stage.backgroundColor = "#d5edf7";

    this.backdrop = backdrop = game.add.group();
    for(var i = 0; i < 10; i++) {
        var child = game.add.tileSprite(512 * i, 0, 1024, 1024, 'game', 'backdrop');
        child.scale.setTo(0.5, 0.5);
        child.anchor.setTo(0, 1);
        child.y = game.height;
        this.backdrop.add(child);
    }
};

GameController.prototype.preload = function() {
    game.load.atlasJSONHash('game', 'spritescommon.png', 'spritescommon.json');
    game.load.atlasJSONHash('spritesbird', 'spritesbird.png', 'spritesbird.json');
    game.load.audio('baasei', ['audio/baasei.mp3', 'audio/baasei.ogg']);
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
};

GameController.prototype.create = function() {
    this.setBackground();
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    this.cloudGenerator = new CloudGenerator();
    this.enemyGenerator = new EnemyGenerator();
    this.wallGenerator = new WallGenerator(GameUtil.gameSize);
	this.scoreManager = null;

    music = game.add.audio('baasei');
    music.loopFull(GameUtil.musicVolume);

    var egg = this.egg = new Egg(game.world.centerX, game.world.centerY, this.enemyGenerator.enemies);
    game.input.mouse.onMouseMove = function(event) {
        egg.sprite.x = Math.min(Math.max(event.x, GameUtil.gameStartX + egg.sprite.width / 3), GameUtil.gameEndX - egg.sprite.width / 3);
        egg.sprite.y = event.y;
    };
};

GameController.prototype.update = function() {
    if(game.input.pointer1.isDown) {
        this.egg.sprite.x = Math.min(Math.max(game.input.pointer1.x, GameUtil.gameStartX + this.egg.sprite.width / 3), GameUtil.gameEndX - this.egg.sprite.width / 3);
        this.egg.sprite.y = game.input.pointer1.y;
    }

    this.egg.update();
    this.cloudGenerator.run();
    this.enemyGenerator.run();
    this.wallGenerator.run();
	if(null == this.scoreManager && GameUtil.fontsLoaded) {
		this.scoreManager = new ScoreManager();
	}
	if(null !== this.scoreManager) {
		this.scoreManager.run();
	}

    for(var i in this.backdrop.children) {
        this.backdrop.children[i].y = game.height;
    }
};