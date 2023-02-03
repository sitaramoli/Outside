import { Background } from './background.js';
import { Base } from './base.js';
import { Bird } from './bird.js';
import { Obstacle } from './obstacle.js';
import { InputHandler } from './input_handler.js';
import { UI } from './ui.js';

const PIPE_GAP = 150;
const PIPE_WIDTH = 80;

const GAME_STATE = {
    START: "START",
    PLAYING: "PLAYING",
    PAUSE: "PAUSE",
    OVER: "OVER"
};
export class Game {
    constructor(width, height, gameSpeed, canvas, sprite) {
        this.sprite = sprite;
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.gameSpeed = gameSpeed;
        this.state = GAME_STATE.START;
        this.inputHandler = new InputHandler(this);
        this.background = new Background(this);
        this.base = new Base(this);
        this.bird = new Bird(this);
        this.ui = new UI(this);
        this.obstacleList = [];
        this.keys = [];
        this.score = 0;
        this.highScore = 0;
        this.isGameOver = false;
    }

    initialize() {

        // add sounds
        this.wingSound = new Audio();
        this.wingSound.src = './assets/audio/wing.wav';

        this.dieSound = new Audio();
        this.dieSound.src = './assets/audio/die.wav';

        this.hitSound = new Audio();
        this.hitSound.src = './assets/audio/hit.wav';

        this.pointSound = new Audio();
        this.pointSound.src = './assets/audio/point.wav';

        // generate obstacles
        for (let i = 0; i < 2; i++) {
            let x = Math.floor(this.width + this.width * i * .7);
            let y = 0;
            let width = PIPE_WIDTH;
            let height = Math.floor(this.height * .2 + Math.random() * this.height * .3);
            this.obstacleList.push(new Obstacle(this, x, y, width, height));
        }
    }

    start() {
        this.state = GAME_STATE.PLAYING;
    }

    pause() {
        this.state = GAME_STATE.PAUSE;
    }

    resume() {
        this.state = GAME_STATE.PLAYING;
    }

    restart() {
        this.state = GAME_STATE.START;
        this.base = new Base(this);
        this.bird = new Bird(this);
        this.ui = new UI(this);
        this.score = 0;
        this.obstacleList = [];
        this.initialize();
    }

    draw(context) {
        this.background.draw(context);
        this.obstacleList.forEach(obstacle => {
            obstacle.draw(context);
        });
        this.base.draw(context);
        this.bird.draw(context);
        this.ui.draw(context);
    }

    update() {
        // update bird,obstacles and base only in playing state
        if (this.state === GAME_STATE.PLAYING) {
            // check if esc key is pressed
            if (this.keys.includes("Escape")) {
                this.pause();
                this.keys.pop();
            }
            // <---Collision Check--->
            // check collision with pipes
            this.obstacleList.forEach(obstacle => {
                if (this.checkPipeCollision(this.bird, obstacle)) {
                    this.hitSound.play();
                    this.state = GAME_STATE.OVER;
                    this.isGameOver = true;
                }
            });
            // check collision with base
            if (this.checkBaseCollision(this.bird, this.base)) {
                this.dieSound.play();
                this.state = GAME_STATE.OVER;
                this.isGameOver = true;
            }
            // <---Collision check ends--->

            // <---update base,obstacles,bird--->
            this.base.update();
            this.obstacleList.forEach(obstacle => {
                obstacle.update();
            });
            this.bird.update();
            // <---update ends--->
        }

        // resume when space bar is pressed
        else if (this.state === GAME_STATE.PAUSE) {
            if (this.keys.includes(" ")) {
                this.resume();
                this.keys.pop();
            }
        }

        // set highscore when game is over
        else if (this.state === GAME_STATE.OVER) {
            if (this.score > this.highScore) {
                this.highScore = this.score;
            }
        }
    }

    // collision with base
    checkBaseCollision(bird, base) {
        if (bird.y + bird.height >= base.y) {
            return true;
        }
        else {
            return false;
        }
    }

    // collision with pipe
    checkPipeCollision(bird, obstacle) {
        if (!obstacle.isPassed) {
            if (obstacle.x - bird.x <= bird.width && bird.y <= obstacle.height) {
                return true;
            }
            else if (obstacle.x - bird.x <= bird.width && bird.y + bird.height >= obstacle.height + PIPE_GAP) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }
}