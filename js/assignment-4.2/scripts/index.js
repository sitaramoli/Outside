const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;
const BOX_WIDTH = 50;
const BOX_HEIGHT = 50;
const BOX_COUNT = 4;
const SPEED = 2;
let boxList = [];

class Box {
    constructor(x, y, vx, vy, id) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.id = id;
    }
    drawBox(ctx) {
        debugger;
        ctx.beginPath();
        ctx.fillStyle = `#fff`;
        ctx.fillRect(this.x, this.y, BOX_WIDTH, BOX_HEIGHT);
        //draw img on top of box
        let img = new Image();
        img.src = 'assets/ant.png';
        ctx.drawImage(img, this.x, this.y, BOX_WIDTH, BOX_HEIGHT);
    }
    updateBox() {
        if (this.x <= 0 || this.x + BOX_WIDTH >= CANVAS_WIDTH) {
            this.vx = - this.vx;
        }
        if (this.y <= 0 || this.y + BOX_HEIGHT >= CANVAS_HEIGHT) {
            this.vy = - this.vy
        }
        this.x += this.vx;
        this.y += this.vy;
    }
}

function main() {
    const canvas = document.querySelector("#canvas");
    canvas.height = CANVAS_HEIGHT;
    canvas.width = CANVAS_WIDTH;
    const ctx = canvas.getContext("2d");
    // let boxList = initializeApp();
    initializeApp();
    canvas.addEventListener('click', function (event) {
        let x = event.clientX;
        let y = event.clientY;
        for (let i = 0; i < boxList.length; i++) {

            // remove box from list if click is inside the box
            if (x >= boxList[i].x && x <= boxList[i].x + BOX_WIDTH && y >= boxList[i].y && y <= boxList[i].y + BOX_HEIGHT) {
                ctx.clearRect(boxList[i].x, boxList[i].y, BOX_WIDTH, BOX_HEIGHT);
                boxList.splice(i, 1);
            }
        }
    });
    startAnimation(ctx);
}

function initializeApp() {
    for (let i = 0; i < BOX_COUNT; i++) {
        let x = getPosition(CANVAS_WIDTH, BOX_WIDTH);
        let y = getPosition(CANVAS_HEIGHT, BOX_HEIGHT);
        while (boxList.some(box => Math.abs(box.x - x) <= BOX_WIDTH && Math.abs(box.y - y <= BOX_HEIGHT))) {
            x = getPosition(CANVAS_WIDTH, BOX_WIDTH);
            y = getPosition(CANVAS_HEIGHT, BOX_HEIGHT);
        }
        let box = new Box(x, y, SPEED, SPEED, i + 1);
        boxList.push(box);
    }
}

function startAnimation(ctx) {
    animate();
    function animate() {
        ctx.fillStyle = '#04a96c';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        for (let i = 0; i < boxList.length; i++) {
            boxList[i].drawBox(ctx);
            boxList[i].updateBox();
            checkCollision(boxList[i]);
        }
        if (boxList.length === 0) {
            restart();//restart if there are no boxes
        }
        requestAnimationFrame(animate);
    }


}

function restart() {
    initializeApp();
    // const body = document.querySelector("body");
    // let restartButton = document.createElement("div");
    // restartButton.setAttribute("id", "restart-btn");
    // restartButton.append("Restart");
    // restartButton.addEventListener("click", function () {
    //     initializeApp();
    // });
    // body.replaceChild(restartButton, body.childNodes[0]); //replaces canvas with a restart button
}

function checkCollision(box) {
    for (let i = 0; i < boxList.length; i++) {
        //do not check with box itself
        if (box.id === boxList[i].id) {
            continue;
        }
        if (Math.abs(box.y - boxList[i].y) <= BOX_HEIGHT && Math.abs(box.x - boxList[i].x) <= BOX_WIDTH) {
            box.vx = - box.vx;
            box.vy = - box.vy;
            boxList[i].vx = - boxList[i].vx;
            boxList[i].vy = - boxList[i].vy;
        }
    }
}

function getPosition(canvasSize, boxSize) {
    return Math.floor(Math.random() * (canvasSize - boxSize));
}

main();