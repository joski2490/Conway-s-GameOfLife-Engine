
var matrix = []
var size = 10;
var b = false;
var count_rows = 0;
var count_col = 0;
var count_gen = 0;
var Game={
	div: null,
    start: function(container){
    	this.div = document.getElementById(container);
    	remove(this.div);      	
    	this.initGame();
    },

    initGame: function(){
    	//Create canvas object
    	var canvas = newCanvas(800,500,'myCanvas');    	
		var ctx = canvas.getContext('2d'); // Define context	
		
		
		canvas.addEventListener("click", clickHandler, true);				
		this.div.appendChild(canvas);
		var lineWidth = 1;
		var color = "#FF0000";	
		var play = document.getElementById("play");
		var reset = document.getElementById("reset");
		var stop = document.getElementById("stop");
		play.addEventListener("click", start_compute, false);
		stop.addEventListener("click", stop_game, false);
		reset.addEventListener("click", reset_game, false);
		var init = true;
		function drawGrid(){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.strokeStyle = color;
			ctx.lineWidth = lineWidth;
			var columns = [];
			var rows = [];
			for (var i = size; i < canvas.width; i += size) {
				ctx.beginPath();
				ctx.moveTo(i, 0);
				ctx.lineTo(i, canvas.height);
				ctx.stroke();
				columns.push(i);
			}
			for (var i = size; i < canvas.height; i += size) {
				ctx.beginPath();
				ctx.moveTo(0, i);
				ctx.lineTo(ctx.canvas.width, i);
				ctx.stroke();
				rows.push(i);
			}			
			columns.push(0);
			rows.push(0);
			// Init matrix
			if(init){
				for (var y = 0; y < rows.length; y++) {
					var row = [];
					for (var x = 0; x < columns.length; x++) {
						row.push([columns[x], rows[y], 0]);
					}
					matrix.push(row);
				}
				count_rows = rows.length;
				count_col = columns.length;
				init = false;
			}
			// Draw matrix
			ctx.beginPath();
			for (var y = 0; y < count_rows; y++){
				for(var x = 0; x < count_col; x++){
					if (matrix[y][x][2]==1){
						ctx.fillRect(matrix[y][x][0]-size, matrix[y][x][1]-size, size, size);
					}			
				}
			}
			ctx.fill();  	
			ctx.closePath();
			if(b){
				compute_game();
			}				
			requestAnimationFrame(drawGrid);
		}
		drawGrid();
    },
};

function clickHandler(event)
{
  var x = event.x;
  var y = event.y;  
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext('2d');
  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;;
  x_m = Math.trunc(x/size);
  y_m = Math.trunc(y/size);
  if (matrix[y_m][x_m][2] == 0){
	matrix[y_m][x_m][2] = 1;
  }else{
	matrix[y_m][x_m][2] = 0;
  }
  //console.log(matrix);
}
function start_compute(){
	b = true;
	count_gen = 0;
}

function get_count_neigboor(x, y){
	return matrix[y-1][x-1][2] + matrix[y-1][x][2] + matrix[y-1][x+1][2]+ 
		   matrix[y][x-1][2] + matrix[y][x+1][2] + 
		   matrix[y+1][x-1][2] + matrix[y+1][x][2] + matrix[y+1][x+1][2];
}

function compute_game(){	
	var matrix_aux = [];
	// Copy Matrix
	for (var i = 0; i < matrix.length; i++){
		var row = []
		for (var j = 0; j<matrix[i].length; j++){
			row.push(0);
		}		
		matrix_aux.push(row);
	}
	for (var i = 0; i < matrix.length; i++){
		for (var j = 0; j<matrix[i].length; j++){
			matrix_aux[i][j] = matrix[i][j].slice();
		}		
	}
    // Apply rules
	for (var y = 1; y<count_rows-1; y++){
		for(var x= 1;x<count_col-1;x++){			
			var count = get_count_neigboor(x,y);
			if(matrix[y][x][2]==0){
				if(count==3){
					matrix_aux[y][x][2]=1;
				}
			}
			if(matrix[y][x][2]==1){
				if(count==2 || count==3){
					matrix_aux[y][x][2]=1;
				}else{
					matrix_aux[y][x][2]=0;
				}
			}
		}
	}
	// Copy Matrix_aux
	for (var i = 0; i < matrix_aux.length; i++){
		for (var j = 0; j<matrix_aux[i].length; j++){
			matrix[i][j] = matrix_aux[i][j].slice();
		}		
	}
	//console.log(matrix);
	count_gen = count_gen + 1;
	document.getElementById("generation").innerHTML = String(count_gen);
}

function stop_game(){
	b = false;
}

function reset_game(){
	for (var i = 0; i < matrix.length; i++){
		for(var j = 0; j < matrix[i].length; j++){
			matrix[i][j][2] = 0;
		}
	}
}

document.addEventListener("DOMContentLoaded", function() {
		Game.start("game-div");
});
