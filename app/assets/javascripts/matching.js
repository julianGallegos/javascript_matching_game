
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


Game.prototype.clearCurrentCards = function(){
	this.currentCards = []
}


Game.prototype.addToCurrentCards = function(card){
	console.log(card)
	this.currentCards.push(card)
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
}



View.prototype.getCard = function(){
  return $("#cards div");
}

View.prototype.checkCardName = function(){
    			var cardClicked = event.target.className.split(" ")[0]
    			return cardClicked
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
	$('.ponies').css("visibility", "hidden")
}

View.prototype.flipUnMatchedCards = function(){
	console.log("setting time to flip cards back over")
	// setting a variable for view scope for the timer
		var viewScope = this
		setTimeout(function () {
			console.log("i'm the timer")
			viewScope.hideImages();
		}, 1500);
}

View.prototype.addCardClassToView = function(images){
	$('.hidden_card').each(function renderClassesToView(index, element){
		$(element).attr("class", images[index] + " hidden_card")
	})
}

View.prototype.addCardImagesToView = function(images){
	console.log(images)
	$('.hidden_card').each(function renderImagesToView(index, element){
		$(element).append('<img class="ponies" src=' +images[index] +'>')
	})
}



View.prototype.removeClassFromImages = function(matchedImages){
	console.log('taking the matches off the view')
	console.log(matchedImages)
	$("." + this.model.currentCards).children().removeClass('ponies')
	// for (var i = 0; i < 2; i++){
	// 	$(('#').concat(matchedImages[i])).children().removeClass('ponies')
		//since i have the array of id's that were matched, im trying to use jquery to iterate through the array and then remove the class from the found id's

		// the code will look something like this

		//$('#Twilight_Sparkle').children().removeClass('ponies')
	 // }
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


Controller.prototype.comparedSelectedCards = function(){
	if (this.model.currentCards[0] === this.model.currentCards[1]){
		console.log("it's a match")
		debugger
		this.view.removeClassFromImages(this.model.currentCards)
		return true
	} else {
		console.log('try again')
		return false
	}
}

Controller.prototype.flipCardBackOver = function(){
	if (this.model.currentCards.length == 2){

		console.log("flipping cards back over");
		//this.view.hideImages();
		this.view.flipUnMatchedCards();
		this.model.clearCurrentCards();
		// there should be some kind of timer here so the card turns over for a little bit
	}
}

Controller.prototype.turnOverCard = function(){
	this.view.checkCardName()
	this.model.addToCurrentCards(this.view.checkCardName());
	this.model.incrementScore();
	this.view.updateViewScore(this.model.score);
	this.view.flipCardAnimation();
	console.log(this.model.currentCards)
	this.comparedSelectedCards()
	this.flipCardBackOver();

// Controller.prototype.compareCards = function(){
// 	if (this.model.currentCards)
// }
	// if (this.model.currentCards.length > 2){
		// if (this.model.comparedSelectedCards() == true){
		// 	this.view.removeClassFromImages(this.model.currentCards)
		// 	this.model.clearCurrentCards()
		// }
		// } else {
	// 		this.view.hideImages();	
	// 		this.model.clearCurrentCards()
	// 	}
	// }
	
	



	// if (this.model.currentCards.length > 2){
	// 	this.model.clearCurrentCards()
	// 	this.view.hideImages()
	// 	console.log(this.model.currentCards)
	// }
}



Controller.prototype.resetGame = function(){
	this.model.resetScore();
	this.view.resetViewScore();
	this.view.hideImages();
	this.view.shuffleCardDivs();
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

