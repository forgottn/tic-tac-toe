describe("TicTacToe", function() {
	describe('clicking', function() {
		beforeEach(function() { 
			loadFixtures('blank_board.html');
			currentPlayer = 'A';
			$(Game.setup);
			$('#cell_0').trigger('click');
		});
		describe('on valid square', function() {
			it('changes the square to X', function() {
				expect($('#cell_0')).toHaveText('X');
			});
			it('changes the current player to B', function() {
				expect($('#status')).toHaveText("Player B's Move");
			});
		});
		describe('on invalid square', function() {
			it("should be Player B's Move", function() {
				expect($('#status')).toHaveText("Player B's Move");
			});
			it('does not change the square', function() {
				$('#cell_0').trigger('click');
				expect($('#cell_0')).toHaveText('X');
			});
			it('does not change the current player', function() {
				$('#cell_0').trigger('click');
				expect($('#status')).toContainText("Player B's Move");
			});
		});
	});
	describe('game status', function() {
		beforeEach(function() { 
			loadFixtures('filled_board.html');
			currentPlayer = 'A';
			$(Game.setup);
		});
		it('should switch players if the game continues', function() {
			$('#cell_8').trigger('click');
			expect($('#status')).toHaveText("Player B's Move");
		});
		it('should be Player A wins if X fills a row, column or diagonal', function() {
			$('#cell_2').trigger('click');
			expect($('#status')).toHaveText("Player A Wins");
		});
		it('should be Player B wins if O fills a row, column or diagonal', function() {
			$('#cell_8').trigger('click');
			$('#cell_5').trigger('click');
			expect($('#status')).toHaveText("Player B Wins");
		});
		it('should be a draw if all cells are filled and no one has won yet', function() {
			$('#cell_8').trigger('click');
			$('#cell_2').trigger('click');
			$('#cell_5').trigger('click');
			expect($('#status')).toHaveText("Draw");
		});
	});
});