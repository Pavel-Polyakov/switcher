/**
 * Created by woolly on 25/06/2017.
 */


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
        clicks_count++;
        clicks.innerText = clicks_count.toString();
        cells[row][col].switch();
        switchNeighbors(cells[row][col]);
        checkForFinish();
    }, false);
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