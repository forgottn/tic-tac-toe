@javascript
Feature: playing tic tac toe

  As a player,
  So that I can play tic tac toe,
  I want to be able to click on squares to play moves

Background: I am on the index page

  Given I am on the home page

Scenario: Clicking an empty square
  Given the board is now:
  |   |   |   |
  |   |   |   |
  |   |   |   |
  And it is "Player A's" move
  And I click the first square
  Then the board should be:
  | X |   |   |
  |   |   |   |
  |   |   |   |
  And it should be "Player B's" turn

Scenario: Clicking a square already filled in
	Given the board is now:
  | X |   |   |
  |   |   |   |
  |   |   |   |
  And it is "Player B's" move
  And I click the first square
  Then the board should not change
  And it should be "Player B's" turn

Scenario: Player A win
  Given the board is now:
  | X |   | O |
  |   | O |   |
  | X | O | X |
  And it is "Player A's" move
  And I click the fourth square
  Then the board should be:
  | X |   | O |
  | X | O |   |
  | X | O | X |
  And it should say "Player A Wins"

Scenario: Player B win
  Given the board is now:
  | X | O | X |
  | O |   | X |
  | X | O |   |
  And it is "Player B's" move
  And I click the fifth square
  Then the board should be:
  | X | O | X |
  | O | O | X |
  | X | O |   |
  And it should say "Player B Wins"

Scenario: Draw
  Given the board is now:
  | X | X | O |
  | O | O | X |
  | X | O |   |
  And it is "Player A's" move
  And I click the last square
  Then the board should be:
  | X | X | O |
  | O | O | X |
  | X | O | X |
  And it should say "Draw"