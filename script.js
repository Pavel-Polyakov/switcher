/**
 * Created by woolly on 17/06/2017.
 */

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var size = 2;
var width = canvas.width / size - 6;
var cells = [];

startGame();

function startGame() {
    createCells();
    var center = Math.floor(size / 2);
    if (size % 2 == 0) {
        cells[center][center].switch();
        cells[center - 1][center].switch();
        cells[center][center - 1].switch();
        cells[center -1 ][center - 1].switch();
    } else {
        cells[center][center].switch();
    }
    drawAllCells();
}


function cell(row, col) {
    this.value = 0;
    this.x = col * width + 6 * (col + 1);
    this.y = row * width + 6 * (row + 1);
    this.row = row;
    this.col = col;

    this.switch = function () {
        if (this.value == 0) {
            this.value = 1;
        } else if (this.value == 1) {
            this.value = 0;
        }
        drawCell(this);
    }
}

function createCells() {
    for (var i = 0; i < size; i++) {
        cells[i] = [];
        for (var j = 0; j < size; j++) {
            cells[i][j] = new cell(i, j);
        }
    }
}

function drawCell(cell) {
    ctx.beginPath();
    ctx.rect(cell.x, cell.y, width, width);

    switch (cell.value) {
        case 0:
            ctx.fillStyle = "#0B9BA9";
            break;
        case 1:
            ctx.fillStyle = "#F46D78";
            break;
        default:
            ctx.fillStyle = "#FFFFFF";
            break;
    }
    ctx.fill();
}

function drawAllCells() {
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            drawCell(cells[i][j]);
        }
    }
}

canvas.addEventListener('click', function (event) {
    var xY = getCursorPosition(canvas, event);
    var cell = getCellByXY(xY);

    if (cell) {
        cell.switch();
        switchNeighbors(cell);
        checkForFinish();
    }
}, false);

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return {x: x, y: y};
}

function getCellByXY(xY) {
    var x = xY.x;
    var y = xY.y;
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            var cell = cells[i][j];
            if ((x > cell.x && y > cell.y) && (x < (cell.x + width)) && y < (cell.y + width)) {
                return cell;
            }
        }
    }
}

function switchNeighbors(cell) {
    var row = cell.row;
    var col = cell.col;
    if (row - 1 >= 0) {
        cells[row - 1][col].switch();
    }
    if (row + 2 <= size) {
        cells[row + 1][col].switch();
    }
    if (col + 2 <= size) {
        cells[row][col + 1].switch();
    }
    if (col - 1 >= 0) {
        cells[row][col - 1].switch();
    }
}

function checkForFinish() {
    var switched = 0;
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (cells[i][j].value == 1) {
                switched++;
            }
        }
    }
    if (switched == 0) {
        finishGame();
    }
}

function canvasClear() {
    ctx.clearRect(0, 0, 500, 500);
}

function finishGame() {
    canvas.style.opacity = '0.5';
    setTimeout(function () {
        size += 1;
        width = canvas.width / size - 6;
        canvasClear();
        startGame();
        canvas.style.opacity = '1';
    }, 500);
}
