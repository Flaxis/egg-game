var Bird = function (x, y) {
	this.sprite = game.add.sprite(x, y, 'spritesbird', 'bird/bird1');
	this.sprite.anchor.setTo(0.5, 0);
	this.sprite.animations.add('fly');
	this.sprite.animations.play('fly', 7, true);

	game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
};

Bird.prototype.init = function() {
	this.sprite.body.velocity.y = Math.floor(Math.random() * -400) - 500;
	var scale = 0.3;
	this.sprite.scale.setTo(scale, scale);
	if(Math.random() > 0.5) {
		this.sprite.body.velocity.x = 200;
	}
	else {
		this.sprite.body.velocity.x = -200;
		this.sprite.scale.x *= -1;
	}
};