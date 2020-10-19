// DRAW ROBOT FACE



// Set up Canvas and Graphics Context
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
let answersArray = new Array;
let mouseX = 250;
let mouseY = 250;
let isTracking = false;
let previousFramesArray = new Array;
let currentImg;
let previousFrame;
let imageArray = new Array;
let shookCounter = 0;
let isShook = false;
let transparencyVal = 0;
let textFrameCounter = 0;
let response;
cnv.width = 1000;
cnv.height = 800;

intGraphics();

document.getElementById("myCanvas").addEventListener("mousedown", () => {buttonHandler("mouseDown")});
document.getElementById("myCanvas").addEventListener("mouseup", () => {buttonHandler("mouseUp")})


fetch("Media/answers.txt").then((rawData) => rawData.text()).then((data) => answersArray = data.split("."));


function buttonHandler(input){
    switch (input){
        case "mouseUp": document.getElementById("myCanvas").removeEventListener("mousemove", mouseTracker);
        isPlaying = false;
        previousFramesArray = [];


        console.log("removing");
        break;
        case "mouseDown":document.getElementById("myCanvas").addEventListener("mousemove", mouseTracker);
        isPlaying = true;
        requestAnimationFrame(Frame);
        console.log("adding");
        response = null;
        shookCounter = 0;
        break;

    }
}  

loadImages();
//Store images in variables
function loadImages(){
    imageArray.push(document.getElementById("still"));
    
    for (let directionNum = 1; directionNum < 5; directionNum++) {
        for (let intensityNum = 1; intensityNum < 4; intensityNum++){
            let imgEl = document.createElement("img");
         
            
            let direction = directionPicker(directionNum);
            imgEl.id = (direction + "blur" + intensityNum);
            imgEl.src = ("Media/" + direction + " blur " + intensityNum) + ".png";
            document.getElementById("images").appendChild(imgEl);
            imageArray.push(document.getElementById(direction + "blur" + intensityNum));
        }
  
    }
    console.log(imageArray);
}

ctx.drawImage(document.getElementById("still"), 0, 0);
drawText("Click, hold, and shake hard to reveal your answer", 120, 250, "verdana", "25", "grey");



function directionPicker(directionNum){
    switch (directionNum){
        case 1: return("up");
        break;
        case 2: return("down");
        break;
        case 3: return("left");
        break;
        case 4: return("right");
    }
}


function imgArrayPusher(direction, intensity) {
    imageArray.push(document.getElementById(direction + "blur" + intensity));
}


function mouseTracker(event){
    isTracking = true;
  //  console.log(isTracking);

//    console.log(event);
  let cnvRect = cnv.getBoundingClientRect();
  mouseX = event.x - cnvRect.x;
  mouseY = event.y - cnvRect.y;
 // console.log(mouseX, mouseY);
}

function drawImage(imageId){
  //  console.log("drawing");
ctx.drawImage(imageId, mouseX - 435, mouseY - 280);
}

function Frame(){
   // console.log("frame");
    let direction;
    previousFramesArray.unshift({x: mouseX, y: mouseY});

    if (previousFramesArray.length >= 10){
        previousFramesArray.pop();
    }
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,cnv.width, cnv.height);

    directionFinder();
    //console.log("end of frame");

if (isPlaying){
 requestAnimationFrame(Frame);
}
    else {
        console.log("is this looping?");
        showFortune();
    }
}

function directionFinder(){


    if (mouseX > previousFramesArray[previousFramesArray.length - 1].x){
     
     speedFinder("right");
    }
        else if (mouseX == previousFramesArray[previousFramesArray.length - 1].x) {
      
             drawImage(imageArray[0]);

        }
            else if (mouseX < previousFramesArray[previousFramesArray.length - 1].x){
                drawImage(imageArray[0]);
                speedFinder("left");
            
            }

}

function speedFinder(direction){

    let intensityN = 0;
    let speed;

    if (direction == "left" || direction == "right"){
     speed = previousFramesArray[0].x - previousFramesArray[previousFramesArray.length - 1].x;
    }
        else if (direction == "up" || direction == "down"){
            speed = previousFramesArray[0].y - previousFramesArray[previousFramesArray.length - 1].y;
        }

    if (speed < 0){
        speed *= -1;
    }


    if (speed <= 50){
       intensityN = 1;
  //     console.log("slow");
    }
        else if (speed <= 200){
            intensityN = 2;
  //     console.log("medium");
       shookCounter++;

        }
            else if (speed > 200){
                intensityN = 3;
    //   console.log("fast");
       shookCounter += 5;

            }
            drawImage(document.getElementById(direction + "blur" + intensityN));
        
}

function showFortune(){
    console.log(shookCounter);
    transparencyVal = 0;
    response = answersArray[Math.randomInt(0, answersArray.length - 1)];
   // console.log("showing fortune" + response);
    let framesCounter = 0;
 
    if (shookCounter > 200){
        requestAnimationFrame(TextAnimator);
 //      console.log("text display");

    }

    else {
        drawText("Please Shake Harder", 250, 100, "verdana", "20", "Grey");
    }

    
function TextAnimator(){
  //  console.log(response);
    drawText(response, mouseX - 45, mouseY - 15, "verdana", "12", "rgba( 2, 255,255," + transparencyVal + ")", 2030);
    ctx.strokeTriangle(mouseX, mouseY +70, mouseX + 80, mouseY - 30, mouseX - 80, mouseY - 30, "rgba( 2, 255,255," + transparencyVal + ")");
     transparencyVal += 0.01;

     if (transparencyVal < 1){
     requestAnimationFrame(TextAnimator);
     }
}

shookCounter = 0;

}




//function to streamline displaying text

function drawText(text, x, y, font, size, colour, maxwidth){
   // console.log("drawing text");
    //Draw Text
    ctx.font = size + "px " + font;
    //console.log(ctx.font);
    ctx.fillStyle = colour;
    ctx.fillText(text, x, y, maxwidth);
    }