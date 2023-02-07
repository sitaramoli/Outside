import { Bullet } from "./bullet.js";

const PLAYER_WIDTH = 50;
const PLAYER_HEIGHT = 50;
const PLAYER_SPEED = 10;
const PLAYER_HEALTH = 100;
const BULLET_COUNT = 20;

export class Player {
    constructor(game) {
        this.game = game;
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.x = this.game.width / 2;
        this.y = this.game.height - PLAYER_HEIGHT;
        this.speed = PLAYER_SPEED;
        this.health = PLAYER_HEALTH;
        this.bullet = BULLET_COUNT;
        this.maxBullet = BULLET_COUNT;
        this.bullets = [];
    }

    update() {

        // update player
        if (this.game.keys.includes("ArrowRight")) {
            this.x += PLAYER_SPEED;
        }
        else if (this.game.keys.includes("ArrowLeft")) {
            this.x -= PLAYER_SPEED;
        }

        // horizontal boundries
        if (this.x + this.width > this.game.width) {
            this.x = this.game.width - this.width;
        }
        else if (this.x < 0) {
            this.x = 0;
        }

        // update bullets positon
        this.bullets.forEach(bullet => {
            bullet.update();
        });
        this.bullets = this.bullets.filter(bullet => !bullet.isOutOfBound);

    }

    draw(context) {
        context.fillStyle = `#000`;
        context.fillRect(this.x, this.y, this.width, this.height);
        this.bullets.forEach(bullet => {
            bullet.draw(context);
        });
    }

    fireBullet() {
        if (this.bullet > 0) {
            this.bullets.push(new Bullet(this.game, this.x + this.width / 2, this.y, true));
            this.bullet--;
        }
    }
}