/**
 * Created by woolly on 17/06/2017.
 */

var size = 2;
var board = document.getElementById('board');
var title = document.getElementById('title');
var clicks = document.getElementById('clicks');
var reset_game = document.getElementById('reset_game');
var reset_level = document.getElementById('reset_level');
var cells = [];

var clicks_count_game = 0;
var clicks_count_level = 0;

startGame();


reset_game.addEventListener('click', function (event) {
    size = 1;
    clicks_count_game = 0;
    finishGame();
}, false);


reset_level.addEventListener('click', function (event) {
    size --;
    clicks_count_game -= clicks_count_level;
    finishGame();

}, false);



function startGame() {
    createCells();

    clicks.innerText = clicks_count_game.toString();
    title.textContent = 'Level ' + (size - 2).toString();
    var center = Math.floor(size / 2);
    if (size % 2 == 0) {
        cells[center][center].switch();
        cells[center - 1][center].switch();
        cells[center][center - 1].switch();
        cells[center - 1][center - 1].switch();
    } else {
        cells[center][center].switch();
    }
}

function cell(row, col) {
    this.value = 0;
    this.row = row;
    this.col = col;
    this.id = 'cell_' + row.toString() + 'x' + col.toString();

    this.html = document.createElement('div');
    this.html.id = this.id;

    this.setClass = function () {
        if (this.value == 0) {
            this.html.className = 'cell cell_0'
        } else if (this.value == 1) {
            this.html.className = 'cell cell_1'
        }
    };

    this.switch = function () {
        if (this.value == 0) {
            this.value = 1;
        } else if (this.value == 1) {
            this.value = 0;
        }
        this.setClass();
    };

    this.setClass();

    this.html.addEventListener('click', function (event) {
        clicks_count_game ++;
        clicks_count_level ++;
        clicks.innerText = clicks_count_game.toString();
        cells[row][col].switch();
        switchNeighbors(cells[row][col]);
        checkForFinish();
    }, false);
}

function createCells() {
    for (var i = 0; i < size; i++) {
        cells[i] = [];
        var row = document.createElement('div');
        row.className = 'cell-row';
        row.id = 'row_' + i.toString();
        board.append(row);
        for (var j = 0; j < size; j++) {
            var cell_object = new cell(i, j);
            cells[i][j] = cell_object;
            row.append(cell_object.html);
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

function finishGame() {
    clicks_count_level = 0;
    board.style.opacity = "0.5";
    setTimeout(function () {
        size += 1;
        board.innerHTML = '';
        startGame();
        board.style.opacity = "1";
    }, 500);
}

FastClick.attach(document.body);