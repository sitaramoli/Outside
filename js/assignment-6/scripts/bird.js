
const BIRD_WIDTH = 70;
const BIRD_HEIGHT = 50;
const BIRD_SPEED = 40;

const BIRD_STATE = {
    FLAP_UP: "FLAP_UP",
    NO_FLAP: "NO_FLAP"
};

export class Bird {
    constructor(game) {
        this.game = game;
        this.x = game.width / 5;
        this.y = game.height / 3;
        this.width = BIRD_WIDTH;
        this.height = BIRD_HEIGHT;
        this.weight = .4;
        this.vy = 0;
        this.birdState = BIRD_STATE.NO_FLAP;
    }

    draw(context) {
        switch (this.birdState) {
            case BIRD_STATE.FLAP_UP:
                context.drawImage(this.game.sprite, 3, 491, 17, 12, this.x, this.y, this.width, this.height);
                break;
            case BIRD_STATE.NO_FLAP:
                context.drawImage(this.game.sprite, 31, 491, 17, 12, this.x, this.y, this.width, this.height);
        }
    }

    update() {
        if (this.game.keys.includes(" ")) {
            this.game.wingSound.pause();
            this.game.wingSound.currentTime = 0;
            this.game.wingSound.play();
            this.birdState = BIRD_STATE.FLAP_UP;
            this.y -= BIRD_SPEED;
            this.vy = 0;
            this.game.keys.pop();
        }
        else if (this.y + this.height < this.game.height - this.game.base.height) {
            this.vy += this.weight;
            this.y += this.vy;
            this.birdState = BIRD_STATE.NO_FLAP;
        }
    }
}