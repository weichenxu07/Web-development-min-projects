"use strict";
(function(){
	var circle = true;
	const SIZE = 3;

	window.onload = function() {
		let allTile = document.querySelectorAll(".tile");
		let board =[[],[],[]]; // record each step in SIZE * SIZE matrix
		for (let i = 0; i < SIZE; i++) {
			for (let j = 0; j < SIZE; j++) {
				allTile[i * SIZE + j].onclick = function() {
					takeStep(board, i, j, this);
				};
				board[i][j] = "empty";
			}
		}
		let restart = $("#restart");
		restart.onclick = function() {
			restartGame(board);
		};
	}

	/**
	 * Changes the mark on the tile
	 * @param  {array} board - stores all the marks have made on the checkerboard
	 * @param  {number} row - row number where tile is
	 * @param  {number} col - col number where tile is
	 * @param  {object} tile - current clicked tile
	 */
	function takeStep(board, row, col, tile) {
		if (!tile.classList.contains("checked")) {
			if (circle) {
				tile.style.backgroundImage = "url('./circle.png')";
				board[row][col] = "circle";
			} else {
				tile.style.backgroundImage = "url('./cross.png')";
				board[row][col] = "cross";
			}
			tile.classList.add("checked");
			console.log(board);
			let winFlag = checkResult(board, row, col);
			let drawFlag = checkDraw(board);
			let result = "";
			if (winFlag) {
				result = board[row][col] + " wins!"; 
				$("#result").innerHTML = result.toUpperCase();
				$("#result").style.display = "inline";
				// if game has a winner, disables all the tiles
				let allTile = document.querySelectorAll(".tile");
				for (let i = 0; i < allTile.length; i++) {
					allTile[i].classList.add("checked");
				}
			} else if (drawFlag) {
				result = "DRAW...";
				$("#result").innerHTML = result;
				$("#result").style.display = "inline";
			}
			changeTurn();
		}
	}

	/**
	 * Check if the game is over, in other word, if there is a winner
	 * @param  {array} board - stores all the marks have made on the checkerboard
	 * @param  {number} row - row number where tile is
	 * @param  {number} col - col number where tile is
	 * @return {boolean} boolen variable whether there is a winner
	 */
	function checkResult(board, row, col) {
		let currentStep = board[row][col];
		var winFlag = true;
		// check row
		for (let i = 0; i < SIZE; i++) {
			if (board[row][i] != currentStep) {
				winFlag = false;
				break;
			}
		}
		// check col
		if (!winFlag) {
			winFlag = true;
			for (let i = 0; i < SIZE; i++) {
				if (board[i][col] != currentStep) {
					winFlag = false;
					break;
				}
			}
		}
		// check diagonal
		if (!winFlag) {
			if (row == col) {
				winFlag = true;
				for (let i = 0; i < SIZE; i++) {
					if (board[i][i] != currentStep) {
						winFlag = false;
					}
				}
			}
		}

		if (!winFlag) {
			if (row + col == 2) {
				winFlag = true;
				for (let i = 0; i < SIZE; i++) {
					if (board[i][2 - i] != currentStep) {
						winFlag = false;
					}
				}
			}
		}

		return winFlag;
	}

	/**
	 * Checks if the game is draw
	 * @param  {array} board - stores all the marks have made on the checkerboard
	 * @return {boolean} boolen variable whether board is full
	 */
	function checkDraw(board) {
		let drawFlag = true;
		for (let i = 0; i < SIZE; i++) {
			for (let j = 0; j < SIZE; j++) {
				if (board[i][j] == "empty") {
					drawFlag = false;
				}
			}
		}
		return drawFlag;
	}

	/**
	 * Restarts the game
	 * @param  {array} board - stores all the marks have made on the checkerboard
	 */
	function restartGame(board) {
		for (let i = 0; i < SIZE; i++) {
			for (let j = 0; j < SIZE; j++) {
				board[i][j] = "empty";
			}
		}
		let allTile = document.querySelectorAll(".tile");
		for (let i = 0; i < allTile.length; i++) {
			allTile[i].classList.remove("checked");
			allTile[i].style.backgroundImage = "none";
		}
		circle = false;
		$("#result").style.display = "none";
		changeTurn();
	}

	/**
	 * Changes the current turn and its display on control panel
	 */
	function changeTurn() {
		if(circle) {
			$("#currentturn").src = "./cross.png";
			circle = false;
		} else {
			$("#currentturn").src = "./circle.png";
			circle = true;
		}
	}

	/**
	 * Returns the element that matches the specific selector.
	 * @param  {string} query - css selector
	 * @return {object} DOM object associated with the selector
	 */
	function $(query) {
		return document.querySelector(query);
	}
}) ();