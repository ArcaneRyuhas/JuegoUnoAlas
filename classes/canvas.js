export const canvas = document.getElementById('gameCanvas');
export const ctx = canvas.getContext('2d');

const originalWidth = canvas.width;
const originalHeight = canvas.height;

export function resizeCanvas() {
    const aspectRatio = originalWidth / originalHeight;
    if (window.innerWidth / window.innerHeight > aspectRatio) {
        canvas.height = window.innerHeight;
        canvas.width = canvas.height * aspectRatio;
    } else {
        canvas.width = window.innerWidth;
        canvas.height = canvas.width / aspectRatio;
    }
}
