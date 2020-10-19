

//Check surroundings
function checkSurroundings(row, col, isAlive){
    let totalSurroundings = CheckRows(row - 1, col, 0, row) + CheckRows(row + 1, col, NumRows - 1, row) + CheckCols(row, col, -1) + CheckCols(row, col, 1); // + CheckBottemRows(row, col) + CheckCols(row, col);;
    //
    if (isAlive) {
        if (totalSurroundings < 2 || totalSurroundings > 3 ) {
           // console.log("cell will die " + col, row + " with " + totalSurroundings + " neighbors");
          return false;
          
         }
         else {
          // console.log("cell will survive" +  col, row + "with " + totalSurroundings + " neighbors");

             return true;

         }
        }
        //check if a cell will be generated
            else {
                if(totalSurroundings == 3) {
                   // console.log("cell will be born " +  row, col  + "with " + totalSurroundings + " neighbors");

                    return true;

                }
                 else {
                   // console.log("not enough to make a new cell " + totalSurroundings);

                     return false;
                 }
             } 

}


function CheckRows(row, col, endpoint, CurrentRow){
  //check if the current square is on the top row
  let returnValue = 0;
  if (CurrentRow != endpoint) {
      if (gridCopy[row][col-1] == 1) {
          returnValue++;
      }
      if (gridCopy[row][col] == 1){
              returnValue++;
      }
      if (gridCopy[row][col+1] == 1) {
          returnValue++;
      }
  }
      //check the top left
    //  console.log(row, col);
  return(returnValue);
}


function CheckCols(row, col, colSide) {
    let returnValue = 0;
    if (col != grid.length){
        if (gridCopy[row][col + colSide] == 1){
            returnValue++;
        }
    }
  //  console.log(row, col);

    return(returnValue);
}
