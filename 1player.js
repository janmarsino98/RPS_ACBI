// const choices_map = new Map()
// choices_map.set("r", "rock")
// choices_map.set("s", "scissors")
// choices_map.set("p", "paper")

// class GameVsComputer {
//     constructor(Player, Computer) {
//         this.player = Player;
//         this.computer = Computer;
//     }
//     play(playerChoice, computerChoice) {

//         let player1scoreElement = document.getElementsByClassName('player1score')[0];
//         let player2scoreElement = document.getElementsByClassName('player2score')[0];

//         // Convert the text of the elements into integers. Ensure you're accessing the textContent of the elements correctly.
//         let player1score = parseInt(player1scoreElement.textContent, 10);
//         let player2score = parseInt(player2scoreElement.textContent, 10);

//         // Create constants
//         const player1move = document.getElementById('player1move')
//         const player2move = document.getElementById('player2move')

//         // If draw we just print draw but scores are not modified.
//         if (playerChoice === computerChoice) {
//             console.log("")
//         }
//         // Corrected the winning conditions: Paper beats Rock, Rock beats Scissors, Scissors beats Paper.
//         else if ((playerChoice == "r" && computerChoice == "s") ||
//             (playerChoice == "p" && computerChoice == "r") ||
//             (playerChoice == "s" && computerChoice == "p")) {
//             player1score += 1;
//             player1scoreElement.textContent = player1score.toString();
//             player1move.style.backgroundColor = "#005025f6"
//             player2move.style.backgroundColor = "black"

//         } else {
//             player2score += 1;
//             player2scoreElement.textContent = player2score.toString();
//             player1move.style.backgroundColor = "black"
//             player2move.style.backgroundColor = "#005025f6"
//         }
//         console.log(player1score)
//         if (player1score == 3) {
//             window.location.href = '/winner.html'
//         } else if (player2score == 3) {
//             window.location.href = '/loser.html'
//         }
//     }

// }

// class Player {
//     constructor(name) {
//         this.name = name;
//         this.score = 0;
//     }

//     getOption() {
//         var moves = document.getElementsByClassName('moveOption')
//         for (var i = 0; i < moves.length; i++) {
//             if (moves[i].className.includes("selected")) {
//                 if (moves[i].className.includes("rock")) {
//                     this.choice = "r";
//                 } else if (moves[i].className.includes("paper")) {
//                     this.choice = "p";
//                 } else {
//                     this.choice = "s";
//                 }
//             }
//         }
//     }
// }

// class Computer {
//     constructor() {
//         this.score = 0;
//     }
//     select_move() {
//         const choices = ["r", "p", "s"];
//         this.choice = choices[Math.floor(Math.random() * choices.length)]
//         console.log("The robot selected " + this.choice)
//     }
// }

// jan = new Player("Jan")
// robot = new Computer()
// game = new GameVsComputer(jan, robot)

// document.getElementById('endTurn').addEventListener('click', function () {
//     // Activates when the button of endturn is cliked

//     let player1moveelement = document.getElementById('player1move')
//     let player2moveelement = document.getElementById('player2move')

//     player1moveelement.style.backgroundColor = "black"
//     player2moveelement.style.backgroundColor = "black"


//     // Define the constant site elements and options
//     const player1move = document.getElementById("player1move")
//     const computermove = document.getElementById("player2move")
//     const choices_symbols = ["✊", "🖐️", "✌️"]
//     const choices = ["r", "p", "s"];

//     //First player selects option
//     jan.getOption()
//     console.log("Jan's choice is " + jan.choice)

//     player1move.textContent = choices_symbols[choices.indexOf(jan.choice)]

//     let index = 0;
//     const interval = setInterval(function () {
//         computermove.textContent = choices_symbols[index];
//         index = (index + 1) % choices_symbols.length;
//     }, 75)

//     robot.select_move()
//     setTimeout(function () {
//         clearInterval(interval); // Stop the cycling
//         console.log("Robot's move is " + robot.choice)
//         console.log("The robot number of choice is " + choices.indexOf(robot.choice))
//         const computerChoiceSymbol = choices_symbols[choices.indexOf(robot.choice)];
//         computermove.textContent = computerChoiceSymbol; // Set the final choice
//         game.play(jan.choice, robot.choice); // Proceed with the game logic
//     }, 2000); // Stop after 2 seconds

// });

// // Whenever one of the options is selected, modify class names and unselect the previous selected one

// options_btns = document.getElementsByClassName('moveOption')

// for (i = 0; i < options_btns.length; i++) {
//     options_btns[i].addEventListener('click', function () {
//         for (x = 0; x < options_btns.length; x++) {
//             options_btns[x].className = options_btns[x].className.replace("selected", "")
//         }
//         this.className += " selected"
//     })
// }



