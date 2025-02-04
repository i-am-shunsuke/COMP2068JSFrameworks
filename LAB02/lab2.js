const prompt = require('prompt-sync')();

// 38:52

// Ask user to choose ROCK, PAPER, or SCISSORS
const userSelection = prompt("Choose ROCK, PAPER, or SCISSORS: ").toUpperCase();

// Generate computer selection
const randomNum = Math.random();
let computerSelection;

if (randomNum <= 0.34) {
    computerSelection = "PAPER";
} else if (randomNum <= 0.67) {
    computerSelection = "SCISSORS";
} else {
    computerSelection = "ROCK";
}

// Display selections
console.log(`User Selection: ${userSelection}`);
console.log(`Computer Selection: ${computerSelection}`);

// Determine the winner
if (userSelection === computerSelection) {
    console.log("It's a tie");
} else if (
    (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
    (userSelection === "PAPER" && computerSelection === "ROCK") ||
    (userSelection === "SCISSORS" && computerSelection === "PAPER")
) {
    console.log("User Wins");
} else {
    console.log("Computer Wins");
}
