window.onload = startup;

var ballX = 400;
var ballY = 400;
var mouseX = 0;
var mouseY = 0;

function startup() {
  //`mousemove`, not `mouseover`
  document.getElementById("canvas").onmousemove = mouseMove;
  
  loop();
}

//use `requestAnimationFrame` for the game loop
//so you stay sync with the browsers rendering
//makes it a smoother animation
function loop(){
  moveBall();
  requestAnimationFrame(loop);
}

function mouseMove(evt) {
  mouseX = evt.clientX;
  mouseY = evt.clientY;
}

function moveBall() {
  //get the distance between the mouse and the ball on both axes
  //walk only the an eight of the distance to create a smooth fadeout
  var dx = (mouseX - ballX) * .125;
  var dy = (mouseY - ballY) * .125;
  //calculate the distance this would move ...
  var distance = Math.sqrt(dx*dx + dy*dy);
  //... and cap it at 5px
  if(distance > 5){
    dx *= 5/distance;
    dy *= 5/distance;
  }
  
  //now move
  ballX += dx;
  ballY += dy;
  
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(ballX, ballY, 40, 0, 2 * Math.PI);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "red";
  ctx.stroke();
}
