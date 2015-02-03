
//===============================models=============================

function Game(){
	this.cardHolder = [];
	this.remaining_cards = 20;
}

Game.prototype.images = [
	"Rainbow Dash",
	"Rainbow Dash",
	"Pinkie Pie",
	"Pinkie Pie",
	"Twilight Sparker",
	"Twilight Sparker",
	"Fluttershy",
	"Fluttershy",
	"Rarity",
	"Rarity",
	"Apple Jack",	
	"Apple Jack",
	"Apple Jack",	
	"Apple Bloom",
	"Apple Bloom",
	"Princess Celestia",
	"Princess Celestia",
	"Princess Luna",	
	"Princess Luna",
	"Spike",
	"Spike",
]

Game.prototype.addImagesToGame = function(){
	for (var i = 0; i < this.images.length; i++){
		this.cardHolder.push(this.images[i])
	}
	console.log(this.cardHolder)
}

Game.prototype.shuffleImages = function(){

}

//==============================View=================================

function View(){
	this.turnCards = ".hidden_card"
	this.resetButton = ".resetButton"
}



View.prototype.checkCard = function(){
	console.log("flipping this card")
}

View.prototype.resetViewScore = function(){
	console.log('reseting the score')
}


// trying to have all the images from Game.prototype.images render onto the DOM when game is initialized
// it works when i manually do it on dev tools
View.prototype.addCardImagesToView = function(images){
	console.log(images)
	$('.hidden_card').each(function renderImagesToView(index, element){
		$(element).text(images[index])
	})
}

//===============================Controller===========================

function Controller(view, model){
	this.view = view
	this.model = model
}

Controller.prototype.startGame = function(images){
	this.model.addImagesToGame();
	this.view.addCardImagesToView(this.model.cardHolder);
}

Controller.prototype.turnOverCard = function(){
	this.view.checkCard();
}

Controller.prototype.resetGame = function(){
	this.view.resetViewScore();
}

Controller.prototype.bindEventHandlers = function(){	
	$(this.view.turnCards).on('click', this.turnOverCard.bind(this))
	$(this.view.resetButton).on('click', this.resetGame.bind(this))
}
	
$(document).ready(function(){
		var myGame = new Controller(new View(), new Game());
		myGame.bindEventHandlers();
		myGame.startGame()
})

