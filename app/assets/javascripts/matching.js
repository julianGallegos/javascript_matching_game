
//===============================models=============================

function Game(){
	this.cardHolder = [];
	this.currentCards = []
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

Game.prototype.checkCardValue = function(){

}

Game.prototype.currentCards = function(){
	//will take two cards in when they are clicked and them push them into the array
	// if they are the same then there is a match
	// else nothing will happen and the cards will flip back over
}

Game.prototype.addToCurrentCards = function(){
	//push selected cards into currentCards array
}

Game.prototype.shuffleImages = function(){

}

//==============================View=================================

function View(){
	this.turnCards = ".hidden_card"
	this.resetButton = ".resetButton"
}



View.prototype.getCard = function(){
  return $("#cards div");
}

View.prototype.checkCardClass = function(){
	console.log($(this.getCard()))
  // return $(this.getCards()[card_index]).find("i").attr("class");
}

View.prototype.flipCardAnimation = function(){
	//user JQUERY to remove the hidden_card class on the selected car
	// set a timer so then it goes back to hidden_card class
}

View.prototype.resetViewScore = function(){
	console.log('reseting the score')
}


// trying to have all the images from Game.prototype.images render onto the DOM when game is initialized
// it works when i manually do it on dev tools
View.prototype.addCardImagesToView = function(images){
	console.log(images)
	$('.hidden_card').each(function renderImagesToView(index, element){
		$(element).attr("id", images[index])
		$(element).append(images[index])
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
	this.view.checkCardClass();
	//this will also put the cards into the currentCards array in the model and then compare them to each other
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

