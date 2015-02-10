
//===============================models=============================

function Game(){
	this.cardHolder = [];
	this.currentCards = []
	this.remaining_cards = 20;
	this.score = 0
	this.images =[]
}

Game.prototype.imageClasses = [
	"Rainbow_Dash",
	"Rainbow_Dash",
	"Pinkie_Pie",
	"Pinkie_Pie",
	"Twilight_Sparkle",
	"Twilight_Sparkle",
	"Fluttershy",
	"Fluttershy",
	"Rarity",
	"Rarity",
	"Apple_Jack",	
	"Apple_Jack",
	"Apple_Bloom",
	"Apple_Bloom",
	"Princess_Celestia",
	"Princess_Celestia",
	"Princess_Luna",	
	"Princess_Luna",
	"Spike",
	"Spike",
]

Game.prototype.cardImages = [
	"/assets/rainbow_dash.png",
	"/assets/rainbow_dash.png",
	"/assets/pinkie_pie.png",
	"/assets/pinkie_pie.png",
	"/assets/twilight_sparkle.png",
	"/assets/twilight_sparkle.png",
	"/assets/fluttershy.png",
	"/assets/fluttershy.png",
	"/assets/rarity.png",
	"/assets/rarity.png",
	"/assets/apple_jack.png",
	"/assets/apple_jack.png",
	"/assets/apple_bloom.png",
	"/assets/apple_bloom.png",
	"/assets/princess_celestia.png",
	"/assets/princess_celestia.png",
	"/assets/princess_luna.png",
	"/assets/princess_luna.png",
	"/assets/spike.png",
	"/assets/spike.png",
]

Game.prototype.addImagesClassesToGame = function(){
	for (var i = 0; i < this.imageClasses.length; i++){
		this.cardHolder.push(this.imageClasses[i])
	}
}

Game.prototype.addImagesToGame = function(){
	for(var i = 0; i < this.cardImages.length; i++){
		this.images.push(this.cardImages[i])
	}
}

Game.prototype.comparedSelectedCards = function(){
	if (this.currentCards[0] === this.currentCards[1]){
		return true
	} else {
		return false
	}
}

Game.prototype.clearCurrentCards = function(){
	this.currentCards = []
}


Game.prototype.addToCurrentCards = function(card){
	console.log(card)
	this.currentCards.push(card)
	if (this.currentCards.length == 2){
		this.comparedSelectedCards()
	}
}

Game.prototype.incrementScore = function(){
	this.score += 1
	console.log(this.score)
}

Game.prototype.resetScore = function(){
	this.score = 0
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

View.prototype.checkCardId = function(){
    			var idClicked = event.target.id
    			return idClicked
}

View.prototype.updateViewScore = function(currentScore){
	$('#score').text(currentScore)
}

View.prototype.flipCardAnimation = function(){
	$(event.target.firstChild).css("visibility", "visible")
}

View.prototype.renderComparisonResults = function(results){
	$('.comparison_results').text(results)
}

View.prototype.resetViewScore = function(){
	$('#score').text(0)
}

View.prototype.hideImages = function(){
	$('img').css("visibility", "hidden")
}



View.prototype.addCardClassToView = function(images){
	$('.hidden_card').each(function renderClassesToView(index, element){
		$(element).attr("id", images[index])
	})
}

View.prototype.addCardImagesToView = function(images){
	console.log(images)
	$('.hidden_card').each(function renderImagesToView(index, element){
		$(element).append('<img src=' +images[index] +'>')
	})
}

View.prototype.shuffleCardDivs = function(){
	$(function () {
    var parent = $("#cards");
    var divs = parent.children();
    while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
});
}



//===============================Controller===========================

function Controller(view, model){
	this.view = view
	this.model = model
}

Controller.prototype.startGame = function(images){
	this.model.addImagesClassesToGame();
	this.model.addImagesToGame();
	this.view.addCardClassToView(this.model.cardHolder);
	this.view.addCardImagesToView(this.model.images);
	this.view.shuffleCardDivs();
}


Controller.prototype.turnOverCard = function(){
	this.model.addToCurrentCards(this.view.checkCardId());
	this.model.incrementScore();
	this.view.updateViewScore(this.model.score);
	this.view.flipCardAnimation();
	console.log(this.model.currentCards)
		if (this.model.currentCards.length > 2){
			console.log("flipping back over")
			this.view.flipCardBackOver();
			this.model.clearCurrentCards();
		}
}



Controller.prototype.resetGame = function(){
	this.model.resetScore();
	this.view.resetViewScore();
	this.view.hideImages();
}

Controller.prototype.bindEventHandlers = function(){	
	$(this.view.turnCards).on('click', this.turnOverCard.bind(this))
	$(this.view.resetButton).on('click', this.resetGame.bind(this))
}
	
$(document).ready(function(){
		var myGame = new Controller(new View(), new Game());
		myGame.bindEventHandlers();
		myGame.startGame();
})

