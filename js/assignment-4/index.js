const CONTAINER_WIDTH = 700;
const CONTAINER_HEIGHT = 500;
const BOX_WIDTH = 50;
const BOX_HEIGHT = 50;
const BOX_COUNT = 4;
const SPEED = 10;
const TRANSITION_DURATION = 50;

function main() {
    const body = document.querySelector("body");
    const boxList = initializeApp(body);
    startApp(boxList);
}

function initializeApp(body) {
    const boxContainer = createBoxContainer(body);
    const boxList = createBoxes(boxContainer);
    return boxList;
}

/**
 * creates a main box container
 * @param {*} body 
 * @returns boxContainer
 */
function createBoxContainer(body) {
    const boxContainer = document.createElement("div");
    boxContainer.classList.add("box-container");
    boxContainer.style.width = `${CONTAINER_WIDTH}px`;
    boxContainer.style.height = `${CONTAINER_HEIGHT}px`;
    body.append(boxContainer);
    return boxContainer;
}

/**
 *draws a single box
 *
 * @param {*} parent
 * @param {*} box
 */
function drawBox(parent, box) {
    const boxElement = document.createElement("div");
    boxElement.classList.add("box");
    boxElement.setAttribute("id", `box-${box.boxId}`);
    boxElement.append(`${box.boxId}`);
    boxElement.style.height = `${BOX_HEIGHT}px`;
    boxElement.style.width = `${BOX_WIDTH}px`;
    boxElement.style.left = `${box.positionX}px`;
    boxElement.style.top = `${box.positionY}px`;
    boxElement.style.transition = `all ${TRANSITION_DURATION / 1000}s linear`;
    parent.appendChild(boxElement);
}

function updateBox(box) {
    let boxElement = document.querySelector(`#box-${box.boxId}`);
    boxElement.style.left = `${box.positionX}px`;
    boxElement.style.top = `${box.positionY}px`;
}

/**
 *creates multiple boxes
 *
 * @param {*} parent
 */
function createBoxes(parent) {
    let boxList = [];
    for (let i = 0; i < BOX_COUNT; i++) {
        let positionX = getPosition(CONTAINER_WIDTH, BOX_WIDTH);
        let positionY = getPosition(CONTAINER_HEIGHT, BOX_HEIGHT);

        if (boxList.length == 0) {
            let box = { boxId: i + 1, positionX: positionX, positionY: positionY, directionX: 1, directionY: 1 };
            drawBox(parent, box);
            boxList.push(box);
        }

        else {
            // check if box overlaps with other boxes
            let positionXPass = false;
            let positionYPass = false;
            let j = 0;
            while ((j < boxList.length) && !(positionXPass && positionYPass)) {
                console.log("checking");
                let anotherPositionX = boxList[j].positionX;
                let anotherPositionY = boxList[j].positionY;

                // get position x
                if (Math.abs(anotherPositionX - positionX) <= BOX_WIDTH) {
                    if (Math.abs(anotherPositionY - positionY) > BOX_WIDTH) {
                        positionXPass = true;
                    }
                    else {
                        positionXPass = false;
                        positionX = getPosition(CONTAINER_WIDTH, BOX_WIDTH);
                    }

                }
                else {
                    positionXPass = true;
                }

                // get position y
                if (Math.abs(anotherPositionY - positionY) <= BOX_HEIGHT) {
                    if ((Math.abs(anotherPositionY - positionY) > BOX_HEIGHT)) {
                        positionYPass = true;
                    }
                    else {
                        positionYPass = false;
                        positionY = getPosition(CONTAINER_HEIGHT, BOX_HEIGHT);
                    }
                }
                else {
                    positionYPass = true;
                }

                if (positionXPass && positionYPass) {
                    j++;
                    positionXPass = false;
                    positionYPass = false;
                }
                else {
                    j = 0;
                    positionXPass = false;
                    positionYPass = false;
                }

            }
            let box = { boxId: i + 1, positionX: positionX, positionY: positionY, directionX: 1, directionY: 1 };
            drawBox(parent, box);
            boxList.push(box);
        }
    }
    return boxList;
}

/**
 *returns a random value in the range of height/width 
 *
 * @param {*} coordinate
 * @return {*} random position
 */
function getPosition(coordinate, boxSize) {
    // set the postition in the multiples of SPEED
    return Math.floor(Math.random() * (coordinate - boxSize) / SPEED) * SPEED;
}

function startApp(boxList) {
    // setInterval(animateBox, TRANSITION_DURATION);
    function animateBox() {

        for (let i = 0; i < boxList.length; i++) {
            box = boxList[i];
            let newPositionX = box.positionX;
            let newPositionY = box.positionY;

            // check x coordinate
            if (newPositionX >= CONTAINER_WIDTH - BOX_WIDTH) {
                box.directionX = -1;
            }
            else if (newPositionX <= 0) {
                box.directionX = 1;
            }

            // check y coordinate
            if (newPositionY >= CONTAINER_HEIGHT - BOX_HEIGHT) {
                box.directionY = -1;
            }
            else if (newPositionY <= 0) {
                box.directionY = 1;
            }
            newPositionX = newPositionX + SPEED * box.directionX;
            newPositionY = newPositionY + SPEED * box.directionY;
            box.positionX = newPositionX;
            box.positionY = newPositionY;
            updateBox(box);
            checkCollision(boxList);
        }
    }

}

// check collided or not
function checkCollision(boxList) {

}

main();