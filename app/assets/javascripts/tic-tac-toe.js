var Game = {
  setup: function() {
    $('table#board').on('click', 'td', Game.playMove);
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
    var cellChar = (currentPlayer == 'A') ? 'X' : 'O';
    cell.addClass( (currentPlayer == 'A') ? 'blue' : 'red' );
    cell.html( cellChar );
  },
  switchPlayer: function() {
    currentPlayer = (currentPlayer == 'A') ? 'B' : 'A';
    $('#status').toggleClass('red blue');
    Game.changeMessage("Player " + currentPlayer + "'s Move");
  },
  checkGameState: function() {
    var boardLength = $('table#board tr').length;
    
    // Check rows for NxN board
    for (row = 0; row < boardLength; row++) {
      if ($('#cell_' + (row * boardLength)).text() != '') {
        for (col = 1; col < boardLength; col++) {
          var index = row * boardLength + col;
          if ($('#cell_' + index).text() != $('#cell_' + (index - 1)).text()) {
            break;
          }
        }
        if (col == boardLength) {
          Game.win();
          return false;
        }
      }
    }

    // Check columns for NxN board
    for (col = 0; col < boardLength; col++) {
      if ($('#cell_' + col).text() != '') {
        for (row = 1; row < boardLength; row++) {
          var index = row * boardLength + col;
          if ($('#cell_' + index).text() != $('#cell_' + (index - boardLength)).text()) {
            break;
          }
        }
        if (row == boardLength) {
          Game.win();
          return false;
        }
      }
    }

    // Check diagonal for NxN board
    if ($('#cell_0').text() != '') {
      for (row = 1; row < boardLength; row++) {
        var index = row * boardLength + row;
        var prevInd = (row - 1) * boardLength + (row - 1);
        if ($('#cell_' + index).text() != $('#cell_' + prevInd).text()) {
          break;
        }
      }
      if (row == boardLength) {
        Game.win();
        return false;
      }
    }

    // Check reverse diagonal for NxN board
    if ($('#cell_' + (boardLength-1)).text() != '') {
      for (row = 1; row < boardLength; row++) {
        var index = (boardLength - row - 1) * boardLength + row;
        var prevInd = (boardLength - row) * boardLength + (row - 1);
        if ($('#cell_' + index).text() != $('#cell_' + prevInd).text()) {
          break;
        }
      }
      if (row == boardLength) {
        Game.win();
        return false;
      }
    }

    for (index = 0; index < $('table#board td').length; index++) {
      if ($('#cell_' + index).text() === '') {
        break;
      }
      if (index == $('table#board td').length - 1) {
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
  },
  changeMessage: function( message ) {
    $('#status').text(message);
  }
};

var currentPlayer = 'A';
var undoList = [];

// Testing purposes
function setPlayer(player) {
  currentPlayer = player;
}

$(Game.setup);