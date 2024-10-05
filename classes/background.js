import { canvas, ctx } from './canvas.js';

const imageBackground = new Image();
imageBackground.src = '../images/backgroundImage.svg';
const roadBackground = new Image();
roadBackground.src = '../images/highwayImage.svg';

export function drawBackground() {
    ctx.drawImage(imageBackground, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(roadBackground, 0, canvas.height * 0.39, canvas.width, canvas.height);
}
