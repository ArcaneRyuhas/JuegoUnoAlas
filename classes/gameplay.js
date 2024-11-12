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
var health = TOTAL_HEALTH;
var correctAnswers = 0;
var level = 1;
var timeRemaining = levelConfiguration.find(item => item.levelNumber === level).levelSpeed;
var totalAnswers = levelConfiguration.find(item => item.levelNumber === level).totalAnswers;

var heart = new Image();
var emptyHeart = new Image();

heart.src = "../images/Heart.svg";
emptyHeart.src = "../images/Empty Heart.svg";

export function choseOption(playerPosition, correctImagePosition) {
    let correctPlayerPosition = playerPosition - 1;

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

    if (!gameEnded) {
        startTimer();
    }
}

function addScore() {
    let extraScore = (level - 1) * EXTRA_SCORE_PER_LEVEL;
    let scoreToAdd = (CORRECT_ANSWER_SCORE * (timeRemaining / levelConfiguration.find(item => item.levelNumber === level).levelSpeed)) + extraScore;
    score += scoreToAdd;
}

function substractScore() {
    score += WRONG_ANSWER_SCORE;
}

function hasWin() {
    if (correctAnswers == totalAnswers) {
        showYouWinMenu();
        gameEnded = true;
    }
}

function hasLost() {
    if (health < 1) {
        showYouLostMenu();
        gameEnded = true;
    }
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

function startNextLevel() {
    gameEnded = false;
    health = TOTAL_HEALTH;
    correctAnswers = 0;
    totalAnswers = levelConfiguration.find(item => item.levelNumber === level).totalAnswers;

    hideYouLostMenu();
    hideYouWinMenu();
    startTimer();
}

let intervalId;

export function startTimer() {
    if (intervalId) clearInterval(intervalId);

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

//FALTA ACOMODAR BIEN EL ROUNDED_RECTANGLE 
export function drawScore() {
    let xRelativePosition = 0.8955 * canvas.width;
    let yRelativePosition = 0.7 * canvas.height;

    drawRoundedRect(0.81 * canvas.width, 0.63 * canvas.height);

    let fontSize = canvas.width * 0.02;
    ctx.textAlign = 'center';
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'white';
    ctx.fillText(`Puntaje: ${score.toFixed(.2)}`, xRelativePosition, yRelativePosition);
}

function drawRoundedRect(xRelativePosition, yRelativePosition) {
    const width = canvas.width / 6;
    const height = canvas.height / 9;
    const borderRadius = 20;

    ctx.beginPath();

    ctx.moveTo(xRelativePosition + borderRadius, yRelativePosition);
    ctx.lineTo(xRelativePosition + width - borderRadius, yRelativePosition);
    ctx.arcTo(xRelativePosition + width, yRelativePosition, xRelativePosition + width, yRelativePosition + borderRadius, borderRadius);
    ctx.lineTo(xRelativePosition + width, yRelativePosition + height - borderRadius);
    ctx.arcTo(xRelativePosition + width, yRelativePosition + height, xRelativePosition + width - borderRadius, yRelativePosition + height, borderRadius);
    ctx.lineTo(xRelativePosition + borderRadius, yRelativePosition + height);
    ctx.arcTo(xRelativePosition, yRelativePosition + height, xRelativePosition, yRelativePosition + height - borderRadius, borderRadius);
    ctx.lineTo(xRelativePosition, yRelativePosition + borderRadius);
    ctx.arcTo(xRelativePosition, yRelativePosition, xRelativePosition + borderRadius, yRelativePosition, borderRadius);

    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fill();
}

export function drawTimer() {
    let x = canvas.width * 0.1;
    let y = canvas.height * 0.2;
    let outerRadius = (canvas.width + canvas.height) * .05;
    let outerAlpha = 0.7;
    let innerRadius = (canvas.width + canvas.height) * .02;

    //DRAW CLOCK
    drawCircle(x, y, outerRadius, outerAlpha);
    drawOuterCircle(x, y, outerRadius, outerAlpha)
    drawCircle(x, y, innerRadius, 1);
    drawTimeRemaining(x,y);
    
}

function drawTimeRemaining(x,y){
    let fontSize = canvas.width * 0.03; 
    ctx.textAlign = 'center';
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'black';

    // Escribe el texto en el canvas
    ctx.fillText(timeRemaining, x + 1, y + 18); // Dibuja el texto rellenado
}

function drawCircle(x, y, radius, alpha) {

    ctx.fillStyle = `rgba(217, 217, 217, ${alpha})`;
    ctx.strokeStyle = "black"
    ctx.lineWidth = 4;

    //Draw outside line of the circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();

    //draw to fill the circle
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}

function drawOuterCircle(x, y, radius) {

    ctx.fillStyle = `black`;
    ctx.strokeStyle = "black"
    ctx.lineWidth = 4;

    let value = timeRemaining / levelConfiguration.find(item => item.levelNumber === level).levelSpeed;
    let sweep = 1 - value;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, 0, 2 * Math.PI * sweep);
    ctx.closePath();
    ctx.fill();
}

