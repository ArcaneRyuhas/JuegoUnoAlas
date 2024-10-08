import {canvas,ctx } from './canvas.js';

var imagesArray = [];

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

const selectedImages = new Set(); // Para asegurarse de que no se repiten imágenes
const imageSize = 0.13;

const imagePositions = [
    { x: 0.3, y: 0.15 },   // Posición de la primera imagen
    { x: 0.46, y: 0.15 },  // Posición de la segunda imagen
    { x: 0.62, y: 0.15 }  // Posición de la tercera imagen
];

// Función para obtener un nombre de imagen aleatorio sin repetición
function getRandomImageName() {
    let index;
    do {
        index = Math.floor(Math.random() * imageNames.length);  // Genera un índice aleatorio
    } while (selectedImages.has(index));  // Repite si ya se seleccionó
    selectedImages.add(index);  // Añade el índice al conjunto de seleccionados
    return imageNames[index];
}

function getFileNameWithoutExtension(filePath) {
    const fileName = filePath.split('/').pop();  // Obtiene el nombre del archivo
    return fileName.split('.')[0];  // Devuelve el nombre sin la extensión
}

// Función para cargar y dibujar 3 imágenes aleatorias en el canvas
export function drawImages() {
    var index = 0;
    imagesArray.forEach(image => {
        let xRelativePosition = imagePositions[index].x * canvas.width
        let yRelativePosition = imagePositions[index].y * canvas.height
        let relativeSize = canvas.width * imageSize;
        ctx.drawImage(image, xRelativePosition, yRelativePosition, relativeSize, relativeSize)
        index++;
    }); 
}

export function selectImages(){
    selectedImages.clear();
    imagesArray = [];

    for (let i = 0; i < 3; i++){
        let img = new Image();
        let randomImage = getRandomImageName();
        img.src = randomImage;
        imagesArray.push(img);
    }
}

