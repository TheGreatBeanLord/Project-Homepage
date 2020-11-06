// DRAW ROBOT FACE

// Set up Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
let enemyArray = new Array;
let framecounter = 0;
let score = 0;
let isPlaying = false;

let playerArray = new Array;
cnv.width = window.screen.width - 200;
cnv.height = window.screen.height - 300;

intGraphics();
Instructions();

if (isPlaying == false){
cnv.addEventListener("click", Start);
}

cnv.addEventListener("mousemove", mouseTracker);


function Start(){
    if (isPlaying == false){
    playerArray = [{x: 300, y: 300, colour: "black", radius: 8}]
    score = 0;
    isPlaying = true;
    requestAnimationFrame(Frame);

for (i = 0; i < 200; i++){
EnemyGenController();
}
    }
}


function mouseTracker(event){
  
  let cnvRect = cnv.getBoundingClientRect();
 playerArray[0].x = event.x - cnvRect.x;
 playerArray[0].y = event.y - cnvRect.y;
}

function EnemyGenController(){

    let randNum = Math.random();
    if (randNum <= 0.6){
    enemyGen(3, 20); 
    }
    else {
        enemyGen(20, 100);
    }
}

function enemyGen(MaxSize, MinSize){
    let enemyX = locationGen("X");
    let enemyY = locationGen("Y");
    enemyArray.push({x: locationGen("X"), y:locationGen("Y"), colour: colourGen(), radius: Math.randomInt(MinSize, MaxSize), speed: Math.randomInt(1, 3), trajectorya:Math.randomDec(-1, 1), trajectoryb: Math.randomDec(-1, 1)});
}



function colourGen(){
    let r = Math.randomInt(0, 255);
    let g = Math.randomInt(0, 255);
    let b = Math.randomInt(0, 255);
    let a = Math.randomDec(0.5, 1);

    return("rgba(" + r + "," + g + "," + b + "," + a + ")");
}

function locationGen(coordonate, X){
    let returnVal;
    if (coordonate == "X"){
        returnVal = Math.randomInt(cnv.width + 200, cnv.width + 400);
        if (returnVal % 2 != 0){
            returnVal = Math.randomInt(-200, -400);
        }
    }
    else {
        returnVal = Math.randomInt(cnv.height + 200, cnv.height + 400);
        if (returnVal % 2 != 0){
            returnVal = Math.randomInt(-200, -400);
        }
    }
    return(returnVal);
}


function Frame(){

    ctx.fillStyle = "white";
    ctx.fillRect(0,0,cnv.width, cnv.height);

    //Draw Player

    ctx.fillStyle = playerArray[0].colour; 
    ctx.fillCircle(playerArray[0].x,playerArray[0].y, playerArray[0].radius);

    for (let i = 0; i < enemyArray.length - 1; i++){
        ctx.fillStyle = enemyArray[i].colour;
        ctx.fillCircle(enemyArray[i].x, enemyArray[i].y, enemyArray[i].radius);
        movement(i);
        if (enemyArray[i].x > cnv.width + 250 || enemyArray[i].x < -250){
            deleteEnemy(i);
        }
            else if (enemyArray[i].y > cnv.height + 250 || enemyArray[i].y < -250){
                deleteEnemy(i);
            }

        
    var dx = enemyArray[i].x - playerArray[0].x;
    var dy = enemyArray[i].y - playerArray[0].y;
    var distance = Math.sqrt(dx * dx + dy * dy);

if (distance < (enemyArray[i].radius - 2) + playerArray[0].radius) {
    if (playerArray[0].radius > enemyArray[i].radius){
        deleteEnemy(i);
        playerArray[0].radius += 1;
        score += 1;
        
    }
        else {
            gameOver();
        }
}
    }

      if (isPlaying){
 requestAnimationFrame(Frame);
    }

    }
      

function movement(i){
    enemyArray[i].x = enemyArray[i].x + enemyArray[i].trajectorya * (enemyArray[i].speed);
    enemyArray[i].y = enemyArray[i].y + enemyArray[i].trajectoryb * (enemyArray[i].speed);
}

function deleteEnemy(i){
    enemyArray.splice(i, 1);
    EnemyGenController();
}

function gameOver(){
    let length = enemyArray.length;
    isPlaying = false;
    for (let i = 0; i <= length; i++){
        enemyArray.shift();
    }
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,cnv.width,cnv.height);
    drawText("Haha you died with " + score + " points!", cnv.width / 2 - 300, cnv.height / 2 - 100, "verdana", 50, "black");
    drawText("Click To Play Again! ", cnv.width / 2 - 200, cnv.height / 2 , "verdana", 20, "black");

}

function drawText(text, x, y, font, size, colour, maxwidth){
    //Draw Text
    ctx.font = size + "px " + font;
    //console.log(ctx.font);
    ctx.fillStyle = colour;
    ctx.fillText(text, x, y, maxwidth);
    }

function Instructions(){
    drawText("Click to Start!", cnv.width / 2 - 300, cnv.height / 2 - 100, "verdana", 50, "black");
    drawText("Eat smaller circles to grow.", cnv.width / 2 - 300, cnv.height / 2 - 75, "verdana", 20, "black");

}