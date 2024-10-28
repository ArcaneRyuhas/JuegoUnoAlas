import { canvas, ctx } from './canvas.js';
import { levelConfiguration } from '../data.js';
import { showYouLostMenu, showYouWinMenu, hideYouLostMenu, hideYouWinMenu } from './overlay.js';

const TOTAL_HEALTH = 3;
const HEARTS_Y_POSITION = 0.05;
const HEART_SIZE = 0.045;
const CORRECT_ANSWER_SCORE = 100;
const EXTRA_SCORE_PER_LEVEL = 25;
const WRONG_ANSWER_SCORE = -50;
const heartsPositions = [
    { x: 0.8 },
    { x: 0.85 },
    { x: 0.9 }
];

export var gameEnded = false;
export var score = 0;
export var maxScore = 0;
var selectedOption = false;
var health = TOTAL_HEALTH;
var correctAnswers = 0;
var level = 1;
var timeRemaining = levelConfiguration.find(item => item.levelNumber === level).levelSpeed;
var totalAnswers = levelConfiguration.find(item => item.levelNumber === level).totalAnswers;

var heart = new Image();
var emptyHeart = new Image();
var road = new Image();
var uavCar = new Image();
const clockImage = new Image();

heart.src = "../images/Heart.svg";
emptyHeart.src = "../images/Empty Heart.svg";
road.src = "../images/roadMap.svg";
uavCar.src = "../images/uavCar.svg";
clockImage.src = "../images/clock.svg"

export function choseOption(playerPosition, correctImagePosition) {
    let correctPlayerPosition = playerPosition - 1;
    selectedOption = true;

    if (correctImagePosition == correctPlayerPosition) {
        correctAnswers++;
        addScore();
        canvas.style.boxShadow = "0 0 10px 5px green";
        hasWin();
    } else {
        canvas.style.boxShadow = "0 0 10px 5px red";
        health--;
        substractScore();
        hasLost();
    }

    // Reinicia el temporizador sin condiciones adicionales
    if (!gameEnded) {
        startTimer();
    }
}


function addScore(){
    let extraScore = (level - 1)  * EXTRA_SCORE_PER_LEVEL;
    let scoreToAdd = (CORRECT_ANSWER_SCORE * ( timeRemaining /levelConfiguration.find(item => item.levelNumber === level).levelSpeed)) + extraScore;
    score += scoreToAdd;
}

function substractScore (){
    score += WRONG_ANSWER_SCORE;
}

function hasWin() {
    if (correctAnswers == totalAnswers) {
        showYouWinMenu();
        selectedOption = true;
        gameEnded = true;
    }
}

function hasLost() {
    if (health < 1) {
        showYouLostMenu();
        selectedOption = true;
        gameEnded = true;
    }
}

export function drawScore() {
    drawRoadmap();
    drawUavCar();
}

function drawRoadmap() {
    let xRelativePosition = 0.038 * canvas.width;
    let yRelativePosition = 0.2 * canvas.height;

    let widthSize = 0.08 * canvas.width;
    let lengthSize = 0.6 * canvas.height;

    ctx.drawImage(road, xRelativePosition, yRelativePosition, widthSize, lengthSize);
}

function drawUavCar() {
    let xRelativePosition = 0.051 * canvas.width;
    let yImagePosition = 0.6 - ((0.33 / totalAnswers) * correctAnswers);
    let yRelativePosition = yImagePosition * canvas.height;

    let widthSize = 0.04 * canvas.width;
    let lengthSize = 0.18 * canvas.height;

    ctx.drawImage(uavCar, xRelativePosition, yRelativePosition, widthSize, lengthSize);
}

export function drawLives() {

    let yRelativePosition = HEARTS_Y_POSITION * canvas.height;
    let relativeSize = HEART_SIZE * canvas.width;

    for (let i = 0; i < 3; i++) {
        let xRelativePosition = heartsPositions[i].x * canvas.width;

        if (i < health) {
            ctx.drawImage(heart, xRelativePosition, yRelativePosition, relativeSize, relativeSize);
        }
        else {
            ctx.drawImage(emptyHeart, xRelativePosition, yRelativePosition, relativeSize, relativeSize);
        }
    }
}

export function restart() {
    gameEnded = false;
    selectedOption = false;
    health = TOTAL_HEALTH;
    correctAnswers = 0;
    totalAnswers = levelConfiguration.find(item => item.levelNumber === level).totalAnswers;
    score = 0;

    hideYouLostMenu();
    hideYouWinMenu();
    startTimer();
}

export function nextLevel() {
    if (level < 4) {
        level++;
    }
    startNextLevel();
}

function startNextLevel(){
    gameEnded = false;
    selectedOption = false;
    health = TOTAL_HEALTH;
    correctAnswers = 0;
    totalAnswers = levelConfiguration.find(item => item.levelNumber === level).totalAnswers;
    
    hideYouLostMenu();
    hideYouWinMenu();
    startTimer();
}

let intervalId;

export function startTimer() {
    if (intervalId) clearInterval(intervalId); // Limpia cualquier intervalo previo

    timeRemaining = levelConfiguration.find(item => item.levelNumber === level).levelSpeed; 

    intervalId = setInterval(function () {
        timeRemaining--;

        if (timeRemaining <= 0 && !gameEnded) {
            choseOption(0, 1); 
        }

        if (gameEnded) {
            clearInterval(intervalId);
        }
    }, 1000);
}


export function drawTimer() {
    let xImagePosition = canvas.width * 0.04;  
    let yImagePosition = canvas.height * 0.05; 
    let xPosition = canvas.width * 0.07;
    let yPosition = canvas.height * 0.08; 
    let lengthBar = ((canvas.width * 0.245) * 0.1) * (10 / levelConfiguration.find(item => item.levelNumber === level).levelSpeed) * timeRemaining;

    drawRoundedRect(xPosition, yPosition, canvas.width * 0.25, canvas.height * 0.03 , 20, "black");
    drawRoundedRect(xPosition, yPosition, lengthBar, canvas.height * 0.028 , 20, "white");
    ctx.drawImage(clockImage, xImagePosition , yImagePosition , canvas.width * 0.05, canvas.height * 0.1);
}

function drawRoundedRect(x, y, width, height, radius, color) {
    if (radius > width / 2) radius = width / 2;
    if (radius > height / 2) radius = height / 2;

    ctx.beginPath();
    ctx.moveTo(x + radius, y); 

    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);

    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);

    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);

    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);

    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();  
}

