let img;
let img2;
let imgFilt;
let matrix;
let matrixsize;
let offset;

function detectarContornos(){
  // Máscara de convolución (Detección de contornos) expresada como matriz
  matrix = [  [ -1, -1, -1 ],
  [ -1, 8, -1 ],
  [ -1, -1, -1 ] ];
  // Dimensión de la máscara de convolución
  matrixsize = 3;
  // Corrección desplazamiento
  offset = 128;
}



function realzarContornos(){
  // Máscara de convolución (Realce de contornos) expresada como matriz
  matrix = [ [ -1, -1, -1 ],
  [ -1, 9, -1 ],
  [ -1, -1, -1 ] ];
  // Dimensión de la máscara de convolución
  matrixsize = 3;
  // Corrección desplazamiento
  offset = 0;  
}

function preload() {
  img = loadImage('./img/pintando.jpeg');
  // img2 = loadImage('./img/pintando.jpeg');
}





function setup() {
  createCanvas(img.width, img.height);

  // pixelDensity(1) para no escalar la densidad de píxeles a la densidad de píxeles del monitor
  pixelDensity(1);

  imgFilt = createImage(img.width, img.height, RGB);


  // image(img, 0, 0);
  
}






function draw() {

  // Pintamos la imagen original en el canvas en la posición (0, 0)
  image(img, 0, 0);

  if (keyIsPressed === true) {
    if (keyCode === 81) {
          // SE PRESIONA Q
          detectarContornos()
          dibujarContornos()
          
    } else if (keyCode === 82) {
      // NO SE PRESIONA R
      realzarContornos()
      dibujarContornos()
      
    }else{
      // image(img2, 0, 0);
      image(img, 0, 0);
    }
  }

  


  // Pintamos la imagen filtrada en la posición (img.width, 0)
  // image(img, 0, 0);
  
}


function dibujarContornos(){
  // Siempre debemos llamar a loadPixels() antes de acceder al array de píxeles
  img.loadPixels();
  imgFilt.loadPixels();

  // Recorremos todos los píxeles de la imagen
  for (let y=0; y<img.height; y++) {
    for (let x=0; x<img.width; x++) {
      // Cálculo de la convolución espacial del píxel (x,y)
      let c = convolution(x, y);
      // Generamos un nuevo píxel en la imagen filtrada
      let position = (x + y * img.width) * 4;
      imgFilt.pixels[position] = c;
      // Al ser una imagen en escala de grises R=G=B
      imgFilt.pixels[position+2] = imgFilt.pixels[position+1] = imgFilt.pixels[position];
      // Por defecto, el canal alfa de una imagen creada con createImage() es 0. Lo tenemos que cambiar a
      255.
      imgFilt.pixels[position+3] = 255;
    }
  }



  // Si modificamos los valores del array de píxeles, siempre debemos actualizar sus valores.
  // img.updatePixels();
  imgFilt.updatePixels();
  image(imgFilt, 0, 0); 
}

// Función que calcula la convolución espacial
function convolution(x, y) {
  let result = 0.0;
  const half = Math.floor(matrixsize / 2);
  // Recorremos la matriz de convolución
  for (let i = 0; i < matrixsize; i++) {
    for (let j = 0; j < matrixsize; j++) {
      // Cálculo del píxel sobre el que estamos trabajando
      const xloc = x + i - half;
      const yloc = y + j - half;
      let loc = (xloc + img.width * yloc) * 4;
      // Nos aseguramos de que tomamos un píxel dentro del rango válido
      loc = constrain(loc, 0, img.pixels.length-1);
      // Cálculo de la operación convolución
      // Dado que se trata de una imagen en escala de grises, solo consultamos el valor del canal red (r)
      result += (img.pixels[loc] * matrix[i][j]);
    }
  }
  // Aplicamos el desplazamiento
  result += offset;
  // Nos aseguramos de que el nivel de gris está en el rango (0, 255)
  result = constrain(result, 0, 255);
  // Devolvemos el nivel de gris
  return result;
}