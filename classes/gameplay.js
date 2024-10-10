import { canvas, ctx } from './canvas.js';

var health = 3;
var correctAnswers = 0;
const TOTAL_ANSWERS = 10;
const HEARTS_Y_POSITION = 0.05;
const HEART_SIZE = 0.045;
const heartsPositions = [
    { x: 0.8 },   
    { x: 0.85 },  
    { x: 0.9 }  
];

var heart = new Image();
heart.src = "../images/Heart.svg";
var emptyHeart = new Image();
emptyHeart.src = "../images/Empty Heart.svg";  // Asegúrate de que la ruta sea correcta

export function choseOption(playerPosition, correctImagePosition){
    let correctPlayerPosition = playerPosition - 1;

    if(correctImagePosition == correctPlayerPosition){
        correctAnswers ++;
        hasWin();
    }
    else{
        health --;
    }
}

function hasWin(){
    if (correctAnswers == TOTAL_ANSWERS){
        console.log("HAS GANADO")
    } 
}

export function drawScore(){
    let xRelativePosition = 0.1 * canvas.width;
    let yRelativePosition = 0.8 * canvas.height;

    ctx.textAlign = 'center';
    ctx.font = '30px Arial';  // Establecer el estilo de fuente
    ctx.fillStyle = 'white';  // Establecer el color del texto
    ctx.fillText(`${correctAnswers}`, xRelativePosition, yRelativePosition);
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
