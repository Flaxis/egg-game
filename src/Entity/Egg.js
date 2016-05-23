var Egg = function (x, y, enemies) {
    this.sprite = game.add.sprite(x, y, 'game', 'egg');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.lives = 3;
    var lifesprites = [];
    var sprite;
    for(var i = 0; i < this.lives; i++) {
        lifesprites.push(sprite = game.add.sprite(5 + (i * 45), 15, 'game', 'egg'));
        sprite.width = sprite.width / 2;
        sprite.height = sprite.height / 2;
        GameUtil.floatingLayers[0].add(sprite);
    }
    this.lifesprites = lifesprites;
    this.isHurt = false;
    this.blinkTimer = 0;

    game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    this.enemies = enemies;
};

Egg.prototype.hurt = function() {
    if(this.isHurt) {
        return;
    }
    if(!this.lifesprites.length) {
        console.log('You\'re dead');
        return;
    }
    var index = this.lifesprites.length - 1;
    var lifesprite = this.lifesprites[index];
    lifesprite.destroy();
    this.lifesprites.splice(index, 1);
    this.lives--;
    this.isHurt = true;
    var egg = this;
    setTimeout(function() {
        egg.isHurt = false;
    }, 2000);
};

Egg.prototype.update = function() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.ONE))
    {
        this.hurt();
    }
    if(this.isHurt) {
        if(this.blinkTimer == 3) {
            this.sprite.alpha = this.sprite.alpha < 1 ? 1 : 0.2;
            this.blinkTimer = 0;
        }
        this.blinkTimer++;
    }
    else {
        this.sprite.alpha = 1;
    }

    for(var i in this.enemies.children) {
        var enemy = this.enemies.children[i];
        game.physics.arcade.overlap(this.sprite, enemy, function() {
            this.hurt();
        }, null, this);
    }
};