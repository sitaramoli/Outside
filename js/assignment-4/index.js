const CONTAINER_WIDTH = 700;
const CONTAINER_HEIGHT = 500;
const BOX_WIDTH = 50;
const BOX_HEIGHT = 50;
const BOX_COUNT = 2;
const SPEED = 10;

function main() {
    const body = document.getElementsByTagName("body")[0];
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
 *creates multiple boxes
 *
 * @param {*} boxContainer
 */
function createBoxes(boxContainer) {
    let boxList = [];
    for (let i = 0; i < BOX_COUNT; i++) {
        const box = document.createElement("div");
        box.classList.add("box");
        box.setAttribute("id", `box-${i + 1}`);
        box.append(`${i + 1}`);
        box.style.height = `${BOX_HEIGHT}px`;
        box.style.width = `${BOX_WIDTH}px`;

        let topPosition = getPosition(CONTAINER_HEIGHT);
        let leftPosition = getPosition(CONTAINER_WIDTH);

        // check if box initially goes outside the container and box touches the container border
        if (topPosition == 0) {
            topPosition = topPosition + BOX_HEIGHT;
        }
        else if (topPosition == CONTAINER_HEIGHT) {
            topPosition = topPosition - BOX_HEIGHT - SPEED;
        }
        else if (topPosition + BOX_HEIGHT >= CONTAINER_HEIGHT) {
            topPosition = topPosition - BOX_HEIGHT;
        }
        if (leftPosition == 0) {
            leftPosition = leftPosition + BOX_WIDTH;
        }
        else if (leftPosition == CONTAINER_WIDTH) {
            leftPosition = leftPosition - BOX_WIDTH - SPEED;
        }
        else if (leftPosition + BOX_WIDTH >= CONTAINER_WIDTH) {
            leftPosition = leftPosition - BOX_WIDTH;
        }

        if (boxList.length === 0) {
            box.style.top = `${topPosition}px`;
            box.style.left = `${leftPosition}px`;
            boxContainer.append(box);
            boxList.push(box);
        }

        else {
            // check if box overlaps with other boxes
            for (let j = 0; j < boxList.length; j++) {
                let topPositionAnother = parseInt(boxList[j].style.top);
                let leftPositionAnother = parseInt(boxList[j].style.left);

                // get top & left position until they do not overlap 
                while (Math.abs(topPositionAnother - topPosition) <= BOX_HEIGHT) {
                    if (Math.abs(leftPositionAnother - leftPosition) > BOX_WIDTH) {
                        break;
                    }
                    topPosition = getPosition(CONTAINER_HEIGHT);
                }
                while (Math.abs(leftPositionAnother - leftPosition) <= BOX_WIDTH) {
                    if (Math.abs(topPositionAnother - topPosition) > BOX_WIDTH) {
                        break;
                    }
                    leftPosition = getPosition(CONTAINER_WIDTH);
                }

            }
            box.style.top = `${topPosition}px`;
            box.style.left = `${leftPosition}px`;
            boxContainer.append(box);
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
function getPosition(coordinate) {
    // set the postition in the multiples of SPEED
    return Math.floor(Math.random() * coordinate / SPEED) * SPEED;

}

function startApp(boxList) {

    for (let i = 0; i < boxList.length; i++) {
        box = boxList[i];
        let coordinateX = parseInt(box.style.left);
        let coordinateY = parseInt(box.style.top);
        let directionX = 1;
        let directionY = 1;
        function moveBox() {
            // check x coordinate
            if (coordinateX >= CONTAINER_WIDTH - BOX_WIDTH) {
                directionX = -1;
                coordinateX = coordinateX + SPEED * directionX;
                box.style.left = `${coordinateX}px`;

            }
            else if (coordinateX <= 0) {
                directionX = 1;
                coordinateX = coordinateX + SPEED * directionX;
                box.style.left = `${coordinateX}px`;

            }

            // check y coordinate
            if (coordinateY >= CONTAINER_HEIGHT - BOX_HEIGHT) {
                directionY = -1;
                coordinateY = coordinateY + SPEED * directionY;
                box.style.top = `${coordinateY}px`;

            }
            else if (coordinateY <= 0) {
                directionY = 1;
                coordinateY = coordinateY + SPEED * directionY;
                box.style.top = `${coordinateY}px`;

            }
            coordinateX = coordinateX + SPEED * directionX;
            coordinateY = coordinateY + SPEED * directionY;
            box.style.left = `${coordinateX}px`;
            box.style.top = `${coordinateY}px`;
            let isCollision = checkCollision(boxList);

        }
        setInterval(moveBox, 50);
    }
}

// check collided or not
function checkCollision(boxList) {

}

main();