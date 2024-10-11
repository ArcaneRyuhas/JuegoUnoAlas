const youLostOverlayMenu = document.getElementById('youLostMenu');
const youWonOverlayMenu = document.getElementById('youWonMenu');

export function showYouLostMenu(){
    youLostOverlayMenu.style.display = 'block';
}

export function hideYouLostMenu(){
    youLostOverlayMenu.style.display = 'none';
}

export function showYouWinMenu(){
    youWonOverlayMenu.style.display = 'block';
}

export function hideYouWinMenu(){
    youWonOverlayMenu.style.display = 'none';
}
