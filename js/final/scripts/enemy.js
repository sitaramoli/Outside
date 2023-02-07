import { Bullet } from './bullet.js';

const ENEMY_WIDTH = 50;
const ENEMY_HEIGHT = 50;
const ENEMY_HEALTH = 20;

export class Enemy {
    constructor(game) {
        this.game = game;
        this.x = Math.random() * (this.game.width - ENEMY_WIDTH);
        this.y = 0;
        this.width = ENEMY_WIDTH;
        this.height = ENEMY_HEIGHT;
        this.speed = 2;
        this.direction = 1;
        this.health = ENEMY_HEALTH;
        this.bullets = [];
        this.fireInterval = 1000;
        this.fireTimer = 0;

    }

    update(deltaTime) {
        if (this.x <= 0) {
            this.direction = 1;
        }
        else if (this.x + this.width >= this.game.width) {
            this.direction = -1;
        }
        this.x += this.speed * this.direction;

        // fire bullet
        if (this.fireTimer > this.fireInterval) {
            this.fireBullet();
            this.fireTimer = 0;
        }
        else {
            this.fireTimer += deltaTime;
        }

        // update bullets
        this.bullets.forEach(bullet => {
            bullet.update();
        });

        // remove bullets that crossed the boundary
        this.bullets = this.bullets.filter(bullet => !bullet.isOutOfBound);
    }

    draw(context) {
        context.fillStyle = `green`;
        context.fillRect(this.x, this.y, this.width, this.height);
        this.bullets.forEach(bullet => {
            bullet.draw(context);
        });
    }

    fireBullet() {
        this.bullets.push(new Bullet(this.game, this.x + this.width / 2, this.y + this.height, false));
    }
}