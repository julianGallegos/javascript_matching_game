
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
}

Game.prototype.checkCardValue = function(){

}

Game.prototype.comparedSelectedCards = function(){
	if (this.currentCards[0] === this.currentCards[1]){
		console.log("it's a match")
	} else {
		console.log("try again")
	}
	this.currentCards = []
}


Game.prototype.addToCurrentCards = function(card){
	console.log(card)
	this.currentCards.push(card)
	if (this.currentCards.length == 2){
		this.comparedSelectedCards()
	}
}

Game.prototype.shuffleImages = function(){

}

//==============================View=================================

function View(){
	this.turnCards = ".hidden_card"
	this.resetButton = ".resetButton"
	this.foundIds = []
}



View.prototype.getCard = function(){
  return $("#cards div");
}

//this is adding a 2nd event listener to view
View.prototype.checkCardId = function(){
    			var idClicked = event.target.id
    			return idClicked
}

View.prototype.flipCardAnimation = function(){
	//user JQUERY to remove the hidden_card class on the selected car
	// set a timer so then it goes back to hidden_card class
}

View.prototype.resetViewScore = function(){
	console.log('reseting the score')
}

View.prototype.addCardImagesToView = function(images){
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
	this.model.addToCurrentCards(this.view.checkCardId())
	console.log(this.model.currentCards)
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

