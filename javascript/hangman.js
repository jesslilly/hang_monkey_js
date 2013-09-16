<!--

// ____________________ begin hangman vars & functions _________________________

var wordList1 = createWordList();
var answer = new String();
var hiddenAnswer = new String();
var numOfWrongAnswers = 0;
var losingStreak = 0;

// Begin variables that are saved in the cookie:
var numWins = 0;
var numLosses = 0;
var winningStreak = 0;
var wordIndex = Math.round( Math.random() * wordList1.length );
var animationName = "hang-monkey";
// End variables that are saved in the cookie:

// BEGIN PRELOAD IMAGES
var greenOImage = new Image();
greenOImage.src = "hangman-images/greenO.gif";
var redXImage = new Image();
redXImage.src = "hangman-images/redX.gif";
var clearImage = new Image();
clearImage.src = "hangman-images/clear-pixel.gif";

// Cookies.
loadData();

var hangAnimation = new Array(2);
loadAnimations();
// END PRELOAD IMAGES

function loadAnimations()
{
	loadAnimation("hang-monkey");
	loadAnimation("hang-robot");
	loadAnimation("hang-earth");
}
function loadAnimation( name )
{
	hangAnimation[name] = new Array(10);

	for ( i = 0; i < hangAnimation[name].length; i++ )
	{
		hangAnimation[name][i] = new Image();
		hangAnimation[name][i].src = "hangman-images/" + name + i + ".gif";
	}
}
function newGame2()
{
	// For some reason, I get an error when 
	// I try to call newGame from the button.
	newGame();
}
function newGame()
{
	generateWord();
	// clear all letters.
	var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var tempLetter;
	for ( i = 0; i < letters.length; i++ )
	{
		tempLetter = letters.charAt(i);
		eval( "document." + tempLetter + ".src = clearImage.src;" );
	}
	document.hangmanImage.src = hangAnimation[animationName][0].src;
	numOfWrongAnswers = 0;
	
}


function generateWord()
{
	wordIndex++;
	if ( wordIndex >= wordList1.length )
	{
		wordIndex=0;
	}

	answer = wordList1[wordIndex];

	hiddenAnswer = hideAnswer();

	document.statsForm.wordNumber.value = "Word Number " + wordIndex + " of " + wordList1.length;

	document.hangman.answer.value = hiddenAnswer;
}

function hideAnswer()
{
	var hidden = "";
	for ( i = 0 ; i < answer.length; i++ )
	{
		if ( charMatches( answer.charAt(i), "ABCDEFGHIJKLMNOPQRSTUVWXYZ" ) )
		{
			hidden += "@";
		}
		else
		{
			hidden += answer.charAt(i);
		}
	}
	return hidden;
}

function pickLetter( letter )
{
	if ( letterAlreadyPicked( letter ) )
	{
		// beep!
		alert( "You picked that letter already!" );
	}
	else
	{
		if ( charMatches( letter, answer ) )
		{
			// You picked a correct letter.
			revealLetter( letter );
			coverLetter( letter, "O" );
			winReward();
		}
		else
		{
			// You picked a bad letter.  HANG MAN!
			numOfWrongAnswers++;
			document.hangmanImage.src = hangAnimation[animationName][numOfWrongAnswers].src;
			coverLetter( letter, "X" );
			loseBad();
		}
	}
}

function revealLetter( letter )
{
	oldHiddenAnswer = document.hangman.answer.value;
	hiddenAnswer = new String();

	for ( i = 0 ; i < answer.length ; i++ )
	{
		if ( answer.charAt(i) == letter )
		{
			hiddenAnswer += letter;
		}
		else
		{
			hiddenAnswer += oldHiddenAnswer.charAt(i);
		}
	}

	document.hangman.answer.value = hiddenAnswer;
}

function letterAlreadyPicked( letter )
{
	var alreadyPicked = true;
	var javaScript = "document." + letter + ".src";
	var imageName = fileName( eval( javaScript ) );
	if ( imageName == "clear-pixel.gif" )
	{
		alreadyPicked = false;
	}
	return alreadyPicked;
}

function coverLetter( letter, xOrO )
{
	var javaScript = "document." + letter + ".src = ";
	if ( xOrO == "X" )
	{
		javaScript += "redXImage.src;";
	}
	if ( xOrO == "O" )
	{
		javaScript += "greenOImage.src;";
	}
	eval( javaScript );
}

function winReward()
{
	if ( document.hangman.answer.value == answer )
	{
		numWins++;
		winningStreak++;
		losingStreak=0;
		updateScore();
		saveData();
		rewardMessage();
		newGame();
	}
}
function loseBad()
{
	if ( numOfWrongAnswers >= 9 )
	{
		numLosses++;
		winningStreak=0;
		losingStreak++;
		updateScore();
		saveData();
		var message = "SORRY, YOU LOSE!\n\n(The answer was " + answer + ").";
		if ( losingStreak >= 3 )
		{
			message += "\n\nHere's some help:";
			message += "\nChoose all of the vowels first (A, E, I, O, U and sometimes Y).\n";
			message += "Then choose common letters like L, N, R, S and T.";
		}
		alert( message );
		newGame();
	}
}
function rewardMessage()
{
	var message = "YOU WIN :)";
	var streakRemainder = winningStreak % 5;
	if ( streakRemainder == 1 )
	{
		message += "\n\nIf you get 5 wins in a row, you get a SURPRISE!";
	}
	if ( streakRemainder > 1 && streakRemainder < 5 )
	{
		message += "\nYou need " + ( 5 - streakRemainder ) + " more wins to get your surprise.";
	}
	if ( streakRemainder == 0 )
	{
		message += "\nClick OK to get your SURPRISE!";
	}
	alert(message);
	if ( streakRemainder == 0 )
	{
		open( "hangman-win.html", "winWindow", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=400, height=338");
		//open( "hangman-win.html", "winWindow", "toolbar=yes, location=yes, directories=yes, status=yes, menubar=yes, scrollbars=no, resizable=yes, copyhistory=no, width=400, height=480");
	}
}

function updateScore()
{
	var score = 0;
	var message = "";
	if ( ( numLosses + numWins ) > 0 )
	{
		score = Math.round( ( numWins / ( numLosses + numWins ) ) * 100 );
	}
	message = "Wins: " + numWins + 
		"\nLosses: " + numLosses + 
		"\nScore: " + score + "%" +
		"\nWinning Streak: " + winningStreak +
		"";
	document.statsForm.score.value = message;
}

// ____________________ end hangman vars & functions _________________________


// ____________________ begin util/string functions _________________________

function fileName( url )
{
	var lastSlash = url.lastIndexOf("/");
	if ( lastSlash < 0 )
	{
		lastSlash = url.lastIndexOf("\\");
	}
	return url.substring( lastSlash + 1, url.length );
}

function stringMatches( aString, validChars )
{
	var matches = true;
	for ( i = 0; i < aString.length; i++)
	{
		if ( ! charMatches( aString.charAt(i), validChars ) )
		{
			matches = false;
			break;
		}
	}
	return matches;
}

function charMatches( character, validChars )
{
	var matches2 = false;

	for ( j = 0; j < validChars.length; j++ )
	{
		if (character == validChars.charAt(j))
		{
			matches2 = true;
			break;
		}
	}
	return matches2;
}
// ____________________ end util/string functions _________________________

// ____________________ begin cookies _________________________

function setCookie(name, value)
{
	var expires = new Date();
	//var path = location.pathname;
	//var domain = path.substring(0,path.lastIndexOf('/')) +'/';

	//alert ( "path: " + path + " domain: " + domain );

	expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000) );

	var cookieData = name + "=" + escape(value) +
	"; expires=" + expires.toGMTString();
	//"; path=" + path +
	//"; domain=" + domain
	// secure=???
	document.cookie = cookieData;
}

function getCookie(name)
{
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1)
	{
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	}
	else
		begin += 2;
	var end = document.cookie.indexOf(";", begin);
	if (end == -1)
		end = dc.length;
	return unescape(dc.substring(begin + prefix.length, end));
}

function saveData()
{
	var data = "numWins=" + numWins + 
		";numLosses=" + numLosses + 
		";wordIndex=" + wordIndex + 
		";animationName=\"" + animationName + "\"" +
		";winningStreak=" + winningStreak + 
		";";
	//alert( "savedata: " + data );
	setCookie( "hangman", data );
}

function loadData()
{
	var data = getCookie("hangman");
	//alert( "cookie data: " + data );
	eval( data );
}

// ____________________ end cookies _________________________


// -->