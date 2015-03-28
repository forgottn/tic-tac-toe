var currentPlayer = 'A';
var undoList = [];
var Game = {
  setup: function() {
    $('table#board').on('click', 'td', Game.playMove);
    $(document).on('click', '#undo', Game.undo);
    Game.changeMessage("Player " + currentPlayer + "'s Move");
  },
  playMove: function() {
    var cell = $(this);

    if( Game.isValid( cell ) ) {
      Game.markCell( cell );
      Game.addMove( cell );
      Game.checkGameState();
    } else {
      Game.changeMessage("Invalid move. Choose another spot. Player " + currentPlayer + "'s Move");
    }
  },
  isValid: function( cell ) {
    return cell.text() === '';
  },
  markCell: function( cell ) {
    var cellChar = (currentPlayer === 'A') ? 'X' : 'O';
    cell.addClass( (currentPlayer === 'A') ? 'blue' : 'red' );
    cell.html( cellChar );
  },
  addMove: function( cell ) {
    undoList.push(cell.attr('id'));
  },
  switchPlayer: function() {
    currentPlayer = (currentPlayer === 'A') ? 'B' : 'A';
    $('#status').toggleClass('red blue');
    Game.changeMessage("Player " + currentPlayer + "'s Move");
  },
  checkGameState: function() {
    var boardLength = $('table#board tr').length;
    var index, prevInd, row, col;
    
    // Check rows for NxN board
    for (var row = 0; row < boardLength; row++) {
      if ($('#cell_' + (row * boardLength)).text() !== '') {
        for (col = 1; col < boardLength; col++) {
          index = row * boardLength + col;
          if ($('#cell_' + index).text() !== $('#cell_' + (index - 1)).text()) {
            break;
          }
        }
        if (col === boardLength) {
          Game.win();
          return false;
        }
      }
    }

    // Check columns for NxN board
    for (col = 0; col < boardLength; col++) {
      if ($('#cell_' + col).text() !== '') {
        for (row = 1; row < boardLength; row++) {
          index = row * boardLength + col;
          if ($('#cell_' + index).text() !== $('#cell_' + (index - boardLength)).text()) {
            break;
          }
        }
        if (row === boardLength) {
          Game.win();
          return false;
        }
      }
    }

    // Check diagonal for NxN board
    if ($('#cell_0').text() !== '') {
      for (row = 1; row < boardLength; row++) {
        index = row * boardLength + row;
        prevInd = (row - 1) * boardLength + (row - 1);
        if ($('#cell_' + index).text() !== $('#cell_' + prevInd).text()) {
          break;
        }
      }
      if (row === boardLength) {
        Game.win();
        return false;
      }
    }

    // Check reverse diagonal for NxN board
    if ($('#cell_' + (boardLength-1)).text() !== '') {
      for (row = 1; row < boardLength; row++) {
        index = (boardLength - row - 1) * boardLength + row;
        prevInd = (boardLength - row) * boardLength + (row - 1);
        if ($('#cell_' + index).text() !== $('#cell_' + prevInd).text()) {
          break;
        }
      }
      if (row === boardLength) {
        Game.win();
        return false;
      }
    }

    for (var i = 0; i < $('table#board td').length; i++) {
      if ($('#cell_' + i).text() === '') {
        break;
      }
      if (i === $('table#board td').length - 1) {
        Game.draw();
        return false;
      }
    }

    Game.switchPlayer();
  },
  win: function() {
    $('#status').removeClass("red blue");
    $('#status').addClass("green");
    Game.changeMessage("Player " + currentPlayer + " Wins");
    Game.gameOver();
    return false;
  },
  draw: function() {
    $('#status').removeClass("red blue");
    $('#status').addClass("green");
    Game.changeMessage("Draw");
    Game.gameOver();
    return false;
  },
  gameOver: function() {
    $('table#board').off('click', 'td', Game.playMove);
    $(document).off('click', '#undo', Game.undo);
    $('#undo').prop("disabled", true);
  },
  changeMessage: function( message ) {
    $('#status').text(message);
  },
  undo: function() {
    if(undoList.length !== 0) {
      var cell = undoList.pop();
      $('#' + cell).text('');
      Game.switchPlayer();
    } else {
      Game.changeMessage("No moves to undo. Player " + currentPlayer + "'s Move");
    }
  }
};


// Testing purposes
function setPlayer(player) {
  currentPlayer = player;
}

$(Game.setup);