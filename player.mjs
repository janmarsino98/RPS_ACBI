export class Player {
    constructor(name) {
        this.name = name
        this.score = 0
    }

    select_move(move) {
        this.choice = move
    }
}

export class Computer {
    constructor() {
        this.name = "Computer"
    }

    select_move() {
        console.log("Computer chose move")
    }
}