import { canvas, ctx } from './canvas.js';
import { selectImages } from "./obstacles.js";

const leftArrow = new Image();
leftArrow.src = '../images/arrowImages/leftArrow.svg'; // Reemplazar con el archivo de la flecha izquierda

const upArrow = new Image();
upArrow.src = '../images/arrowImages/upArrow.svg'; // Reemplazar con el archivo de la flecha hacia arriba

const rightArrow = new Image();
rightArrow.src = '../images/arrowImages/rightArrow.svg'; // Reemplazar con el archivo de la flecha derecha

const MAX_OFFSET = 0.01;
var offset = 0;
export class Player {
    constructor() {
        this.x = 0.37;
        this.y = 0.8;
        this.width = 0;
        this.height = 0;
        this.playerSize = 0.15;
        this.image = new Image();
        this.image.src = '../images/playerImage.svg'; 
        this.xSpeed = 0.27;
        this.ySpeed = 0.01;
        this.isMovingUp = false;
        this.animationHappening = false;
        this.playerPosition = 2;
    }

    draw() {
        this.addNoise();

        let playerPosX = (this.x * canvas.width);
        let playerPosY = this.y * canvas.height;
        this.width = canvas.width * this.playerSize;
        this.height = canvas.height * this.playerSize + 5;

        ctx.drawImage(this.image, playerPosX, playerPosY, this.width, this.height);
        this.drawArrows();
    }

    drawArrows() {
        const arrowSize = canvas.width * 0.1;
        let leftArrowPosX = 0;
        let rightArrowPosX = 0;
        let upArrowPosX = 0;
    
        let upArrowPosY = 0.5 * canvas.height;
        let arrowsPosY = 0.8 * canvas.height;
    
        if (this.alpha === undefined) {
            this.alpha = 1.0; 
        }
    
        this.alpha -= 0.003; 
        if (this.alpha < 0) {
            this.alpha = 0; 
        }
    
        ctx.globalAlpha = this.alpha;
    
        if (!this.animationHappening) {
            switch (this.playerPosition) {
                case 1:
                    rightArrowPosX = 0.39 * canvas.width;
                    upArrowPosX = 0.18 * canvas.width;
    
                    ctx.drawImage(upArrow, upArrowPosX, upArrowPosY, arrowSize, arrowSize);
                    ctx.drawImage(rightArrow, rightArrowPosX, arrowsPosY, arrowSize, arrowSize);
                    break;
                case 2:
                    leftArrowPosX = 0.13 * canvas.width;
                    rightArrowPosX = 0.67 * canvas.width;
                    upArrowPosX = 0.395 * canvas.width;
    
                    ctx.drawImage(upArrow, upArrowPosX, upArrowPosY, arrowSize, arrowSize);
                    ctx.drawImage(leftArrow, leftArrowPosX, arrowsPosY, arrowSize, arrowSize);
                    ctx.drawImage(rightArrow, rightArrowPosX, arrowsPosY, arrowSize, arrowSize);
                    break;
                case 3:
                    leftArrowPosX = 0.39 * canvas.width;
                    upArrowPosX = 0.61 * canvas.width;
    
                    ctx.drawImage(upArrow, upArrowPosX, upArrowPosY, arrowSize, arrowSize);
                    ctx.drawImage(leftArrow, leftArrowPosX, arrowsPosY, arrowSize, arrowSize);
                    break;
            }
        }

        ctx.globalAlpha = 1.0;
    }

    addNoise() {
        let randomNumber = Math.floor(Math.random() * 2);

        if (randomNumber == 1 && offset < MAX_OFFSET) {
            offset += 0.0002;
            this.x += 0.0002;
            this.y += 0.0002;

        } else if (offset > -MAX_OFFSET){
            offset -= 0.0002; 
            this.x -= 0.0002;
            this.y -= 0.0002;
        }
    }

    playerXAnimation() {
        switch (this.playerPosition) {
            case 1:
                this.x += 0.0025;
                break;
            case 2:
                this.x += 0.0005;
                break;
            case 3:
                this.x -= 0.0018;
                break;
        }
    }

    playerXReturnAnimation() {
        switch (this.playerPosition) {
            case 1:
                this.x -= 0.0025;
                break;
            case 2:
                this.x -= 0.0005;
                break;
            case 3:
                this.x += 0.0018;
                break;
        }
    }

    updatePosition() {
        if (this.isMovingUp && this.y > 0.30) {
            this.animationHappening = true;
            this.y -= this.ySpeed;
            this.playerXAnimation();
            this.playerSize -= 0.001;
        } else if (!this.isMovingUp && this.y < 0.80) {
            this.y += this.ySpeed;
            this.playerSize += 0.001;
            this.playerXReturnAnimation();
        }
        else if (this.isMovingUp) {
            this.isMovingUp = false;
            selectImages();

        }
        else {
            this.animationHappening = false;
        }
    }
}


