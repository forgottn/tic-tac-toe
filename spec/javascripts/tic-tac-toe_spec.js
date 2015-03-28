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
			expect($('#status')).toHaveText("Winner: Player A");
		});
		it('should be Player B wins if O fills a row, column or diagonal', function() {
			$('#cell_8').trigger('click');
			$('#cell_5').trigger('click');
			expect($('#status')).toHaveText("Winner: Player B");
		});
		it('should be a draw if all cells are filled and no one has won yet', function() {
			$('#cell_8').trigger('click');
			$('#cell_2').trigger('click');
			$('#cell_5').trigger('click');
			expect($('#status')).toHaveText("Draw");
		});
	});
	describe('undo', function() {
		beforeEach(function() {
			loadFixtures('blank_board.html');
			undoList = [];
			currentPlayer = 'A';
			$(Game.setup);
		})
		describe('once', function() {
			it('should change the square to X', function() {
				$('#cell_0').trigger('click');
				expect($('#cell_0')).toHaveText('X');
			});
			it('changes the current player to B', function() {
				$('#cell_0').trigger('click');
				expect($('#status')).toHaveText("Player B's Move");
			});
			it('should add to the list of moves', function() {
				$('#cell_0').trigger('click');
				expect(undoList).toEqual(['cell_0'])
			})
			it('should change the square to blank', function() {
				$('#undo').trigger('click');
				expect($('#cell_0')).toHaveText('');
			});
			it("should be back to Player A's turn", function() {
				expect($('#status')).toHaveText("Player A's Move");
			});
		});
		describe('multiple', function() {
			beforeEach(function() {
				$('#cell_0').trigger('click');
				$('#cell_1').trigger('click');
				$('#cell_2').trigger('click');
			});
			it('should all be blank after hitting undo three times', function() {
				$('#undo').trigger('click');
				$('#undo').trigger('click');
				$('#undo').trigger('click');
				expect($('#cell_0')).toHaveText('');
				expect($('#cell_1')).toHaveText('');
				expect($('#cell_2')).toHaveText('');
			});
			it('should add to the list of moves', function() {
				expect(undoList).toEqual(['cell_0', 'cell_1', 'cell_2']);
			});
		});
		describe('invalid', function() {
			it('should say no moves to undo', function() {
				$('#undo').trigger('click');
				expect($('#status')).toContainText('No moves to undo.');
			});
		});
	});
});