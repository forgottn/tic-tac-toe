describe("TicTacToe", function() {
	describe('clicking', function() {
		beforeEach(function() { 
			loadFixtures('blank_board.html'); 
			$('#cell_0').trigger('click');
		});
		describe('on valid square', function() {
			it('changes the square to X', function() {
				$('#cell_0').toHaveText('X');
			});
			it('changes the current player to B', function() {
				$('#status').toHaveText("Player B's turn");
			});
		});
		describe('on invalid square', function() {
			it("should be Player B's turn", function() {
				$('#status').toHaveText("Player B's turn");
			});
			it('does not change the square', function() {
				$('#cell_0').trigger('click');
				$('#cell_0').toHaveText('X');
			});
			it('does not change the current player', function() {
				$('#status').toHaveText("Player B's turn");
			});
		});
	});
	describe('game status', function() {
		beforeEach(function() { 
			loadFixtures('filled_board.html'); 
		});
		it('should switch players if the game continues', function() {
			$('#status').toHaveText("Player A's turn");
			$('#cell_8').trigger('click');
			$('#status').toHaveText("Player B's turn");
		});
		it('should be Player A wins if X fills a row, column or diagonal', function() {
			$('#cell_2').trigger('click');
			$('#status').toHaveText("Player A wins");
		});
		it('should be Player B wins if O fills a row, column or diagonal', function() {
			$('#cell_8').trigger('click');
			$('#cell_5').trigger('click');
			$('#status').toHaveText("Player B wins");
		});
		it('should be a draw if all cells are filled and no one has won yet', function() {
			$('#cell_8').trigger('click');
			$('#cell_3').trigger('click');
			$('#cell_5').trigger('click');
			$('#status').toHaveText("Draw");
		});
	});
});