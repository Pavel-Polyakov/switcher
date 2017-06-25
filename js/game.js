/**
 * Created by woolly on 25/06/2017.
 */

function startGame() {
    createCells();
    clicks.innerText = clicks_count.toString();
    title.textContent = 'Level ' + (level_index + 1);
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (levels[level_index][i][j] == 0) {
                cells[i][j].switch();
            }
        }
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
        if (level_index + 1 == levels.length) {
            finishGame();
        } else {
            finishLevel();
        }
    }
}

function finishLevel() {
    clicks_count = 0;
    level_index++;
    board.style.opacity = "0.5";
    setTimeout(function () {
        board.innerHTML = '';
        startGame();
        board.style.opacity = "1";
    }, 500);
}


function finishGame() {
    board.style.opacity = "0.5";
    setTimeout(function () {
        afterword.style.display = 'block'
    }, 500);
}
