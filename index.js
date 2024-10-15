import { Player } from './classes/player.js';
import { drawRoadLines, updateRoadLinesPosition } from './classes/objects.js';
import { drawBackground } from './classes/background.js';
import { resizeCanvas, canvas, ctx } from './classes/canvas.js';
import { drawImagesAndName, selectImages  } from './classes/obstacles.js';
import { drawLives, drawScore, gameEnded, nextLevel, restart } from './classes/gameplay.js';
import { movePlayer } from './classes/listener/canvaMethods.js';

const player = new Player();
var isGameRunning = true;
let keyPressed={}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawElements();
    updateElements();
    if (gameEnded && !player.animationHappening) {
        isGameRunning = false;
    }
    if (isGameRunning) {
        requestAnimationFrame(gameLoop); // Continuar el loop
    }
}

function drawElements(){
    drawBackground();
    drawImagesAndName();
    drawLives();
    drawScore();
    player.draw();
    drawRoadLines();
}

function updateElements(){
    player.updatePosition();
    updateRoadLinesPosition();
}

function startGame(){
    isGameRunning = true;
    selectImages();
    gameLoop();
}

var retryButton = document.getElementById('retryButton');
var nextLevelButton = document.getElementById('nextLevelButton');

retryButton.addEventListener('click', function() {
    restart();
    startGame();
});

nextLevelButton.addEventListener('click', function(){
    console.log("Siguiente nivel!");
    nextLevel();
    startGame();
});

window.addEventListener('keydown', (e) => {
    movePlayer(keyPressed, e, player);
});

window.addEventListener('keyup', (e) => {
    keyPressed[e.key] = false;
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
startGame();


