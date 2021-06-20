const boardWidth = 40;
const boardHeight = 30;
const boardBox = document.getElementById("snake-board");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");

const snake = {
  body: [{ x: boardWidth / 2, y: boardHeight / 2 }],
  direction: { x: 1, y: 0 },
};

const generateCherry = () => {
  return {
    x: parseInt(Math.random() * boardWidth, 10),
    y: parseInt(Math.random() * boardHeight, 10),
  };
};

let cherryPosition = generateCherry();

const isSnakeBody = (x, y) => {
  const isBody = snake.body.some((b) => {
    return b.x === x && b.y === y;
  });
  return isBody;
};

const renderBoard = () => {
  let board = "";
  for (let i = 0; i < boardHeight; i++) {
    for (let j = 0; j < boardWidth; j++) {
      if (isSnakeBody(j, i)) {
        board += `0`;
      } else if (cherryPosition.y === i && cherryPosition.x === j) {
        board += "x";
      } else {
        board += " ";
      }
    }
    board += "\n";
  }
  boardBox.textContent = board;
};

const mapKeyCodeWithDirection = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

document.addEventListener("keydown", (e) => {
  const direction = mapKeyCodeWithDirection[e.code];
  if (direction) {
    snake.direction = direction;
  }
});

const getNewHeadPosition = (direction, max, pos) => {
  if (direction > 0) {
    return pos + direction > max ? 0 : pos + direction;
  }
  return pos + direction < 0 ? max - 1 : pos + direction;
};

const gameLoop = () => {
  const head = snake.body.slice(-1)[0];
  const newHeadPos = {
    x: getNewHeadPosition(snake.direction.x, boardWidth, head.x),
    y: getNewHeadPosition(snake.direction.y, boardHeight, head.y),
  };
  snake.body.push(newHeadPos);

  if (cherryPosition.x === head.x && cherryPosition.y === head.y) {
    cherryPosition = generateCherry();
  } else {
    snake.body.shift();
  }
  renderBoard();
};

let interval;

startButton.addEventListener("click", () => {
  interval = setInterval(gameLoop, 50);
});
stopButton.addEventListener("click", () => {
  clearInterval(interval);
});
