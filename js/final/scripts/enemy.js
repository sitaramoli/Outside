import { Bullet } from './bullet.js';

const ENEMY_WIDTH = 100;
const ENEMY_HEIGHT = 60;
const ENEMY_HEALTH = 30;
const ENEMY_SPEED = 2;

export class Enemy {
    constructor(game) {
        this.game = game;
        this.width = ENEMY_WIDTH;
        this.height = ENEMY_HEIGHT;
        this.x = Math.random() * (this.game.width - this.width);
        this.y = -this.height;
        this.speedX = ENEMY_SPEED;
        this.directionX = 1;
        this.speedY = 0;
        this.health = ENEMY_HEALTH;
        this.maxHealth = ENEMY_HEALTH;
        this.fireInterval = 1500;
        this.fireTimer = 0;
        this.speedYTimer = 0;
        this.speedYInterval = 300;
    }

    /**
     *update enemy
     *
     * @param {*} deltaTime
     * @memberof Enemy
     */
    update(deltaTime) {

        // enemy moves down at the start
        if (this.y < 10) {
            this.speedX = 0;
            this.y += 2;
        }
        else if (this.speedX === 0) {
            this.speedX = ENEMY_SPEED;
        }

        // change direction of enemy when horizontal boundary is touched
        if (this.x <= 0) {
            this.directionX = 1;
            this.speedY = 1;
        }
        else if (this.x + this.width >= this.game.width) {
            this.directionX = -1;
            this.speedY = 1;
        }

        // move enemy downwards when boundary touched
        if (this.speedY === 1) {
            if (this.speedYTimer < this.speedYInterval) {
                this.y += this.speedY;
                this.speedYTimer += deltaTime;
                this.directionX = 0
            }
            else {
                this.speedYTimer = 0;
                this.speedY = 0
            }
        }
        this.x += this.speedX * this.directionX;


        // fire bullet
        if (this.fireTimer > this.fireInterval) {
            this.fireBullet();
            this.fireTimer = 0;
        }
        else {
            this.fireTimer += deltaTime;
        }


    }

    /**
     *draw enemy
     *
     * @param {*} context
     * @memberof Enemy
     */
    draw(context) {
        context.drawImage(this.game.sprites.enemy, this.x, this.y, this.width, this.height);
        context.fillStyle = `white`;
        context.fillRect(this.x, this.y, this.width - 4, 9);
        let health = this.health / this.maxHealth * 100;
        if (health > 50) {
            context.fillStyle = `green`;
        }
        else if (health > 20) {
            context.fillStyle = `orange`;
        }
        else {
            context.fillStyle = `red`;
        }
        context.fillRect(this.x + 2, this.y + 2, (this.width - 8) * this.health / this.maxHealth, 5);

    }

    /**
     *fire a bullet by the enemy
     *
     * @memberof Enemy
     */
    fireBullet() {
        this.game.enemyBullets.push(new Bullet(this.game, this.x + this.width / 2, this.y + this.height, false, false));
    }
}