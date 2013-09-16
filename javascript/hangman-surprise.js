<!--
// begin preload images.
var monkey = new Image();
monkey.src = "hangman-images/hang-monkey8.gif";
var robot = new Image();
robot.src = "hangman-images/hang-robot8.gif";
var earth = new Image();
earth.src = "hangman-images/hang-earth5.gif";
// end preload images.
function showImage( form )
{
	eval( "document.animation.src = " + form.selectAnimation.value + ".src;" );
}
function changeAnimation( form )
{
	loadAnimation( form );
	closeWindow();
}
function closeWindow()
{
	window.close();
}
function loadAnimation( form )
{
	var newImageName = "hang-" + form.selectAnimation.value;
	opener.animationName = newImageName;
	opener.hangmanImage.src = "hangman-images/" + newImageName + "0.gif";
	opener.saveData();
}
// -->