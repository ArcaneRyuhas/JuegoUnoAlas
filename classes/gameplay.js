import { canvas, ctx } from './canvas.js';
import { levelConfiguration } from '../data.js';

var health = 3;
var correctAnswers = 0;
var level = 1;
const TOTAL_ANSWERS = levelConfiguration.find(item => item.levelNumber === level).totalAnswers;
const HEARTS_Y_POSITION = 0.05;
const HEART_SIZE = 0.045;
const heartsPositions = [
    { x: 0.8 },   
    { x: 0.85 },  
    { x: 0.9 }  
];
export var gameLost = false;
export var gameWon = false;
export var gameEnded = false;

var heart = new Image();
var emptyHeart = new Image();
var road = new Image();
var uavCar = new Image();

heart.src = "../images/Heart.svg";
emptyHeart.src = "../images/Empty Heart.svg";
road.src = "../images/roadMap.svg";
uavCar.src = "../images/uavCar.svg";


export function choseOption(playerPosition, correctImagePosition){
    let correctPlayerPosition = playerPosition - 1;

    if(correctImagePosition == correctPlayerPosition){
        correctAnswers ++;
        hasWin();
    }
    else{
        health --;
        hasLost();
    }
}

function hasWin(){
    if (correctAnswers == TOTAL_ANSWERS){
        gameWon = true;
        gameEnded = true;
    } 
}

function hasLost(){
    if (health < 1){
        gameLost = true;
        gameEnded = true;
    }
}

export function drawScore(){
    drawRoadmap();
    drawUavCar();
}

function drawRoadmap(){
    let xRelativePosition = 0.05 * canvas.width;
    let yRelativePosition = 0.2 * canvas.height;

    let widthSize = 0.05 * canvas.width;
    let lengthSize = 0.6 * canvas.height;

    ctx.drawImage(road, xRelativePosition, yRelativePosition, widthSize, lengthSize);

    ctx.textAlign = 'center';
    ctx.font = '30px Arial';  // Establecer el estilo de fuente
    ctx.fillStyle = 'white';  // Establecer el color del texto
    ctx.fillText(`${correctAnswers}`, xRelativePosition, yRelativePosition);
}

function drawUavCar(){
    let xRelativePosition = 0.051 * canvas.width;
    let yPosition = 0.6 - ((0.33/ TOTAL_ANSWERS) * correctAnswers);
    let yRelativePosition = yPosition * canvas.height;

    let widthSize = 0.04 * canvas.width;
    let lengthSize = 0.18 * canvas.height;

    ctx.drawImage(uavCar, xRelativePosition, yRelativePosition, widthSize, lengthSize);
}

export function drawLives(){

    let yRelativePosition = HEARTS_Y_POSITION * canvas.height;
    let relativeSize = HEART_SIZE * canvas.width;  // Cambiado de canvas.canvasWidth a canvas.width

    for (let i = 0; i < 3; i ++){
        let xRelativePosition = heartsPositions[i].x * canvas.width;  // Acceso a heartsPositions[i].x

        if (i < health){
            ctx.drawImage(heart, xRelativePosition, yRelativePosition, relativeSize, relativeSize);
        }
        else{
            ctx.drawImage(emptyHeart, xRelativePosition, yRelativePosition, relativeSize, relativeSize);
        }
    }
}
