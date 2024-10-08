import {canvas,ctx } from './canvas.js';

var imagesArray = [];
var correctImage;
export var correctImagePosition;

var selectedImages = new Set(); 
const imageSize = 0.13;

const imageNames = [
    '../images/gameImages/Inodoro.png', 
    '../images/gameImages/Rinoceronte.png', 
    '../images/gameImages/Elefante.png', 
    '../images/gameImages/Huevo.png', 
    '../images/gameImages/Pera.png', 
    '../images/gameImages/Naranja.png', 
    '../images/gameImages/Regadera.png', 
    '../images/gameImages/Lavabo.png', 
    '../images/gameImages/Jirafa.png', 
    '../images/gameImages/Carne.png'
];

const imagePositions = [
    { x: 0.3, y: 0.15 },   
    { x: 0.46, y: 0.15 },  
    { x: 0.62, y: 0.15 }  
];

function getRandomImageName() {
    let index;
    do {
        index = Math.floor(Math.random() * imageNames.length);  
    } while (selectedImages.has(index));  
    selectedImages.add(index);  
    return imageNames[index];
}

function getFileNameWithoutExtension(filePath) {
    const fileName = filePath.split('/').pop();  
    return fileName.split('.')[0];  
}

export function drawImagesAndName(){
    drawImages();
    drawImageName();
}

function drawImages() {
    var index = 0;
    imagesArray.forEach(image => {
        let xRelativePosition = imagePositions[index].x * canvas.width
        let yRelativePosition = imagePositions[index].y * canvas.height
        let relativeSize = canvas.width * imageSize;
        ctx.drawImage(image, xRelativePosition, yRelativePosition, relativeSize, relativeSize)
        index++;
    }); 
}

function drawImageName(){
    let imageNamesWithoutExtension = getFileNameWithoutExtension(correctImage);
    
    let xRelativePosition = 0.5155 * canvas.width;
    let yRelativePosition = 0.09 * canvas.height;

    drawElipse(0.5168 * canvas.width, 0.08 * canvas.height);

    ctx.textAlign = 'center';
    ctx.font = '30px Arial';  // Establecer el estilo de fuente
    ctx.fillStyle = 'black';  // Establecer el color del texto
    ctx.fillText(`${imageNamesWithoutExtension}`, xRelativePosition, yRelativePosition);

}

function drawElipse(xRelativePosition, yRelativePosition){
        ctx.beginPath();
        ctx.ellipse(xRelativePosition, yRelativePosition, canvas.width/8, canvas.height/18, 0, 0, 2 * Math.PI); // (x, y, radioX, radioY, rotación, ánguloInicio, ánguloFin)
        // Establecer propiedades para el contorno (stroke)
        ctx.lineWidth = 5; // Grosor del contorno
        ctx.strokeStyle = 'black';
        ctx.stroke(); // Dibuja el contorno del óvalo
        ctx.fillStyle = 'white'; // Opcional: Relleno del óvalo
        ctx.fill();
}

export function selectImages(){
    selectedImages.clear();
    imagesArray = [];
    correctImagePosition = Math.floor(Math.random() * 3);

    for (let i = 0; i < 3; i++){
        let img = new Image();
        let randomImage = getRandomImageName();
        img.src = randomImage;
        imagesArray.push(img);

        if(i == correctImagePosition){
            correctImage = randomImage;
        }
    }
}

