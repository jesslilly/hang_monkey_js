<!--
var imageDir = "sparkyland-images/";
var sky1 = imageDir + "night-sky.gif";
var sky2 = imageDir + "night-sky.gif";
var sparkylandBG = imageDir + "sparkyland-night.gif";
var banner = "CCCCCC";

var time = "?";
overriddenTimeOfDay();
timeOfDay();

if ( time == "day" )
{
	sky1 = imageDir + "cloud.gif";
	sky2 = imageDir + "day-sky.gif";
	sparkylandBG = imageDir + "sparkyland.gif";
	banner = "CCFFFF";
}

function overriddenTimeOfDay()
{
	var url = new String(document.location);
	var anchorPosition = url.indexOf("#");
	var tempTime = "?"
	if ( anchorPosition > 0 )
	{
		tempTime = url.substring( anchorPosition + 1, url.length );
		if ( tempTime == "day" || tempTime == "night" )
		{
			time = tempTime;
		}
	}
}

function timeOfDay()
{
	if (time == "?")
	{
		var now = new Date();
		var hour = now.getHours();
		
		time = "day";
		if ( hour < 6 || hour >= 20 )
		{
			time = "night";
		}
	}
}

function refresh()
{
location.reload()
}
// -->