/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

/* 
    create a class of game
    add the constructor of p1, p2, with the height equal to 6, and width equal to 7
    Store player references in an array within the 'players' property of this object
    Assign the value of the 'height' parameter to the 'height' property of this object
    Assign the value of the 'width' parameter to the 'height' property of this object
    Assign the reference of 'p1' to the 'currPlayer' property of this object
    Let's create this game board now! 
    let's make this HTML boad!
    Setting the 'gameOver' flag to false, indicating that the game is not yet over.
*/
class Game {
    constructor(p1, p2, height = 6, width = 7) {
      this.players = [p1, p2];
      this.height = height;
      this.width = width;
      this.currPlayer = p1;
      this.makeBoard();
      this.makeHtmlBoard();
      this.gameOver = false;
    }
    /** makeBoard: create in-JS board structure:
 *   board = array of rows, each row is array of cells  (board[y][x])
 */
    /*
      // Function to create the game board.
      // Initializing an empty array to store the game board.
      // Iterate over each row of the game board. (in this case replace 'i' with 'y' and y < this.height)
      // push this board onto a new, shallow-copied array with the length being this.width
    */
      makeBoard() {
        this.board = [];
        for (let y = 0; y < this.height; y++) {
          this.board.push(Array.from({ length: this.width }));
        }
      }
    /** makeHtmlBoard: make HTML table and row of column tops.  */
    // Function to create the HTML representation of the game board.
    // Get the reference to the HTML element with the id 'board'.
    // Clear the content inside the HTML element with the id 'board'. 
    makeHtmlBoard() {
        const board = document.getElementById('board');
        board.innerHTML = '';

        // make column tops (clickable area for adding a piece to that column)
        // Create a new table row element. with the alias of top
        // Set the id attribute of the 'top' element to 'column-top'.
        const top = document.createElement('tr');
        top.setAttribute('id', 'column-top');

        // store a reference to the handleClick bound function
        // so that we can remove the event listener correctly later
        // Binding the 'handleClick' method to the current object ('this') and assigning it to 'handleGameClick'.
        this.handleGameClick = this.handleClick.bind(this);

        // Add a click event listener to the 'top' element, triggering the 'handleGameClick' method when clicked.
        top.addEventListener("click", this.handleGameClick);

        // Iterate over each column of the game board. exchange 'i' with 'x'. x is less than this.width
        // Create a new table data (cell) element. give it an alias of "headCell"
        // Set the id attribute of the 'headCell' element to the value of 'x'.
        // Append the 'headCell' element to the 'top' row.
        for (let x = 0; x < this.width; x++) {
            const headCell = document.createElement('td');
            headCell.setAttribute('id', x);
            top.append(headCell);
        }
        // Append the 'top' row to the 'board' element.
        board.append(top);

        // make main part of board
        // Iterate over each row of the game board. (in this case replace 'i' with 'y' and y < this.height)
        // Create a new table row element. with the alias of row
        // Iterate over each column of the game board. exchange 'i' with 'x'. x is less than this.width
        // Create a new table data (cell) element.
        // Set the id attribute of the 'cell' element to the coordinate (y-x) of the game board.
        // Append the 'cell' element to the current row ('row').
        for (let y = 0; y < this.height; y++) {
            const row = document.createElement('tr');

            for (let x = 0; x < this.width; x++) {
                const cell = document.createElement('td');
                cell.setAttribute('id', `${y}-${x}`);
                row.append(cell);
              }
            // Append the current row ('row') to the game board ('board').
            board.append(row);
        }
    }
    /** findSpotForCol: given column x, return top empty y (null if filled) */
    // Find the first available spot in column 'x' for dropping a game piece.
    /*
    // Iterate over each row of the game board, starting from the bottom row and moving upwards.
    // This loop is designed to search for the first available spot in the column (specified by 'x')
    // where a game piece can be dropped. Starting from the bottom ensures that we prioritize
    // filling up the bottom-most empty spots in the column before moving upwards.
    */
    // Check if the cell at position (y, x) on the game board is empty.
    // return y

    // return null
    findSpotForCol(x) {
        for (let y = this.height - 1; y >= 0; y--) {
          if (!this.board[y][x]) {
            return y;
            }
        }
        return null
    }
    /** placeInTable: update DOM to place piece into HTML board */
    // Place a game piece in the HTML table at position (y, x).
    // Create a new div element to represent a game piece. with an alias of 'piece'
    // Add the 'piece' class to the game piece element.
    // Set the background color of the game piece to the current player's color.
    // Position the game piece above the game board, based on its row (y) index.
    placeInTable(y, x) {
        const piece = document.createElement('div');
        piece.classList.add('piece');
        piece.style.backgroundColor = this.currPlayer.color;
        piece.style.top = -50 * (y + 2);
        
        // Get the HTML element representing the spot at position (y, x) on the game board.
        // Append the game piece to the spot at position (y, x) on the game board.
        const spot = document.getElementById(`${y}-${x}`);
        spot.append(piece);
    }
    /** endGame: announce game end */
    // End the game with the specified message.
    // Display an alert message with the provided message.
    // Select the HTML element with the id 'column-top', representing the top row of the game board. with an alias of 'top'
    // Remove the click event listener from the 'top' element, previously added to trigger 'handleGameClick'.
    endGame(msg) {
        alert(msg);
        const top = document.querySelector("#column-top");
        top.removeEventListener("click", this.handleGameClick);
    }
    /** handleClick: handle click of column top to play piece */
    // Event handler for handling click events on the game board.
    // Extract the column index (x-coordinate) from the id of the clicked element.
    handleClick(evt) {
        const x = +evt.target.id
        // get next spot in column (if none, ignore click)
        // Find the first available spot (row index) in column 'x' for dropping a game piece.
        // if y === null
        // return ;
        const y = this.findSpotForCol(x);
        if (y === null) {
          return;
        }
        this.board[y][x] = this.currPlayer;
        this.placeInTable(y, x);
        // Check if the game board is completely filled with game pieces, indicating a tie.
        // End the game with a tie message if the board is full.
        if (this.board.every(row => row.every(cell => cell))) {
            return this.endGame('Tie!')
        }
        // check for win
        // Check if there is a winner on the game board.
        // Set the 'gameOver' flag to true to indicate that the game has ended.
        // return End the game with a victory message for the current player.
        if (this.checkForWin()) {
            this.gameOver = true;
            return this.endGame(`The ${this.currPlayer.color} player won!`);
          }
        // switch players
        this.currPlayer =
        this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
    }
    checkForWin() {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer
        const _win = cells =>
      cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer
      );
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                // get "check list" of 4 cells (starting here) for each of the different
                // ways to win
                const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
                const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
                const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
                const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
                // find winner (only checking each win-possibility as needed)
                if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                    return true
                }
            }
        }
    }
}

class Player {
    constructor(color) {
      this.color = color;
    }
  }
  
  document.getElementById('start-game').addEventListener('click', () => {
    let p1 = new Player(document.getElementById('p1-color').value);
    let p2 = new Player(document.getElementById('p2-color').value);
    new Game(p1, p2);
  });