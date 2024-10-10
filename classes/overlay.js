const youLostOverlayMenu = document.getElementById('youLostMenu');
const youWonOverlayMenu = document.getElementById('youWonMenu');

export function showYouLostMenu(){
    youLostOverlayMenu.style.display = 'block';
}

export function showYouWinMenu(){
    youWonOverlayMenu.style.display = 'block';
}