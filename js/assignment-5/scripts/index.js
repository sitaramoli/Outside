
const GAME_WIDTH = 300;
const GAME_HEIGHT = 400;
const ROAD_GAP = 3;
const CAR_WIDTH = (GAME_WIDTH - ROAD_GAP * 2) / 3;
const CAR_HEIGHT = 80;
const OBSTACLE_HEIGHT = 50;
class InputHandler {
    constructor(game) {
        this.game = game;
        window.addEventListener('keydown', (event) => {

            if ((event.key === "ArrowLeft" || event.key === "ArrowRight") && this.game.keys.indexOf(event.key) === -1) {
                this.game.keys.push(event.key);
            }
            else if (event.key === "Enter" && this.game.isGameOver) {
                this.game.restart();
            }
        });
    }
}


class Obstacle {
    constructor(game, currentLane) {
        this.game = game;
        this.currentLane = currentLane;
        this.width = CAR_WIDTH;
        this.height = OBSTACLE_HEIGHT;
        this.x = Math.floor(currentLane * this.game.width / 3 + currentLane * ROAD_GAP);
        this.y = -Math.floor(Math.random() * this.game.height * .5);
        this.speed = Math.floor(Math.random() * 5 + 3);
    }
    update() {
        this.y = this.y + this.speed;
        if (this.y > this.game.height) {
            this.game.score++;
            this.reset();
        }
    }
    reset() {
        this.currentLane = Math.floor(Math.random() * 2);
        this.x = Math.floor(this.currentLane * this.game.width / 3 + this.currentLane * ROAD_GAP);
        this.y = -Math.floor(Math.random() * this.game.height * .5);
        this.speed = Math.floor(Math.random() * 5 + 3);
    }

    draw(context) {
        context.drawImage(this.game.image, 820, 0, 380, 200, this.x, this.y, this.width, this.height)
    }
}
class Car {
    constructor(game) {
        this.game = game;
        this.height = CAR_HEIGHT;
        this.width = CAR_WIDTH;
        this.x = CAR_WIDTH + ROAD_GAP;
        this.y = game.height - CAR_HEIGHT;
        this.currentLane = 2;
    }

    update() {

        if (this.game.keys.includes("ArrowRight") && this.x + this.width < this.game.width) {
            if (this.currentLane === 1) {
                this.x += (this.game.width / 3) + ROAD_GAP;
                this.currentLane = 2;
            }
            else {
                this.x += (this.game.width / 3) + ROAD_GAP * 2;
                this.currentLane = 3;
            }
        }
        else if (this.game.keys.includes("ArrowLeft") && this.x > 0) {
            if (this.currentLane === 3) {
                this.x += -(this.game.width / 3) - ROAD_GAP * 2;
                this.currentLane = 2;
            }
            else {
                this.x += -(this.game.width / 3) - ROAD_GAP;
                this.currentLane = 1;
            }
        }
        this.game.keys.pop();

    }
    draw(context) {
        context.drawImage(this.game.image, 1225, 0, 210, 225, this.x, this.y, this.width, this.height);
    }
}

class Road {
    constructor(game) {
        this.game = game;
    }
    draw(context) {
        context.drawImage(this.game.image, 0, 0, 255, 770, 0, 0, this.game.width / 3, this.game.height);
        context.drawImage(this.game.image, 268, 0, 255, 770, this.game.width / 3 + ROAD_GAP, 0, this.game.width / 3, this.game.height);
        context.drawImage(this.game.image, 535, 0, 255, 770, this.game.width / 3 * 2 + ROAD_GAP * 2, 0, this.game.width / 3, this.game.height);
    }
}

class UI {
    constructor(game) {
        this.game = game;
    }

    draw(context) {
        let scoreText = `${this.game.score}`;
        context.fillStyle = `#fff`;
        context.font = '20px Arial';
        context.fillText(scoreText, 10, 30);
        context.save();
        if (this.game.isGameOver) {
            context.fillStyle = `#ff0000`;
            context.fontWeight = `700`;
            context.textAlign = 'center';
            context.font = '40px Arial';
            let gameOverText = "Game Over";
            context.fillText(gameOverText, this.game.width * .5, this.game.height * .5);
            context.fillStyle = `#fff`;
            context.font = '20px Arial';
            context.fillText("Your score: "+scoreText, this.game.width * .5, this.game.height * .5 + 20);
            context.fillText("Press Enter to start the game", this.game.width * .5, this.game.height * .5 + 40);
        }
        context.restore();
    }
}

class Game {
    constructor(width, height, image) {
        this.width = width;
        this.height = height;
        this.image = image;
        this.car = new Car(this);
        this.input = new InputHandler(this);
        this.road = new Road(this);
        this.ui = new UI(this);
        this.keys = [];
        this.obstaclesList = [];
        this.isGameOver = false;
        this.score = 0;
    }

    update() {
        this.car.update();
        this.obstaclesList.forEach(obstacle => {
            obstacle.update();
        });
        this.obstaclesList.forEach(obstacle => {
            if (this.checkCollision(this.car, obstacle)) {
                this.isGameOver = true;
            }
        });
    }
    generateObstacles() {
        for (let i = 0; i < 3; i++) {
            this.obstaclesList.push(new Obstacle(this, Math.floor(Math.random() * 2)));
        }
    }

    draw(context) {
        this.road.draw(context);
        this.obstaclesList.forEach(obstacle => {
            obstacle.draw(context);
        });
        this.car.draw(context);
        this.ui.draw(context);
    }

    checkCollision(car, obstacle) {
        if (Math.abs(car.x - obstacle.x) < CAR_WIDTH && Math.abs(car.y - obstacle.y) <= obstacle.height) {
            return true;
        }
    }
    restart() {
        document.location.reload();
    }
}

function main() {
    // canvas setup
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = GAME_HEIGHT;
    canvas.width = GAME_WIDTH;
    const sprite = new Image();
    sprite.src = './assets/game.png';

    // start menu setup
    let startMenu = document.querySelector(".start-menu");
    startMenu.style.width = `${GAME_WIDTH}px`;
    startMenu.style.height = `${GAME_HEIGHT}px`;
    const startButton = document.createElement("div");
    startButton.setAttribute("id", "start-btn");
    startButton.append("Start Game");
    startMenu.append(startButton);
    startButton.addEventListener("click", () => {
        startMenu.style.display = 'none';
        canvas.style.display = 'block';
        animate();
    });

    const game = new Game(canvas.width, canvas.height, sprite);
    console.log(game.obstaclesList);
    game.generateObstacles();
    function animate() {
        if (!game.isGameOver) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.update();
            game.draw(ctx);
            requestAnimationFrame(animate);
        }
        else {
            cancelAnimationFrame(animate);
        }
    }
}
main();