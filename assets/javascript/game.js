//Isaac WU Word Guess Game

var gameGuide = document.getElementById("guide-text");
var guessWord = document.getElementById("guess-word");
var playerTyped = document.getElementById("player-typed");
var leftChances = document.getElementById("left-chances");
var winTimes = document.getElementById("win-text");
var lossTimes = document.getElementById("losses-text");
var lossPic = document.getElementById("loss-pic");
var winPic = document.getElementById("win-pic");



var hiddenWord = [];
var tried = [];
var chances = 9;
var wins = 0;
var losses = 0;

var allWords = ["CLOUD", "CAITSITH", "CID", "REDXIII", "SEPHIROTH", "TIFA", "YUFFIE"];
var randomNum = Math.floor(Math.random() * allWords.length);
var randomWord = allWords[randomNum];
console.log(randomWord);

// hide the random word to _ _ _
for (var i = 0; i < randomWord.length; i++) {
    // hiddenWord.push("_");
    hiddenWord += ("_ ");
    //how to make sure the letter is in randomWord ?????????
    var letter = randomWord[i];
    //how to instead "_" to right letter ??????????
    var seeLetter = hiddenWord[i];
}
console.log(hiddenWord);
console.log("letter:" + letter);
console.log("underscore:" + seeLetter);

// click action
document.onkeyup = function (event) {
    var userGuess = event.key.toUpperCase();
    tried.push(userGuess);
    lossPic.innerHTML = ' <img src="assets/images/sephiroth.gif" class="leftpic"> ';
    winPic.innerHTML = ' <img src="assets/images/cloud.gif" class="rightpic"> ';
    var clickSound = new Audio('assets/sound/01.mp3');
    clickSound.play();
    console.log(tried);
    console.log(userGuess);

    // guess right:
    if (userGuess === letter) {
        letter = seeLetter;
    }
    // guess wrong:
    else if (userGuess !== letter) {
        chances--;
    }
    // loss:
    if (chances === 0) {
        losses++;
        tried = []; //reset
        chances = 9; //reset
        randomWord = allWords[randomNum];
        lossPic.innerHTML = ' <img src="assets/images/sephiroth2.gif" class="leftpic"> ';
        //load the audio location from the html address not js address!!!!!!!!!!
        var lossSound = new Audio('assets/sound/gameover.mp3');
        lossSound.play();
    }
    // win:
    if (hiddenWord === randomWord) {
        wins++;
        tried = []; //reset
        randomWord = allWords[randomNum];
        winPic.innerHTML = ' <img src="assets/images/cloud2.gif" class="rightpic"> ';
        var winSound = new Audio('assets/sound/ffvictory.mp3');
        winSound.play();
        console.log(randomWord)
    }

    gameGuide.textContent = "The Game Begin";
    playerTyped.innerHTML = "&#9998; " + tried;
    leftChances.textContent = "Left Chances: " + chances;
    winTimes.textContent = "Wins: " + wins;
    lossTimes.textContent = "Losses: " + losses;
};

guessWord.textContent = "[ " + hiddenWord + " ]";
