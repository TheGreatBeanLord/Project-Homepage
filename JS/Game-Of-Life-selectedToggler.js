
function select(row, col) {
    if (grid[row][col] == 1) {
    document.getElementById("cell" + row + col).classList.add("selected");
    }
        else {
    document.getElementById("cell" + row + col).classList.remove("selected");

        }
}