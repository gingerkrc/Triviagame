// Global variables

var questionArray = ["What is the name of the drummer of Z.Z. Top?", "Who originally recorded the song 'Hound Dog'?", "Which color of M&Ms did Van Halen request to be left out in their rider?", "Which of these performers played in the band The Runaways?", "What was the name of Henry Rollins' first band?", "What is James Osterberg Jr. more commonly known as?"];
var answersArray = [["Bill Stevenson", "Vincent Furnier", "Frank Beard", "Neil Peart"], ["Freddie Bell and the Bellboys", "Big Mama Thornton", "Elvis Presley", "Chubby Checker"], ["Green","Red","Brown","Yellow"], ["Nancy Wilson", "Madonna", "Joan Jett", "Aimee Mann"], ["Black Flag", "Minor Threat", "Swiz", "State of Alert"], ["Alice Cooper", "Iggy Pop", "Buster Poindexter", "Nikki Sixx"]];
var imageArray = ["<img src='assets/images/zztop.jpg'>", "<img src='assets/images/HoundDog.jpg'>", "<img src='assets/images/VanHalenRider.jpg'>", "<img src='assets/images/runaways.jpg'>",  "<img src='assets/images/soa.jpg'>", "<img src='assets/images/iggypop.jpg'>"];
var correctAnswers = ["c. Frank Beard", "b. Big Mama Thornton", "c. Brown", "c. Joan Jett", "d. State of Alert", "b. Iggy Pop"];
var infoArray = ["Frank Beard is the drummer for Z.Z. Top. Ironically he is the only member of the group who doesn't have a beard.", "'Hound Dog' was originally recorded by Willie Mae 'Big Mama' Thornton on August 13, 1952 and was written by Jerry Leiber and Mike Stoller. Elvis Presley did not record the song until July 13, 1956.",
                   "The band has said that the M&M provision was included to make sure that promoters had read through all of the specific details of their rider.", " Before leading Joan Jett and the Blackhearts, Joan Jett played rhythm guitar for The Runaways. She was a founding member when the band formed in 1975 and was 17 at the time.", 
                   "Henry Rollins fronted D.C. hardcore punk band State of Alert from 1980 - 1981 before becoming the permanent vocalist for Black Flag in 1981.", "James Osterberg was nicknamed ‘Iggy’ in reference to the first band he drummed for, the Iguanas. The name ‘Pop’ was given after the Stooges were formed in reference to a local Ann Arbor character whom he resembled. Osterberg officially began using the stage name Iggy Pop after attending an MC5 concert in Ann Arbor."]
var questionCounter = 0;
var selectAnswer;
var counter = 20;
var theCountdown;
var correctGuess = 0;
var incorrectGuess = 0;
var unansweredGuess = 0;

// Create a function that creates a start button 
function start() {
	var startGame = "Click Here to Start";
	$("#startbutton").html(startGame);
	$("#resetbutton").remove();
    
}

// Reset functions
function reset() {
    questionCounter = 0;
	correctGuess = 0;
	incorrectGuess = 0;
	unansweredGuess = 0;
	counter = 20;
	createHTML();
	timer();
}

// Call the start function
start();


//Create a click event to generate the HTML of the question and answers
$(document).on("click", "#startbutton", function(event){
    event.preventDefault();  
	createHTML();
	timer();
	$("#startbutton").remove();
	$("#resetbutton").remove();
	

}); 

// Generate questions and answer selections
function createHTML() {
	var gameText = questionArray[questionCounter] + "<br><button>a. " + answersArray[questionCounter][0] + "</button><br><button>b. " + answersArray[questionCounter][1] + "</button><br><button>c. " + answersArray[questionCounter][2]+ "</button><br><button>d. " + answersArray[questionCounter][3] + "</button><br>";
	document.querySelector("button");
	$(".answers").html(gameText); 
	

};
	
// Add to unansweredGuess when time runs out
// Display text, info text, and image
function createTimeOutLoss() {
	unansweredGuess++;
	var unansweredGameText = "<br><p>Out of time!  The answer is: " + correctAnswers[questionCounter] + "<br></p>" + infoArray[questionCounter] + "<br>" + imageArray[questionCounter];
	$(".answers").html(unansweredGameText);
	setTimeout(wait, 8000); 
}

// Add to correctGuess when answer is correct
// Display text, info text, and image
function addWin() {
	correctGuess++;
	var correctGameText = "<br><p>Correct. The answer is: " + correctAnswers[questionCounter] + "<br></p>" + infoArray[questionCounter] + "<br>" + imageArray[questionCounter];
	$(".answers").html(correctGameText);
	setTimeout(wait, 8000);  
	
}

// Add to incorrectGuess when answer is incorrect
// Display text, info text, and image
function addLoss() {
	incorrectGuess++;
	var incorrectGameText = "<br><p>Incorrect. The answer is: "+ correctAnswers[questionCounter] + "<br></p>" + infoArray[questionCounter] + "<br>" +  imageArray[questionCounter];
    $(".answers").html(incorrectGameText);
	setTimeout(wait, 8000); 
}

// Delay between questions
function wait() {
	if (questionCounter < 6) {
	questionCounter++;
	createHTML();
	counter = 20;
	timer();
	}
	else {
		finalScore();
	}
}

// Create click events for each answer
$(document).on("click", ".answers", function(event){
	var selectAnswer = $(this).text();
	if(selectAnswer === correctAnswers[questionCounter]) {
		addWin();
		// clearInterval(clock);
		clearInterval(theCountdown);
		// theCountdown = setInterval(deccrement, 1000);
      	// clock = setInterval(decrement, 1000);
	}
	else {
		// clearInterval(clock);
		clearInterval(theCountdown)
		addLoss();
	}
}); 

// Set timer interval
function timer() {
	var theCountdown = setInterval(twentySeconds, 1000);
	function twentySeconds() {
		if (counter === 0) {
			createTimeOutLoss();
			clearInterval(theCountdown);
			
		}
		if (counter > 0) {
			counter--;
		}
		$(".timer").html("Time Remaining: " + counter);
	}
}

// Display final score page at end of game
function finalScore() {
	var finalGameText = "<p>Here's how you did:" + "</p>" + "<p>Correct Answers: " + correctGuess + "</p>" + "<p>Incorrect Answers: " + incorrectGuess + "</p>" + "<p>Unanswered: " + unansweredGuess + "</p>" + "<p>Reset The Game</p>";
	$(document).html(finalGameText);
	$("#resetbutton").html(finalGameText);
}

// Create click event to reset game
	// var resetButton= "Reset Game";
	$("#resetbutton").text("Reset Game");
	$("#resetbutton").on("click", function(event){
	reset();
	// clearInterval(clock);
	clearInterval(theCountdown);
	// clock = setInterval(decrement, 1000);
	// theCountdown = setInterval(decrement, 1000);

});







