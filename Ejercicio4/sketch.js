let img;
let imgBackground;

// Coordenadas inciales
const coorXincial = 81;
const coorYinicial = 81;

// Coordenadas del nuevo origen
const coorX = 80;
const coorY = 80;

//Creo una imagen de fondo
// let imgfondo = createImage(66, 66);
// imgfondo.loadPixels();
// for (let i = 0; i < imgfondo.width; i++) {
//   for (let j = 0; j < imgfondo.height; j++) {
//     imgfondo.set(i, j, color(0, 90, 102));
//   }
// }
// imgfondo.updatePixels();
// image(imgfondo, 0, 0);

function preload() {
  // Cargamos la imagen
  img = loadImage('./img/pintando.jpeg');
  imgBackground = loadImage('./img/background.jpeg');
}

function setup() {
  // Creamos un canvas de medidas (img.width, img.height)
  createCanvas(img.width, img.height);
  // pixelDensity(1) para no escalar la densidad de píxeles a la densidad de píxeles del monitor
  pixelDensity(1);
}

function draw() {
  // Detectar click sobre la imagen

  
  // Pintamos la imagen en el canvas, en la posición (0, 0) del nuevo sistema de coordenadas
  image(img, 0, 0);

  
  
  // Solo queremos que se ejecute el código de draw() una vez
  noLoop();
}

// function mouseClicked() {
 
// }

let gradosAleatorios;
let escalaAleatoria;
let coorXAleatoria;
let coorYAleatoria;


function mousePressed() {

  gradosAleatorios = random(-180);
  escalaAleatoria = random();
  coorXAleatoria = random(200)
  coorYAleatoria = random(200)

  console.log('raton presionado')
  // image(imgBackground, 0, 0);
  // background(150, 250, 150);
  // fill(100, 100, 250);
  // Movemos el sistema de coordenadas
  
  createCanvas(img.width*1.5, img.height*1.5);

  rotate(gradosAleatorios);
  scale(escalaAleatoria);
  translate(coorXAleatoria, coorYAleatoria);
  
  // Pintamos la imagen en el canvas, en la posición (0, 0) del nuevo sistema de coordenadas
  image(img, 0, 0);
 
 
}

function mouseReleased() {
  console.log('raton soltado')
  image(imgBackground, 0, 0);
  translate(-coorXAleatoria, -coorYAleatoria);
  rotate(-gradosAleatorios);
  scale(1/escalaAleatoria)

  image(img, 0, 0);
}