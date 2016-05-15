var CloudGenerator = function () {
	this.clouds = game.add.group();
	this.clouds2 = null;
	this.maxClouds = 9999;
};

CloudGenerator.prototype.run = function() {
	if(this.clouds2 == null) {
		this.clouds2 = game.add.group();
	}
	var cloud;
	if(this.clouds.children.length != this.maxClouds && Math.random() > 0.97) {
		cloud = game.add.sprite(Math.floor(Math.random() * GameUtil.gameSize) + GameUtil.gameStartX, game.height, 'game', 'cloud' + (Math.floor(Math.random() * 9) + 1));
		game.physics.enable(cloud, Phaser.Physics.ARCADE);
		cloud.anchor.setTo(0.5, 0);
		cloud.body.velocity.y = Math.floor(Math.random() * -400) - 400;
		var scale = Math.min(1, cloud.body.velocity.y * -1 / 700);
		cloud.scale.setTo(scale, scale);
		cloud.alpha = scale;
		game.physics.arcade.collide(cloud, this.clouds);
		if(cloud.body.velocity.y > -600) {
			this.clouds.add(cloud);
		}
		else {
			this.clouds2.add(cloud);
		}
	}
	var i;
	for(i in this.clouds.children) {
		cloud = this.clouds.children[i];
		if(cloud.y < cloud.height * -1) {
			this.clouds.remove(cloud);
			cloud.destroy();
		}
	}
	for(i in this.clouds2.children) {
		cloud = this.clouds2.children[i];
		if(cloud.y < cloud.height * -1) {
			this.clouds2.remove(cloud);
			cloud.destroy();
		}
	}
};