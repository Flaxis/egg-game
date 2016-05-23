var ScoreManager = function() {
    this.text = game.add.text(10, 64, this.score = 0);
	this.text.anchor.setTo(0);

	this.text.font = 'Montserrat';
	this.text.fontSize = 32;
	var grd = this.text.context.createLinearGradient(0, 0, 0, this.text.canvas.height);
	grd.addColorStop(0, '#ffffff');
	grd.addColorStop(1, '#cf00b9');
	this.text.fill = grd;

	this.text.align = 'right';
	this.text.stroke = '#5c0052';
	this.text.strokeThickness = 2;
};

ScoreManager.prototype.run = function() {
	this.score += Math.max(0.03, Math.min(0.2, 0.2 - (0.000100503 * game.height)));
	this.text.setText(Math.round(this.score));
};