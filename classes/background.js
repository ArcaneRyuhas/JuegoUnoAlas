import { canvas, ctx } from './canvas.js';
import {isGameRunning} from '../index.js';

let alpha = 0; 
const imageBackground = new Image();
imageBackground.src = '../images/backgroundImage.svg';
const roadBackground = new Image();
roadBackground.src = '../images/road.svg';
const startBackground = new Image();
startBackground.src = '../images/StartBackground.svg';
const splashScreen = new Image();
splashScreen.src = '../images/splashScreen.png';
export var startBackgroundIsDisplayed = true;

export function drawStartBackground(){
    ctx.drawImage(startBackground, -2, 0, canvas.width + 20, canvas.height + (canvas.height * 0.14));
    startBackgroundIsDisplayed = true;
}

export function drawSplashScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    ctx.globalAlpha = alpha;
    ctx.drawImage(splashScreen, -2, 0, canvas.width + 20, canvas.height + (canvas.height * 0.14));
    ctx.globalAlpha = 1; 

    if (alpha < 1) {  
        alpha += 0.01; 
    }
    if(isGameRunning){
        requestAnimationFrame(drawSplashScreen);
    }
}

export function drawBackground() {
    startBackgroundIsDisplayed = false;
    ctx.drawImage(imageBackground, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(roadBackground, canvas.width * -0.05, canvas.height * 0.13, canvas.width, canvas.height);
}
