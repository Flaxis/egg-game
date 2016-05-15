var EnemyGenerator = function () {
    this.enemies = game.add.group();
    this.randomness = 1;
};

EnemyGenerator.prototype.run = function() {
    if(Math.random() > this.randomness) {
        var enemy = new Bird(Math.floor(Math.random() * GameUtil.gameSize) + GameUtil.gameStartX, game.height + 100);
        var sprite = enemy.sprite;
        this.enemies.add(sprite);
        enemy.init();
    }

    for(var i in this.enemies.children) {
        enemy = this.enemies.children[i];
        if(enemy.y < enemy.height * -1) {
            this.enemies.remove(enemy);
            enemy.destroy();
        }
    }
    this.randomness -= 0.00001;
};