import { Game } from "./game.js";

const GAME_WIDTH = 400;
const GAME_HEIGHT = 500;

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas');
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    const ctx = canvas.getContext('2d');
    let game = new Game(GAME_WIDTH, GAME_HEIGHT, canvas);

    let lastTime = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});