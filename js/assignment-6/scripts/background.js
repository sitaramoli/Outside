export class Background {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.width = game.width;
        this.height = game.height;
    }

    draw(context) {
        context.drawImage(this.game.sprite, 0, 0, 144, 256, this.x, this.y, this.width, this.height);
    }
}