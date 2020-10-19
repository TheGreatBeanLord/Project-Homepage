    //Global Variables

//dictates dimensions of the grid
let NumRows = 40;
let NumCols = 40;

//frame counter
let frameNumber = 0;

// Create an array to represent a grid
let grid = createGridArray();
let gridCopy = createGridArray();
let PauseBool = false;


// create divs to model the grid array
createDivGrid(grid);


//Event listener
    //button handlers
    document.getElementById("StartBtn").addEventListener("click", () => {ButtonHandler(true, false, false)});
    document.getElementById("StopBtn").addEventListener("click", () => {ButtonHandler(false, true, false)});
    document.getElementById("NextFrameBtn").addEventListener("click", () => {ButtonHandler(false, false, true)});
    

function ButtonHandler(isTrigger, isStop, isNextFrame){
    if (isTrigger) {
     requestAnimationFrame(Animate);
     document.getElementById("StartBtn").innerHTML = "Faster!";
      PauseBool = false;
        }

         else if (isStop) {
             PauseBool = true;
         }

         else {
            CopyGrid();
            Frame();
         }

    }

    function Animate() {
        if (!PauseBool) {
        if(frameNumber % 60 == 0) {
            CopyGrid();
           
            Frame();
      //      console.log("frameee");
        }
        requestAnimationFrame(Animate);
      //  console.log(frameNumber);
        frameNumber++;
    }
    }

//Main event function

function Frame() {
   
    console.log("frame!");
   
    //loop to identify grid position

    for (let row = 0; row < NumRows; row++) {
        for (let col = 0; col < NumCols; col++) {
            //Living Cell
          if (grid[row][col] == 1){
              //check if there are less than 3 neighbors
              if (checkSurroundings(row, col, true)) {
                  grid[row][col] = 1;
                  
                  select(row, col);
                  
              }
              else {
                  grid[row][col] = 0;
                  select(row,col);
              }

             
          }
          //No Cell
         
              else if (grid[row][col] == 0){
                //check if there are less than 3 neighbors
                if (checkSurroundings(row, col, false)) {
                    grid[row][col] = 1;
                    select(row,col);
    
                    
          }
            }


        }

    }

}

//duplicate grid array from last frame, analyze to see what cases were activated before they are changed in the main grid array
function CopyGrid() {
    for (let row = 0; row < NumRows; row++) {
        for (let col = 0; col < NumCols; col++) {
            if (gridCopy[row][col] != grid[row][col]);
                gridCopy[row][col] = grid[row][col];

        }

    }
}