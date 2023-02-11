
export class Background {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
    }

    draw(context) {
        context.drawImage(this.game.sprites.background, this.x, this.y, this.game.width, this.game.height);
    }
}