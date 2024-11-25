import { Player } from './classes/player.js';
import { drawRoadLines, updateRoadLinesPosition } from './classes/objects.js';
import { drawBackground, drawStartBackground, startBackgroundIsDisplayed } from './classes/background.js';
import { resizeCanvas, canvas, ctx } from './classes/canvas.js';
import { drawImagesAndName, selectImages  } from './classes/obstacles.js';
import { drawImage, drawScore, gameEnded, nextLevel, restart, drawTimer, startTimer, restartGame } from './classes/gameplay.js';
import { movePlayer } from './classes/listener/canvaMethods.js';
import { hideYouLostMenu, hideYouWinMenu } from './classes/overlay.js';

const player = new Player();
var isGameRunning = true;
let keyPressed={}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (isGameRunning) {
        drawElements();
        updateElements();

        if (gameEnded && !player.animationHappening) {
            isGameRunning = false;
        } else {
            requestAnimationFrame(gameLoop);
        }
    }
}

function drawElements(){
    drawBackground();
    drawImagesAndName();
    drawImage();
    drawScore();
    player.draw();
    drawRoadLines();
    drawTimer();
}

function updateElements(){
    player.updatePosition();
    updateRoadLinesPosition();
}

function startGame(){
    isGameRunning = true;
    selectImages();
    gameLoop();
    startTimer();
}

var retryButton = document.getElementById('retryButton');
var nextLevelButton = document.getElementById('nextLevelButton');
var restartButton = document.getElementById('restartButton');
var restartButtonTwo = document.getElementById('restartButtonTwo')

retryButton.addEventListener('click', function() {
    restart();
    startGame();
});

nextLevelButton.addEventListener('click', function(){
    nextLevel();
    startGame();
});

restartButton.addEventListener('click', function(){
    hideYouWinMenu();
    hideYouLostMenu();
    restartGame();
});

restartButtonTwo.addEventListener('click', function(){
    hideYouWinMenu();
    hideYouLostMenu();
    restartGame();
})

window.addEventListener('keydown', (e) => {
    movePlayer(keyPressed, e, player);
});

window.addEventListener('keyup', (e) => {
    keyPressed[e.key] = false;
});

canvas.addEventListener('click', () => {
    if(startBackgroundIsDisplayed){
        startGame();
    }
})

function startLoop(){
    drawStartBackground();
    requestAnimationFrame(startLoop); 
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
startLoop();


