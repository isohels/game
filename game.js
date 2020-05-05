// creating empty Array()

var gamePattern = [];


// array to hold nextSequence
var buttonColours = new Array("red", "blue", "green", "yellow")

// UserClickedPattern

var userClickedPattern = [];


// level variable
var level = 0;
var started = false;

// For Keyboard key pressed
$(document).keydown(function(){
  // change h1 tag to level 0
  if(!started){
    $("h1").html("level"+ " "+level);
    nextSequence();
    started = true;
  }

});


$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
var name = new Sound(userChosenColour);
name.playSound();
animatePress(userChosenColour);
// checkAnswer(userClickedPattern[userClickedPattern.length-1]);
// console.log(userClickedPattern.length);
// most recent user Answer
var i = userClickedPattern.length-1;


checkAnswer(i);
});


// Checking Answer
function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
  console.log("success");
   if(gamePattern.length==userClickedPattern.length){
     setTimeout(function () {
          nextSequence();
        }, 1000);

   }

}else{
//   console.log("wrong");
//   // play wrong sound
  new Audio("sounds/wrong.mp3").play();
//   // add red background after loosing
$("body").addClass("game-over");
// // remove red background
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
//
$("h1").html("Game Over, Press Any key to Restart");

startOver();
}

}



function nextSequence() {
  userClickedPattern=[];
  // increase level and update
  level+=1;
  $("h1").html("level"+ " "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  // console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // console.log(gamePattern);

  // Selecting button

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // play audio sound
  // var audio = new Audio("sounds/"+randomChosenColour+".mp3");
  // audio.play();
var name = new Sound(randomChosenColour);
name.playSound();



}

// buttonclicked



//adding sounds to button

function Sound(name){
  this.name = name;
  this.playSound = function(){
new Audio("sounds/"+name+".mp3").play();
}

}

// Adding Animation to class

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100);

}



// Restarting the game


function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
