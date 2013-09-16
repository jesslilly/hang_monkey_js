<!--
function startGame( gameName )
{
	var htmlFile="";
	var windowName = "";
	var height=400;
	var width=600;
	if (gameName == "Remembery1")
	{
		htmlFile="remembery.html";
		windowName="rememberyWindow";
		height=500;
		width=600;
	}
	if (gameName == "HangMonkey")
	{
		htmlFile="hang_monkey_intro.html";
		windowName="hangmanWindow";
		height=440;
		width=440;
	}
	if (gameName == "WickedBattle")
	{
		htmlFile="wickedbattle.html";
		windowName="wickedBattleWindow";
		height=420;
		width=712;
	}
	// If you open with the same window name, and open 2 games at once, they steal the other one's window.
	open( htmlFile, windowName, "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+width+", height="+height);
}
//-->