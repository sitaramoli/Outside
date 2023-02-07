import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import { UI } from "./ui.js";
import { InputHandler } from "./input_handler.js";

const GAME_STATE = {
    START: "START",
    PLAY: "PLAY",
    PAUSE: "PAUSE",
    OVER: "OVER"
};

export class Game {
    constructor(width, height, canvas) {
        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.player = new Player(this);
        this.enemy = new Enemy(this);
        this.ui = new UI(this);
        this.inputHandler = new InputHandler(this);
        this.keys = [];
        this.state = GAME_STATE.START;
    }

    update(deltaTime) {
        if (this.state === GAME_STATE.PLAY) {
            this.player.update();
            this.enemy.update(deltaTime);
        }
    }

    draw(context) {
        this.player.draw(context);
        this.enemy.draw(context);
        this.ui.draw(context);
    }

    playGame() {
        this.state = GAME_STATE.PLAY;
    }

    pauseGame() {
        this.state = GAME_STATE.PAUSE;
    }

    resumeGame() {
        this.state = GAME_STATE.PLAY;
    }

    isHitByEnemy(player,bullet){
        // 
    }

    isHitByPlayer(enemy,bullet){
        // 
    }
}