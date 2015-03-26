class HomeController < ApplicationController
	def index
		@board = (0..8).to_a
	end
end