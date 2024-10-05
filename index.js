import { Player } from './classes/player.js';
import { drawObjects, updateObjectsPosition } from './classes/objects.js';
import { drawBackground } from './classes/background.js';
import { resizeCanvas, canvas, ctx } from './classes/canvas.js';

const player = new Player();
let keyPressed={}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
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
            console.log('Tecla ArrowLeft presionada');
            player.x -= player.xSpeed;
            player.playerPosition --;
            console.log("Posición en X: " + player.x);
        }
        if (e.key === 'ArrowRight' && player.x < 0.64 && !player.animationHappening) {
            player.x += player.xSpeed;
            player.playerPosition ++;
            console.log("Posición en X: " + player.x);
        }
        if(e.key === 'ArrowUp') {
            player.isMovingUp = true;
        }
    }
});


window.addEventListener('keyup', (e) => {
    keyPressed[e.key] = false;
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas(player);
gameLoop();
