export class InputHandler {
    constructor(game) {
        this.game = game;

        window.addEventListener('keydown', (event) => {
            switch (this.game.state) {
                case "PLAY":
                    if ((event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === " " || event.key === "Escape")
                        && this.game.keys.indexOf(event.key) === -1) {
                        this.game.keys.push(event.key);
                    }
                    break;

                case "PAUSE":
                    if (event.key === "Enter") {
                        this.game.resumeGame();
                    }
                    break;
            }
        });

        // remove the released key from the keys list
        window.addEventListener('keyup', (event) => {
            let index = this.game.keys.indexOf(event.key);
            if (index > -1) {
                this.game.keys.splice(index, 1);
            }
        });

        // start menu
        const startButton = document.getElementById('start-btn');
        startButton.addEventListener('click', () => {
            this.game.playGame();
        });

        // pause menu
        const resumeButton = document.getElementById('resume-btn');
        resumeButton.addEventListener('click', () => {
            this.game.resumeGame();
        });
        const restartButton = document.getElementById('restart-btn');
        restartButton.addEventListener('click', () => {
            this.game.restartGame();
        });

        // over menu
        const playAgainButton = document.getElementById('play-again-btn');
        playAgainButton.addEventListener('click', () => {
            this.game.restartGame();
        });
    }
}