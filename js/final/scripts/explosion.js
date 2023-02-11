export class Explosion {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.frameWidth = 257.14;
        this.frameHeight = 214;
        this.frame = 0;
        this.frameTimer = 0;
        this.frameInterval = 20;
        this.isOver = false;
    }
    update(deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            if (this.frame < 7) {
                this.frame++;
                this.frameTimer = 0;
            }
            else {
                this.isOver = true;
            }
        }
        else {
            this.frameTimer += deltaTime;
        }
    }

    draw(context) {
        console.log('here');
        context.drawImage(this.game.sprites.explosion, this.frameWidth * this.frame, 0, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height);
    }

}