
const COIN_WIDTH = 40;
const COIN_HEIGHT = 40;
const COIN_SPEED = 2;
const COIN_TYPE = {
    BULLET: 'BULLET',
    HEALTH: 'HEALTH',
    DAMAGE: 'DAMAGE'
};


class Coin {
    constructor(game) {
        this.game = game;
        this.width = COIN_WIDTH;
        this.height = COIN_HEIGHT;
        this.x = Math.random() * (this.game.width - this.width);
        this.y = -this.height;
        this.speed = COIN_SPEED;
    }

    update() {
        this.y += this.speed;
    }

    draw(context) {
        switch (this.coinType) {
            case COIN_TYPE.BULLET:
                this.sprite = this.game.sprites.bulletCoin;
                break;
            case COIN_TYPE.HEALTH:
                this.sprite = this.game.sprites.healthCoin;
                break;
            case COIN_TYPE.DAMAGE:
                this.sprite = this.game.sprites.damageCoin;
        }
        context.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
}

export class BulletCoin extends Coin {
    constructor(game) {
        super(game);
        this.coinType = COIN_TYPE.BULLET;
    }
}

export class HealthCoin extends Coin {
    constructor(game) {
        super(game);
        this.coinType = COIN_TYPE.HEALTH;
    }
}

export class DamageCoin extends Coin {
    constructor(game) {
        super(game);
        this.coinType = COIN_TYPE.DAMAGE;
    }
}