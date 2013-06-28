var increment = 25;
var id = "swcImage";

function resetMargins() {
	document.getElementById(id).style.marginLeft = "0px";
	document.getElementById(id).style.marginTop = "0px";
}

function displayDate() {
	document.getElementById("swcParagraph").innerHTML=Date();
}

function showBoat() {
	document.getElementById(id).src="http://wpdotorg.files.wordpress.com/2008/11/boat.jpg";
}

function showCar() {
	document.getElementById(id).src="http://images.hemmings.com/wp-content/uploads//2012/11/2012COPOCamaroconv_01_1500.jpg";
}

function moveDown() {
	var topMargin = parseInt(document.getElementById(id).style.marginTop, 10);
	document.getElementById(id).style.marginTop = (topMargin+increment).toString() + "px";
}

function moveUp() {
	var topMargin = parseInt(document.getElementById(id).style.marginTop, 10);
	document.getElementById(id).style.marginTop = (topMargin-increment).toString() + "px";
}

function moveRight() {
	var leftMargin = parseInt(document.getElementById(id).style.marginLeft, 10);
	document.getElementById(id).style.marginLeft = (leftMargin+increment).toString() + "px";
}

function moveLeft() {
	var leftMargin = parseInt(document.getElementById(id).style.marginLeft, 10);
	document.getElementById(id).style.marginLeft = (leftMargin-increment).toString() + "px";
}