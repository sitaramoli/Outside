const CONTAINER_WIDTH = 700;
const CONTAINER_HEIGHT = 500;
const BOX_WIDTH = 50;
const BOX_HEIGHT = 50;
const BOX_COUNT = 2;
const SPEED = 10;

function main() {
    const body = document.querySelector("body");
    const boxList = initializeApp(body);
    startApp(boxList);
}

function initializeApp(parent) {
    const boxContainer = createBoxContainer(parent);
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
 *creates multiple boxes
 *
 * @param {*} parent
 */
function createBoxes(parent) {
    let boxList = [];
    for (let i = 0; i < BOX_COUNT; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.setAttribute("id", `box-${i + 1}`);
        box.append(`${i + 1}`);
        box.style.height = `${BOX_HEIGHT}px`;
        box.style.width = `${BOX_WIDTH}px`;

        let topPosition = getPosition(CONTAINER_HEIGHT, BOX_HEIGHT);
        let leftPosition = getPosition(CONTAINER_WIDTH, BOX_WIDTH);

        //if generated box touches the border initially, 
        // move one step up/down so that box will move for at least one step
        if (topPosition == 0) {
            topPosition = topPosition + SPEED;
        }
        else if (topPosition + BOX_HEIGHT == CONTAINER_HEIGHT) {
            topPosition = topPosition - SPEED;
        }
        if (leftPosition == 0) {
            leftPosition = leftPosition + SPEED;
        }
        else if (leftPosition + BOX_WIDTH == CONTAINER_WIDTH) {
            leftPosition = leftPosition - SPEED;
        }

        if (boxList.length === 0) {
            box.style.top = `${topPosition}px`;
            box.style.left = `${leftPosition}px`;
            parent.append(box);
            boxList.push({ boxElement: box, positionX: leftPosition, positionY: topPosition, directionX: 1, directionY: 1 });

        }

        else {
            // check if box overlaps with other boxes
            for (let j = 0; j < boxList.length - 1; j++) {
                let leftPositionAnother = boxList[j].positionX;
                let topPositionAnother = boxList[j].positionY;

                // get top & left position until they do not overlap 
                while (Math.abs(topPositionAnother - topPosition) <= BOX_HEIGHT) {
                    if (Math.abs(leftPositionAnother - leftPosition) > BOX_WIDTH) {
                        break;
                    }
                    topPosition = getPosition(CONTAINER_HEIGHT, BOX_HEIGHT);
                }
                while (Math.abs(leftPositionAnother - leftPosition) <= BOX_WIDTH) {
                    if (Math.abs(topPositionAnother - topPosition) > BOX_WIDTH) {
                        break;
                    }
                    leftPosition = getPosition(CONTAINER_WIDTH, BOX_WIDTH);
                }

            }
            box.style.top = `${topPosition}px`;
            box.style.left = `${leftPosition}px`;
            parent.append(box);
            // drawBox();
            boxList.push({ boxElement: box, positionX: leftPosition, positionY: topPosition, directionX: 1, directionY: 1 });
        }

    }
    return boxList;
}

// function drawBox(){}

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

function startApp(list) {
    let boxList = list;
    setInterval(animateBox, 50);
    function animateBox() {
        debugger;

        for (let i = 0; i < boxList.length; i++) {
            box = boxList[i];
            let coordinateX = box.positionX;
            let coordinateY = box.positionY;

            // check x coordinate
            if (coordinateX >= CONTAINER_WIDTH - BOX_WIDTH) {
                box.directionX = -1;
            }
            else if (coordinateX <= 0) {
                box.directionX = 1;
            }

            // check y coordinate
            if (coordinateY >= CONTAINER_HEIGHT - BOX_HEIGHT) {
                box.directionY = -1;
            }
            else if (coordinateY <= 0) {
                box.directionY = 1;
            }
            coordinateX = coordinateX + SPEED * box.directionX;
            coordinateY = coordinateY + SPEED * box.directionY;
            box.positionX = coordinateX;
            box.positionY = coordinateY;
            box.boxElement.style.left = `${coordinateX}px`;
            box.boxElement.style.top = `${coordinateY}px`;
            // boxList[i] = box;


        }
    }

}

// check collided or not
function checkCollision(boxList) {

}

main();