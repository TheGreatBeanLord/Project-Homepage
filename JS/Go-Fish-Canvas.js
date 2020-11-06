let cnv = document.getElementById("mycanvas");
let ctx = cnv.getContext("2d");
let cardX = 220;
let cardY = 300;
let isLoaded = false;
let imgLoadCounter = 0;
let fishcounter = 0;
let TurnDone = false;
let isMenu;
let targetPlayer;
let isBotTurn = false;
let isRulesScreen = false;

cnv.width = 780;
cnv.height = 500;
intGraphics();



function displayCards(){
 console.log("displaying cards");
    
    let DeckX = 500;
    let DeckY = 300;
  

   // if (!isLoaded){
 
    
    for (let i = 0; i < playerHands[turn].length; i++){
        let img = playerHands[turn][i].img;
        
    } 
    drawCardsController();
    
//function that calls functions related to displaying cards
    function drawCardsController(){
     cardX = 220;
     cardY = 300;
        ctx.fillStyle = "white";
        ctx.fillRect(0,0, cnv.width, cnv.height);
        drawCards();
        DrawOppenentCardsController();
        drawBooks();
        ScoreDisplay();
    }

    //draw player cards
    function drawCards(){
        for (let i = 0; i < playerHands[turn].length; i++){
            
            ctx.drawImage(playerHands[turn][i].img, cardX, cardY);
            cardX += 23;
            cardY += 3;
           }  
  
    }

    
    function DrawOppenentCardsController(){
        let x2 = 150;
        let y2 = 50;
        
    //Display opponent Cards
    for (i = 1; i < players; i++){
        DrawOppenentCards(turnGen(turn + i), x2, 50);
        x2 += 200;
        console.log("displaying opponent cards" + i);
    }

    //Display Deck
    for (let i = 0; i < Deck.length / 5; i++){
        let opponentCards = document.getElementById("BackOfCard");
        ctx.drawImage(opponentCards, DeckX, DeckY, 73, 91);
        DeckX += 2;
        DeckY -= 1;
    }
}

    function DrawOppenentCards(targetPlayer, HandX, HandY){
    for (let i = 0; i < playerHands[targetPlayer].length; i++){
            let opponentCards = document.getElementById("BackOfCard");
            ctx.drawImage(opponentCards, HandX, HandY, 73, 91);
            HandX += 23;
            HandY -= 3;
    }
    }


 
}

//function to streamline displaying text

function drawText(text, x, y, font, size, colour, maxwidth){
//Draw Text
ctx.font = size + "px " + font;
//console.log(ctx.font);
ctx.fillStyle = colour;
ctx.fillText(text, x, y, maxwidth);
}






//Funciton to analyse click locations and call corrosponding functions
function clickHandler(event){
    if (TurnDone == false){
    let cnvRect = cnv.getBoundingClientRect();
    let mouseX = event.x - cnvRect.x;
    let mouseY = event.y - cnvRect.y;
    let cardXYarray = [];

    if(isRulesScreen){
        DrawStartingScreen();
        isRulesScreen = false;
    }


    if (isMenu){
        if (mouseX >= 200 && mouseX <= 350){
            if (mouseY >= 200 && mouseY <= 225 ){
                console.log("pn1v1");
                GameMode("PnP1v1");
            }
            else if (mouseY >= 300 && mouseY <= 325){
                console.log("pb1v1");
                GameMode("PvB1v1");

            }
            else if (mouseY >=400 && mouseY <= 425){
                InstructionsScreen();
            }

        }
        else if (mouseX >= 450 && mouseX <= 600){
            if (mouseY >= 200 && mouseY <= 225){
                console.log("PnP1v1v1");
                GameMode("PnP1v1v1");
            }
            else if (mouseY >= 300 && mouseY <= 325){
                console.log("PvB1v1v1");
                GameMode("PvB1v1v1");
            }
        }
    }

    else {
    if (mouseY >= 50 && mouseY <= 150){
        if (mouseX >= 150 && mouseX <= 150 + (playerHands[1].length * 27)){
            targetPlayer = turnGen(turn + 1);
            console.log(targetPlayer);
        }
        else if (mouseX >= 350 && mouseX <= 350 + (playerHands[2].length * 23)){
            targetPlayer = turnGen(turn + 2);console.log(targetPlayer);
        }
    }
  }
    





    for (let i = 0; i < playerHands[turn].length; i++){
        cardXYarray.push({num: playerHands[turn][i].num, x: 220 + i * 23, y: 300 + i * 3});

        if (mouseX <= cardXYarray[i].x + 23 && mouseX >= cardXYarray[i].x  && i < playerHands[turn].length - 1){
        
            if ( mouseY <= cardXYarray[i].y + 91 && mouseY >= cardXYarray[i].y){
                console.log(cardXYarray[i].num);
               console.log("pressing first");
                fish(cardXYarray[i].num);
                return;
            }
           
            
        }
       else if (mouseX <= cardXYarray[i].x + 73 && mouseX >= cardXYarray[i].x) { console.log("testing");
            if (mouseY <= cardXYarray[i].y + 91 && mouseY >= cardXYarray[i].y && i == playerHands[turn].length - 1){
                console.log(cardXYarray[i].num, cardXYarray.length, i);
                fish(cardXYarray[i].num);
                console.log("pressinglast");
                return;
            
            }
                   
        }
    }

  //  console.log(cardXYarray.length);
   fishcounter = 0;
GameEndChecker();
console.log("click");
}
}


function fish(CardNum, BotTargetPlayer){

    if (players == 2){
        targetPlayer = turnGen(turn + 1);
    }

    if (BotTargetPlayer){
        targetPlayer = BotTargetPlayer;
    }

    console.log(targetPlayer);
    console.log("fishing");
    fishcounter = 0;
    //console.log("fishing");
    console.log(targetPlayer);
   
   for (let i = 0; i < playerHands[targetPlayer].length; i++){
    if (CardNum == playerHands[targetPlayer][i].num){
        cardX = 220;
        cardY = 300;
        playerHands[turn].push(playerHands[targetPlayer][i]);

        playerHands[targetPlayer].splice(i,1);
        
        checkBooks(turn);

        displayCards(); 
        turnDone = true;
        return;
       }

    else if (fishcounter < 1){
    console.log();
    drawOne(); 
 
    TurnDone = true;   console.log(TurnDone);
    return;
    }
    

}
GameEndChecker();
targetPlayer = null;

}

function drawOne(){
    console.log("drawing oen");
    let randNum = Math.randomInt(0, Deck.length - 1);
     console.log(Deck[randNum]);
    playerHands[turn].push(Deck[randNum]);
    Deck.splice(randNum, 1);
    checkBooks(turn);


    displayCards();
    fishcounter = 1;
    turnDone = true;
}

function drawBooks(){
    let spaceInterval = 0;
    let x = 50;
    let y = 175;
    for (let i = 0; i < Books.length; i++){
        ctx.drawImage(Books[i].img, x, y);
        spaceInterval++;
        x += 10;

        if (spaceInterval % 2 == 0){
            x += 10;
           // console.log("o");
        }
    }
}

function LoadingScreen(){
    if (!isBots){
    ctx.drawImage(document.getElementById("LoadingScreen"), 0, 0, cnv.width, cnv.height);
    drawText("Player " + (turn + 1), 270, 200, "Verdana", 50, "white");
    drawText("Press 's' to Start", 270, 225, "Verdana", 20, "black");
 //   console.log("is this it");

    document.addEventListener("keydown", displayCards);
    }
    else {
        displayCards();
    }
}


function ScoreDisplay(){
    let x = 10;
    let y = 24;
    //console.log(x, y);

    for (let i = 0; i <= players; i++){
    ctx.font = "20px Verdana";
    ctx.fillStyle = "black";
    drawText("Player " + (turn + 1) + " Score: " + playerScores[turn], x, y, "Verdana", 20, "black");
       // document.getElementById("turn").innerHTML = "Player " + turn + " Score: " + playerScores[turn];
    }
}

function EndGame(WinningPlayer) {
  //  console.log("gameEnding");
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, cnv.width, cnv.height);
    drawText("Player " + (WinningPlayer + 1) + " Won!", 270, 200, " Verdana", 50, "Black");
    drawText("With " + playerScores[WinningPlayer] + " Points", 270, 300, " Verdana", 50, "Black");

}

function DrawStartingScreen(){
    ctx.drawImage(document.getElementById("LoadingScreen"), 0, 0, cnv.width, cnv.height);
    drawText("Go Fish!", 270, 100, "Verdana", 50, "White");
    OptionsTemplate("Pass N Play 1v1",200, 200);
    OptionsTemplate("Pass N Play 1v1v1",450, 200);
    OptionsTemplate("1v1 Vs bot",200, 300);
    OptionsTemplate("1v1v1 Vs bot",450, 300);
    OptionsTemplate("How To Play",200, 400);





}

function OptionsTemplate(Text, x, y){
    ctx.fillStyle = "Grey";
    ctx.fillRect(x + 1, y, 150, 25);
    ctx.strokeRect(x,y, 151, 25);
    drawText(Text, x + 10, y + 15, "Verdana", 15, "Black")

}

function InstructionsScreen(){
    isRulesScreen = true;
    ctx.drawImage(document.getElementById("LoadingScreen"), 0, 0, cnv.width, cnv.height);
    ctx.fillStyle = 'rgba(10, 10, 10, 0.7)';
    ctx.fillRect(75, 75, cnv.width - 150, cnv.height - 150);
    drawText("If you are playing with more than one other player:", 100, 100, "verdana", 20, "white");
    drawText("First, click on the deck of the player that you want to draw from.", 100, 125, "verdana", 15, "white");
    drawText("Second, click on the card from your hand that you would like to request.", 100, 150, "verdana", 15, "white");
    drawText("If the selected player does not have this card, one will be pulled from the deck", 100, 175, "verdana", 15, "white");
    drawText("Universal Rules:", 100, 200, "verdana", 20, "white");
    drawText("If a pair of cards is in your deck, it will be automatically transferred to the table", 100, 225, "verdana", 15, "white");
    drawText("Press the 'next turn' button after having drawn a card.", 100, 250, "verdana", 15, "white");
    drawText("If the fished card is not found in a player's hand, one will be pulled from the deck", 100, 275, "verdana", 14, "white");
    drawText("This is literally go fish, if you don't know how to play, yikes", 100, 300, "verdana", 14, "white");







}