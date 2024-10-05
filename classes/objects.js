import { canvas, ctx } from './canvas.js';

const sizeWidth = 0.005;
const sizeHeight = 0.10;
const OBJECT_COLOR = 'white';
const OBJECT_SPEED = 0.01;

const objects = [
    { x: 0.42, y: 0.4, width: 8, height: 90, xSpeed:-0.001, objectX:0.42 , angle:0.2},
    { x: 0.62, y: 0.4, width: 8, height: 90, xSpeed:0.001, objectX:0.62, angle:160},
    { x: 0.40, y: 0.6, width: 8, height: 90, xSpeed:-0.001, objectX:0.42, angle:0.2},
    { x: 0.64, y: 0.6, width: 8, height: 90, xSpeed:0.001, objectX:0.62, angle:160},
    { x: 0.38, y: 0.8, width: 8, height: 90, xSpeed:-0.001, objectX:0.42, angle:0.2},
    { x: 0.66, y: 0.8, width: 8, height: 90, xSpeed:0.001, objectX:0.62, angle:160},

];

export function drawObjects() {
    objects.forEach(obj => {
        let objectX = obj.x * canvas.width;
        let objectY = obj.y * canvas.height;
        let centerX = objectX + obj.width / 2;
        let centerY = objectY + obj.height / 2;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(obj.angle);
        ctx.fillStyle = OBJECT_COLOR;
        ctx.fillRect(-obj.width / 2, -obj.height / 2, obj.width, obj.height);
        ctx.restore();
    });
}

export function updateObjectsPosition() {
    objects.forEach(obj => {
        obj.y += OBJECT_SPEED;
        obj.x += obj.xSpeed;
        obj.width += sizeWidth/5 ;
        obj.height += sizeHeight/10;
        
        if (obj.y * canvas.height > canvas.height) {
            obj.y = 0.4;
            obj.x = obj.objectX;
            obj.width = canvas.width * sizeWidth;
            obj.height = canvas.height * sizeHeight;
        }
    });
}
