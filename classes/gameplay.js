import { canvas, ctx } from './canvas.js';

var health = 3;
var correctAnswers = 0;
const TOTAL_ANSWERS = 10;

export function choseOption(playerPosition, correctImagePosition){
    let correctPlayerPosition = playerPosition - 1;

    if(correctImagePosition == correctPlayerPosition){
        correctAnswers ++;
    }
    else{
        health --;
    }
}

export function drawLives(){
    let xRelativePosition = 0.8 * canvas.width;
    let yRelativePosition = 0.09 * canvas.height;

    ctx.textAlign = 'center';
    ctx.font = '30px Arial';  // Establecer el estilo de fuente
    ctx.fillStyle = 'white';  // Establecer el color del texto
    ctx.fillText(`${health}`, xRelativePosition, yRelativePosition);
}