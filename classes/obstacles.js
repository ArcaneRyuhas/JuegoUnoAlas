import { canvas, ctx } from './canvas.js';
import { images } from '../data.js';

var imagesArray = [];
var correctImage;
export var correctImagePosition;

var selectedImages = new Set();
const IMAGE_SIZE = 0.12;

const imagePositions = [
    { x: 0.23, y: 0.15 },
    { x: 0.385, y: 0.15 },
    { x: 0.54, y: 0.15 }
];

function getRandomImageName() {
    let index;
    do {
        index = Math.floor(Math.random() * images.length);
    } while (selectedImages.has(index));
    selectedImages.add(index);
    return images[index];
}

export function drawImagesAndName() {
    drawImages();
    drawImageName();
}

function drawImages() {
    let index = 0;

    imagesArray.forEach(image => {
        let xRelativePosition = imagePositions[index].x * canvas.width;
        let yRelativePosition = imagePositions[index].y * canvas.height;
        let relativeSize = canvas.width * IMAGE_SIZE;

        ctx.strokeStyle = 'black';  
        ctx.lineWidth = 5;          
        ctx.strokeRect(xRelativePosition - 2, yRelativePosition - 2, relativeSize + 4, relativeSize + 4);  // Contorno alrededor de la imagen

        ctx.drawImage(image, xRelativePosition, yRelativePosition, relativeSize, relativeSize);

        index++;
    });
}

function drawImageName() {
    let xRelativePosition = 0.5155 * canvas.width;
    let yRelativePosition = 0.09 * canvas.height;

    drawRoundedRect(0.395 * canvas.width, 0.02 * canvas.height);

    let fontSize = canvas.width * 0.03; 
    ctx.textAlign = 'center';
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'white';
    ctx.fillText(`${correctImage}`, xRelativePosition, yRelativePosition);
}

function drawRoundedRect(xRelativePosition, yRelativePosition) {
    const width = canvas.width / 4;  // Ancho del rectángulo relativo al tamaño del canvas
    const height = canvas.height / 9; // Alto del rectángulo relativo al tamaño del canvas
    const borderRadius = 20;  // Radio de las esquinas redondeadas

    // Comenzar el trazo
    ctx.beginPath();

    // Dibujar las esquinas redondeadas usando arcos (ctx.arc)
    ctx.moveTo(xRelativePosition + borderRadius, yRelativePosition); // Mover a la esquina superior izquierda
    ctx.lineTo(xRelativePosition + width - borderRadius, yRelativePosition); // Línea recta al borde superior derecho
    ctx.arcTo(xRelativePosition + width, yRelativePosition, xRelativePosition + width, yRelativePosition + borderRadius, borderRadius); // Arco esquina superior derecha
    ctx.lineTo(xRelativePosition + width, yRelativePosition + height - borderRadius); // Línea recta hacia abajo (borde derecho)
    ctx.arcTo(xRelativePosition + width, yRelativePosition + height, xRelativePosition + width - borderRadius, yRelativePosition + height, borderRadius); // Arco esquina inferior derecha
    ctx.lineTo(xRelativePosition + borderRadius, yRelativePosition + height); // Línea recta hacia el borde inferior izquierdo
    ctx.arcTo(xRelativePosition, yRelativePosition + height, xRelativePosition, yRelativePosition + height - borderRadius, borderRadius); // Arco esquina inferior izquierda
    ctx.lineTo(xRelativePosition, yRelativePosition + borderRadius); // Línea recta hacia arriba (borde izquierdo)
    ctx.arcTo(xRelativePosition, yRelativePosition, xRelativePosition + borderRadius, yRelativePosition, borderRadius); // Arco esquina superior izquierda

    // Establecer propiedades del contorno y del relleno
    ctx.lineWidth = 5; // Grosor del contorno
    ctx.strokeStyle = 'black'; // Color del contorno
    ctx.stroke(); // Dibuja el contorno

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // Color del relleno con transparencia (alfa)
    ctx.fill(); // Rellenar el recuadro
}


export function selectImages() {
    selectedImages.clear();
    imagesArray = [];
    correctImagePosition = Math.floor(Math.random() * 3);

    for (let i = 0; i < 3; i++) {
        let img = new Image();
        let randomImage = getRandomImageName();
        img.src = randomImage.src;
        imagesArray.push(img);

        if (i == correctImagePosition) {
            correctImage = randomImage.name;
        }
    }
}

