import { Player } from './classes/player.js';
import { drawObjects, updateObjectsPosition } from './classes/objects.js';
import { drawBackground } from './classes/background.js';
import { resizeCanvas, canvas, ctx } from './classes/canvas.js';
import { drawImagesAndName, selectImages, correctImagePosition } from './classes/obstacles.js';
import { choseOption, drawLives } from './classes/gameplay.js';

const player = new Player();
let keyPressed={}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawImagesAndName();
    drawLives();
    player.draw();
    player.updatePosition();
    drawObjects();
    updateObjectsPosition();
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => {
    if (!keyPressed[e.key]) {
        keyPressed[e.key] = true; 
        if (e.key === 'ArrowLeft' && player.x > 0.26 && !player.animationHappening) {
            player.x -= player.xSpeed;
            player.playerPosition --;
        }
        if (e.key === 'ArrowRight' && player.x < 0.64 && !player.animationHappening) {
            player.x += player.xSpeed;
            player.playerPosition ++;
        }
        if(e.key === 'ArrowUp' && !player.animationHappening) {
            player.isMovingUp = true;
            choseOption(player.playerPosition, correctImagePosition);
            selectImages();
        }
    }
});

window.addEventListener('keyup', (e) => {
    keyPressed[e.key] = false;
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas(player);
selectImages();
gameLoop();
