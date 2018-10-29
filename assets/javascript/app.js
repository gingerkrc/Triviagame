$(document).ready(function(){
        
	// event listeners
	 $("#remaining-time").hide();
	 $("#begin").on("click", triviaGame.startGame);
	 $(document).on("click" , ".option", triviaGame.guessChecker);

  })
	 
var triviaGame = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 10,
  timerOn: false,
  timerId : "",

  // questions  and answers data object
  questions: {
	q1: "What is the name of the drummer of Z.Z. Top?",
	q2: "Who originally recorded the song 'Hound Dog'?",
	q3: "Which color of M&Ms did Van Halen request to be left out in their rider?",
	q4: "Which of these performers played in the band The Runaways?",
	q5: "What was the name of Henry Rollins' first band?",
	q6: "What is James Osterberg Jr. more commonly known as?"
  },

  selections: {
	q1: ["Bill Stevenson", "Vincent Furnier", "Frank Beard", "Neil Peart"],
	q2: ["Freddie Bell and the Bellboys", "Big Mama Thornton", "Elvis Presley", "Chubby Checker"],
	q3: ["Green","Red","Brown","Yellow"],
	q4: ["Nancy Wilson", "Madonna", "Joan Jett", "Aimee Mann"],
	q5: ["Black Flag", "Minor Threat", "Swiz", "State of Alert"],
	q6: ["Alice Cooper", "Iggy Pop", "Buster Poindexter", "Nikki Sixx"]
  },

  answers: {
	q1: "Frank Beard",
	q2: "Big Mama Thornton",
	q3: "Brown",
	q4: "Joan Jett",
	q5: "State of Alert",
	q6: "Iggy Pop"
  },

  info: {
	  q1: "Frank Beard is the drummer for Z.Z. Top. Ironically he is the only member of the group who doesn't have a beard.",
	  q2: "'Hound Dog' was originally recorded by Willie Mae 'Big Mama' Thornton on August 13, 1952 and was written by Jerry Leiber and Mike Stoller. Elvis Presley did not record the song until July 13, 1956.",
	  q3: "The band has said that the M&M provision was included to make sure that promoters had read through all of the specific details of their rider.",
	  q4: "Before leading Joan Jett and the Blackhearts, Joan Jett played rhythm guitar for The Runaways. She was a founding member when the band formed in 1975 and was 17 at the time.",
	  q5: "Henry Rollins fronted D.C. hardcore punk band State of Alert from 1980 - 1981 before becoming the permanent vocalist for Black Flag in 1981.", 
	  q6: "James Osterberg was nicknamed ‘Iggy’ in reference to the first band he drummed for, the Iguanas. The name ‘Pop’ was given after the Stooges were formed in reference to a local Ann Arbor character whom he resembled. Osterberg officially began using the stage name Iggy Pop after attending an MC5 concert in Ann Arbor."
	},


  images: {
	  q1: "<img src='assets/images/zztop.jpg'>",
	  q2: "<img src='assets/images/HoundDog.jpg'>",
	  q3: "<img src='assets/images/VanHalenRider.jpg'>",
	  q4: "<img src='assets/images/runaways.jpg'>",
	  q5: "<img src='assets/images/soa.jpg'>",
	  q6: "<img src='assets/images/iggypop.jpg'>",
	},

  // start game
  startGame: function(){
	// restart game results
	triviaGame.currentSet = 0;
	triviaGame.correct = 0;
	triviaGame.incorrect = 0;
	triviaGame.unanswered = 0;
	clearInterval(triviaGame.timerId);
	
	// show game section
	$("#game").show();
	
	//  empty results
	$("#results").html("");
	
	// show timer
	$("#timer").text(triviaGame.timer);
	
	// remove begin button
	$("#begin").hide();

	$("#remaining-time").show();
  
	triviaGame.nextQuestion();
	
  },
  // method to loop through and display questions and selections 
  nextQuestion : function(){
	
	// set timer to 10 seconds each question
	triviaGame.timer = 10;
	 $("#timer").removeClass("last-seconds");
	$("#timer").text(triviaGame.timer);
	
	// prevent timer speed up
	if(!triviaGame.timerOn){
	  triviaGame.timerId = setInterval(triviaGame.timerRun, 1000);
	}
	
	  // gets all the questions then indexes the current questions
	  var questionContent = Object.values(triviaGame.questions)[triviaGame.currentSet];
	  $("#question").text(questionContent);

	  var questionSelections = Object.values(triviaGame.selections)[triviaGame.currentSet];
	  
	  $.each(questionSelections, function(index, key){
		$("#options").append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
	  })
	  
	},

  // method to decrement counter and count unanswered if timer runs out
  timerRun : function(){
	// if timer still has time left and there are still questions left to ask
	if(triviaGame.timer > -1 && triviaGame.currentSet < Object.keys(triviaGame.questions).length){
	  $("#timer").text(triviaGame.timer);
	  triviaGame.timer--;
	}
	// the time has run out and question isn't answered
	else if(triviaGame.timer === -1){
	  triviaGame.unanswered++;
	  triviaGame.result = false;
	  clearInterval(triviaGame.timerId);
	  resultId = setTimeout(triviaGame.guessResult, 8000);
	  $("#results").html("<h3>Out of time! The answer was "  + Object.values(triviaGame.answers)[triviaGame.currentSet] 
	  + "<br>" + Object.values(triviaGame.info)[triviaGame.currentSet] 
	  + "<br>" + Object.values(triviaGame.images)[triviaGame.currentSet] + "</h3>");
	  
	}
	// if all the questions have been shown end the game, show results
	else if(triviaGame.currentSet === Object.keys(triviaGame.questions).length){
	  
	  $("#results").html("<h3>Thank you for playing!</h3>"
	  + "<p>Correct: "+ triviaGame.correct +"</p>"
	  + "<p>Incorrect: "+ triviaGame.incorrect +"</p>"
	  + "<p>Unaswered: "+ triviaGame.unanswered +"</p>");
	  
	  // hide game section
	  $("#question").hide();
	  $("#remaining-time").hide();
	  
	  // show start button to begin a new game
	  $("#begin").show();
	}
	
  },
  guessChecker : function() {
	var resultId;
	// the answer to the current question
	var currentAnswer = Object.values(triviaGame.answers)[triviaGame.currentSet];
	// if option text = correct answer, add correct
	if($(this).text() === currentAnswer){
	  
	  $(this).addClass("btn-success").removeClass("btn-info");
	  
	  triviaGame.correct++;
	  clearInterval(triviaGame.timerId);
	  resultId = setTimeout(triviaGame.guessResult, 8000);
	  $("#results").html("<h3>Correct!"
	  + "<br>" + Object.values(triviaGame.info)[triviaGame.currentSet] 
	  + "<br>" + Object.values(triviaGame.images)[triviaGame.currentSet] + "</h3>");
	}

	// else user picks wrong answer, add incorrect
	else{
	  $(this).addClass("btn-danger").removeClass("btn-info");
	  triviaGame.incorrect++;
	  clearInterval(triviaGame.timerId);
	  resultId = setTimeout(triviaGame.guessResult, 8000);
	  $("#results").html("<h3>Nope!" 
	  + "<br>" + Object.values(triviaGame.info)[triviaGame.currentSet] 
	  + "<br>" + Object.values(triviaGame.images)[triviaGame.currentSet] + "</h3>");
	}
	
  },
  // method to remove previous question results and 
  guessResult : function(){
	
	// go to next question set
	triviaGame.currentSet++;
	
	$(".option").remove();
	$("#results h3").remove();
	
	// begin next question
	triviaGame.nextQuestion();
	 
  }

}
