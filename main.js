var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var inquirer = require("inquirer");


var basicQuestions = [
	{
		front: "The United States Constitution replaced what other document on March 4, 1789?",
		back: "The Articles of Confederation"
	},
	{
		front: "Ruling for 64 years, which Queen was the longest-reigning British monarch?",
		back: "Queen Victoria"
	},
	{
		front: "In humans, what is the only internal organ capable of regenerating lost tissue?",
		back: "The Liver"
	},
	{
		front: "In 1975 an engineer created the first electronic camera while working for what company?",
		back: "Kodak"
	}
]

// Variable that holds the cloze-deleted questions list
var clozeQuest = [
	{
		text: "The Articles of Confederation was replaced by The United States Constitution on March 4, 1789.",
		cloze: "The United States Constitution"
	},
	{
		text: "Queen Victoria ruled the British monarch for 64 years.",
		cloze: "Queen Victoria"
	},
	{
		text: "The only internal organ capable of regenerating lost tissue is the Liver",
		cloze: "The Liver"
	},
	{
		text: "In 1975 an engineer created the first electronic camera while working for Kodak",
		cloze: "Kodak"
	}
]


// Populate the cloze-deleted questions list
for (var i = 0; i < questions.length; i++) {
	var q = new flashCards.ClozeCard(questions[i].text, questions[i].cloze);
	clozeQuest.push(q);
}

// Index of the current question
var questIndex = 0;
// Counter of correct answers
var rightAns = 0;
// Counter of wrong answers
var wrongAns = 0;

// asker prompts the user to answer a given cloze-deleted question
function asker() {
	inquirer.prompt([
		{
			type: "input",
			message: clozeQuest[questIndex].partial + "\nAnswer: ",
			name: "userGuess"
		}
	]).then(function (answers) {
		console.log("\n");

		// Check players answer
		if (answers.userGuess.toLowerCase() === clozeQuest[questIndex].cloze.toLowerCase()) {
			console.log("Correct!");
			rightAns++;
		} else {
			console.log("Incorrect!");
			wrongAns++;
		}

		// Show the correct answer
		console.log(clozeQuest[questIndex].text);
		console.log("\n");

		// Iterate through questions
		if (questIndex < clozeQuest.length - 1) {
			questIndex++;
			asker();
		} else {
			console.log("Game Over!");
			console.log("You got " + rightAns + " right answers.");
			console.log("You got " + wrongAns + " answers wrong.");

			console.log("\n");

			// Prompt to replay the game
			inquirer.prompt([
				{
					type: "confirm",
					message: "Replay?",
					name: "replay"
				}
			]).then(function (answers) {
				if (answers.replay) {
					questIndex = 0;
					rightAns = 0;
					wrongAns = 0;
					asker();
				} else {
					console.log("Game over");
				}
			})
		}
	})
}

// Begin asking the questions!
asker();