var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;



$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length -1);
});


$(document).keypress(function() {
    if(!started) {
        // $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

})


function nextSequence() {

    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}


function playSound(name) {
    switch (name) {
        case "green":
            var green = new Audio("./sounds/green.mp3");
            green.play();
            break;
    
        case "blue":
            var blue = new Audio("./sounds/blue.mp3");
            blue.play();
            break;
    
        case "red":
            var red = new Audio("./sounds/red.mp3");
            red.play();
            break;
    
        case "yellow":
            var yellow = new Audio("./sounds/yellow.mp3");
            yellow.play();
            break;
    
        default:
            var wrong = new Audio("./sounds/wrong.mp3");
            wrong.play();
            break;
    }
}


function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
            nextSequence();
        }, 1000);

    }

    } else {
        var wrong = new Audio("./sounds/wrong.mp3");
            wrong.play();

        $("body").addClass("game-over");
        $("h1").html("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }

}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}



// document.body.addEventListener('click', function() {
//   document.querySelector('input').focus();
// });


$(document).on('touchstart', function() {
  var $inputElement = $('input:first');
  
  if ($inputElement.length > 0) {
      
    $inputElement.focus();
  }
});
