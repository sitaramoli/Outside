import { Bullet } from "./bullet.js";

const PLAYER_WIDTH = 120;
const PLAYER_HEIGHT = 150;
const PLAYER_SPEED = 10;
const PLAYER_HEALTH = 100;
const BULLET_COUNT = 15;
const FRAME_HEIGHT = 586;
const FRAME_WIDTH = 452;

export class Player {
    constructor(game) {
        this.game = game;
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height - PLAYER_HEIGHT;
        this.speed = PLAYER_SPEED;
        this.health = PLAYER_HEALTH;
        this.maxHealth = PLAYER_HEALTH;
        this.bulletCount = BULLET_COUNT;
        this.maxBullet = BULLET_COUNT;
        this.bullets = [];
        this.fireTimer = 0;
        this.fireInterval = 50;
        this.frameX = 0;
        this.maxFrame = 3;
        this.frameTimer = 0;
        this.frameInterval = 100;
    }

    /**
     *update player
     *
     * @memberof Player
     */
    update(deltaTime) {
        // update player
        if (this.game.keys.includes("ArrowRight")) {
            this.x += PLAYER_SPEED;
        }
        else if (this.game.keys.includes("ArrowLeft")) {
            this.x -= PLAYER_SPEED;
        }

        // fire bullet if space is pressed
        if (this.game.keys.includes(" ")) {
            if (this.fireTimer > this.fireInterval) {
                this.fireBullet();
                this.fireTimer = 0;
            }
            else {
                this.fireTimer += deltaTime;
            }
        }

        //control player animation
        if (this.frameTimer > this.frameInterval) {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            }
            else {
                this.frameX = 0;
            }
            this.frameTimer = 0;
        }
        else {
            this.frameTimer += deltaTime;
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

    /**
     *draw player
     *
     * @param {*} context
     * @memberof Player
     */
    draw(context) {
        this.bullets.forEach(bullet => {
            bullet.draw(context);
        });
        context.drawImage(this.game.sprites.player, this.frameX * FRAME_WIDTH, 0, FRAME_WIDTH, FRAME_HEIGHT, this.x, this.y, this.width, this.height);
        context.fillStyle = `white`;
        context.fillRect(this.x, this.y + this.height - 50, this.width, 9);
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
        context.fillRect(this.x + 2, this.y + this.height - 50 + 2, (this.width - 4) * this.health / this.maxHealth, 5);
    }

    /**
     *fire a bullet by the player
     *
     * @memberof Player
     */
    fireBullet() {
        if (this.bulletCount > 0) {
            this.game.sounds.bullet.pause();
            this.game.sounds.bullet.currentTime = 0;
            this.game.sounds.bullet.play();

            this.bullets.push(new Bullet(this.game, this.x + this.width / 2, this.y, true, this.game.isDoubleDamageActive));
            this.bulletCount--;
        }
    }
}