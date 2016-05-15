var WallGenerator = function(gameSize) {
	this.gameSize = gameSize;
	this.baseWallLeft = game.add.sprite(0, 0, 'game', 'physics/wallBase');
	this.baseWallRight = game.add.sprite(0, 0, 'game', 'physics/wallBase');
	this.wallLeft = game.add.sprite(0, 0, 'game', 'physics/wallRight');
	this.wallLeft.anchor.setTo(1,0);
	this.wallRight = game.add.sprite(0, 0, 'game', 'physics/wallLeft');
	this.wall = game.add.group();
	this.windows = game.add.group();
	this.windowTimer = 0;
};

WallGenerator.prototype.run = function() {
	this.windowTimer++;
	var remainingWidth = game.width - this.gameSize;
	var wallWidth = remainingWidth / 2;
	this.wallLeft.x = GameUtil.gameStartX = this.baseWallLeft.width = wallWidth;
	this.baseWallLeft.height = this.wallLeft.height = game.height;

	this.wallRight.x = GameUtil.gameEndX = this.baseWallRight.x = wallWidth + this.gameSize;
	this.baseWallRight.width = wallWidth;
	this.baseWallRight.height = this.wallRight.height = game.height;

	var patch;
	if(Math.random() > 0.94 && wallWidth > 64) {
		var x;
		if(Math.random() > 0.5) {
			x = Math.floor(Math.random() * wallWidth) - 44;
		} else {
			x = Math.floor(Math.random() * wallWidth) + 44 + GameUtil.gameEndX;
		}
		patch = game.add.sprite(x, game.height, 'game', 'physics/wallPatch' + (Math.floor(Math.random() * 2) + 1));
		game.physics.enable(patch, Phaser.Physics.ARCADE);
		patch.body.velocity.y = -650;
		this.wall.add(patch);
	}

	var windowSprite;
	if(this.windowTimer == 50 && wallWidth > 192) {
		windowSprite = game.add.sprite(wallWidth / 2 - 6, game.height, 'game', 'window' + (Math.floor(Math.random() * 2) + 1));
		this.windows.add(windowSprite);
		game.physics.enable(windowSprite, Phaser.Physics.ARCADE);
		windowSprite.anchor.setTo(0.5,0);
		windowSprite.body.velocity.y = -650;

		windowSprite = game.add.sprite(wallWidth / 2 + GameUtil.gameEndX + 6, game.height, 'game', 'window' + (Math.floor(Math.random() * 2) + 1));
		this.windows.add(windowSprite);
		game.physics.enable(windowSprite, Phaser.Physics.ARCADE);
		windowSprite.anchor.setTo(0.5,0);
		windowSprite.body.velocity.y = -650;
		this.windowTimer = 0;
	}

	for(var i in this.wall.children) {
		patch = this.wall.children[i];
		if(patch.y < patch.height * -1) {
			this.wall.remove(patch);
			patch.destroy();
		}
	}

	for(var i in this.windows.children) {
		windowSprite = this.windows.children[i];
		if(windowSprite.y < windowSprite.height * -1) {
			this.windows.remove(windowSprite);
			windowSprite.destroy();
		}
	}
};