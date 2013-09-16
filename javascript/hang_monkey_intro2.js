<!--

document.onmousedown=skipIntro;
document.oncontextmenu=skipIntro;

function skipIntro(e)
{
	nextScreen("hangmonkey.html");
	return false;
}

window.onload = function()
{
	run_intro();
}

function run_intro()
{

	var pause = 3; // seconds

	self.timer = window.setTimeout("nextScreen(\"hangmonkey.html\");", 1000 * pause);

}
function nextScreen( page ) 
{
	location.href = page;
}
//-->