/**
 * Created by woolly on 17/06/2017.
 */

var board = document.getElementById('board');
var title = document.getElementById('title');
var clicks = document.getElementById('clicks');
var button_reset = document.getElementById('button_reset');
var button_restart_game = document.getElementById('button_restart_game');
var afterword = document.getElementById('afterword');


var level_index = 0;
var clicks_count = 0;
var size = 5;

var cells = [];

window.addEventListener('load', function () {
    button_reset.addEventListener('click', function (event) {
        clicks_count = 0;
        level_index--;
        finishLevel();
    }, false);

    button_restart_game.addEventListener('click', function (event) {
        clicks_count = 0;
        level_index = -1;
        afterword.style.display = 'none';
        finishLevel();
    })
});


FastClick.attach(document.body);
startGame();