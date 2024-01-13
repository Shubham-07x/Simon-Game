var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

$(document).keypress(function () {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
    $("#level-title").text("Level " + level);
  }
});

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];

  let randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);
  flashButton(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play().catch(function (error) {
    console.error("Error playing sound:", error);
  });
}

$(".btn").on("click", function () {
  var userChosenColour = this.id;
  playSound(userChosenColour);
  handleButtonClick(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 300);

    startOver()
  }
}

function flashButton(color) {
  var selectedButton = $(`#${color}`);

  selectedButton.addClass("flash");

  setTimeout(function () {
    selectedButton.removeClass("flash");
  }, 150);
}

function handleButtonClick(userChosenColour) {
  console.log("User pattern: " + userClickedPattern);
  userClickedPattern.push(userChosenColour);
  console.log("User pattern: " + userClickedPattern);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;

}
