export class InputHandler {
    constructor(game) {
        this.game = game;

        window.addEventListener('keydown', (event) => {
            switch (this.game.state) {
                case "PLAY":
                    if ((event.key === "ArrowLeft" || event.key === "ArrowRight") && this.game.keys.indexOf(event.key) === -1) {
                        this.game.keys.push(event.key);
                    }
                    else if (event.key === " ") {
                        this.game.player.fireBullet();
                    }
                    else if (event.key === "Escape") {
                        this.game.pauseGame();
                    }
                    break;

                case "PAUSE":
                    if (event.key === "Enter") {
                        this.game.resumeGame();
                    }
                    break;
            }
            console.log(this.game.keys);
        });

        // remove the released key from the keys list
        window.addEventListener('keyup', (event) => {
            let index = this.game.keys.indexOf(event.key);
            if (index > -1) {
                this.game.keys.splice(index, 1);
            }
        });

        window.addEventListener('click', () => {
            switch (this.game.state) {
                case "START":
                    this.game.playGame();
                    break;
                case "PLAY":
                    this.game.pauseGame();
                    break;
                case "PAUSE":
                    this.game.resumeGame();
                    break;
                case "OVER":
                    this.game.playGame();
            }
        });
    }
}