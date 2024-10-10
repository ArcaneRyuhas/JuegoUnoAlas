import { canvas, ctx } from './canvas.js';

export class Player {
    constructor() {
        this.x = 0.45;
        this.y = 0.8;
        this.width = 0;
        this.height = 0;
        this.playerSize = 0.15;
        this.image = new Image();
        this.image.src = '../images/playerImage.svg';
        this.xSpeed = 0.25;
        this.ySpeed = 0.01;
        this.isMovingUp = false;
        this.animationHappening = false;
        this.playerPosition = 2;
    }

    draw() {
        let playerPosX = this.x * canvas.width;
        let playerPosY = this.y * canvas.height;
        this.width = canvas.width * this.playerSize; 
        this.height = canvas.height * this.playerSize + 5;
        ctx.drawImage(this.image, playerPosX, playerPosY, this.width, this.height);
    }

    playerXAnimation() {
        switch(this.playerPosition) {
            case 1:
                this.x += 0.002; 
                break;
            case 2: 
                this.x += 0.0005;
                break;
            case 3:
                this.x -= 0.001; 
                break;
        }
    }

    playerXReturnAnimation() {
        switch(this.playerPosition) {
            case 1:
                this.x -= 0.002; 
                break;
            case 2: 
                this.x -= 0.0005;
                break;
            case 3:
                this.x += 0.001; 
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
        else if (this.isMovingUp){
            this.isMovingUp = false;
        }
        else {
            this.animationHappening = false;
        }
    }
}
