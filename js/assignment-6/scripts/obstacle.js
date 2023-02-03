const PIPE_GAP = 150;

export class Obstacle {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isPassed = false;
    }

    draw(context) {
        context.drawImage(this.game.sprite, 56, 323, 26, 160, this.x, this.y, this.width, this.height);
        context.drawImage(this.game.sprite, 84, 323, 26, 160, this.x, this.height + PIPE_GAP, this.width, this.game.height - (this.height + PIPE_GAP));
    }

    update() {
        if (this.x + this.width >= 0) {
            this.x -= this.game.gameSpeed;
        }
        else {
            this.x = this.game.width + this.game.width * .3;
            this.height = Math.floor(Math.random() * this.game.height * .2 + this.game.height * .2);
            this.isPassed = false;
        }
        if (this.x + this.width < this.game.bird.x && !this.isPassed) {
            this.game.pointSound.pause();
            this.game.pointSound.currentTime = 0;
            this.game.pointSound.play();
            this.game.score++;
            this.isPassed = true;
        }
    }
}