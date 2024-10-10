import { ctx, canvas } from "./canvas.js";

export function drawGameOverMenu() {
    // Fondo semi-transparente del menú
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = "#A8A8A8";
    ctx.beginPath();
    roundedRect(ctx, canvas.width * 0.25, canvas.height * 0.25, canvas.width * 0.5, canvas.height * 0.55, 20);
    ctx.fill();
    ctx.globalAlpha = 1.0;  // Restaurar la opacidad

    // Texto "Perdiste"
    ctx.fillStyle = "#000";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Perdiste", canvas.width / 2, canvas.height * 0.4);

    // Botón "Volver a Jugar"
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(canvas.width * 0.35, canvas.height * 0.45, canvas.width * 0.3, canvas.height * 0.1);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 4;
    ctx.strokeRect(canvas.width * 0.35, canvas.height * 0.45, canvas.width * 0.3, canvas.height * 0.1);

    // Texto del botón "Volver a jugar"
    ctx.fillStyle = "#fff";
    ctx.font = "30px Arial";
    ctx.fillText("Volver a jugar", canvas.width / 2, canvas.height * 0.51);

    // Botón "Regresar"
    ctx.fillStyle = "#F44336";
    ctx.fillRect(canvas.width * 0.35, canvas.height * 0.6, canvas.width * 0.3, canvas.height * 0.1);
    ctx.strokeStyle = "#000";
    ctx.strokeRect(canvas.width * 0.35, canvas.height * 0.6, canvas.width * 0.3, canvas.height * 0.1);

    // Texto del botón "Regresar"
    ctx.fillStyle = "#fff";
    ctx.fillText("Regresar", canvas.width / 2, canvas.height * 0.66);
}

export function drawYouWinMenu() {
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = "green";
    ctx.beginPath();
    roundedRect(ctx, canvas.width * 0.25, canvas.height * 0.25, canvas.width * 0.5, canvas.height * 0.55, 20);
    ctx.fill();
    ctx.globalAlpha = 1.0;

    // Texto "Perdiste"
    ctx.font = "48px Arial";
    ctx.fillStyle = "white"
    ctx.textAlign = "center";
    ctx.fillText("Ganaste", canvas.width / 2, canvas.height * 0.4);
}

// Función auxiliar para crear un rectángulo con esquinas redondeadas
function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}
