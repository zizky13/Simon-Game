let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;
const buttonColors = ["red", "blue", "green", "yellow"];

// Start game on key press, the keydown will listen to the key press event (basically a loop,
// and will start the game when the key "a" is pressed)
$(document).keydown((e) => {
  if (e.key === "a" && !started) {
    startGame();
  }
});

// A loop that will listen to the button click event, and will store the user's chosen color in the userPattern array
// and will play the sound and animate the button press
// It will also check the answer after each button click
$(".btn").click(function () {
  if (started) {
    const userChosenColor = $(this).attr("id"); // this refers to the button that triggered the event
    userPattern.push(userChosenColor); // store the user's chosen color in the userPattern array
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userPattern.length - 1); // check the answer after each button click, we start from n - 1 since we want to check the last element in the array
  }
});

// function to start the game. initializes the game variables and starts the game
const startGame = () => {
  started = true;
  level = 0;
  gamePattern = [];
  nextSequence();
};

// function to generate the next sequence of colors
const nextSequence = () => {
  userPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  showSequence();
};

// function to show the sequence of colors
const showSequence = () => {
  let i = 0;
  const intervalId = setInterval(() => {
    if (i >= gamePattern.length) {
      clearInterval(intervalId);
      return;
    }
    $(`#${gamePattern[i]}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);
    i++;
  }, 500);
};

const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 500);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press A Key to Restart");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    started = false;
  }
};

const animatePress = (currentColor) => {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
};

const playSound = (name) => {
  const audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
};
