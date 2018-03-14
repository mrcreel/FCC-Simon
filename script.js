const display = document.getElementById("display");
let playerPicks = [];
let computerPicks = [];
let strict = false;
const streak = 20;

$(".btnStart").click(function() {
    display.innerHTML = 0;
    computerPicks = [];
  randomPick();
});
$(".btnStrict").click(function() {
  if(strict){
    strict = false;
    $(".btnStrict").toggleClass("selected");
  } else {
    strict = true;
    $(".btnStrict").toggleClass("selected");
  }
});

function randNumber(max, min) {
  return Math.floor(Math.random() * max) + min;
}

function showComputerPicks(computerPicks) {
  $(".btn").prop("disabled", true);
  computerPicks.forEach(function(ele, id) {
    const chosenOne = document.getElementById(computerPicks[id]);
    setTimeout(function() {
      displayPick(id, chosenOne);
    }, 500 + 1000 * id);
  });
  setTimeout(function() {
    playersTurn();
  }, 1000 * (computerPicks.length + 1));
}

function playersTurn() {
  playerPicks = [];
  $(".btn").prop("disabled", false);

  alert("Your Turn");
}

function returnId(buttonId) {
  playerPicks.push(parseInt(buttonId));
  displayPick(playerPicks.length - 1, document.getElementById(buttonId));
  comparePicks();
}

function displayPick(id, choice) {
  document.getElementById("audio" + computerPicks[id]).play();
  $(choice)
    .toggleClass("selected", parseInt(250))
    .toggleClass("selected", parseInt(1000));
  display.innerHTML = id + 1;
}

function comparePicks() {
  for (let i = 0; i < playerPicks.length; i++) {
    if (computerPicks[i] != playerPicks[i]) {
      if (strict) {
        alert("Game Over!");
        location.reload(true);
        return;
      } else {
        setTimeout(function(){
          alert("TRY AGAIN!");
        showComputerPicks(computerPicks);
        }, 1000);        
      }
    }
  }
  if (computerPicks.length == playerPicks.length) {
    setTimeout(function() {
      if (playerPicks.length == streak) {
        alert("YOU WON!");
        location.reload(true);
      } else {
        alert("My Turn");
        randomPick();
      }
    }, 1000);
  }
}

function randomPick() {
  const compPick = randNumber(4, 1);
  computerPicks.push(compPick);
  showComputerPicks(computerPicks);
}
