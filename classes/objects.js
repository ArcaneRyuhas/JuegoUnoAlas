import { canvas, ctx } from './canvas.js';

const sizeWidth = 0.005;
const sizeHeight = 0.10;
const OBJECT_COLOR = 'white';
const OBJECT_SPEED = 0.01;

const roadLines = [
    { x: 0.36, y: 0.4, width: 8, height: 90, xSpeed:-0.0015, objectX:0.36 , angle:0.3},
    { x: 0.53, y: 0.4, width: 8, height: 90, xSpeed:0.0015, objectX:0.53, angle:2.8},
    { x: 0.34, y: 0.6, width: 8, height: 90, xSpeed:-0.0015, objectX:0.36, angle:0.3},
    { x: 0.56, y: 0.6, width: 8, height: 90, xSpeed:0.0015, objectX:0.53, angle:2.8},
    { x: 0.32, y: 0.8, width: 8, height: 90, xSpeed:-0.0015, objectX:0.36, angle:0.3},
    { x: 0.59, y: 0.8, width: 8, height: 90, xSpeed:0.0015, objectX:0.53, angle:2.8},

];

export function drawRoadLines() {
    roadLines.forEach(roadLines => {
        let objectX = roadLines.x * canvas.width;
        let objectY = roadLines.y * canvas.height;
        let centerX = objectX + roadLines.width / 2;
        let centerY = objectY + roadLines.height / 2;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(roadLines.angle);
        ctx.fillStyle = OBJECT_COLOR;
        ctx.fillRect(-roadLines.width / 2, -roadLines.height / 2, roadLines.width, roadLines.height);
        ctx.restore();
    });
}

export function updateRoadLinesPosition() {
    roadLines.forEach(roadLines => {
        roadLines.y += OBJECT_SPEED;
        roadLines.x += roadLines.xSpeed;
        roadLines.width += sizeWidth/5 ;
        roadLines.height += sizeHeight/10;
        
        if (roadLines.y * canvas.height > canvas.height) {
            roadLines.y = 0.4;
            roadLines.x = roadLines.objectX;
            roadLines.width = canvas.width * sizeWidth;
            roadLines.height = canvas.height * sizeHeight;
        }
    });
}
