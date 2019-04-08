





var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var brands = ["acura", "audi", "bmw", "bently", "buick", "chevrolet", "dodge", "ford", "honda", "infiniti", "mercedes", "nissan", "tesla", "toyota", "volvo"];var run = false;
var currentWord;
var wordAsDashes;
var guessesLeft;
var guess;
var currentwordplace; 
var correct;
var wordarray = [];
var dashesArray = [];
var numWins = 0;
var numLosses = 0;


function initialize() {
	run = true;
	guess = [];
	correct = 0;
	currentwordplace = Math.floor(Math.random() * 15);
	currentWord = brands[currentwordplace];			
	guessesLeft = 17 - currentWord.length;		
	wordAsDashes = makeIntoDashes(currentWord);	
	wordarray = currentWord.split('');			
	dashesArray = wordAsDashes.split('');		
	document.getElementById("currentWord").innerHTML = wordAsDashes;
	document.getElementById("guess").innerHTML = "--";
	document.getElementById("guessesLeft").innerHTML = guessesLeft;
}

function makeIntoDashes(word) {
	var dashes = "";
	for (i = 0; i < word.length - 1; i++) {
		dashes += "_ ";
	}
	dashes += "_";
	return dashes;
}

function playGame(letter) {
	var letter = letter.toLowerCase();

	if (alphabet.indexOf(letter) > -1) {
		if (wordarray.indexOf(letter) > -1) {
			correct++;
			displayLetter(letter);
		}
		else {
			if (guess.indexOf(letter) > -1) {
				return;
			}
			else {
				guessesLeft--;
				document.getElementById("guessesLeft").innerHTML = guessesLeft;
				guess.push(letter);
				document.getElementById("guess").innerHTML = guess.join(' ');
				if (guessesLeft == 0) {
					alert("WRONG!! The correct word is " + currentWord);
					initialize();
					numLosses++;
					document.getElementById("losses").innerHTML = numLosses;
				}
			}
		}
	}
}

function displayLetter(letter) {
	for (i = 0; i < currentWord.length; i++) {
		if (letter == wordarray[i]) {
			dashesArray[i * 2] = letter;
			console.log(dashesArray);
		}
	}
	document.getElementById("currentWord").innerHTML = dashesArray.join("");
	checkForWin();
}

function checkForWin() {
	if (dashesArray.indexOf("_") === -1) {
		alert("Boom! You're right, the correct answer is " + currentWord);
		numWins++;
		document.getElementById("wins").innerHTML = numWins;
		initialize();
	}
}

document.onkeyup = function (event) {
	if (!run) {
		document.getElementById("letsPlay").innerHTML = "";
		initialize();
		document.getElementById("currentWord").innerHTML = wordAsDashes.split(",");
		console.log(currentWord);
		run = true;
	}
	else {
		playGame(event.key);
	}
}