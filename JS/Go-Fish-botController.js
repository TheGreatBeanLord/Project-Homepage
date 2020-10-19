function BotTurn(){
    console.log("Bot Taking Turn");
    cardselect = Math.randomInt(0, playerHands[turn].length);

    targetPlayerSelect = turnGen(turn + Math.randomInt(1, 2));

    console.log(playerHands[targetPlayerSelect].length, targetPlayerSelect);

    fish(cardselect, targetPlayerSelect);

    newTurn();
}