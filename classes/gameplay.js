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
const clockImage = new Image();

heart.src = "../images/Heart.svg";
emptyHeart.src = "../images/Empty Heart.svg";
clockImage.src = "../images/clock.svg"

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

function startNextLevel(){
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

export function drawTimer() {
    let xImagePosition = canvas.width * 0.04;  
    let yImagePosition = canvas.height * 0.05; 
    
    ctx.drawImage(clockImage, xImagePosition , yImagePosition , canvas.width * 0.05, canvas.height * 0.1);
}

function drawRoundedRect(xRelativePosition, yRelativePosition) {
    const width = canvas.width / 6;  // Ancho del rectángulo relativo al tamaño del canvas
    const height = canvas.height / 9; // Alto del rectángulo relativo al tamaño del canvas
    const borderRadius = 20;  // Radio de las esquinas redondeadas

    // Comenzar el trazo
    ctx.beginPath();

    // Dibujar las esquinas redondeadas usando arcos (ctx.arc)
    ctx.moveTo(xRelativePosition + borderRadius, yRelativePosition); // Mover a la esquina superior izquierda
    ctx.lineTo(xRelativePosition + width - borderRadius, yRelativePosition); // Línea recta al borde superior derecho
    ctx.arcTo(xRelativePosition + width, yRelativePosition, xRelativePosition + width, yRelativePosition + borderRadius, borderRadius); // Arco esquina superior derecha
    ctx.lineTo(xRelativePosition + width, yRelativePosition + height - borderRadius); // Línea recta hacia abajo (borde derecho)
    ctx.arcTo(xRelativePosition + width, yRelativePosition + height, xRelativePosition + width - borderRadius, yRelativePosition + height, borderRadius); // Arco esquina inferior derecha
    ctx.lineTo(xRelativePosition + borderRadius, yRelativePosition + height); // Línea recta hacia el borde inferior izquierdo
    ctx.arcTo(xRelativePosition, yRelativePosition + height, xRelativePosition, yRelativePosition + height - borderRadius, borderRadius); // Arco esquina inferior izquierda
    ctx.lineTo(xRelativePosition, yRelativePosition + borderRadius); // Línea recta hacia arriba (borde izquierdo)
    ctx.arcTo(xRelativePosition, yRelativePosition, xRelativePosition + borderRadius, yRelativePosition, borderRadius); // Arco esquina superior izquierda

    // Establecer propiedades del contorno y del relleno
    ctx.lineWidth = 5; // Grosor del contorno
    ctx.strokeStyle = 'black'; // Color del contorno
    ctx.stroke(); // Dibuja el contorno

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Color del relleno con transparencia (alfa)
    ctx.fill(); // Rellenar el recuadro
}

