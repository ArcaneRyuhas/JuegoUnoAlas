import { gameEnded } from "../gameplay.js";
import { choseOption } from "../gameplay.js";
import { correctImagePosition } from "../obstacles.js";

export function movePlayer(keyPressed, e, player){
    if (!keyPressed[e.key] && !gameEnded) {
        keyPressed[e.key] = true; 
        if (e.key === 'ArrowLeft' && player.x > 0.26 && !player.animationHappening) {
            player.x -= player.xSpeed;
            player.playerPosition --;
        }
        if (e.key === 'ArrowRight' && player.x < 0.54 && !player.animationHappening) {
            player.x += player.xSpeed;
            player.playerPosition ++;
        }
        if(e.key === 'ArrowUp' && !player.animationHappening) {
            player.isMovingUp = true;
            choseOption(player.playerPosition, correctImagePosition);
        }
    }
}

