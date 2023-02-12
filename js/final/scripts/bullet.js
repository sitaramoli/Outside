const BULLET_WIDTH = 15;
const BULLET_HEIGHT = 40;
const PLAYER_BULLET_SPEED = 13;
const ENEMY_BULLET_SPEED = 5;
const BULLET_DAMAGE = 5;


export class Bullet {
    constructor(game, x, y, isPlayer, doubleDamage) {
        this.game = game;
        this.width = BULLET_WIDTH;
        this.height = BULLET_HEIGHT;
        this.x = x - this.width / 2; //fire the bullet from the center of player
        this.y = y;
        this.isPlayer = isPlayer;
        this.speed = this.isPlayer ? PLAYER_BULLET_SPEED : ENEMY_BULLET_SPEED;
        this.isOutOfBound = false;
        this.isHit = false;
        this.damage = BULLET_DAMAGE;
        this.doubleDamage = doubleDamage
    }

    /**
     *draw bullet
     *
     * @param {*} context
     * @memberof Bullet
     */
    draw(context) {

        if (this.isPlayer && !this.doubleDamage) {
            context.drawImage(this.game.sprites.playerBullet, this.x, this.y, this.width, this.height);
        }
        else if (this.isPlayer && this.doubleDamage) {
            context.drawImage(this.game.sprites.doubleBullet, this.x, this.y, this.width, this.height);
        }
        else {
            context.drawImage(this.game.sprites.enemyBullet, this.x, this.y, this.width, this.height);
        }
    }

    /**
     *update bullet
     *
     * @memberof Bullet
     */
    update() {
        this.y += this.isPlayer ? -this.speed : this.speed;
        if (this.y < 0 || this.y > this.game.height) {
            this.isOutOfBound = true;
        }
    }
}