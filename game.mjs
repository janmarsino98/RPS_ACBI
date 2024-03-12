import { Player } from "./player.mjs"

export class Game {
    constructor() {
        this.winning_score = 3
    }

    setPlayer1(player) {
        this.player1 = player
    }

    setPlayer2(player) {
        this.player2 = player
    }


    setGameType(type) {
        if (type === "1player") {
            this.type = "1player"
        } else {
            this.type = "2player"
        }
    }

    run_turn() {
        if (this.player2 instanceof Player) {
            console.log(this.player1.select_move())
        }
    }
}
