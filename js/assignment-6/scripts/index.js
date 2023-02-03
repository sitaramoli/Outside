import { Game } from './game.js';

const GAME_WIDTH = 500;
const GAME_HEIGHT = 600;
const GAME_SPEED = 3;


function main() {
    // initialize canvas
    const canvas = document.querySelector("#canvas");
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    const ctx = canvas.getContext("2d");
    const sprite = new Image();
    sprite.src = './assets/sprites/sprite.png';
    let game = new Game(canvas.width, canvas.height, GAME_SPEED, canvas, sprite);
    sprite.onload = function () {
        game.initialize();
        function animate() {
            game.draw(ctx);
            game.update();
            requestAnimationFrame(animate);
        }
        animate();
    }
}

main();
