export class InputHandler {
    constructor(game) {
        this.game = game;

        // for game controls using keyboard
        window.addEventListener('keydown', (event) => {
            if (this.game.state === "PLAYING" && (event.key === " " || event.key === "Escape")) {
                this.game.keys.push(event.key);
            } else if (this.game.state === "PAUSE" && event.key === " ") {
                this.game.keys.push(event.key);
            }
            else if (this.game.state === "START" && event.key === " ") {
                this.game.start();
            }
        });

        // for events using mouse
        window.addEventListener('click', (event) => {
            if (this.game.state === "START") {
                this.game.start();
            }
            else {
                let x = event.clientX;
                let y = event.clientY;
                let canvasPosition = this.game.canvas.getBoundingClientRect();

                if (this.game.state === "OVER" && x >= canvasPosition.x + this.game.width / 2.5 && x <= canvasPosition.x + this.game.width / 2.5 + this.game.width / 7
                    && y >= canvasPosition.y + this.game.height / 5 + this.game.height / 2 && y <= canvasPosition.y + this.game.height / 5 + this.game.height / 2 + this.game.height / 9) {
                    this.game.restart();
                }

                else if (this.game.state === "PAUSE" && x >= canvasPosition.x + this.game.width / 3 && x <= canvasPosition.x + this.game.width / 3 * 2
                    && y >= canvasPosition.y + this.game.height / 3 && y <= canvasPosition.y + this.game.height / 3 + this.game.height / 7) {
                    this.game.resume();
                }
            }
        });
    }
}