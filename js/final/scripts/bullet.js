const BULLET_WIDTH = 10;
const BULLET_HEIGHT = 20;
const PLAYER_BULLET_SPEED = 15;
const ENEMY_BULLET_SPEED = 5;


export class Bullet {
    constructor(game, x, y, isPlayer) {
        this.game = game;
        this.width = BULLET_WIDTH;
        this.height = BULLET_HEIGHT;
        this.x = x - this.width / 2; //fire the bullet from the center of player
        this.y = y;
        this.isPlayer = isPlayer;
        this.speed = this.isPlayer ? PLAYER_BULLET_SPEED : ENEMY_BULLET_SPEED;
        this.isOutOfBound = false;
    }

    draw(context) {
        context.fillStyle = `#ff0000`;
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        if (this.isPlayer) {
            this.y -= this.speed;
            if (this.y < 0) {
                this.isOutOfBound = true;
            }
        }
        else {
            this.y += this.speed;
            if (this.y > this.game.height) {
                this.isOutOfBound = true;
            }
        }
    }
}