import { canvas, ctx } from './canvas.js';
import { images } from '../data.js';

let preloadedImages = [];

function preloadImages() {
    preloadedImages = images.map(item => {
        const img = new Image();
        img.src = item.src;
        return { image: img, name: item.name };
    });
}

preloadImages();

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

function getRandomPreloadedImage() {
    let index;
    do {
        index = Math.floor(Math.random() * preloadedImages.length);
    } while (selectedImages.has(index));
    selectedImages.add(index);
    return preloadedImages[index];
}

export function selectImages() {
    selectedImages.clear();
    imagesArray = [];
    correctImagePosition = Math.floor(Math.random() * 3);

    for (let i = 0; i < 3; i++) {
        const randomPreloaded = getRandomPreloadedImage();
        imagesArray.push(randomPreloaded.image);

        if (i === correctImagePosition) {
            correctImage = randomPreloaded.name;
        }
    }
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
        ctx.strokeRect(xRelativePosition - 2, yRelativePosition - 2, relativeSize + 4, relativeSize + 4);

        ctx.drawImage(image, xRelativePosition, yRelativePosition, relativeSize, relativeSize);

        index++;
    });
}

function drawImageName() {
    let xRelativePosition = 0.45 * canvas.width;
    let yRelativePosition = 0.09 * canvas.height;

    drawRoundedRect(0.325 * canvas.width, 0.02 * canvas.height);

    let fontSize = canvas.width * 0.03;
    ctx.textAlign = 'center';
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'white';
    ctx.fillText(`${correctImage}`, xRelativePosition, yRelativePosition);
}

function drawRoundedRect(xRelativePosition, yRelativePosition) {
    const width = canvas.width / 4;
    const height = canvas.height / 9;
    const borderRadius = 20;

    ctx.beginPath();
    ctx.moveTo(xRelativePosition + borderRadius, yRelativePosition);
    ctx.lineTo(xRelativePosition + width - borderRadius, yRelativePosition);
    ctx.arcTo(xRelativePosition + width, yRelativePosition, xRelativePosition + width, yRelativePosition + borderRadius, borderRadius);
    ctx.lineTo(xRelativePosition + width, yRelativePosition + height - borderRadius);
    ctx.arcTo(xRelativePosition + width, yRelativePosition + height, xRelativePosition + width - borderRadius, yRelativePosition + height, borderRadius);
    ctx.lineTo(xRelativePosition + borderRadius, yRelativePosition + height);
    ctx.arcTo(xRelativePosition, yRelativePosition + height, xRelativePosition, yRelativePosition + height - borderRadius, borderRadius);
    ctx.lineTo(xRelativePosition, yRelativePosition + borderRadius);
    ctx.arcTo(xRelativePosition, yRelativePosition, xRelativePosition + borderRadius, yRelativePosition, borderRadius);

    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fill();
}
