import { Player } from './classes/player.js';
import { drawRoadLines, updateRoadLinesPosition } from './classes/objects.js';
import { drawBackground, drawSplashScreen, drawStartBackground, startBackgroundIsDisplayed } from './classes/background.js';
import { resizeCanvas, canvas, ctx } from './classes/canvas.js';
import { drawImagesAndName, selectImages  } from './classes/obstacles.js';
import { drawImage, drawScore, gameEnded, nextLevel, restart, drawTimer, startTimer, restartGame } from './classes/gameplay.js';
import { movePlayer } from './classes/listener/canvaMethods.js';
import { hideYouLostMenu, hideYouWinMenu } from './classes/overlay.js';
import { score } from './classes/gameplay.js';
import { showLeaderboard, hideScoreDiv, hideLeaderboard} from './classes/overlay.js';

const player = new Player();
export var isGameRunning = true;
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    startGame();
});

restartButtonTwo.addEventListener('click', function(){
    hideYouWinMenu();
    hideYouLostMenu();
    restartGame();
    startGame();
})

restartButtonThree.addEventListener('click', function(){
    hideLeaderboard();
    restartGame();
    startGame();
})

window.addEventListener('keydown', (e) => {
    movePlayer(keyPressed, e, player);
});

window.addEventListener('keyup', (e) => {
    keyPressed[e.key] = false;
});

let click = false;

canvas.addEventListener('click', () => {
    if(startBackgroundIsDisplayed && !click){
        click = true;
        drawSplashScreen();
        setTimeout(startGame, 5000);
    }
})

function startLoop(){
    drawStartBackground();
    if(isGameRunning){
        requestAnimationFrame(startLoop); 
    }
}

const storedScores = localStorage.getItem("scores");
const scores = storedScores ? JSON.parse(storedScores) : [];

const scoreForm = document.getElementById("scoreForm");
const playerNameInput = document.getElementById("playerName");
const leaderboardList = document.getElementById("leaderboardList");


updateLeaderboard();

scoreForm.addEventListener("submit", function(event) {
    event.preventDefault(); 

    const playerName = playerNameInput.value.trim().toUpperCase(); 
    const playerScore = score.toFixed(0);

    if (playerName.length > 1 && playerName.length < 10) { 
        scores.push({ name: playerName, score: playerScore }); 
        scores.sort((a, b) => b.score - a.score); 
        
        localStorage.setItem("scores", JSON.stringify(scores));
        
        updateLeaderboard(); 
        playerNameInput.value = ""; 
        hideScoreDiv();
        showLeaderboard();
        console.log(scores);
    } else {
        alert("El nombre debe tener de 1 a 10 letras.");
    }
});

function updateLeaderboard() {
    leaderboardList.innerHTML = ""; 

    scores.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.name} - ${entry.score} pts`;
        leaderboardList.appendChild(li);
    });
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
hideLeaderboard();
hideScoreDiv();
startLoop();

