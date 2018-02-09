function Game(el){
	this.el = $(el);
	this.score = 0;

	this.speed = 20;

	this.el.append($("<div>").attr("id","score"));
	this.renderScore();
}

Game.prototype.addFish = function(){

	var fish = new Fish(this, parseInt(Math.random()*4) );
	this.el.append(fish);
}
Game.prototype.addScore = function(count){
	this.score += count;
	this.renderScore();
}
Game.prototype.renderScore = function(){
	$("#score").text(this.score);
}


function Fish(game, size){
	this.game = game;
	this.size = size ? parseInt(size) : 1;
	this.step = this.size *5;
	this.el = $("<div>").addClass("fish fish-"+this.size);
	this.position = {left:0,top:0};
	this.randomCords();
	this.el.css(this.position);

	this.direction = 1;

	this.el.bind("click",()=>{
		this.game.addScore(10*this.size);
		this.el.remove();
		setTimeout(()=>{this.game.addFish()}, 500);
		clearInterval(this.timeout);
	})

	this.timeout = setInterval(()=>{
		
		if(this.position.left + this.el.width() + this.step > this.game.el.width() || (this.direction < 0 && this.position.left - this.step == 0)) this.direction *= -1;

		this.position.left += this.step*this.direction;
		
		this.el.css(this.position);

	}, this.game.speed)

	return this.el;
}
Fish.prototype.randomCords = function(){

	var y = parseInt((this.game.el.height() - this.el.height()) * Math.random());
	this.position.top = y;

}


var app = new Game($("#app"));
app.addFish(1);
