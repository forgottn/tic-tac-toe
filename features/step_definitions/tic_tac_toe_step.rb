require 'uri'
require 'cgi'
require File.expand_path(File.join(File.dirname(__FILE__), "..", "support", "paths"))
require File.expand_path(File.join(File.dirname(__FILE__), "..", "support", "selectors"))


Given /^(?:|I )am on (.+)$/ do |page_name|
  visit path_to(page_name)
end

Given /the board is now/ do |board_table|
  board_length = board_table.raw.length
  board_table.raw.each_index do |row|
    board_table.raw[row].each_index do |col|
      index = row * board_length + col
      page.execute_script("$('#cell_#{index}').text('#{board_table.raw[row][col]}');")
    end
  end
end

Then /^it is "Player ([AB])'s" move$/ do |current_player|
  page.execute_script("setPlayer('#{current_player}');")
end

Then /^(?:|I )click the (.+) square$/ do |cell|
  case cell
  when "first"
    index = 0
  when "second"
    index = 1
  when "third"
    index = 2
  when "fourth"
    index = 3
  when "fifth"
    index = 4
  when "sixth"
    index = 5
  when "seventh"
    index = 6
  when "eigth"
    index = 7
  when "ninth", "last"
    index = 8
  else
    raise "No such square.\n"
  end
  find(:xpath, "//td[@id='cell_#{index}']").click
end

Then(/the board should be/) do |board_table|
  table_results = page.find('table#board').all('tr').map do |row|
    row.all('td').map do |cell|
        cell.text.strip
    end
  end
  expected_table = board_table.raw
  expected_table.should == table_results 
end

Then(/^it should be "(.+)" turn$/) do |player|
  if page.respond_to? :should
    page.should have_content(player)
  else
    assert page.has_content?(player)
  end
end

Then(/^the board should not change$/) do
end

Then(/^it should say "(.+)"$/) do |status|
  if page.respond_to? :should
    page.should have_content(status)
  else
    assert page.has_content?(status)
  end
end