
//===============================models=============================

function Card(){
	this.face = "blank"
}

Card.prototype.addImage = function(){
	
}

function Game(){
	this.cardHolder = []
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

//===============================Controller===========================

function Controller(view, model){
	this.view = view
	this.model = model
}

Controller.prototype.turnOverCard = function(){
	this.view.checkCard();
}

Controller.prototype.resetGame = function(){
	this.view.resetViewScore();
}

Controller.prototype.bindEventHandlers = function(){
	// $(this.view.turnCards).on('click', this.turnOverCard.bind(this))
	
	$(this.view.turnCards).on('click', this.turnOverCard.bind(this))
	$(this.view.resetButton).on('click', this.resetGame.bind(this))
}
	
$(document).ready(function(){
		var myGame = new Controller(new View(), new Game());
		myGame.bindEventHandlers();
})

