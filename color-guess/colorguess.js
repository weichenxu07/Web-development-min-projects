(function() {
	var answerColor = "";
	var hardMode = true;
	const DEFAULT_COLOR = "#232323";
	const UW_PURPLE = "#4b2e83";

	window.onload = function() {
		let allSquares = document.querySelectorAll(".square");
		for (let i = 0; i < allSquares.length; i++) {
			allSquares[i].addEventListener("click", makeGuess);
		}
		document.getElementById("restart").addEventListener("click", function(){
			initializeGame(hardMode);
		});
		let allModeBtn = document.querySelectorAll(".modeBtn");
		for (let i = 0; i < allModeBtn.length; i++) {
			allModeBtn[i].addEventListener("click", function(){
				hardMode = !hardMode;
				for (let j = 0; j < allModeBtn.length; j++) {
					allModeBtn[j].classList.remove("selected");
				}
				this.classList.add("selected");
				initializeGame(hardMode);
			})
		}
		initializeGame(hardMode);
	};

	/**
	 * Checks if the picked color is the answer
	 */
	function makeGuess() {
		let guessColor = this.style.backgroundColor;
		if (guessColor === answerColor) {
			document.getElementById("resultmessage").textContent = "Correct!";
			finishGame();
		} else {
			document.getElementById("resultmessage").textContent = "Try Again!";
			this.style.backgroundColor = DEFAULT_COLOR;
		}
	}

	/**
	 * Randomly generates a rgb color
	 * @return {string} string representation of rgb color
	 */
	function randomColor() {
		let resultColor = "rgb(";
		for (let i = 0; i < 3; i++) {
			let rbgValue = parseInt(Math.random() * 256);
			resultColor += rbgValue + ", ";
		}
		resultColor = resultColor.substring(0, resultColor.length - 2);
		resultColor += ")"
		return resultColor;
	}

	/**
	 * Initializes the game based on the mode selected(hard/ easy)
	 * @param  {boolean} hardMode - boolean flag of if the game is on hard mode
	 */
	function initializeGame(hardMode) {
		let numSquares = null;
		hardMode ? numSquares = 6 : numSquares = 3;
		let allSquares = document.querySelectorAll(".square");
		for (let i = 0; i < allSquares.length; i++) {
			if (hardMode || i < numSquares) {
				allSquares[i].style.backgroundColor = randomColor();
				allSquares[i].classList.remove("hidden");
			} else {
				allSquares[i].classList.add("hidden");
			}
		}
		// if it is easy mode, hide last three squares
		let pick = parseInt(Math.random() * numSquares);
		answerColor = allSquares[pick].style.backgroundColor;
		let displayResult = document.getElementById("displayresult");
		displayresult.textContent = answerColor;
		document.querySelector("h1").style.backgroundColor = UW_PURPLE;
		document.getElementById("restart").textContent = "New Colors";
		document.getElementById("resultmessage").textContent = "";
	}

	/**
	 * Ends the current game, updating UI theme color to answer
	 */
	function finishGame() {
		let allSquares = document.querySelectorAll(".square");
		for (let i = 0; i < allSquares.length; i++) {
			allSquares[i].style.backgroundColor = answerColor;
		}
		let title = document.querySelector("h1");
		title.style.backgroundColor = answerColor;
		document.getElementById("restart").textContent = "Play Again?";
	}

}) ();