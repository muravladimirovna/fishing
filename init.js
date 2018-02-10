function Game(el){
	this.el = $(el);
	this.score = 0;

	this.fishes = {};
	this.fishes.all = [];
	this.fishes.count = 0;

	this.time = 180000;

	this.speed = 15;

	this.el.append($("<div>").attr("id","panel"));
	this.el.append($("<input>").attr({"type":"hidden","id":"time"}).val(parseInt(this.time)));

	$("#panel").append($("<div>").attr("id","control"));

	$("#control").append($("<div>").attr("id","timer").text("3:00"));

	$("#panel").append($("<div>").attr("id","score"));
	
	this.renderScore();

	this.timer = setInterval(()=>{
		this.renderTimer();
	}, 1000);
	
}
Game.prototype.addFish = function(){
	var fish = new Fish(this, parseInt(Math.random()*4) );
	this.el.append(fish);
	this.fishes.count++;
}
Game.prototype.addScore = function(count){
	this.score += count;
	this.renderScore();
}
Game.prototype.renderScore = function(){
	$("#score").addClass("active");
	$("#score").text(this.score);
	setTimeout(()=>{
		$("#score").removeClass("active");
	}, 500);
}
Game.prototype.renderTimer = function(){
	this.time = parseInt($("#time").val()) - 1000;
	console.log(this.time);
	if(this.time >= 0){
		var min = Math.floor(this.time / 60000),
		sec = parseInt(Math.floor((this.time - Math.floor(this.time / 60000)*60000)/1000));
		sec = sec < 10 ? "0" + sec : sec;
		$("#time").val(this.time);
		$("#timer").text(min + ":" + sec);
	}

}

function Fish(game, size){
	this.game = game;
	this.size = size ? parseInt(size) : 1;
	this.sizeinvers = ((3 - this.size) + 1);
	this.step = this.sizeinvers*2 + 2;
	this.el = $("<div>").addClass("fish fish-"+this.size);
	this.position = {left:0,top:0};
	this.randomCords();
	this.el.css(this.position);

	this.direction = 1;

	this.el.bind("click",()=>{
		this.game.addScore(10*this.sizeinvers);
		// this.el.remove();
		// this.game.fishes.count--;
		// clearInterval(this.timeout);
		this.removeFish();
		//setTimeout(()=>{this.game.addFish()}, 500);
	});

	this.timeout = setInterval(()=>{
		
		if(this.position.left + this.el.width() + this.step > this.game.el.width() || (this.direction < 0 && this.position.left - this.step == 0)) this.direction *= -1;

		this.position.left += this.step*this.direction;
		
		this.el.css(this.position);

	}, this.game.speed);

	return this.el;
}
Fish.prototype.randomCords = function(){
	// console.log('this.game.el.height()', this.game.el.height());
	// console.log('this.el.height()', this.el.height());

	var y = parseInt((this.game.el.height() - this.el.height()) * Math.random());
	this.position.top = y;
}
Fish.prototype.removeFish = function(){
	this.el.remove();
	this.game.fishes.count--;
	clearInterval(this.timeout);
}
Fish.prototype.dieFish = function(){
	setTimeout(()=>{
		this.removeFish();
	}, 5000);
}

var app = new Game($("#app"));
app.addFish(parseInt(Math.random()*4));
var addTimer = setInterval(function(){
	if(app.fishes.count <=10){
		app.addFish(parseInt(Math.random()*4));
	}
}, 4000);


