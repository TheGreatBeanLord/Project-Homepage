function GenerateGrid() {
    let CardArray = new Array;
 
    for (let number = 1; number < 14; number++) {
        for (let suitNum = 1; suitNum < 5; suitNum++){
            let suit = suitPicker(suitNum);
          CardArray.push(createCard(number, suit));
        }
  
    }
    console.log(CardArray);
    return(CardArray);
 }
 
 function suitPicker(suitNum){
     switch (suitNum){
         case 1: return("hearts");
         break;
         case 2: return("spades");
         break;
         case 3: return("diamonds");
         break;
         case 4: return("clubs");
     }
 }
 
 function createCard(number, suit){
   return(
     {num: number,
     suit: suit,
     img: document.getElementById(number + suit)}
   )
 }