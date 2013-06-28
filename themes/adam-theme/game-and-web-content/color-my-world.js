var size;
var moves;
var colors;
var maxSize = 26;

var magenta = "#ff00ff";
var red = "#ff0000";
var orange = "#ffa500";
var yellow = "#ffff00";
var green = "#00ff00";
var cyan = "#00ffff"
var blue = "#0000ff";
var purple = "#800080";

function reset() {
	size = document.getElementById("size").value;
	colors = document.getElementById("colors").value;
	moves = Math.round(4.257*colors - 0.914 + (size/4-3.5)*1.189*colors);
	for (i = 1; i <= 2; i++) {
		for (j = 1; j <= 4; j++) {
			circle = $("#top tr:nth-child(" + i.toString() + 
				") td:nth-child(" + j.toString() + ")");
			if (2 * (j-1) + i > colors)
				circle.css("display", "none");
			else
				circle.css("display", "table-cell");
		}
	}
	for (i = 1; i <= maxSize; i++) {
		for (j = 1; j <= maxSize; j++) {
			num = Math.ceil(Math.random()*colors);
			if (num === 1) var color = red;
			else if (num === 2) var color = green;
			else if (num === 3) var color = blue;
			else if (num === 4) var color = yellow;
			else if (num === 5) var color = purple;
			else if (num === 6) var color = orange;
			else if (num === 7) var color = magenta;
			else if (num === 8) var color = cyan;
			if (i <= size && j <= size) {
				getTableElement(i, j).css("display", "table-cell");
				getTableElement(i, j).css("background-color", color);
			}
			else
				getTableElement(i, j).css("display", "none");
			getTableElement(i, j).attr("flooded", "no");
			if (i ===1 && j ===1) var firstColor = color;
		}
	}
	expand(firstColor, 1, 1);
	$("span#moves").html(moves.toString());
}

function rules() {
	alert("Click a colored circle to change the color of the upper-\
		left square and all connected squares of the same color. \
		The object of the game is to fill the entire board with \
		a single color.");
}

function flood(color) {
	if (moves > 0 && !win()) {
		for (i = 1; i <= size; i++) {
			for (j = 1; j <= size; j++) {
				if (getTableElement(i, j).attr("flooded") === "yes")
					expand(color, i, j);
			}
		}
		for (i = 1; i <= size; i++) {
			for (j = 1; j <= size; j++) {
				if (getTableElement(i, j).attr("flooded") === "yes")
					getTableElement(i, j).css("background-color", color);
			}
		}
		moves--;
		$("span#moves").html(moves.toString());
		if (win())
			alert("You win!");
		else if (moves === 0)
			alert("You lose!");
	}
}

function expand(color, row, col) {
	getTableElement(row, col).attr("flooded", "yes");
	if (!(row < 1 || col+1 < 1 || row > size || col+1 > size) && 
		getTableElement(row, col+1).attr("flooded") === "no" && colorToHex(
			getTableElement(row, col+1).css("background-color")) == color)
		expand(color, row, col+1);
	if (!(row < 1 || col-1 < 1 || row > size || col-1 > size) && 
		getTableElement(row, col-1).attr("flooded") === "no" && colorToHex(
			getTableElement(row, col-1).css("background-color")) == color)
		expand(color, row, col-1);
	if (!(row+1 < 1 || col < 1 || row+1 > size || col > size) && 
		getTableElement(row+1, col).attr("flooded") === "no" && colorToHex(
			getTableElement(row+1, col).css("background-color")) == color)
		expand(color, row+1, col);
	if (!(row-1 < 1 || col < 1 || row-1 > size || col > size) && 
		getTableElement(row-1, col).attr("flooded") === "no" && colorToHex(
			getTableElement(row-1, col).css("background-color")) == color)
		expand(color, row-1, col);
}

function win() {
	for (i = 1; i <= size; i++) {
		for (j = 1; j <= size; j++) {
			if (getTableElement(i, j).attr("flooded") === "no") return false;
		}
	}
	return true;
}

function getTableElement(i, j) {
	return $("#main tr:nth-child(" + i.toString() +
		") td:nth-child(" + j.toString() + ")");
}

function colorToHex(color) {
	if (color.substr(0, 1) === '#') return color;
	var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
	var red = parseInt(digits[2]);
	var green = parseInt(digits[3]);
	var blue = parseInt(digits[4]);
	var rgb = blue | (green << 8) | (red << 16);
	var almostThere = rgb.toString(16);
	while (almostThere.length < 6) {
		almostThere = '0' + almostThere;
	}
	return '#' + almostThere;
}