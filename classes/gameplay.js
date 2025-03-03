import { canvas, ctx } from './canvas.js';
import { imagesPerLevel, levelConfiguration } from '../data.js';
import { showYouLostMenu, showYouWinMenu, hideYouLostMenu, hideYouWinMenu, showScoreDiv } from './overlay.js';

const CORRECT_ANSWER_SCORE = 100;
const EXTRA_SCORE_PER_LEVEL = 25;
const WRONG_ANSWER_SCORE = -50;


export var gameEnded = false;
var lastScore = 0;
export var score = 0;
export var maxScore = 0;
var correctAnswers = 3;
var level = 5;
var timeRemaining = levelConfiguration.find(item => item.levelNumber === level).levelSpeed;
var totalAnswers = levelConfiguration.find(item => item.levelNumber === level).totalAnswers;

var image = new Image();

image.src = imagesPerLevel.find(item => item.levelNumber === level).src;

export function choseOption(playerPosition, correctImagePosition) {
    let correctPlayerPosition = playerPosition - 1;

    if (correctImagePosition == correctPlayerPosition) {
        correctAnswers++;
        addScore();
        animateShadow('green');
        hasWin();
    } else {
        animateShadow('red');
        correctAnswers--;
        substractScore();
        hasLost();
    }

    if (!gameEnded) {
        startTimer();
    }

    showScoreEffect(lastScore);
}

function animateShadow(color) {
    let intensity = 255;
    let step = -10;
    let interval = setInterval(() => {
        intensity += step;
        if (intensity <= 100) {
            clearInterval(interval);
            intensity = 100;
        }
        canvas.style.boxShadow = `0 0 10px 5px rgb(${color === "red" ? intensity : 0}, ${color === "green" ? intensity : 0}, 0)`;
    }, 100);
}

function addScore() {
    let extraScore = (level - 1) * EXTRA_SCORE_PER_LEVEL;
    let scoreToAdd = (CORRECT_ANSWER_SCORE * (timeRemaining / levelConfiguration.find(item => item.levelNumber === level).levelSpeed)) + extraScore;
    score += scoreToAdd;
    lastScore = scoreToAdd;
}

function substractScore() {
    score += WRONG_ANSWER_SCORE;
    lastScore = WRONG_ANSWER_SCORE;
}

function hasWin() {
    if (correctAnswers == totalAnswers) {
        if (level == 5) {
            showScoreDiv();
        }
        else {
            showYouWinMenu();
        }
        gameEnded = true;
        showConfetti();
    }
}

function showConfetti() {
    var duration = 5 * 1000,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    var interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);

        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
        );
    }, 250);
}

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

function hasLost() {
    if (correctAnswers < 1) {
        showYouLostMenu();
        gameEnded = true;
    }
}

export function restart() {
    gameEnded = false;
    correctAnswers = 3;
    totalAnswers = levelConfiguration.find(item => item.levelNumber === level).totalAnswers;
    score = 0;

    hideYouLostMenu();
    hideYouWinMenu();
    startTimer();
}

export function nextLevel() {
    if (level < 5) {
        level++;
    }
    startNextLevel();
}

function startNextLevel() {
    gameEnded = false;
    correctAnswers = 3;
    totalAnswers = levelConfiguration.find(item => item.levelNumber === level).totalAnswers;
    image.src = imagesPerLevel.find(item => item.levelNumber === level).src;

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


function showScoreEffect(points) {
    const scoreEffect = document.getElementById("scoreEffect");
    const scoreText = document.getElementById("score");

    scoreEffect.style.animation = "none";

    if (points < 0) {
        scoreText.textContent = `${points.toFixed(0)}`;
        scoreEffect.style.color = "red";
    }
    else {
        scoreText.textContent = `+${points.toFixed(0)}`;
        scoreEffect.style.color = "green";
    }

    void scoreEffect.offsetWidth;
    scoreEffect.style.animation = "scoreFade 2s ease-out forwards";

    scoreEffect.style.opacity = "1"; 
}



export function drawScore() {
    drawNormalScore();
}

function drawNormalScore() {
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

    drawCircle(x, y, outerRadius, outerAlpha);
    drawOuterCircle(x, y, outerRadius, outerAlpha)
    drawCircle(x, y, innerRadius, 1);
    drawTimeRemaining(x, y);
}

function drawTimeRemaining(x, y) {
    let fontSize = canvas.width * 0.03;
    ctx.textAlign = 'center';
    ctx.font = `${fontSize}px Arial`;

    if (timeRemaining > 5) {
        ctx.fillStyle = 'black';
    }
    else {
        ctx.fillStyle = 'red';
    }

    ctx.fillText(timeRemaining, x + 1, y + 18);
}

function drawCircle(x, y, radius, alpha) {

    ctx.fillStyle = `rgba(217, 217, 217, ${alpha})`;

    if (timeRemaining > 5) {
        ctx.strokeStyle = "black";
    }
    else {
        ctx.strokeStyle = 'red';
    }

    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}

function drawOuterCircle(x, y, radius) {

    ctx.fillStyle = `black`;

    if (timeRemaining > 5) {
        ctx.strokeStyle = "black";
    }
    else {
        ctx.strokeStyle = 'red';
    }

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

export function drawImage() {

    let rows = totalAnswers / 2;
    let cols = 2;
    let sectionWidth = image.width / cols;
    let sectionHeight = image.height / rows;
    let iterations = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let x = col * sectionWidth;
            let y = row * sectionHeight;
            let width = canvas.width * 0.23;
            let height = canvas.height * 0.55;
            let imageX = col * (width / cols) + canvas.width * 0.75;
            let imageY = row * (height / rows) + (canvas.height * 0.03);
            let imageWidth = width / cols;
            let imageHeight = height / rows;

            ctx.strokeStyle = "white";
            ctx.lineWidth = 4;
            ctx.strokeRect(imageX, imageY, imageWidth, imageHeight);

            ctx.drawImage(
                image,
                x, y, sectionWidth, sectionHeight,
                imageX, imageY,
                imageWidth, imageHeight
            );

            if (iterations >= correctAnswers) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                ctx.fillRect(
                    col * (width / cols) + (canvas.width * 0.75), row * (height / rows) + (canvas.height * 0.03),
                    width / cols, height / rows
                );
            }
            iterations++;
        }
    }

}

export function restartGame() {
    level = 1;
    score = 0;
    maxScore = 0;
    image.src = imagesPerLevel.find(item => item.levelNumber === level).src;
    restart();
}



