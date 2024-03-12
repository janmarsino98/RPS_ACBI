
//Import classes

import { Player, Computer } from "./player.mjs"
import { Game } from "./game.mjs"


//Create game instance
let game = new Game();
let player1
let player2


//Choose between one player game or 2 player games
const chooseGameTypeBtn = document.getElementById("chooseGameTypeBtn");
chooseGameTypeBtn.addEventListener("click", function () {

    const gameType = document.getElementById("selectGameType").value
    if (gameType == "1player") {

        game.setGameType("1player")
        create1PlayerInput()

    } else {

        game.setGameType("2player")
        create2PlayerInput()

    }

    deleteElementsByClass("container beforegame")

    const startGameBtn = document.getElementById("startGameBtn")

    startGameBtn.addEventListener("click", function () {
        let player1NameInput = document.getElementById("Player1Name")
        let player2NameInput = document.getElementById("Player2Name")
        if (player1NameInput && player2NameInput) {
            if (isBlank(player1NameInput) || isBlank(player2NameInput)) {
                alert("Please fill every form field!")
                return;
            }

        } else if (isBlank(player1NameInput)) {
            alert("Please fill every form field!")
            return;
        }

        player1 = new Player(player1NameInput.value)
        game.setPlayer1(player1)
        if (game.type === "1player") {
            player2 = new Computer()

        } else {
            player2 = new Player(player2NameInput.value)
        }
        game.setPlayer2(player2)

        deleteElementsByClass("container playernames")
        showElementByClass("container game")

        let p1nameDiv = document.getElementById("p1name")
        let p2nameDiv = document.getElementById("p2name")

        p1nameDiv.textContent = player1.name
        p2nameDiv.textContent = player2.name

        let p1picktitleDiv = document.getElementById("p1picktitle")
        p1picktitleDiv.textContent = player1.name + "'s pick:"

    })

})
let selection_time = 0
let endTurnBtn = document.getElementById("endTurn")
let resultsContainer = document.getElementsByClassName("container results")
endTurnBtn.addEventListener("click", function () {
    document.getElementById("roundwinner").removeAttribute("roundwinner")
    let playerOptions = document.getElementsByClassName("moveOption")
    if (game.type === "1player") {
        for (let i = 0; i < playerOptions.length; i++) {
            if (playerOptions[i].className.includes("selected")) {
                player1.choice = playerOptions[i].textContent
            }
        }
        document.getElementById("player1move").textContent = player1.choice
        turnEnd()
    } else {
        if (game.type === "1player") {
            for (let i = 0; i < playerOptions.length; i++) {
                if (playerOptions[i].className.includes("selected")) {
                    player1.choice = playerOptions[i].textContent
                }
            }

        } else {
            let p1picktitleDiv = document.getElementById("p1picktitle")
            if (selection_time === 0) {
                p1picktitleDiv.textContent = player2.name + "'s pick:"
                player1.choice = get_current_choice()
            } else {
                player2.choice = get_current_choice()

                document.getElementById("player1move").textContent = player1.choice
                document.getElementById("player2move").textContent = player2.choice
                turnEnd()
                selection_time = -1
                p1picktitleDiv.textContent = player1.name + "'s pick:"
            }

        }
        selection_time = selection_time + 1

    }
}

)

//When an option is clicked, make it selected
let options_btns = document.getElementsByClassName('moveOption')
for (let i = 0; i < options_btns.length; i++) {
    options_btns[i].addEventListener('click', function () {
        for (let x = 0; x < options_btns.length; x++) {
            options_btns[x].className = options_btns[x].className.replace("selected", "")
        }
        this.className += " selected"
    })
}




// FUNCTIONS
function checkGameWinner() {
    if (player1.score === 3) {
        createModal(player1)
    } else if (player2.score === 3) {
        createModal(player2)
    }
}

function createModal(player) {
    console.log("Creating Modal")
    let main_div = document.createElement("div")
    main_div.className = "modal"
    main_div.id = "endGameModal"
    main_div.setAttribute("tabindex", "-1")
    let dialog_div = document.createElement("div")
    dialog_div.className = "modal-dialog"
    let content_div = document.createElement("div")
    content_div.className = "modal-content"
    let header_div = document.createElement("div")
    header_div.className = "modal-header"
    let modal_title = document.createElement("h5")
    modal_title.className = "modal-title"
    modal_title.textContent = "The game ended!"
    let modal_close_btn = document.createElement("button")
    modal_close_btn.className = "btn-close"
    modal_close_btn.type = "button"
    modal_close_btn.setAttribute("data-bs-dismiss", "modal")
    modal_close_btn.setAttribute("aria-label", "Close")
    let modal_body = document.createElement("div")
    modal_body.className = "modal-body"
    let modal_body_p = document.createElement("p")
    modal_body_p.textContent = player.name + " WINS!"
    let modal_footer = document.createElement("div")
    modal_footer.className = "modal-footer"
    let modal_footer_btn = document.createElement("button")
    modal_footer_btn.type = "button"
    modal_footer_btn.className = "btn btn-secondary"
    modal_footer_btn.setAttribute("data-bs-dismiss", "modal")
    modal_footer_btn.textContent = "Close"
    let modal_footer_btn_restart = document.createElement("button")
    modal_footer_btn_restart.type = "button"
    modal_footer_btn_restart.setAttribute("data-bs-dismiss", "modal")
    modal_footer_btn_restart.id = "modal_restart_btn"
    modal_footer_btn_restart.className = "btn btn-primary"
    modal_footer_btn_restart.textContent = "Restart game"

    header_div.append(modal_title)
    header_div.append(modal_close_btn)
    modal_body.append(modal_body_p)
    modal_footer.append(modal_footer_btn)
    modal_footer.append(modal_footer_btn_restart)

    content_div.append(header_div)
    content_div.append(modal_body)
    content_div.append(modal_footer)

    dialog_div.append(content_div)

    main_div.append(dialog_div)

    document.body.append(main_div)

    var modalElement = document.getElementById('endGameModal');
    var modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();
    modal_restart_eventlistener()

    let nextTurnBtn = document.getElementById("endTurn")
    nextTurnBtn.setAttribute("hidden", true)

}

function modal_restart_eventlistener() {
    document.getElementById("modal_restart_btn").addEventListener("click", function () {
        player1.score = 0
        player2.score = 0
        selection_time = 0
        let p1score = document.getElementsByClassName("player1score")[0]
        let p2score = document.getElementsByClassName("player2score")[0]
        p1score.textContent = 0
        p2score.textContent = 0
        let nextTurnBtn = document.getElementById("endTurn")
        nextTurnBtn.removeAttribute("hidden")
        hideElementsByClass("container results")
        document.getElementById("roundwinner").setAttribute("hidden", true)

    })
}


function load_modal(player) {
    console.log(player.name + " won the game!")
}


function turnEnd() {
    add_player_names_p()
    showElementByClass("container results")
    markRoundWinner()
    checkGameWinner()
}

function add_player_names_p() {

    //Add the paragraph near each round result to show which player result is each
    let p1 = document.querySelector('.container.results').querySelectorAll('p')[0]
    let p2 = document.querySelector('.container.results').querySelectorAll('p')[1]
    p1.textContent = player1.name + "'s choice"
    p2.textContent = player2.name + "'s choice"
}

function markRoundWinner() {

    //defines 2 varriables which are the p1 and p2 move
    let p1choice = document.getElementById("player1move")
    let p2choice = document.getElementById("player2move")
    console.log("First player chose " + p1choice.textContent)
    console.log("Second player chose " + p2choice.textContent)

    // Show the result and paint green the winner container
    if (p1choice.textContent == p2choice.textContent) {
        p1choice.style.background = "black"
        p2choice.style.background = "black"
        document.getElementById("roundwinner").textContent = "DRAW!"
    } else if ((p1choice.textContent == "✊" && p2choice.textContent == "🖐️") || (p1choice.textContent == "🖐️" && p2choice.textContent == "✌️") || (p1choice.textContent == "✌️" && p2choice.textContent == "✊")) {
        p1choice.style.background = "black"
        p2choice.style.background = "rgba(53, 70, 53, 0.763)"
        document.getElementById("roundwinner").textContent = player2.name.toUpperCase() + " WINS!"
        player2.score += 1
        let p2score = document.getElementsByClassName("player2score")[0]
        p2score.textContent = player2.score

    } else {
        p1choice.style.background = "rgba(53, 70, 53, 0.763)"
        p2choice.style.background = "black"
        document.getElementById("roundwinner").textContent = player1.name.toUpperCase() + " WINS!"
        player1.score += 1
        let p1score = document.getElementsByClassName("player1score")[0]
        p1score.textContent = player1.score
    }
}



function get_current_choice() {
    let playerOptions = document.getElementsByClassName("moveOption")
    for (let i = 0; i < playerOptions.length; i++) {
        if (playerOptions[i].className.includes("selected")) {
            return playerOptions[i].textContent
        }
    }
}
function showElementByClass(className) {
    let elements = document.getElementsByClassName(className)
    for (let i = 0; i < elements.length; i++) {
        elements[i].removeAttribute("hidden")
    }
}

function hideElementsByClass(className) {
    let elements = document.getElementsByClassName(className)
    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute("hidden", true)
    }
}

function deleteElementsByClass(className) {
    let elements = document.getElementsByClassName(className)
    for (let i = 0; i < elements.length; i++) {
        elements[i].remove()
    }
}
function createDiv(className) {
    let newDiv = document.createElement("div")
    newDiv.className = className
    return newDiv
}

function isBlank(input) {
    return input.value === ""
}

function createInput(className, id, placeholder) {
    let newInput = document.createElement("input")
    newInput.className = className
    newInput.id = id
    newInput.placeholder = placeholder
    newInput.type = "text"
    return newInput
}

function createButton(className, text, id) {
    let newBtn = document.createElement("button")
    newBtn.className = className
    newBtn.textContent = text
    newBtn.id = id
    return newBtn
}

function create1PlayerInput() {
    //Create the new div asking the user for the name of the unique player
    let newMainDiv = createDiv("container playernames")
    let newDiv = createDiv("input-group")
    let firstplayernameinput = createInput("form-control rounded", "Player1Name", "Player 1 name")
    let startGameBtn = createButton("btn btn-primary", "Start Playing", "startGameBtn")

    newDiv.append(firstplayernameinput)
    newDiv.append(startGameBtn)
    newMainDiv.append(newDiv)
    document.body.append(newMainDiv)
}

function create2PlayerInput() {
    let newMainDiv = createDiv("container playernames")
    let newDivp1 = createDiv("input-group")
    let newDivp2 = createDiv("input-group")
    let firstplayernameinput = createInput("form-control rounded", "Player1Name", "Player 1 Name")
    let secondplayerinput = createInput("form-control rounded", "Player2Name", "Player 2 Name")
    let startGameBtn = createButton("btn btn-primary", "Start Playing", "startGameBtn")

    newDivp1.append(firstplayernameinput)
    newDivp2.append(secondplayerinput)
    newDivp2.append(startGameBtn)
    newMainDiv.append(newDivp1)
    newMainDiv.append(newDivp2)
    document.body.append(newMainDiv)
}