<!--
/*
Use this HTML:
<BGSOUND id="bgMusicID" LOOP=-1 SRC="town.mid">
<EMBED NAME="bgMusic" SRC="town.mid"
LOOP=TRUE AUTOSTART=TRUE HIDDEN=TRUE MASTERSOUND>
*/
var img1=new Image();
img1.src="hangman-images/nospeaker.gif";
var img2=new Image();
img2.src="hangman-images/speaker.gif";

ver=parseInt(navigator.appVersion);
ie4=(ver>3  && navigator.appName!="Netscape")?1:0;
ns4=(ver>3  && navigator.appName=="Netscape")?1:0;
ns3=(ver==3 && navigator.appName=="Netscape")?1:0;
playing=true;

function toggleMusic( soundFile )
{
	if (playing)
	{
		stopMusic();
		playing=false;
		document.speaker.src="hangman-images/nospeaker.gif";
	}
	else
	{
		playMusic( soundFile );
		playing=true;
		document.speaker.src="hangman-images/speaker.gif";
	}
}

function playMusic( soundFile )
{
	if (ie4)
		document.all['bgMusicID'].src = soundFile;
	if ((ns4||ns3)
		&& navigator.javaEnabled()
		&& navigator.mimeTypes['audio/x-midi']
		&& self.document.bgMusic.IsReady()
		)
	{
		self.document.bgMusic.play();
	}
}
function stopMusic()
{
	if (ie4)
		document.all['bgMusicID'].src='silence.mid';
	if ((ns4||ns3)
		&& navigator.javaEnabled()
		&& navigator.mimeTypes['audio/x-midi']
		)
	{
		self.document.bgMusic.stop();
	}
}

//-->
