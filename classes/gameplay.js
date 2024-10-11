import { canvas, ctx } from './canvas.js';
import { levelConfiguration } from '../data.js';
import { showYouLostMenu, showYouWinMenu, hideYouLostMenu, hideYouWinMenu } from './overlay.js';

const TOTAL_HEALTH = 3;
const HEARTS_Y_POSITION = 0.05;
const HEART_SIZE = 0.045;
const heartsPositions = [
    { x: 0.8 },
    { x: 0.85 },
    { x: 0.9 }
];

export var gameEnded = false;
var health = TOTAL_HEALTH;
var correctAnswers = 0;
var level = 1;
var totalAnswers = levelConfiguration.find(item => item.levelNumber === level).totalAnswers;

var heart = new Image();
var emptyHeart = new Image();
var road = new Image();
var uavCar = new Image();

heart.src = "../images/Heart.svg";
emptyHeart.src = "../images/Empty Heart.svg";
road.src = "../images/roadMap.svg";
uavCar.src = "../images/uavCar.svg";


export function choseOption(playerPosition, correctImagePosition) {
    let correctPlayerPosition = playerPosition - 1;

    if (correctImagePosition == correctPlayerPosition) {
        correctAnswers++;
        hasWin();
    }
    else {
        health--;
        hasLost();
    }
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

export function drawScore() {
    drawRoadmap();
    drawUavCar();
}

function drawRoadmap() {
    let xRelativePosition = 0.05 * canvas.width;
    let yRelativePosition = 0.2 * canvas.height;

    let widthSize = 0.05 * canvas.width;
    let lengthSize = 0.6 * canvas.height;

    ctx.drawImage(road, xRelativePosition, yRelativePosition, widthSize, lengthSize);

    ctx.textAlign = 'center';
    ctx.font = '30px Arial';  
    ctx.fillStyle = 'white';  
    ctx.fillText(`${correctAnswers}`, xRelativePosition, yRelativePosition);
}

function drawUavCar() {
    let xRelativePosition = 0.051 * canvas.width;
    let yPosition = 0.6 - ((0.33 / totalAnswers) * correctAnswers);
    let yRelativePosition = yPosition * canvas.height;

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
    health = TOTAL_HEALTH;
    correctAnswers = 0;
    totalAnswers = levelConfiguration.find(item => item.levelNumber === level).totalAnswers;

    hideYouLostMenu();
    hideYouWinMenu();
}

export function nextLevel() {
    level ++;
    restart();
}
