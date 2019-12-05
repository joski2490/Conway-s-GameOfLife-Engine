//Creo el objeto canvas
//
function newCanvas(w,h,id){
	let canvas = document.createElement("canvas");
	canvas.setAttribute('width', w);		
	canvas.setAttribute('height', h);
	canvas.setAttribute('id', id);    	    		
	return canvas;
}

function drawScore(ctx, score, x, y) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, x, y);
}

function drawLives(ctx, lives, x, y) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, x, y);
}

function remove(div){
	while (div.firstChild) {
	   div.removeChild(div.firstChild);
	}
}

