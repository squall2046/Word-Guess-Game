//Isaac WU Word Guess Game

var hiddenWord = [];
var tried = [];
var chances = 9;
var wins = 0;
var losses = 0;

var allWords = ["CLOUD", "CAITSITH", "CID", "REDXIII", "SEPHIROTH", "TIFA", "YUFFIE"];

// choose a random word
var randomNum = Math.floor(Math.random() * allWords.length);
var randomWord = allWords[randomNum];
var randomArr = randomWord.split("");
console.log(randomWord);
console.log("word length: " + randomWord.length);
console.log(randomArr);

// hide the random word to [ _ _ _ ]
for (var i = 0; i < randomWord.length; i++) {
    // hiddenWord += ("_ ");
    hiddenWord[i] = "_";
};
var guessWord = document.getElementById("guess-word");
guessWord.textContent = "[ " + hiddenWord + " ]";


/////////// onkeyup action //////////////
document.onkeyup = function (event) {
    var userGuess = event.key.toUpperCase();
    tried.push(userGuess);
    var lossPic = document.getElementById("loss-pic");
    lossPic.innerHTML = ' <img src="assets/images/sephiroth.gif" class="leftpic"> '; //reset
    var winPic = document.getElementById("win-pic");
    winPic.innerHTML = ' <img src="assets/images/cloud.gif" class="rightpic"> '; //reset
    var keySound = new Audio('assets/sound/01.mp3');
    keySound.play();

    // guess wrong:
    if (randomWord.indexOf(userGuess) === -1) {
        chances--;
    }
    if (chances === 0) {
        losses++;
        hiddenWord = [];
        tried = [];
        chances = 9;
        randomWord = allWords[Math.floor(Math.random() * allWords.length)];
        console.log(randomWord)
        for (var i = 0; i < randomWord.length; i++) {
            hiddenWord[i] = "_";
        };
        guessWord.textContent = "[ " + hiddenWord + " ]";


        lossPic.innerHTML = ' <img src="assets/images/sephiroth2.gif" class="leftpic"> ';
        //load the audio location from the html address not js address!!!!!!!!!!
        var lossSound = new Audio('assets/sound/gameover.mp3');
        lossSound.play();
    }

    // guess right:
    for (var i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === userGuess) {
            hiddenWord[i] = userGuess;
            console.log(hiddenWord);
            randomArr.length--;
            console.log(randomArr.length);
            guessWord = document.getElementById("guess-word");
            guessWord.textContent = "[ " + hiddenWord + " ]";
        }
    }
    if (randomArr.length === 0) {
        wins++;
        hiddenWord = [];
        tried = [];
        chances = 9;
        randomWord = allWords[Math.floor(Math.random() * allWords.length)];
        console.log(randomWord)
        randomArr = randomWord.split("");
        guessWord = document.getElementById("guess-word");
        guessWord.textContent = "[ " + hiddenWord + " ]";

        winPic.innerHTML = ' <img src="assets/images/cloud2.gif" class="rightpic"> ';
        //load the audio location from the html address not js address!!!!!!!!!!
        var winSound = new Audio('assets/sound/ffvictory.mp3');
        winSound.play();
    }



    var gameGuide = document.getElementById("guide-text");
    gameGuide.textContent = "The Game Begin";
    var playerTyped = document.getElementById("player-typed");
    playerTyped.innerHTML = "&#9998; " + tried;
    var leftChances = document.getElementById("left-chances");
    leftChances.textContent = "Left Chances: " + chances;
    var winTimes = document.getElementById("win-text");
    winTimes.textContent = "Wins: " + wins;
    var lossTimes = document.getElementById("losses-text");
    lossTimes.textContent = "Losses: " + losses;
}

