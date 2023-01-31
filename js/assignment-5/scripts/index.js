
const GAME_WIDTH = 300;
const GAME_HEIGHT = 400;
const ROAD_GAP = 3;
const CAR_WIDTH = (GAME_WIDTH - ROAD_GAP * 2) / 3;
const CAR_HEIGHT = 50;
window.addEventListener('load', function () {

    // canvas setup
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = GAME_HEIGHT;
    canvas.width = GAME_WIDTH;

    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener('keydown', (event) => {

                if ((event.key === "ArrowLeft" || event.key === "ArrowRight") && this.game.keys.indexOf(event.key) === -1) {
                    this.game.keys.push(event.key);
                }
            });

            window.addEventListener('keyup', (event) => {
                if (this.game.keys.indexOf(event.key) > -1) {
                    this.game.keys.splice(this.game.keys.indexOf(event.key), 1);
                }
            });
        }
    }


    class Obstacle {
        constructor(game) {
            this.game = game;
            this.width = CAR_WIDTH;
            this.height = CAR_HEIGHT;
            this.x = 0;
            this.y = 0;
            this.speed = 1;
        }
        update() {
            this.y = this.y + this.speed;
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
            this.x = 0;
            this.y = game.height - CAR_HEIGHT;
            this.currentLane = 1;
        }

        update() {
            if (this.game.keys.includes("ArrowLeft") && this.x > 0) {
                if (this.currentLane === 3) {
                    this.x += -(this.game.width / 3) - ROAD_GAP * 2;
                    this.currentLane = 2;
                }
                else if (this.currentLane === 2) {
                    this.x += -(this.game.width / 3) - ROAD_GAP;
                    this.currentLane = 1;
                }
            }
            else if (this.game.keys.includes("ArrowRight") && this.x < this.game.width - this.width) {
                if (this.currentLane === 1) {
                    this.x += (this.game.width / 3) + ROAD_GAP;
                    this.currentLane = 2;
                }
                else if (this.currentLane === 2) {
                    this.x += (this.game.width / 3) + ROAD_GAP * 2;
                    this.currentLane = 3;
                }
            }

        }
        draw(context) {
            context.fillStyle = `#ff0000`;
            context.fillRect(this.x, this.y, this.width, this.height);
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
            let scoreText = "Score";
            context.fillStyle = `#fff`;
            context.font = '20px Arial';
            context.fillText(scoreText, 10, 30);
            context.save();
            if (this.game.gameOver) {
                context.fillStyle = `#ff0000`;
                context.textAlign = 'center';
                context.font = '40px Arial';
                let gameOverText = "Game Over";
                context.fillText(gameOverText, this.game.width * .5, this.game.height * .5);
                context.fillStyle = `#fff`;
                context.font = '20px Arial';
                context.fillText(scoreText, this.game.width * .5, this.game.height * .5 + 20);
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
            this.obstacle = new Obstacle(this);
            this.input = new InputHandler(this);
            this.road = new Road(this);
            this.ui = new UI(this);
            this.keys = [];
            this.obstaclesList = [];
            this.gameOver = false;
            this.score = 0;
        }

        // initialize() {
        //     const startMenu = document.querySelector(".start-menu");
        //     startMenu.style.width = `${GAME_WIDTH}px`;
        //     startMenu.style.height = `${GAME_HEIGHT}px`;
        //     let startButton = document.createElement("div");
        //     startButton.addEventListener('click',()=>{hide start menu and show canvas});
        //     startButton.setAttribute("id","start-button");
        //     startButton.append("Start Game");
        //     startMenu.append(startButton);
        // }

        update() {
            this.car.update();
            this.obstacle.update();
            if (this.checkCollision(this.car, this.obstacle)) {
                this.gameOver = true;
            }
        }

        draw(context) {
            this.road.draw(context);
            this.obstacle.draw(context);
            this.car.draw(context);
            this.ui.draw(context);
        }

        addObstacle() {
            this.obstaclesList.push(new Obstacle(this));
        }

        checkCollision(car, obstacle) {
            if (Math.abs(car.x - obstacle.x < CAR_WIDTH) && Math.abs(car.y - (obstacle.y + obstacle.height)) === 0) {
                return true;
            }
        }
    }

    const img = this.document.querySelector("#game-img");
    const game = new Game(canvas.width, canvas.height, img);

    // animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();

});




// class Game {
//     constructor(ctx) {
//         this.ctx = ctx;
//     }
//     initializeGame() {
//         this.ctx.fillStyle = `#04a96c`;
//         this.ctx.fillRect(0, 0, GAME_WIDTH / 3, GAME_HEIGHT);
//         this.ctx.fillRect(GAME_WIDTH / 3 + 1, 0, GAME_WIDTH / 3, GAME_HEIGHT);
//         this.ctx.fillRect(GAME_WIDTH / 3 * 2 + 2, 0, GAME_WIDTH / 3, GAME_HEIGHT);
//     }
// }

// function main() {
//     const canvas = document.querySelector("#canvas");
//     canvas.width = GAME_WIDTH;
//     canvas.height = GAME_HEIGHT;
//     canvas.addEventListener('keydown', (event) => {
//         if (event.keyCode === 37) {
//             console.log(event);
//         }
//         if (event.keyCode === 39) {
//             console.log(event);
//         }
//     });
//     const ctx = canvas.getContext("2d");
//     const game = new Game(ctx);
//     game.initializeGame();
//     game.drawObstacle();
//     const player = new Player();
// }

// main();