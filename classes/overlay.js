const youLostOverlayMenu = document.getElementById('youLostMenu');
const youWonOverlayMenu = document.getElementById('youWonMenu');
const lostScore = document.getElementById('scoreOne')
const winScore = document.getElementById('scoreTwo');
import { score } from "./gameplay.js";

export function showYouLostMenu(){
    youLostOverlayMenu.style.display = 'block';
    lostScore.textContent = `Puntaje: ${score.toFixed(0)}`;
}

export function hideYouLostMenu(){
    youLostOverlayMenu.style.display = 'none';
}

export function showYouWinMenu(){
    youWonOverlayMenu.style.display = 'block';
    winScore.textContent = `Puntaje: ${score.toFixed(0)}`;
}

export function hideYouWinMenu(){
    youWonOverlayMenu.style.display = 'none';
}
