// Generates Grid and array



function createGridArray(){
    
    let GridArray2d = new Array;
    let anArray = new Array;
    for (let row = 0; row < NumRows; row++){
        
        anArray.push(0);
        console.log(anArray);
    }

    for (let col = 0; col < NumCols; col++){
        GridArray2d.push(anArray.slice(0, anArray.length));
    }

return(GridArray2d);
}




function createDivGrid(grid){
    for (let row = 0; row < NumRows; row++) {
        for (let col = 0; col < NumCols; col++) {
            //Create a div for each element in 2d gid
        
            let divEl = document.createElement("div");

            //add an id to each divEl
            divEl.id = "cell" + row + col;

            //add appropriate classs to each diveEl
            if (grid[row][col] == 1) {
                divEl.classList.add("selected");
            }

            // add dataset values for row and col

            divEl.dataset.row = row;
            divEl.dataset.col = col;

            //add an event listener to each div element
            divEl.addEventListener("click", cellClicked);


            //add div to container
            document.getElementById("container").append(divEl);


            divEl.style.width = 1000 / NumRows + "px";
            divEl.style.height = 1000 / NumRows + "px";

        }
    }

function cellClicked(event){
    console.log(event.target);
    //set the color of the clicked cell

    let row = event.target.dataset.row;
    let col = event.target.dataset.col;

    if (grid[row][col] == 1) {

    grid[row][col] = 0; 
    event.target.classList.remove("selected");

    }
    else {
    grid[row][col] = 1;
    event.target.classList.add("selected");

    }
    //get value of color select element
    
}
}
