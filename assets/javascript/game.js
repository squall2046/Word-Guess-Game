//Isaac WU Word Guess Game

var hiddenWord = [];
var tried = [];
var chances = 9;
var wins = 0;
var losses = 0;

var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var allWords = ["AERITH", "BARRET", "CLOUD", "CAITSITH", "CID", "REDXIII", "SEPHIROTH", "TIFA", "VINCENT", "YUFFIE"];

//////////// choose a random word ///////////
var randomNum = Math.floor(Math.random() * allWords.length);
var randomWord = allWords[randomNum];
var randomArr = randomWord.split("");
console.log(randomWord);
console.log("word length: " + randomWord.length);
console.log(randomArr);
console.log("wordarr length: " + randomArr.length);

//////////// hide the random word to [ _ _ _ ] ////////////
for (var i = 0; i < randomWord.length; i++) {
    hiddenWord[i] = "_";
};
var guessWord = document.getElementById("guess-word");
guessWord.textContent = "[ " + hiddenWord + " ]";

/////////////// reset word /////////////////
function resetword() {
    hiddenWord = [];
    tried = [];
    chances = 9;
    var lastWord = document.getElementById("last-word");
    lastWord.textContent = "Last word: " + randomWord;

    //reload a new word behind
    randomWord = allWords[Math.floor(Math.random() * allWords.length)];
    console.log(randomWord);
    //reload the new word's length
    randomArr = randomWord.split("");
    //reload the underscores on screen
    for (var i = 0; i < randomWord.length; i++) {
        hiddenWord[i] = "_";
    };
    guessWord.textContent = "[ " + hiddenWord + " ]";
};

/////////// onkeyup action //////////////
document.onkeyup = function (event) {
    var userGuess = event.key.toUpperCase();

    // guessWord.textContent = "[ " + hiddenWord + " ]";

    var gameGuide = document.getElementById("guide-text"); //reset
    gameGuide.textContent = "The Game Begin";
    var lossPic = document.getElementById("left-pic"); //reset
    lossPic.innerHTML = ' <img src="assets/images/sephiroth.gif" class="leftpic"> ';
    var winPic = document.getElementById("right-pic"); //reset
    winPic.innerHTML = ' <img src="assets/images/cloud.gif" class="rightpic"> ';

    //make sure player only typein letter
    if (alphabet.indexOf(userGuess) !== -1) {

        // make sure no repeatly keyin!! very important!!
        // if repeatly keyin a right letter, the game will win before you guess the whole word,
        // because when you keyin right letter, the randomArr.length - 1. when randomArr.length = 0, game win.
        if (tried.indexOf(userGuess) === -1) {
            tried.push(userGuess);

            // guess wrong:
            if (randomWord.indexOf(userGuess) === -1) {
                chances--;
                var keySound = new Audio('assets/sound/key.mp3');
                keySound.play();
            }
            // loss++:
            if (chances === 0) {
                losses++;
                resetword();
                gameGuide.textContent = "- GAME OVER -";

                lossPic.innerHTML = ' <img src="assets/images/sephiroth2.gif" class="leftpic2"> ';
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
                    guessWord.textContent = "[ " + hiddenWord + " ]";
                    var rightSound = new Audio('assets/sound/right.mp3');
                    rightSound.play();
                }
            }

            // win++:
            if (randomArr.length === 0) {
                wins++;
                resetword();
                gameGuide.textContent = "YOU WIN!!!";

                winPic.innerHTML = ' <img src="assets/images/cloud2.gif" class="rightpic2"> ';
                //load the audio location from the html address not js address!!!!!!!!!!
                var winSound = new Audio('assets/sound/ffvictory.mp3');
                winSound.play();
            }
        }
        else {
            gameGuide.textContent = "This had been tried..";
            var errorSound = new Audio('assets/sound/error.mp3');
            errorSound.play();
        }
    }
    else {
        gameGuide.textContent = "Use Letter Only";
        var errorSound = new Audio('assets/sound/error.mp3');
        errorSound.play();
    }
    var playerTyped = document.getElementById("player-typed");
    playerTyped.innerHTML = "&#9998; " + tried;
    var leftChances = document.getElementById("left-chances");
    leftChances.textContent = "Left Chances: " + chances;
    var winTimes = document.getElementById("win-text");
    winTimes.textContent = "Wins: " + wins;
    var lossTimes = document.getElementById("losses-text");
    lossTimes.textContent = "Losses: " + losses;
}

