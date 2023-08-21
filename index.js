
var buttonsColor = ["green", "red", "blue", "yellow"];

var gamePattern = [];
var userEnteredPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if(!started){
        $("#title-level").text("Level" + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userEnteredPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userEnteredPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userEnteredPattern[currentLevel]) {
        if (userEnteredPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game  Over,Press Any Key to Restart");

        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function nextSequence() {
    userEnteredPattern = [];
    level++;
    $("#level-title").text("Level" +" " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonsColor[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}