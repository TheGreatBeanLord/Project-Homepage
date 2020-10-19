//Script for changing the dimensions of the grid


//Event listener
document.getElementById("DimensionsEditor").addEventListener("click", DimensionsEditor);

//Big Boss Function (calls othere fucntions)
function DimensionsEditor() {
    destroyGrid();
    NumRows = Number(document.getElementById("NewDimensions").value);
    NumRows = divisibleBy(NumRows);
    NumCols = NumRows;
    
    newGrid();
}

//Runs the grid.js functions to make a new grid and array from scratch
function newGrid() {
    
  grid = createGridArray();
  gridCopy = createGridArray();
  createDivGrid(grid);

}

//Deletes the current grid and array
function destroyGrid() {
    for (let row = 0; row < NumRows; row++) {
        for (let col = 0; col < NumCols; col++) {
            //Create a div for each element in 2d gid

            let divEl = document.getElementById("cell" + row + col);
            divEl.remove();
            console.log("killing " + row + col);
}
        }
    }
    
// Find the closest perfect square above the requested dimensions
function divisibleBy(NumRows){
    for (let n = NumRows; ; n++){
        if (1000 % n == 0){
             console.log(n);
            return(n);
           
        }
    }
}
