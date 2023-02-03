const BASE_HEIGHT = 80;

export class Base {
    constructor(game) {
        this.game = game;
        this.width = game.width;
        this.height = BASE_HEIGHT;
        this.x = 0;
        this.y = this.game.height - this.height;
    }

    update() {
        if (Math.abs(this.x) >= this.width) {
            this.x = 0;
        }
        else {
            this.x -= this.game.gameSpeed;
        }
    }

    draw(context) {
        context.drawImage(this.game.sprite, 293, 0, 166, 56, this.x, this.y, this.width, this.height);
        context.drawImage(this.game.sprite, 293, 0, 166, 56, this.x + this.width, this.y, this.width, this.height);
    }
}