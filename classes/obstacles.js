import { canvas, ctx } from './canvas.js';
import { images } from '../data.js';

var imagesArray = [];
var correctImage;
export var correctImagePosition;

var selectedImages = new Set();
const IMAGE_SIZE = 0.12;

const imagePositions = [
    { x: 0.3, y: 0.15 },
    { x: 0.46, y: 0.15 },
    { x: 0.62, y: 0.15 }
];

function getRandomImageName() {
    let index;
    do {
        index = Math.floor(Math.random() * images.length);
    } while (selectedImages.has(index));
    selectedImages.add(index);
    return images[index];
}

function getFileNameWithoutExtension(filePath) {
    const fileName = filePath.split('/').pop();
    return fileName.split('.')[0];
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

        // Dibuja el contorno (rectángulo detrás de la imagen)
        ctx.strokeStyle = 'black';  // Color del contorno
        ctx.lineWidth = 5;          // Grosor del contorno
        ctx.strokeRect(xRelativePosition - 2, yRelativePosition - 2, relativeSize + 4, relativeSize + 4);  // Contorno alrededor de la imagen

        // Dibuja la imagen
        ctx.drawImage(image, xRelativePosition, yRelativePosition, relativeSize, relativeSize);

        index++;
    });
}

function drawImageName() {
    let xRelativePosition = 0.5155 * canvas.width;
    let yRelativePosition = 0.09 * canvas.height;

    drawElipse(0.5168 * canvas.width, 0.08 * canvas.height);

    ctx.textAlign = 'center';
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`${correctImage}`, xRelativePosition, yRelativePosition);

}

function drawElipse(xRelativePosition, yRelativePosition) {
    ctx.beginPath();
    ctx.ellipse(xRelativePosition, yRelativePosition, canvas.width / 8, canvas.height / 18, 0, 0, 2 * Math.PI); // (x, y, radioX, radioY, rotación, ánguloInicio, ánguloFin)
    // Establecer propiedades para el contorno (stroke)
    ctx.lineWidth = 5; // Grosor del contorno
    ctx.strokeStyle = 'black';
    ctx.stroke(); // Dibuja el contorno del óvalo
    ctx.fillStyle = 'white'; // Opcional: Relleno del óvalo
    ctx.fill();
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

