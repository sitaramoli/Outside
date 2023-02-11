import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { UI } from "./ui.js";
import { InputHandler } from "./input_handler.js";
import { BulletCoin, DamageCoin, HealthCoin } from "./coin.js";
import { Background } from "./background.js";
import { Explosion } from "./explosion.js";

const GAME_STATE = {
    START: 'START',
    PLAY: 'PLAY',
    PAUSE: 'PAUSE',
    OVER: 'OVER'
};

export class Game {
    constructor(width, height, canvas, sprites, sounds) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.sprites = sprites;
        this.sounds = sounds;
        this.player = new Player(this);
        this.ui = new UI(this);
        this.inputHandler = new InputHandler(this);
        this.background = new Background(this);
        this.keys = [];
        this.state = GAME_STATE.START;
        this.enemyTimer = 0;
        this.enemyInterval = 8000;
        this.enemies = [new Enemy(this)];
        this.score = 0;
        this.highScore = 0;
        this.coins = [];
        this.enemyBullets = [];
        this.bulletCoinTimer = 0;
        this.bulletCoinInterval = 15000;
        this.healthCoinTimer = 0;
        this.healthCoinInterval = 25000;
        this.doubleDamageCoinTimer = 0;
        this.doubleDamageCoinInterval = 35000;
        this.doubleDamageTimer = 0;
        this.doubleDamageInterval = 10000;
        this.isDoubleDamageActive = false;
        this.explosions = [];
    }

    /**
     *update player,enemy, ui
     *
     * @param {*} deltaTime
     * @memberof Game
     */
    update(deltaTime) {

        /***** PLAY state starts *****/
        if (this.state === GAME_STATE.PLAY) {

            // pause game if escape key is pressed
            if (this.keys.includes('Escape')) {
                this.pauseGame();
            }

            this.addEnemy(deltaTime);
            this.activateDoubleDamage(deltaTime);

            // update bullets
            this.enemyBullets.forEach(bullet => {
                bullet.update();
            });
            // remove enemy bullets that crossed the boundary
            this.enemyBullets = this.enemyBullets.filter(bullet => !bullet.isOutOfBound);

            // update each enemy and bullet, and check collision
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                this.player.bullets.forEach(bullet => {
                    this.enemyHitByPlayerBullet(enemy, bullet);
                });
            });
            /*Enemy hit by player bullet ends*/

            this.player.update(deltaTime);
            this.playerHitByEnemyBullet();
            this.isGameOver();
            this.addBulletCoin(deltaTime);
            this.addHealthCoin(deltaTime);
            this.addDoubleDamageCoin(deltaTime);
            this.explosions.forEach(explosion => {
                explosion.update(deltaTime);
            });
            // remove explosion from list after it is completed
            this.explosions = this.explosions.filter(explosion => !explosion.isOver);

            this.coins.forEach(coin => {
                coin.update();
                this.collectCoin(coin);
                //remove coin if it is not collected by the player
                if (coin.y > this.height) {
                    this.coins.splice(this.coins.indexOf(coin), 1);
                }
            });

            this.increaseDifficulty();
        }
        /***** PLAY state ends *****/


        /***** OVER state starts *****/
        else if (this.state === GAME_STATE.OVER) {
            if (this.score > this.highScore) {
                this.highScore = this.score;
            }
        }
        /***** OVER state ends *****/
    }

    /**
     *draw player,enemy,ui
     *
     * @param {*} context
     * @memberof Game
     */
    draw(context) {
        this.background.draw(context);
        this.player.draw(context);
        this.enemies.forEach(enemy => {
            enemy.draw(context);
        });
        this.explosions.forEach(explosion => {
            explosion.draw(context);
        });
        this.enemyBullets.forEach(bullet => {
            bullet.draw(context);
        });
        this.coins.forEach(coin => {
            coin.draw(context);
        });
        this.ui.draw(context);
    }

    /**
     *add new enemy after 10 seconds or if there are no enemies
     *
     * @param {*} deltaTime
     * @memberof Game
     */
    addEnemy(deltaTime) {
        if (this.enemyTimer > this.enemyInterval || this.enemies.length === 0) {
            this.enemies.push(new Enemy(this));
            this.enemyTimer = 0;
        }
        else {
            this.enemyTimer += deltaTime;
        }
    }

    /**
     *check if double Damage time is finished
     *
     * @param {*} deltaTime
     * @memberof Game
     */
    activateDoubleDamage(deltaTime) {
        if (this.isDoubleDamageActive && this.doubleDamageTimer > this.doubleDamageInterval) {
            this.isDoubleDamageActive = false;
            this.doubleDamageTimer = 0;
        }
        else {
            this.doubleDamageTimer += deltaTime;
        }
    }

    /**
     *check if enemy is hit by player bullet
     *
     * @memberof Game
     */
    enemyHitByPlayerBullet(enemy, bullet) {
        if (this.checkCollision(enemy, bullet)) {
            this.isDoubleDamageActive ? enemy.health -= bullet.damage * 2 : enemy.health -= bullet.damage;
            this.score++;
            this.player.bullets.splice(this.player.bullets.indexOf(bullet), 1);// remove the bullet from list if it hits enemy
            if (enemy.health <= 0) {
                this.explosions.push(new Explosion(this, enemy.x, enemy.y, enemy.width, enemy.height));
                this.sounds.explosion.pause();
                this.sounds.explosion.currentTime = 0;
                this.sounds.explosion.play();

                this.enemies.splice(this.enemies.indexOf(enemy), 1);
                // increase player bullets if enemy explodes
                let diff = this.player.maxBullet - this.player.bulletCount;
                if (diff >= 10) {
                    this.player.bulletCount += 10;
                }
                else {
                    this.player.bulletCount += diff;
                }
            }
        }
    }

    /**
     *check if player is hit by enemy
     *
     * @memberof Game
     */
    playerHitByEnemyBullet() {
        this.enemyBullets.forEach(bullet => {
            if (this.checkCollision(this.player, bullet)) {
                this.enemyBullets.splice(this.enemyBullets.indexOf(bullet), 1);//remove bullet when it hits the player
                this.player.health -= 5;
                if (this.player.health <= 0) {
                    this.sounds.gameOver.pause();
                    this.sounds.gameOver.currentTime = 0;
                    this.sounds.gameOver.play();
                    this.state = GAME_STATE.OVER;
                }
            }
        });
    }

    /**
     *add bullet coin after every 30 seconds
     *
     * @param {*} deltaTime
     * @memberof Game
     */
    addBulletCoin(deltaTime) {
        if (this.bulletCoinTimer < this.bulletCoinInterval) {
            this.bulletCoinTimer += deltaTime;
        }
        else {
            this.coins.push(new BulletCoin(this));
            this.bulletCoinTimer = 0;
        }
    }

    /**
     * add health coin after every 45 seconds
     *
     * @param {*} deltaTime
     * @memberof Game
     */
    addHealthCoin(deltaTime) {
        if (this.healthCoinTimer < this.healthCoinInterval) {
            this.healthCoinTimer += deltaTime;
        }
        else {
            this.coins.push(new HealthCoin(this));
            this.healthCoinTimer = 0;
        }
    }

    /**
     * add double damage coin after every 60 seconds
     *
     * @memberof Game
     */
    addDoubleDamageCoin(deltaTime) {
        if (this.doubleDamageCoinTimer < this.doubleDamageCoinInterval) {
            this.doubleDamageCoinTimer += deltaTime;
        }
        else {
            this.coins.push(new DamageCoin(this));
            this.doubleDamageCoinTimer = 0;
        }
    }

    /**
     *update and check if coin is collected by the player
     *
     * @memberof Game
     */
    collectCoin(coin) {
        if (this.checkCollision(this.player, coin)) {
            this.sounds.powerup.pause();
            this.sounds.powerup.currentTime = 0;
            this.sounds.powerup.play();
            switch (coin.coinType) {
                case 'DAMAGE':
                    this.isDoubleDamageActive = true;
                    this.doubleDamageTimer = 0;
                    break;
                case 'HEALTH':
                    let healthDiff = this.player.maxHealth - this.player.health;
                    if (healthDiff >= 50) {
                        this.player.health += 50;
                    }
                    else {
                        this.player.health += healthDiff;
                    }
                    break;
                case 'BULLET':
                    let bulletDiff = this.player.maxBullet - this.player.bulletCount;
                    if (bulletDiff >= 10) {
                        this.player.bulletCount += 10;
                    }
                    else {
                        this.player.bulletCount += bulletDiff;

                    }
                    break;
            }
            // remove coin from the list if collected by the player
            this.coins.splice(this.coins.indexOf(coin), 1);
        }
    }

    /**
     *increase difficulty of game
     *
     * @memberof Game
     */
    increaseDifficulty() {
        // increase game difficulty after each 50 score
        if (this.score >= 50) {
            let level = Math.floor(this.score / 50);
            switch (level) {
                case 1:
                    this.enemyInterval = 6000;
                    this.enemies.forEach(enemy => {
                        enemy.speedX = 4;
                    });
                    break;
                case 2:
                    this.enemyInterval = 5000;
                    this.enemies.forEach(enemy => {
                        enemy.speedX = 5;
                    });
                    break;
                case 3:
                    this.enemyInterval = 4000;
                    this.enemies.forEach(enemy => {
                        enemy.speedX = 6;
                    });
                    break;
                default:
                    this.enemyInterval = 2000;
                    this.enemies.forEach(enemy => {
                        enemy.speedX = 7;
                    });
            }
        }
    }


    /**
     *check if game is over
     *
     * @memberof Game
     */
    isGameOver() {
        this.enemies.forEach(enemy => {
            if (this.checkCollision(this.player, enemy)) {
                this.sounds.gameOver.pause();
                this.sounds.gameOver.currentTime = 0;
                this.sounds.gameOver.play();
                this.state = GAME_STATE.OVER;
            }
        });
    }

    /**
     *start game
     *
     * @memberof Game
     */
    playGame() {
        this.state = GAME_STATE.PLAY;
    }

    /**
     *pause game
     *
     * @memberof Game
     */
    pauseGame() {
        this.state = GAME_STATE.PAUSE;
    }

    /**
     *resume game
     *
     * @memberof Game
     */
    resumeGame() {
        this.state = GAME_STATE.PLAY;
    }

    /**
     *restart game
     *
     * @memberof Game
     */
    restartGame() {
        this.player = new Player(this);
        this.enemies = [new Enemy(this)];
        this.ui = new UI(this);
        this.keys = [];
        this.enemyBullets = [];
        this.enemyTimer = 0;
        this.enemyInterval = 10000;
        this.enemies = [new Enemy(this)];
        this.score = 0;
        this.coins = [];
        this.explosions = [];
        this.bulletCoinTimer = 0;
        this.healthCoinTimer = 0;
        this.doubleDamageCoinTimer = 0;
        this.doubleDamageTimer = 0;
        this.isDoubleDamageActive = false;
        this.state = GAME_STATE.PLAY;
    }

    /**
     *check collision between two objects
     *
     * @param {*} object1
     * @param {*} object2
     * @return {*} 
     * @memberof Game
     */
    checkCollision(object1, object2) {
        if (object2.x + object2.width >= object1.x &&
            object2.x <= object1.x + object1.width &&
            object2.y + object2.height >= object1.y &&
            object1.y + object1.height >= object2.y) {
            return true
        }
        else {
            return false;
        }
    }

}