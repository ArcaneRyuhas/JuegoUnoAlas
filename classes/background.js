import { canvas, ctx } from './canvas.js';

const imageBackground = new Image();
imageBackground.src = '../images/backgroundImage.svg';
const roadBackground = new Image();
roadBackground.src = '../images/road.svg';
const startBackground = new Image();
startBackground.src = '../images/StartBackground.svg';
export var startBackgroundIsDisplayed = true;

export function drawStartBackground(){
    ctx.drawImage(startBackground, -2, 0, canvas.width + 20, canvas.height + (canvas.height * 0.14));
    startBackgroundIsDisplayed = true;
}

export function drawBackground() {
    startBackgroundIsDisplayed = false;
    ctx.drawImage(imageBackground, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(roadBackground, canvas.width * 0.03, canvas.height * 0.13, canvas.width, canvas.height);
}
