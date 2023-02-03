export class UI {
    constructor(game) {
        this.game = game;
    }

    draw(context) {
        if (this.game.state === "START") {
            context.drawImage(this.game.sprite, 349, 88, 93, 28, this.game.width / 3, 20, this.game.width / 2, this.game.height / 8);
            context.drawImage(this.game.sprite, 291, 58, 102, 27, this.game.width / 3, this.game.height / 5, this.game.width / 2, this.game.height / 8);
            context.drawImage(this.game.sprite, 291, 88, 59, 53, this.game.width / 3, this.game.height / 4 + 50, this.game.width / 2, this.game.height / 3);
        }
        else if (this.game.state === "PLAYING") {
            context.fillStyle = `#fff`;
            context.font = "70px Arial";
            context.fillText(this.game.score, this.game.width / 2, 60);
        }
        else if (this.game.state === "PAUSE") {
            context.fillStyle = `#fff`;
            context.fillText(this.game.score, this.game.width / 2, 60);
            context.drawImage(this.game.sprite, 352, 116, 56, 34, this.game.width / 3, this.game.height / 3, this.game.width / 3, this.game.height / 7);
        }
        else {
            context.fillStyle = `#000`;
            context.font = "40px Arial";
            context.drawImage(this.game.sprite, 392, 57, 102, 28, 0, this.game.height / 5, this.game.width, this.game.height / 6);
            context.drawImage(this.game.sprite, 0, 259, 120, 59, 0, this.game.height / 5 + this.game.height / 6, this.game.width, this.game.height / 3);
            context.fillText(this.game.score, this.game.width / 2 + 120, this.game.height / 2 + 5);
            context.fillText(this.game.highScore, this.game.width / 2 + 120, this.game.height / 2 + 80);
            context.drawImage(this.game.sprite, 333, 141, 14, 16, this.game.width / 2.5, this.game.height / 5 + this.game.height / 2, this.game.width / 7, this.game.height / 9);
        }

    }
}